// https://vitepress.dev/guide/custom-theme
import Theme from 'vitepress/theme'
import ArticleList from './components/ArticleList.vue'
import FriendList from './components/FriendList.vue'
import ProjectList from './components/ProjectList.vue'
import Layout from './Layout.vue'
import { initClarity } from './utils/clarity'
import './style.css'
import 'uno.css'
import { initNProgress } from './utils/initNProgress'

export default {
  ...Theme,
  Layout,
  // eslint-disable-next-line unused-imports/no-unused-vars
  async enhanceApp({ app, router, siteData }) {
    // @ts-expect-error import for vite
    if (!import.meta.env.SSR) {
      initNProgress(router)
      initClarity('i17ejh9rcu')
    }
    app.component('articles', ArticleList)
    app.component('friends', FriendList)
    app.component('projects', ProjectList)

    // ...
  },

}
