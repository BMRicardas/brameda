import { createClient } from "contentful";
import { contentfulConfig } from "./config";

export const contentfulClient =
  createClient(contentfulConfig).withoutUnresolvableLinks;
