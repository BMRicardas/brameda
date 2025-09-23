import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig, envField, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
  experimental: {
    fonts: [
      {
        provider: fontProviders.google,
        name: "Roboto",
        cssVariable: "--font-roboto",
        // fallbacks: ["sans-serif"],
      },
    ],
  },
  prefetch: {
    prefetchAll: true,
  },
  build: {
    inlineStylesheets: "always",
  },
  vite: {
    build: {
      cssCodeSplit: false,
      minify: true,
      cssMinify: true,
    },
  },
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
  site: "https://brameda.lt",
  integrations: [
    sitemap({
      xslURL: "/sitemap.xsl",
    }),
    react(),
  ],
});
