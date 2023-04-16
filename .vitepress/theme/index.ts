// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Theme from 'vitepress/theme'
import NotFound from './components/NotFound.vue'
import Comments from './components/Comments.vue'
import './style.css'
import 'uno.css'
import VPMobNav from './components/VPMobNav.vue'

export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      'not-found': () => h(NotFound),
      'doc-after': () => h(Comments),
      'nav-content-after': () => h(VPMobNav),
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  // eslint-disable-next-line unused-imports/no-unused-vars
  async enhanceApp({ app, router, siteData }) {
    // @ts-expect-error import for vite
    if (!import.meta.env.SSR) {
      const { default: NProgress } = await import('nprogress')
      router.onBeforeRouteChange = () => {
        NProgress.start()
      }
      router.onAfterRouteChanged = () => {
        NProgress.done()
      }
    }

    // ...
  },

}
