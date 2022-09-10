import { createWriteStream } from 'node:fs'
import { resolve } from 'node:path'
import { SitemapStream } from 'sitemap'
import { defineConfigWithTheme } from 'vitepress'
import type { ThemeLinearConfig } from './theme/types'
import { getPosts } from './theme/config'

const links = [] as { url: string; lastmod: number | undefined }[]
async function config() {
  const posts = await getPosts('en-US', 'Asia/Shanghai')
  const whispers = await getPosts('en-US', 'Asia/Shanghai', 'whispers')
  return defineConfigWithTheme<ThemeLinearConfig>({
    title: 'Dustella的糖果店',
    description: '糖果店没有糖果',
    appearance: true,
    markdown: {
      theme: 'css-variables',
    },
    themeConfig: {
      comment: {
        repo: 'Dustella/CandyStore',
        issueTerm: 'pathname',
      },
      links: [
        {
          name: 'Home',
          link: '/',
          icon: '/assets/images/home-fill.svg',
        },
        {
          name: 'GitHub',
          link: 'https://github.com/Dustella',
          icon: '/assets/images/GitHub.svg',
        },
        {
          name: 'Posts',
          link: '/posts',
          icon: '/assets/images/article-fill.svg',
        },
        {
          name: 'Whispers',
          link: '/whispers',
          icon: '/assets/images/article-fill.svg',
        },
        { name: 'Links', link: '/links', icon: '/assets/images/friends.svg' },
        {
          name: 'Telegram',
          link: 'https://t.me/Dustella',
          icon: 'assets/images/telegram.svg',
        },
      ],
      posts,
      whispers,
      favicon: 'https://img-cdn.dustella.net/avtr.jpg',
    },
    transformHtml: async (_, id, { pageData }) => {
      links.push({
        url: pageData.relativePath.replace(/((^|\/)index)?\.md$/, '$2'),
        lastmod: pageData.lastUpdated,
      })
    },
    buildEnd: async ({ outDir }) => {
      const sitemap = new SitemapStream({ hostname: 'https://dustella.net/' })
      const writeStream = createWriteStream(resolve(outDir, 'sitemap.xml'))
      sitemap.pipe(writeStream)
      links.forEach(link => sitemap.write(link))
      sitemap.end()
    },
  })
}

export default config()
