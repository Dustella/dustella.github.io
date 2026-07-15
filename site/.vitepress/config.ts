import type { HeadConfig } from 'vitepress'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { presetMarkdownIt } from '@nolebase/integrations/vitepress/markdown-it'
import { presetVite } from '@nolebase/integrations/vitepress/vite'
import { transformHeadMeta } from '@nolebase/vitepress-plugin-meta'
import Unocss from 'unocss/vite'
import { defineConfig } from 'vitepress'
import { opengraphHeaders, staticHeaders } from '../data/seo'
import { baseConfig } from '../data/theme'
import { postRenderGeneration } from './postRender'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const siteRoot = resolve(projectRoot, 'site')
const contentIndexPages = [
  'index.md',
  'about.md',
  'links.md',
  'projects.md',
  'blogs/index.md',
  'blogs/life.md',
  'blogs/tech.md',
]

const nolebaseMarkdownIt = presetMarkdownIt({
  bidirectionalLinks: {
    options: {
      dir: siteRoot,
      noNoMatchedFileWarning: true,
    },
  },
})
const nolebaseVite = presetVite({
  gitChangelog: {
    options: {
      gitChangelog: {
        cwd: projectRoot,
        include: ['site/blogs/*/*.md'],
        repoURL: () => 'https://github.com/Dustella/dustella.github.io',
      },
      markdownSection: {
        excludes: contentIndexPages,
      },
    },
  },
  pageProperties: {
    options: {
      markdownSection: {
        excludes: contentIndexPages,
      },
    },
  },
})
const transformMeta = transformHeadMeta({ length: 180 })
const transformer = postRenderGeneration()

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ...baseConfig(),
  vue: {
    template: {
      transformAssetUrls: {
        video: ['src', 'poster'],
        source: ['src'],
        img: ['src'],
        image: ['xlink:href', 'href'],
        use: ['xlink:href', 'href'],
        NolebaseUnlazyImg: ['src'],
      },
    },
  },
  vite: {
    plugins: [
      Unocss() as never,
      nolebaseVite,
      ...nolebaseVite.plugins(),
    ],
  },
  head: [...staticHeaders()],
  transformHtml: (_, id, context) => {
    transformer.addLink(id, context)
  },
  transformHead: async (context) => {
    const head = [...opengraphHeaders(context)] as HeadConfig[]
    return await transformMeta(head, context) ?? head
  },
  buildEnd: async ({ outDir }) => {
    await transformer.generateSitemap(outDir)
    await transformer.generateOpenGraphImages(outDir)
  },
  markdown: {
    math: true,
    preConfig: async (md) => {
      await nolebaseMarkdownIt.install(md)
    },
  },
})
