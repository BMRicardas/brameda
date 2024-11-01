import { createClient } from "contentful";

import { createClientParams } from "@/lib/contentful/constants";

export const contentfulClient =
  createClient(createClientParams).withoutUnresolvableLinks;

export type ContentfulClient = typeof contentfulClient;
