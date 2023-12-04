import { resolve } from 'node:path'
import { createWriteStream } from 'node:fs'
import type { HeadConfig } from 'vitepress'
import { defineConfig } from 'vitepress'
import Unocss from 'unocss/vite'
import { SitemapStream } from 'sitemap'
import { opengraphHeaders, staticHeaders } from '../data/seo'
import { baseConfig } from '../data/theme'
import generator from './theme/utils/ogGenerator'
const links = []

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ...baseConfig(),
  vite: {
    plugins: [Unocss()],
  },
  head: [
    ...staticHeaders(),
  ],
  transformHtml: (_, id, { pageData: { relativePath, frontmatter: { date: lastmod, title } } }) => {
    if (!/[\\/]404\.html$/.test(id)) {
      const iUrl = relativePath.replace(/((^|\/)index)?\.md$/, '$2')
      const url = (iUrl === '' || iUrl.endsWith('/')) ? iUrl : `${iUrl}.html`
      links.push({ url, lastmod, title })
    }
  },
  transformHead: (context) => {
    return [
      ...opengraphHeaders(context),
    ] as HeadConfig[]
  },
  buildEnd: async ({ outDir }) => {
    const fs = await import('node:fs')
    // begin sitemap generation
    const sitemap = new SitemapStream({ hostname: 'https://www.dustella.net/' })
    const writeStream = createWriteStream(resolve(outDir, 'sitemap.xml'))
    sitemap.pipe(writeStream)
    links.forEach(link => sitemap.write(link))
    // end sitemap generation
    // begin og image generation
    const svg2img = await import('svg2img')
    // use fs to make a new directory `og`
    fs.mkdirSync(resolve(`${outDir}`, 'og'), { recursive: true })
    for (const link of links.filter(link => link.url.includes('blogs/'))) {
      const svg = await generator(link.title)
      svg2img.default(svg, (_, buffer) => {
        fs.writeFileSync(resolve(`${outDir}`, `og/${link.title}.png`), buffer)
      })
    }
    const svg = await generator('Dustella 的自留地')
    svg2img.default(svg, (_, buffer) => {
      fs.writeFileSync(resolve(`${outDir}`, 'og/index.png'), buffer)
    })
    // end og image generation
    sitemap.end()
  },
})
