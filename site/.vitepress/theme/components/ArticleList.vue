<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue'
import { useData } from 'vitepress'
// @ts-expect-error load data from .data files
import { data as rawFullPosts } from '../../utils/posts.data'
import ListProvider from './ListProvider.vue'

// organized Posts is a list,
// do pagination, page size is 6

interface Post {
  folder: string
  url: string
  date: string
  title: string
}

const { frontmatter } = useData()
const folder = computed(() => frontmatter.value.folder)
const pageSize = computed(() => frontmatter.value.pageSize ?? 6)

let indexFromQuery = '1'
// this is just to make ssr builder happy
if (!import.meta.env.SSR) {
  indexFromQuery = location.search.match(/page=(\d+)/)?.[1] ?? '1'
}
const index = ref(Number.parseInt(indexFromQuery))

const organizedFullPosts
  = computed(() => (rawFullPosts as Post[])
    .filter(post => post.folder === folder.value || folder.value === ''))

const pages = computed(() => ({
  total: Math.ceil(organizedFullPosts.value.length / pageSize.value),
  current: index,
}))

function renderPage(index: number) {
  const start = (index - 1) * pageSize.value
  const end = start + pageSize.value
  return organizedFullPosts.value.slice(start, end)
}
</script>

<template>
  <ClientOnly>
    <div class="max-w-[980px] mx-auto pt-10">
      <div class="flex sm:flex-row flex-col px-10">
        <ListProvider :list="renderPage(index)" />
        <!-- do pagination -->
      </div>
      <div class="flex flex-row justify-begin items-center transition-all duration-500">
        <button
          class="border-2 border-black p-2 m-2" :disabled="pages.current.value === 1"
          :class="pages.current.value === 1 ? 'opacity-50' : ''" @click="index--"
        >
          上一页
        </button>
        <span class="text-base">{{ pages.current }} / {{ pages.total }}</span>
        <button
          class="border-2 border-black p-2 m-2" :disabled="pages.current.value === pages.total"
          :class="pages.current.value === pages.total ? 'opacity-50' : ''" @click="index++"
        >
          下一页
        </button>
      </div>
    </div>
  </ClientOnly>
</template>
