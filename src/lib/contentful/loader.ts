import type { Loader, LoaderContext } from "astro/loaders";
import type { CreateClientParams } from "contentful";

import type { TypeProductSkeleton } from "@/types/contentful";

import {
  ProductSchema,
  RawProductSchema,
} from "@/schemas/contentful-transformed.types";

import { contentfulClient } from "./client";
import { CONTENT_TYPES, DEFAULT_INCLUDE_LEVEL } from "./config";
import { transformProduct } from "./transforms";

/**
 * Retry with exponential backoff, skip non-transient errors
 */
async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelayMs: number = 1000,
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (
        error instanceof TypeError ||
        (error instanceof Error && error.message.includes("401"))
      ) {
        throw error;
      }

      if (attempt < maxRetries) {
        const delayMs = baseDelayMs * 2 ** (attempt - 1);
        console.warn(
          `Contentful request failed (attempt ${attempt}/${maxRetries}). Retrying in ${delayMs}ms...`,
          lastError.message,
        );
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }

  throw lastError || new Error("Max retries exceeded");
}

export function contentfulLoader(options: CreateClientParams): Loader {
  if (!options.space || !options.accessToken) {
    throw new Error("Missing required Contentful configuration");
  }

  const isDev = import.meta.env.DEV;

  return {
    name: "contentful-loader",
    load: async ({
      store,
      logger,
      meta,
      generateDigest,
    }: LoaderContext): Promise<void> => {
      try {
        if (isDev) logger.info("Loading Contentful entries");

        const lastModified = meta.get("lastModified");

        const { items } = await withRetry(
          () =>
            contentfulClient.getEntries<TypeProductSkeleton>({
              content_type: CONTENT_TYPES.PRODUCT,
              include: DEFAULT_INCLUDE_LEVEL,
              ...(lastModified
                ? {
                    "sys.updatedAt[gt]": lastModified,
                  }
                : {}),
            }),
          3,
          1000,
        );

        if (!lastModified) {
          store.clear();
        }

        let successCount = 0;
        let skippedCount = 0;

        items.forEach((item) => {
          const validationResult = RawProductSchema.safeParse(item);

          if (!validationResult.success) {
            logger.warn(
              `Skipping invalid product entry ${item.sys.id}: ${JSON.stringify(validationResult.error.flatten())}`,
            );
            skippedCount += 1;
            return;
          }

          try {
            const transformedData = transformProduct(validationResult.data);
            const digest = generateDigest({ ...transformedData });

            store.set({
              id: item.sys.id,
              data: { ...transformedData },
              digest,
            });
            successCount += 1;
          } catch (transformError) {
            logger.warn(
              `Failed to transform product ${item.sys.id}: ${transformError instanceof Error ? transformError.message : String(transformError)}`,
            );
            skippedCount += 1;
          }
        });

        if (isDev) {
          logger.info(
            `Contentful loader complete: ${successCount} loaded, ${skippedCount} skipped`,
          );
        }
      } catch (error) {
        logger.error(
          `Fatal error loading Contentful entries: ${error instanceof Error ? error.message : String(error)}`,
        );
        throw error;
      }
    },
    schema: ProductSchema,
  };
}
