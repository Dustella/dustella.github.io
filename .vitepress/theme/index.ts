import type { Theme } from 'vitepress'
import { createHead } from '@vueuse/head'

import './styles/reset.css'
import './styles/fonts.css'
import './styles/global.css'
import './styles/shiki.css'
import './styles/article.css'
import './styles/reactivity.css'
import 'animate.css'

import Layout from './Layout.vue'
import NotFound from './NotFound.vue'
import PostList from './components/PostList.vue'
import Comment from './components/Comment.vue'
import FriendList from './components/FriendList.vue'

const head = createHead()

const theme: Theme = {
  Layout,
  NotFound,
  enhanceApp({ app }) {
    app.component('PostList', PostList)
    app.component('Comment', Comment)
    app.component('FriendList', FriendList)
    app.use(head)
  },
}

export default theme
