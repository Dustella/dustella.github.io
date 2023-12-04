import { createContentLoader } from 'vitepress'
// import getFirstPass from "./parseFirstPharse";

export default createContentLoader('blogs/*/*.md', {
  includeSrc: true,
  transform(posts) {
    return posts
      .sort((a, b) => {
        const aDate = new Date(a.frontmatter.date)
        const bDate = new Date(b.frontmatter.date)
        return bDate.getTime() - aDate.getTime()
      })
      .filter(({ frontmatter: { draft = undefined } }) => !draft)
      .map((res) => {
        const { url, frontmatter } = res

        const { date, title } = frontmatter
        const folder = url.split('/')[2]
        return { folder, url, date, title }
      })
  },
})
