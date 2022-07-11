import { defineConfigWithTheme } from 'vitepress'
import type { ThemeLinearConfig } from './theme/types'
import { getPosts } from './theme/config'

async function config() {
  const posts = await getPosts('en-US', 'Asia/Shanghai')
  return defineConfigWithTheme<ThemeLinearConfig>({
    title: 'Dustella的糖果店',
    description: '你好',
    markdown: {
      theme: {
        light: 'css-variables',
        dark: 'css-variables',
      },
    },
    themeConfig: {
      comment: {
        repo: 'nodoubt0322/blog',
        issueTerm: 'pathname',
      },
      links: [
        {
          name: 'GitHub',
          link: 'https://github.com/Dustella',
          icon: '/assets/images/github.svg',
        },
        { name: 'Posts', link: '/posts', icon: '/assets/images/post.svg' },
        { name: 'Links', link: '/links', icon: '/assets/images/link.svg' },
      ],
      posts,
      favicon: 'https://img-cdn.dustella.net/avtr.jpg',
    },
  })
}

export default config()
