// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Theme from 'vitepress/theme'
import NProgress from 'nprogress'
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
  enhanceApp({ app, router, siteData }) {
    router.onBeforeRouteChange = () => {
      console.log('routestart')
      NProgress.start()
    }
    router.onAfterRouteChanged = () => {
      console.log('routeenbd')
      NProgress.done()
    }

    // ...
  },

}
