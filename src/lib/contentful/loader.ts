import type { Loader, LoaderContext } from "astro/loaders";
import { contentfulClient } from "./client";
import { transformProduct } from "./transforms";
import type { TypeProductSkeleton } from "@/types/contentful";
import { CONTENT_TYPES, DEFAULT_INCLUDE_LEVEL } from "./constants";
import { createCache } from "@/utils/cache";
import { createBatchProcessor } from "./batch-processor";
import { generateHash } from "@/utils/hash";

interface ContentfulLoaderOptions {
  space: string;
  accessToken: string;
  host: string;
}

const CACHE_KEY = "contentful-products";

const loaderCache = createCache({ ttlMinutes: 5 });
const processBatch = createBatchProcessor(5);

export function contentfulLoader(options: ContentfulLoaderOptions): Loader {
  if (!options.space || !options.accessToken) {
    throw new Error("Missing required Contentful configuration");
  }

  return {
    name: "contentful-loader",
    load: async ({
      store,
      logger,
      meta,
      generateDigest,
    }: LoaderContext): Promise<void> => {
      try {
        logger.info("Loading Contentful entries");

        const lastModified = meta.get("lastModified");

        const response = await contentfulClient.getEntries<TypeProductSkeleton>(
          {
            content_type: CONTENT_TYPES.PRODUCT,
            include: DEFAULT_INCLUDE_LEVEL,
            ...(lastModified
              ? {
                  "sys.updatedAt[gt]": lastModified,
                }
              : {}),
          },
        );

        if (!lastModified) {
          store.clear();
        }

        const hash = generateHash(response);
        const cached = loaderCache.get(CACHE_KEY, hash);

        if (cached) {
          return;
        }

        const transformedProducts = await processBatch(
          response.items,
          async (entry) => {
            const transformedData = transformProduct(entry);

            const digest = generateDigest({ ...transformedData });

            const existingEntry = store.get(entry.sys.id);
            if (existingEntry?.digest === digest) {
              logger.info(`Entry ${entry.sys.id} unchanged, skipping`);
              return existingEntry.data;
            }

            store.set({
              id: entry.sys.id,
              data: { ...transformedData },
              digest,
            });

            return transformedData;
          },
        );

        loaderCache.set(CACHE_KEY, transformedProducts, hash);

        meta.set("lastModified", new Date().toISOString());

        logger.info(`Loaded ${response.items.length} entries`);
      } catch (error) {
        logger.error(`Error loading entries: ${error}`);
      }
    },
  };
}
