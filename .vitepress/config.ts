import { defineConfigWithTheme } from 'vitepress'
import type { ThemeLinearConfig } from './theme/types'
import { getPosts } from './theme/config'

async function config() {
  const posts = await getPosts('en-US', 'Asia/Shanghai')
  return defineConfigWithTheme<ThemeLinearConfig>({
    title: 'Dustella的糖果店',
    description: '糖果店没有糖果',
    appearance: true,
    markdown: {
      theme: 'css-variables',
    },
    themeConfig: {
      comment: {
        repo: 'nodoubt0322/blog',
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
        { name: 'Links', link: '/links', icon: '/assets/images/friends.svg' },
        {
          name: 'Telegram',
          link: 'https://t.me/Dustella',
          icon: 'assets/images/telegram.svg',
        },
      ],
      posts,
      favicon: 'https://img-cdn.dustella.net/avtr.jpg',
    },
  })
}

export default config()
