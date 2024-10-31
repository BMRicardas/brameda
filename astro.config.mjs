import { defineConfig, envField } from "astro/config";

import robotsTxt from "astro-robots-txt";

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
    domains: ["images.ctfassets.net"],
    remotePatterns: [
      {
        protocol: "https",
      },
    ],
  },
  integrations: [
    robotsTxt({
      policy: [
        {
          userAgent: "*",
          crawlDelay: 10,
        },
      ],
    }),
  ],
});
