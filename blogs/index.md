---
nocomment: true
title: 文章列表
---

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'
// @ts-expect-error load data from .data files
import { data as posts } from '../.vitepress/theme/utils/getBlogList.data'

interface PostData {
  frontmatter: {
    title: string
    date: string
    draft?: boolean
  }
  url: string
}

const organizedFullPosts = (posts as PostData[])
  .sort((a, b) => {
    const aDate = new Date(a.frontmatter.date)
    const bDate = new Date(b.frontmatter.date)
    return bDate.getTime() - aDate.getTime()
  })
  .filter(({frontmatter: { draft = undefined }}) => !draft  )
  .map(({ url, frontmatter: { date, title } }) => {
    const folder = url.split('/')[2]
    return { folder, url, date, title }
  })

const currentFolder = ref('Fantasy')
const currentYear = ref("2023")

const postsInCurrentFolder = computed(() => organizedFullPosts.filter(({ folder }) => folder === currentFolder.value))

const allFolders = new Set(organizedFullPosts.map(post => post.folder))
const allYears = computed(()=>{
  return new Set(postsInCurrentFolder.value.map(({ date }) => {
    const dateData = new Date(date)
    return dateData.getFullYear().toString()
  }
))
})

const finalListToRender = computed(()=> postsInCurrentFolder.value.filter(({ date } )=>{
  const year = (new Date(date)).getFullYear().toString()
  return year === currentYear.value
}))

watch(currentFolder , ()=> currentYear.value = Array.from(allYears.value)[0] )
</script>

  <div class="flex sm:flex-row flex-col">
    <nav class="sm:w-50 sm:h-100 h-15">
      <ul class="pl-0!  ">
        <li v-for="name in allFolders" :key="name" class="py-2 list-none sm:block inline">
          <input
            :id="name" v-model="currentFolder"
            class="appearance-none curse-pointer peer"
            type="radio" :value="name" name="folder"
          >
          <label
            class="cursor-pointer text-xl peer-checked:text-2xl transform-gpu transition-all duration-300 ease-in-out"
            :for="name"
          >{{ name }}</label>
        </li>
      </ul>
    </nav>
    <nav class="sm:w-50 sm:h-100 h-15">
      <ul class="pl-0!  ">
        <li v-for="name in allYears" :key="name" class="pb-2 list-none sm:block inline">
          <input
            :id="name" v-model="currentYear"
            class="appearance-none curse-pointer peer"
            type="radio" :value="name" name="year"
          >
          <label
            class="cursor-pointer text-gray-400 text-xl peer-checked:text-black transform-gpu transition-all duration-500 ease-in-out"
            :for="name"
          >{{ name }}</label>
        </li>
      </ul>
    </nav>
    <ul class="pl-2!">
      <li v-for="post in finalListToRender" :key="post.date" class="list-none p-0 m-0">
        <VPLink :href="post.url" class="sm:text-xl text-base">
          {{ post.title }}
        </VPLink>
        <p class="text-[0.9rem]">
          {{ (new Date(post.date)).toLocaleDateString() }}
        </p>
        <br>
      </li>
    </ul>
  </div>
