import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://kentayamada-dev.github.io",
  base: "/instagram-clone",
  integrations: [tailwind()]
});
