/* eslint-disable no-console */
import fs from 'fs-extra'
import globby from 'globby'
import matter from 'gray-matter'
import type { Post } from './types'

const _convertDate = (date: string, locale: string, timezone: string) =>
  new Date(date).toLocaleString(locale, {
    timeZone: timezone,
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })

const _compareDate = (obj1: Post, obj2: Post) =>
  obj1.frontmatter.rawDate < obj2.frontmatter.rawDate ? 1 : -1

const getPostMDFilePaths = async (type: string) =>
  (await globby(['**.md'], {
    ignore: ['node_modules', 'README.md'],
  })).filter(item => item.includes(`${type}/`))

export const getPosts = async (
  locale: string,
  timezone: string,
  type = 'posts',
): Promise<Post[]> => {
  const paths = await getPostMDFilePaths(type)
  const posts = await Promise.all(
    paths.map(async (item) => {
      const content = await fs.readFile(item, 'utf-8')
      const { data } = matter(content)
      data.rawDate = data.date || (await fs.stat(item)).birthtime.toString()
      data.date = _convertDate(data.rawDate, locale, timezone)
      return {
        frontmatter: data,
        regularPath: `/${item
          .replace('docs/posts', 'posts')
          .replace('.md', '.html')}`,
      }
    }),
  )
  posts.sort(_compareDate)
  return posts
}

