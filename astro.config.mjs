import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import Unocss from 'unocss/astro'
import presetMini from '@unocss/preset-mini'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  site: 'https://dustella.net',
  integrations: [mdx(), sitemap(), Unocss({
    theme: {
      colors: {
        bggray_l: '#cdcecf',
        bgwhite: '##f5f5f5',

      },
    },
    presets: [presetMini({ dark: 'media' })],
  })],
})
