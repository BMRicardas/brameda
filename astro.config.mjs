import sitemap from "@astrojs/sitemap";
import { defineConfig, envField } from "astro/config";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import postcssNesting from "postcss-nesting";

// https://astro.build/config
export default defineConfig({
  build: {
    inlineStylesheets: "always",
  },
  output: "static",
  vite: {
    build: {
      cssMinify: true,
      cssCodeSplit: true,
    },
    css: {
      postcss: {
        plugins: [
          postcssNesting(),
          autoprefixer({
            overrideBrowserslist: ["last 2 versions", "> 1%"],
          }),
          cssnano({
            preset: [
              "default",
              {
                discardComments: {
                  removeAll: true,
                },
                normalizeWhitespace: true,
              },
            ],
          }),
        ],
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
