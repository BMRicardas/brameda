import { defineCollection } from "astro:content";
import { productSchema } from "@/schemas/contentful-transformed.types";
import { contentfulLoader } from "@/lib/contentful/loader";
import { contentfulConfig } from "@/lib/contentful/config";

const products = defineCollection({
  loader: contentfulLoader(contentfulConfig),
  schema: productSchema,
});

export const collections = { products };
