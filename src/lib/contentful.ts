import { createClient } from "contentful";
import type { TypeProductSkeleton } from "@/types/contentful-types";
import {
  CONTENTFUL_DELIVERY_TOKEN,
  CONTENTFUL_PREVIEW_TOKEN,
  CONTENTFUL_SPACE_ID,
} from "astro:env/server";

export const contentfulClient = createClient({
  space: CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.DEV
    ? CONTENTFUL_PREVIEW_TOKEN
    : CONTENTFUL_DELIVERY_TOKEN,
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
