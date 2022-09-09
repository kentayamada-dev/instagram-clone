import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

export default /** @type {import('astro').AstroUserConfig} */ ({
  site: "https://kentayamada-dev.github.io",
  base: process.env["GH_PAGES_BASE"] ?? "/",
  integrations: [tailwind(), react()]
});
