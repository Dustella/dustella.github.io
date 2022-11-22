import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import Unocss from "unocss/astro"

import sitemap from "@astrojs/sitemap"

// https://astro.build/config
export default defineConfig({
  site: "https://dustella.net",
  integrations: [mdx(), sitemap(), Unocss()],
});
