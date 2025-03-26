import type { HeadConfig } from 'vitepress'
import { defineConfig } from 'vitepress'
import Unocss from 'unocss/vite'
import { PluginOption } from 'vite'
import { opengraphHeaders, staticHeaders } from '../data/seo'
import { baseConfig } from '../data/theme'
import { postRenderGeneration } from './postRender'

const transformer = postRenderGeneration()

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ...baseConfig(),
  vite: {
    plugins: [Unocss() as never],
  },
  head: [...staticHeaders()],
  transformHtml: (_, id, context) => {
    transformer.addLink(id, context)
  },
  transformHead: (context) => {
    return [...opengraphHeaders(context)] as HeadConfig[]
  },
  buildEnd: async ({ outDir }) => {
    await transformer.generateSitemap(outDir)
    await transformer.generateOpenGraphImages(outDir)
  },
  markdown:{
    math: true
  }
})
