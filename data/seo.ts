import type { HeadConfig, TransformContext } from 'vitepress'

function staticHeaders() {
  const headers = [
    ['link', { rel: 'icon', href: 'https://img-cdn.dustella.net/wizard.ico' }],
    // meta
    ['meta', { name: 'author', content: 'Dustella' }],
    ['meta', { name: 'keywords', content: 'Dustella, Dustella\'s Blog, Dustella\'s Website, Dustella\'s Home' }],
    // meta for seo
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { name: 'googlebot', content: 'index, follow' }],
    ['meta', { name: 'baidu-site-verification', content: 'codeva-kpKmYXHSMC' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn-font.hyperos.mi.com/font/css?family=MiSans:100,200,300,400,450,500,600,650,700,900:Chinese_Simplify,Latin&display=swap' }],
  ]
  return headers as HeadConfig[]
}

function opengraphHeaders(context: TransformContext) {
  const title = context.pageData.frontmatter.title ?? 'Dustella 的自留地'

  let metas = [
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
    metas = metas.concat([
      ['meta', { property: 'og:image', content: `https://www.dustella.net/og/${title}.png` }],
      ['meta', { property: 'twitter:image', content: `https://www.dustella.net/og/${title}.png` }],
    ],
    )
  }
  else {
    metas = metas.concat([
      ['meta', { property: 'og:image', content: 'https://www.dustella.net/og/index.png' }],
      ['meta', { property: 'twitter:image', content: 'https://www.dustella.net/og/index.png' }],
    ])
  }
  return metas as HeadConfig[]
}

export {
  staticHeaders,
  opengraphHeaders,
}
