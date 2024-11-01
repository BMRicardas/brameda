import { defineCollection } from "astro:content";
import { productSchema } from "@/schemas/contentful";
import { contentfulLoader } from "@/lib/contentful/loader";
import {
  CONTENTFUL_DELIVERY_TOKEN,
  CONTENTFUL_PREVIEW_TOKEN,
  CONTENTFUL_SPACE_ID,
} from "astro:env/server";

const products = defineCollection({
  loader: contentfulLoader({
    space: CONTENTFUL_SPACE_ID,
    accessToken: import.meta.env.DEV
      ? CONTENTFUL_PREVIEW_TOKEN
      : CONTENTFUL_DELIVERY_TOKEN,
    host: import.meta.env.DEV ? "preview.contentful.com" : "cdn.contentful.com",
  }),
  schema: productSchema,
});

export const collections = { products };
