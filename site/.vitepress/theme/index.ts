import type { Theme } from 'vitepress'
import { presetClient } from '@nolebase/integrations/vitepress/client'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import ArticleList from './components/ArticleList.vue'
import BackLast from './components/BackLast.vue'
import Comments from './components/Comments.vue'
import FriendList from './components/FriendList.vue'
import NewNotFound from './components/NewNotFound.vue'
import ProjectList from './components/ProjectList.vue'
import { initClarity } from './utils/clarity'
import { initNProgress } from './utils/initNProgress'
import './style.css'
import 'uno.css'

const nolebase = presetClient({
  enhancedReadabilities: {
    options: {
      layoutSwitch: {
        defaultMode: 4,
      },
      spotlight: {
        defaultToggle: true,
        hoverBlockColor: 'rgb(128 129 145 / 8%)',
      },
    },
  },
})

const ExtendedTheme: Theme = {
  extends: DefaultTheme,
  Layout: () => {
    const slots = nolebase.enhanceLayout?.() ?? {}

    return h(DefaultTheme.Layout, null, {
      'not-found': () => h(NewNotFound),
      'doc-before': () => h(BackLast),
      'doc-after': () => h(Comments),
      'doc-top': () => slots['doc-top']?.map(slot => slot()),
      'nav-bar-content-after': () => slots['nav-bar-content-after']?.map(slot => slot()),
      'nav-screen-content-after': () => slots['nav-screen-content-after']?.map(slot => slot()),
    })
  },
  async enhanceApp(ctx) {
    const { app, router } = ctx

    await nolebase.enhanceApp?.(ctx)

    if (!import.meta.env.SSR) {
      await initNProgress(router)
      initClarity('i17ejh9rcu')
    }
    app.component('articles', ArticleList)
    app.component('friends', FriendList)
    app.component('projects', ProjectList)
  },
}

export default ExtendedTheme
