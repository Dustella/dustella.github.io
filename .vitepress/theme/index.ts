// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Theme from 'vitepress/theme'
import ArticleList from './components/ArticleList.vue'
import Comments from './components/Comments.vue'
import NewNotFound from './components/NewNotFound.vue'
import BackLast from './components/BackLast.vue'
import FriendList from './components/FriendList.vue'
import './style.css'
import 'uno.css'

export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      'not-found': () => h(NewNotFound),
      'doc-after': () => h(Comments),
      'doc-before': () => h(BackLast),

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
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        // @ts-ignore
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        // @ts-ignore
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "i17ejh9rcu");

    }
    app.component('ArticleList', ArticleList)
    app.component('FriendList', FriendList)

    // ...
  },

}
