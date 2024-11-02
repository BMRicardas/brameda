import type { TypeProductSkeleton } from "@/types/contentful.types";
import { contentfulClient } from "./client";
import { CONTENT_TYPES, DEFAULT_INCLUDE_LEVEL } from "./constants";
import { transformProduct } from "./transforms";

// Get all products
export async function getAllProducts() {
  try {
    const response = await contentfulClient.getEntries<TypeProductSkeleton>({
      content_type: CONTENT_TYPES.PRODUCT,
      include: DEFAULT_INCLUDE_LEVEL,
      order: ["-fields.order"],
    });

    const convertedResponse = response.items.map(transformProduct);

    return convertedResponse;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
}

// Get single product by slug
export async function getProductBySlug(slug: string) {
  try {
    const response = await contentfulClient.getEntries<TypeProductSkeleton>({
      content_type: CONTENT_TYPES.PRODUCT,
      "fields.slug": slug,
      include: DEFAULT_INCLUDE_LEVEL,
    });

    const item = response.items[0];

    if (!item) {
      throw new Error(`Product with slug ${slug} not found`);
    }
    const convertedResponse = transformProduct(item);

    return convertedResponse;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    throw error;
  }
}
