import type { Loader, LoaderContext } from "astro/loaders";
import { contentfulClient } from "./client";
import { transformProduct } from "./transforms";
import type { TypeProductSkeleton } from "@/types/contentful";
import { CONTENT_TYPES, DEFAULT_INCLUDE_LEVEL } from "./constants";
import type { CreateClientParams } from "contentful";

export function contentfulLoader(options: CreateClientParams): Loader {
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

        const { items } =
          await contentfulClient.getEntries<TypeProductSkeleton>({
            content_type: CONTENT_TYPES.PRODUCT,
            include: DEFAULT_INCLUDE_LEVEL,
            ...(lastModified
              ? {
                  "sys.updatedAt[gt]": lastModified,
                }
              : {}),
          });

        if (!lastModified) {
          store.clear();
        }

        items.map((item) => {
          const transformedData = transformProduct(item);

          const digest = generateDigest({ ...transformedData });

          const existingEntry = store.get(item.sys.id);
          if (existingEntry?.digest === digest) {
            logger.info(`Entry ${item.sys.id} unchanged, skipping`);
            return existingEntry.data;
          }

          store.set({
            id: item.sys.id,
            data: { ...transformedData },
            digest,
          });

          return transformedData;
        });

        meta.set("lastModified", new Date().toISOString());

        logger.info(`Loaded ${items.length} entries`);
      } catch (error) {
        logger.error(`Error loading entries: ${error}`);
      }
    },
  };
}
