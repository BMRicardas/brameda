import type { Loader } from "astro/loaders";
import { contentfulClient } from "./client";
import { CONTENT_TYPES, DEFAULT_INCLUDE_LEVEL } from "./constants";
import type { TypeProductSkeleton } from "@/types/contentful";
import type { Product } from "@/schemas/contentful";
import { createCache, generateHash, processBatch } from "./utils";
import { transformContentfulToProduct } from "./transforms";
import type { CreateClientParams } from "contentful";

const CACHE_KEY = "contentful-products";
const loaderCache = createCache<Product[]>();

export function contentfulLoader(_options: CreateClientParams): Loader {
  return {
    name: "contentful-loader",
    load: async ({ store, logger }) => {
      try {
        const response = await contentfulClient.getEntries<TypeProductSkeleton>(
          {
            content_type: CONTENT_TYPES.PRODUCT,
            include: DEFAULT_INCLUDE_LEVEL,
          },
        );

        // Clear store before adding new entries
        store.clear();

        const hash = generateHash(response);
        const cached = loaderCache.get(CACHE_KEY, hash);

        if (cached) {
          // Use cached data to update store
          cached.forEach((product) => {
            store.set({
              id: product.id,
              data: product,
            });
          });
          return;
        }

        // Process and store new entries
        await processBatch(response.items, async (entry) => {
          const product = transformContentfulToProduct(entry);
          store.set({
            id: product.id,
            data: product,
          });
          return product;
        });

        // Update cache with all products
        const allProducts = response.items.map((entry) =>
          transformContentfulToProduct(entry),
        );
        loaderCache.set(CACHE_KEY, allProducts, hash);
      } catch (error) {
        logger.error(`Error loading entries: ${error}`);
      }
    },
  };
}
