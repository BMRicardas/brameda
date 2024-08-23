import { defineConfig } from "astro/config";

import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
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
