import type { Feature } from 'vitepress/dist/client/theme-default/components/VPFeatures.vue'

interface MyWorks {
  // index string , value Feature
  [index: string]: Feature[]
}

const works: MyWorks = {
  第一个项目: [
    {
      title: '一些玩具',
      details: '一个个人作品',
      link: 'https://index.dustella.net',
      icon: { src: 'https://cdn.jsdelivr.net/gh/alist-org/logo@main/logo.svg', height: '15px' },
    },
    {

      title: 'lalala',
      details: '很新的东西',
      link: 'https://nuistcraft.com',
      icon: { src: 'https://nuistcraft.com/img/undraw_docusaurus_mountain.svg', height: '15px' },
    },
  ],
  个人项目: [
    {
      title: '一些玩具',
      details: '一个个人作品',
      link: 'https://index.dustella.net',
      icon: { src: 'https://cdn.jsdelivr.net/gh/alist-org/logo@main/logo.svg', height: '15px' },
    },
    {

      title: 'lalala',
      details: '很新的东西',
      link: 'https://nuistcraft.com',
      icon: { src: 'https://nuistcraft.com/img/undraw_docusaurus_mountain.svg', height: '15px' },
    },
    {
      title: '一些玩具',
      details: '一个个人作品',
      link: 'https://index.dustella.net',
      icon: { src: 'https://cdn.jsdelivr.net/gh/alist-org/logo@main/logo.svg', height: '15px' },
    },

  ],
}

export default works
