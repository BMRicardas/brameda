import { defineCollection } from "astro:content";
import { productSchema } from "@/schemas/contentful";
import { contentfulLoader } from "@/lib/contentful/loader";
import { contentfulConfig } from "@/lib/contentful/constants";

const products = defineCollection({
  loader: contentfulLoader(contentfulConfig),
  // type: "data",
  schema: productSchema,
});

export const collections = { products };
