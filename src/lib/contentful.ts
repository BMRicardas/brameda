import { createClient } from "contentful";
import type { TypeProductSkeleton } from "@/types/contentful-types";

export const contentfulClient = createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.DEV
    ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
    : import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
  host: import.meta.env.DEV ? "preview.contentful.com" : "cdn.contentful.com",
}).withoutUnresolvableLinks;

export async function getAllProducts() {
  const { items } = await contentfulClient.getEntries<TypeProductSkeleton>({
    content_type: "product",
    include: 2,
  });

  return items.map((item) => item.fields);
}

export async function getProduct(slug: string) {
  const { items } = await contentfulClient.getEntries<TypeProductSkeleton>({
    content_type: "product",
    "fields.slug": slug,
    include: 2,
  });
  return items[0];
}
