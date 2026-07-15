import type { TransformContext } from 'vitepress'
import { createWriteStream } from 'node:fs'
import { resolve } from 'node:path'
import { SitemapStream } from 'sitemap'
import { generateOgSvg } from './utils/opengraph'

const NOT_FOUND_RE = /[\\/]404\.html$/
const INDEX_MD_RE = /((^|\/)index)?\.md$/

function postRenderGeneration() {
  const links = [] as { url: string, lastmod: string, title: string }[]

  const addLink = (id: string, context: TransformContext) => {
    const {
      pageData: {
        relativePath,
        frontmatter: { date: lastmod, title },
      },
    } = context

    if (!NOT_FOUND_RE.test(id)) {
      const iUrl = relativePath.replace(INDEX_MD_RE, '$2')
      const url = iUrl === '' || iUrl.endsWith('/') ? iUrl : `${iUrl}.html`
      links.push({ url, lastmod, title })
    }
  }

  const generateSitemap = async (outDir: string) => {
    const sitemap = new SitemapStream({
      hostname: 'https://www.dustella.net/',
    })
    const writeStream = createWriteStream(resolve(outDir, 'sitemap.xml'))
    sitemap.pipe(writeStream)
    links.forEach(link => sitemap.write(link))
    sitemap.end()
  }

  const generateOpenGraphImages = async (outDir: string) => {
    const fs = await import('node:fs')
    const svg2img = await import('svg2img')
    // use fs to make a new directory `og`
    fs.mkdirSync(resolve(`${outDir}`, 'og'), { recursive: true })
    for (const link of links.filter(link => link.url.includes('blogs/'))) {
      const svg = await generateOgSvg(link.title)
      svg2img.default(svg, (_, buffer) => {
        fs.writeFileSync(resolve(`${outDir}`, `og/${link.title}.png`), buffer)
      })
    }
    const svg = await generateOgSvg('Dustella 的自留地')
    svg2img.default(svg, (_, buffer) => {
      fs.writeFileSync(resolve(`${outDir}`, 'og/index.png'), buffer)
    })
  }

  return { addLink, generateSitemap, generateOpenGraphImages }
}

export { postRenderGeneration }
