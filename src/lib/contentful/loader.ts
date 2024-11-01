import type { Loader } from "astro/loaders";
import type { CreateClientParams, Entry } from "contentful";
import { contentfulClient } from "./client";
import { CONTENT_TYPES, DEFAULT_INCLUDE_LEVEL } from "./constants";
import type { TypeProductSkeleton } from "@/types/contentful";
import type { Product } from "@/schemas/contentful";
import { createCache, generateHash, processBatch } from "./utils";
import { transformContentfulToProduct } from "./transforms";

console.log("HERE");

const CACHE_KEY = "contentful-products";
const loaderCache = createCache<Product[]>();

export function contentfulLoader(_options: CreateClientParams): Loader {
  return {
    name: "contentful-loader",
    load: async ({ store, logger, meta }) => {
      try {
        const syncToken = meta.get("syncToken");

        logger.info(
          syncToken
            ? `Performing incremental sync with token: ${syncToken}`
            : "Performing initial sync",
        );

        const syncResult = syncToken
          ? await contentfulClient.sync({
              nextSyncToken: syncToken,
              type: "Entry",
              content_type: CONTENT_TYPES.PRODUCT,
            })
          : await contentfulClient.sync({
              initial: true,
              type: "Entry",
              content_type: CONTENT_TYPES.PRODUCT,
            });

        // Handle deleted entries first
        if (syncResult.deletedEntries?.length) {
          logger.info(
            `Removing ${syncResult.deletedEntries.length} deleted entries`,
          );
          syncResult.deletedEntries.forEach((entry) => {
            if (entry.sys.id) {
              store.delete(entry.sys.id);
            }
          });
        }

        // Handle updated/new entries
        const entries = syncResult.entries;
        if (entries.length) {
          logger.info(`Processing ${entries.length} new/updated entries`);

          // Process entries in batches
          await processBatch(entries, async (entry) => {
            try {
              // Type guard to ensure entry is a product
              if (isProductEntry(entry)) {
                const product = transformContentfulToProduct(entry);
                store.set({
                  id: product.id,
                  data: product,
                });
                return product;
              }
              logger.warn(`Skipping non-product entry: ${entry.sys.id}`);
              return null;
            } catch (error) {
              logger.error(`Error processing entry ${entry.sys.id}: ${error}`);
              return null;
            }
          });
        }

        // Store the new sync token for next sync
        if (syncResult.nextSyncToken) {
          meta.set("syncToken", syncResult.nextSyncToken);
          logger.info(
            `Sync completed. Next sync token stored: ${syncResult.nextSyncToken}`,
          );
        }

        // Update cache with current state
        const allEntries =
          await contentfulClient.getEntries<TypeProductSkeleton>({
            content_type: CONTENT_TYPES.PRODUCT,
            include: DEFAULT_INCLUDE_LEVEL,
          });

        const hash = generateHash(allEntries);
        const allProducts = allEntries.items
          .filter(isProductEntry)
          .map(transformContentfulToProduct);

        loaderCache.set(CACHE_KEY, allProducts, hash);
        logger.info(`Cache updated with ${allProducts.length} total products`);
      } catch (error) {
        logger.error(`Error during sync operation: ${error}`);
        meta.delete("syncToken");
        logger.info("Sync token cleared due to error");
      }
    },
  };
}

// Type guard to ensure entry is a product
function isProductEntry(
  entry: Entry<any, any>,
): entry is Entry<TypeProductSkeleton, "WITHOUT_UNRESOLVABLE_LINKS"> {
  return (
    entry?.sys?.contentType?.sys?.id === CONTENT_TYPES.PRODUCT &&
    typeof entry?.fields?.slug === "string" &&
    typeof entry?.fields?.title === "string"
  );
}
