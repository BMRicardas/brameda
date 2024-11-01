import { defineCollection } from "astro:content";
import { productSchema } from "@/schemas/contentful";
import { createClientParams } from "@/lib/contentful/constants";
import { contentfulLoader } from "@/lib/contentful/loader";

const products = defineCollection({
  loader: contentfulLoader(createClientParams),
  schema: productSchema,
});

export const collections = { products };
