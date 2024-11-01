import { createClient } from "contentful";
import { contentfulConfig } from "./constants";

export const contentfulClient =
  createClient(contentfulConfig).withoutUnresolvableLinks;
