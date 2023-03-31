// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Theme from 'vitepress/theme'
import NotFound from './components/NotFound.vue'
import Comments from './components/Comments.vue'
import './style.css'
import 'uno.css'

export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      'not-found': () => h(NotFound),
      'doc-after': () => h(Comments),
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  // eslint-disable-next-line unused-imports/no-unused-vars
  async enhanceApp({ app, router, siteData }) {
    // @ts-expect-error import for vite
    if (!import.meta.env.SSR) {
      const { default: NProgress } = await import('nprogress')
      router.onBeforeRouteChange = () => {
        console.log('routestart')
        NProgress.start()
      }
      router.onAfterRouteChanged = () => {
        console.log('routeenbd')
        NProgress.done()
      }
    }

    // ...
  },

}
