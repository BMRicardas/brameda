import contentful from "contentful";
import { BLOCKS } from "@contentful/rich-text-types";
import type {
  TypeAboutUsSkeleton,
  TypeProductSkeleton,
} from "@src/types/contentful-types";

export const contentfulClient = contentful.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.DEV
    ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
    : import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
  host: import.meta.env.DEV ? "preview.contentful.com" : "cdn.contentful.com",
});

export const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: { content: any }, next: (arg0: any) => string) =>
      `<p>${next(node.content).replace(/\n/g, "<br/>")}</p>`,
  },
};

export async function getAllProducts() {
  const { items } = await contentfulClient.getEntries<TypeProductSkeleton>({
    content_type: "product",
    include: 2,
  });
  return items;
}

export async function getProduct(slug: string) {
  const { items } = await contentfulClient.getEntries<TypeProductSkeleton>({
    content_type: "product",
    "fields.slug": slug,
    include: 2,
  });
  return items[0];
}

export async function getAboutUs() {
  const { items } = await contentfulClient.getEntries<TypeAboutUsSkeleton>({
    content_type: "aboutUs",
  });
  return items[0];
}
