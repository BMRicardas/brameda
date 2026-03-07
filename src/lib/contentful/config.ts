import type { CreateClientParams } from "contentful";

import { env } from "../env";

const envConfig = env();

export const CONTENT_TYPES = {
  PRODUCT: "product",
} as const;

export const DEFAULT_INCLUDE_LEVEL = 3;

export const contentfulConfig = {
  space: envConfig.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.DEV
    ? envConfig.CONTENTFUL_PREVIEW_TOKEN
    : envConfig.CONTENTFUL_DELIVERY_TOKEN,
  host: import.meta.env.DEV ? "preview.contentful.com" : "cdn.contentful.com",
} satisfies CreateClientParams;
