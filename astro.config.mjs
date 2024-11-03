import sitemap from "@astrojs/sitemap";
import stylify from "@stylify/astro";
import { defineConfig, envField } from "astro/config";

// https://astro.build/config
export default defineConfig({
  build: {
    assets: true,
    inlineStylesheets: "auto",
  },
  output: "static",

  env: {
    schema: {
      CONTENTFUL_SPACE_ID: envField.string({
        access: "secret",
        context: "server",
      }),
      CONTENTFUL_DELIVERY_TOKEN: envField.string({
        access: "secret",
        context: "server",
      }),
      CONTENTFUL_PREVIEW_TOKEN: envField.string({
        access: "secret",
        context: "server",
      }),
      WEB3FORMS_PUBLIC_ACCESS_KEY: envField.string({
        access: "secret",
        context: "server",
      }),
    },
  },
  image: {
    remotePatterns: [{ protocol: "https", hostname: "**.ctfassets.net" }],
    domains: ["images.ctfassets.net"],
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
  },
  site: "http://www.brameda.lt",
  integrations: [
    sitemap({
      xslURL: "/sitemap.xsl",
    }),
    stylify(),
  ],
});
