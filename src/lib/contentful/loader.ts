import type { Loader } from "astro/loaders";
import { contentfulClient } from "./client";
import { CONTENT_TYPES } from "./constants";
import type { TypeProductSkeleton } from "@/types/contentful";
import { processBatch } from "./utils";
import { transformContentfulToProduct } from "./transforms";
import type { Entry } from "contentful";

type ContentfulEntry = Entry<TypeProductSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">;

export function contentfulLoader(_options: Record<string, unknown>): Loader {
  return {
    name: "contentful-loader",
    async load({ store, logger, meta }) {
      try {
        const syncToken = meta.get("syncToken");
        logger.info(
          syncToken
            ? `Performing incremental sync with token: ${syncToken}`
            : "Performing initial sync",
        );

        const syncResult =
          syncToken && !import.meta.env.DEV
            ? await contentfulClient.sync<TypeProductSkeleton>({
                nextSyncToken: syncToken,
                type: "Entry",
                content_type: CONTENT_TYPES.PRODUCT,
              })
            : await contentfulClient.sync<TypeProductSkeleton>({
                initial: true,
                type: "Entry",
                content_type: CONTENT_TYPES.PRODUCT,
              });

        // Clear store in dev mode or initial sync
        if (import.meta.env.DEV || !syncToken) {
          store.clear();
        }

        // Handle deleted entries
        if (syncResult.deletedEntries?.length) {
          logger.info(
            `Removing ${syncResult.deletedEntries.length} deleted entries`,
          );
          syncResult.deletedEntries.forEach((entry) => {
            store.delete(entry.sys.id);
          });
        }

        // Handle updated/new entries
        const entries = syncResult.entries as ContentfulEntry[];
        if (entries.length) {
          logger.info(`Processing ${entries.length} new/updated entries`);

          await processBatch(entries, async (entry) => {
            try {
              const product = transformContentfulToProduct(
                entry as ContentfulEntry,
              );
              store.set({
                id: product.id,
                data: product,
              });
              return product;
            } catch (error) {
              logger.error(`Error processing entry ${entry.sys.id}: ${error}`);
              return null;
            }
          });
        }

        // Store sync token only in production
        if (!import.meta.env.DEV && syncResult.nextSyncToken) {
          meta.set("syncToken", syncResult.nextSyncToken);
          logger.info(
            `Sync completed. Next sync token stored: ${syncResult.nextSyncToken}`,
          );
        }
      } catch (error) {
        logger.error(`Error during sync operation: ${error}`);
        meta.delete("syncToken");
        logger.info("Sync token cleared due to error");
      }
    },
  };
}
