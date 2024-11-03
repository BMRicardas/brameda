import sitemap from "@astrojs/sitemap";
import { defineConfig, envField } from "astro/config";
import autoprefixer from "autoprefixer";
import postcss from "postcss";
import postcssNesting from "postcss-nesting";

// https://astro.build/config
export default defineConfig({
  build: {
    assets: true,
    inlineStylesheets: "auto",
  },
  output: "static",
  vite: {
    css: {
      postcss: {
        plugins: [autoprefixer(), postcssNesting(), postcss()],
      },
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
  site: "http://www.brameda.lt",
  integrations: [
    sitemap({
      xslURL: "/sitemap.xsl",
    }),
  ],
});
