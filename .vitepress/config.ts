import { resolve } from 'node:path'
import { createWriteStream } from 'node:fs'
import { defineConfig } from 'vitepress'
import Unocss from 'unocss/vite'
import { SitemapStream } from 'sitemap'
import generator from './theme/utils/ogGenerator'
const links = []

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Dustella 的自留地',
  description: 'Dustella 的自留地',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blogs', link: '/blogs/' },
      { text: 'Projects', link: '/projects' },
      { text: 'Links', link: '/links' },
      { text: 'About', link: '/about' },
    ],
    footer: {
      message: '苏ICP备20013766号-2',
      copyright: 'By Dustella, Under CC BY-NC-SA 4.0 License',
    },
    socialLinks: [
      {
        link: 'https://github.com/Dustella',
        icon: 'github',
      },
      {
        link: 'https://t.me/Dustella',
        icon: {
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Telegram</title><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>',
        },
      },
    ],
  },
  vite: {
    plugins: [Unocss()],
  },
  head: [
    ['link', { rel: 'icon', href: 'https://img-cdn.dustella.net/wizard.ico' }],
    // meta
    ['meta', { name: 'author', content: 'Dustella' }],
    ['meta', { name: 'keywords', content: 'Dustella, Dustella\'s Blog, Dustella\'s Website, Dustella\'s Home' }],
    // meta for seo
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { name: 'googlebot', content: 'index, follow' }],
    ['meta', { name: 'baidu-site-verification', content: 'codeva-kpKmYXHSMC' }],
    ['link', { rel: 'stylesheet', href: 'https://nuistshare-cdn.dustella.net/fonts/MiSans-Medium/result-uni.css' }],
    ['link', { rel: 'stylesheet', href: 'https://nuistshare-cdn.dustella.net/fonts/MiSans-Regular/result.css' }],

  ],
  transformHtml: (_, id, { pageData: { relativePath, frontmatter: { date: lastmod, title } } }) => {
    if (!/[\\/]404\.html$/.test(id)) {
      const iUrl = relativePath.replace(/((^|\/)index)?\.md$/, '$2')
      const url = (iUrl === '' || iUrl.endsWith('/')) ? iUrl : `${iUrl}.html`
      links.push({ url, lastmod, title })
    }
  },
  transformHead: async (context) => {
    const title = context.pageData.frontmatter.title

    const metas = [
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:type', content: 'blog' }],
      ['meta', { property: 'og:url', content: `https://dustella.net/${context.page.replace('.md', '')}` }],
      ['meta', { property: 'og:site_name', content: 'Dustella 的自留地' }],
      ['meta', { property: 'og:description', content: 'Dustella 的主页' }],
      ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { property: 'twitter:site', content: '@Dustella' }],
      ['meta', { property: 'twitter:title', content: title }],
      ['meta', { property: 'twitter:description', content: 'Dustella 的主页' }],
    ]
    if (context.page.includes('blogs')) {
      return metas.concat([
        ['meta', { property: 'og:image', content: `https://www.dustella.net/og-${title}.png` }],
        ['meta', { property: 'twitter:image', content: `https://www.dustella.net/og-${title}.png` }]],
      )
    }
    else {
      return metas.concat([
        ['meta', { property: 'og:image', content: 'https://www.dustella.net/og.png' }],
        ['meta', { property: 'twitter:image', content: 'https://www.dustella.net/og.png' }],
      ])
    }
  },
  buildEnd: async ({ outDir }) => {
    const fs = await import('node:fs')
    const sitemap = new SitemapStream({ hostname: 'https://www.dustella.net/' })
    const writeStream = createWriteStream(resolve(outDir, 'sitemap.xml'))
    sitemap.pipe(writeStream)
    links.forEach(link => sitemap.write(link))
    const svg2img = await import('svg2img')
    for (const link of links.filter(link => link.url.includes('blogs/'))) {
      const svg = await generator(link.title)
      svg2img.default(svg, (_, buffer) => {
        fs.writeFileSync(resolve(`${outDir}`, `og-${link.title}.png`), buffer)
      })
    }
    const svg = await generator('Dustella 的自留地')
    svg2img.default(svg, (_, buffer) => {
      fs.writeFileSync(resolve(`${outDir}`, 'og.png'), buffer)
    })
    sitemap.end()
  },
})
