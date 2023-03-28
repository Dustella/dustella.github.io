---
title: kaka
---

<script lang="ts" setup>
import { ref } from 'vue'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'
// @ts-expect-error load data from .data files
import { data as posts } from '../.vitepress/theme/utils/getBlogList.data'

interface PostData {
  frontmatter: {
    title: string
    date: string
  }
  url: string
}

const currentFolder = ref('Life')
const organizedPosts = (posts as PostData[])
  .sort((a, b) => {
    const aDate = new Date(a.frontmatter.date)
    const bDate = new Date(b.frontmatter.date)
    return bDate.getTime() - aDate.getTime()
  })
  .map(({ url, frontmatter: { date, title } }) => {
    const folder = url.split('/')[2]
    return { folder, url, date, title }
  })

const allFolders = new Set(organizedPosts.map(post => post.folder))
</script>
  <div class="flex sm:flex-row flex-col">
    <nav class="sm:w-50 sm:h-100 h-20">
      <ul class="pl-0!  ">
        <li v-for="name in allFolders" :key="name" class="py-2 list-none sm:block inline">
          <input
            :id="name" v-model="currentFolder"
            class="appearance-none curse-pointer peer"
            type="radio" :value="name" name="folder"
          >
          <label
            class="cursor-pointer text-xl peer-checked:text-3xl transform-gpu transition-all duration-300 ease-in-out"
            :for="name"
          >{{ name }}</label>
        </li>
      </ul>
    </nav>
    <ul class="pl-2!">
      <li v-for="post in organizedPosts.filter(({ folder }) => folder === currentFolder)" :key="post.date" class="list-none p-0 m-0">
        <VPLink :href="post.url" class="text-xl">
          {{ post.title }}
        </VPLink>
        <p>
          {{ (new Date(post.date)).toLocaleDateString() }}
        </p>
        <br>
      </li>
    </ul>
  </div>
