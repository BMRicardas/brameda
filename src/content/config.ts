import { defineCollection } from "astro:content";

import { contentfulConfig } from "@/lib/contentful/config";
import { contentfulLoader } from "@/lib/contentful/loader";
import { ProductSchema } from "@/schemas/contentful-transformed.types";

const products = defineCollection({
  loader: contentfulLoader(contentfulConfig),
  schema: ProductSchema,
});

export const collections = { products };
