import type { Feature } from 'vitepress/dist/client/theme-default/components/VPFeatures.vue'

interface MyWorks {
  // index string , value Feature
  [index: string]: Feature[]
}

const works: MyWorks = {
  '常用公共服务': [
    {
      title: '杂货铺',
      details: '一个资源站，大部分工具和镜像俱全',
      link: 'https://index.dustella.net',
      icon: { src: 'https://cdn.jsdelivr.net/gh/alist-org/logo@main/logo.svg', height: '15px' },
    },
    {

      title: 'NUISTCraft',
      details: '一个 NUIST 的 Minecraft 服务器',
      link: 'https://nuistcraft.com',
      icon: { src: 'https://nuistcraft.com/img/undraw_docusaurus_mountain.svg', height: '15px' },
    },
    {

      title: 'NuistShare',
      details: '资料共享',
      link: 'https://nuistshare.com',
      icon: { src: 'https://nuistcraft.com/img/undraw_docusaurus_mountain.svg', height: '15px' },
    },
  ],
  '项目与公共 API': [
    {
      title: 'Colorless',
      details: '一个 Vitepress 博客模板',
      link: 'https://github.com/Dustella',
    },
    {

      title: 'ACG 图床接口',
      details: '没有 R18 的图，可以单独查询猫娘图片',
      link: 'https://acg-img.dustella.net/',
    },
    {
      title: 'Whois 爬虫',
      details: '基于 Cloudflare Workers ',
      link: 'https://github.com/Dustella/whois-api',
    },

  ],
  '玩具和 Demo': [
    {
      title: 'Negatives',
      details: '基于Rust的词法语法分析器',
      link: 'https://github.com/Dustella/negatives',
    },
    {
      title: '大葱打水客户端',
      details: '基于Worker的协议转发',
      link: 'https://github.com/Dustella/water-client',
    },
    {
      title: '信带同学一键互评',
      details: '自动互评脚本',
      link: 'https://github.com/Dustella/nuist-auto-peer-evaluation',
    },
  ],
  '已经停止维护': [
    {
      title: 'NUIST 校园网登陆 golang',
      details: '现在自动认证已经不需要了',
      link: 'https://github.com/Dustella/i-NUIST-login-golang',

    },
    {
      title: '室内操工厂',
      details: 'Web 重置',
      link: 'https://github.com/Dustella/ide-reforged',

    },
    {
      title: 'Charlottebot',
      details: '一个基于 Mirai 的 QQ 机器人',
      link: 'https://github.com/Dustella/Charlottebot',
    },
  ],

}

export default works
