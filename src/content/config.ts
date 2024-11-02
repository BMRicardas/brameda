import { defineCollection } from "astro:content";
import { productSchema } from "@/schemas/contentful";
import { contentfulLoader } from "@/lib/contentful/loader";
import { contentfulConfig } from "@/lib/contentful/constants";

const products = defineCollection({
  loader: contentfulLoader(contentfulConfig),
  schema: productSchema,
});

export const collections = { products };
