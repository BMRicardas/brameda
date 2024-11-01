import { defineConfig, envField } from "astro/config";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
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
    remotePatterns: [{ protocol: "http" }, { protocol: "https" }],
  },
  site: ["http://www.brameda.lt", "https://www.brameda.lt"],
  integrations: [
    sitemap({
      xslURL: "/sitemap.xsl",
    }),
  ],
});
