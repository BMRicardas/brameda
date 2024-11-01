import {
  CONTENTFUL_DELIVERY_TOKEN,
  CONTENTFUL_PREVIEW_TOKEN,
  CONTENTFUL_SPACE_ID,
} from "astro:env/server";

export const CONTENT_TYPES = {
  PRODUCT: "product",
} as const;

export const DEFAULT_INCLUDE_LEVEL = 2;

export const createClientParams = {
  space: CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.DEV
    ? CONTENTFUL_PREVIEW_TOKEN
    : CONTENTFUL_DELIVERY_TOKEN,
  host: import.meta.env.DEV ? "preview.contentful.com" : "cdn.contentful.com",
};
