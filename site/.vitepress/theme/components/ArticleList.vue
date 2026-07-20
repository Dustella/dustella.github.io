<script lang="ts" setup>
import { useData } from 'vitepress'
import { computed, onMounted, ref } from 'vue'
// @ts-expect-error load data from .data files
import { data as rawFullPosts } from '../../utils/posts.data'
import ListProvider from './ListProvider.vue'

interface Post {
  folder: string
  url: string
  date: string
  title: string
}

const { frontmatter } = useData()
const folder = computed(() => frontmatter.value.folder ?? '')
const pageSize = computed(() => Math.max(1, Number(frontmatter.value.pageSize) || 6))
const index = ref(1)

const organizedFullPosts = computed(() => (rawFullPosts as Post[])
  .filter(post => post.folder === folder.value || folder.value === ''))

const pageTitle = computed(() => ({
  Fantasy: '生活随笔',
  Tech: '技术文章',
}[folder.value] ?? '全部文章'))

const totalPages = computed(() => Math.ceil(organizedFullPosts.value.length / pageSize.value))
const currentPage = computed(() => Math.min(Math.max(index.value, 1), Math.max(totalPages.value, 1)))
const visiblePosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return organizedFullPosts.value.slice(start, start + pageSize.value)
})

function goToPage(page: number) {
  index.value = Math.min(Math.max(page, 1), Math.max(totalPages.value, 1))
}

onMounted(() => {
  const page = Number.parseInt(new URLSearchParams(location.search).get('page') ?? '1')
  goToPage(Number.isNaN(page) ? 1 : page)
})
</script>

<template>
  <main class="mx-auto max-w-[980px] px-5 pb-16 pt-12 sm:px-8 sm:pt-16">
    <header class="mb-6 border-b border-[var(--vp-c-divider)] px-3 pb-7 sm:mb-8 sm:px-4">
      <p class="mb-2 text-xs text-[var(--vp-c-brand-1)] font-semibold tracking-[0.18em] uppercase">
        Article archive
      </p>
      <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h1 class="m-0! text-3xl text-[var(--vp-c-text-1)] font-bold leading-tight sm:text-4xl">
          {{ pageTitle }}
        </h1>
        <p class="m-0! text-sm text-[var(--vp-c-text-2)]">
          共 {{ organizedFullPosts.length }} 篇
        </p>
      </div>
    </header>

    <ListProvider v-if="visiblePosts.length" :list="visiblePosts" />
    <div
      v-else
      class="rounded-xl bg-[var(--vp-c-bg-soft)] px-5 py-12 text-center text-sm text-[var(--vp-c-text-2)]"
    >
      暂时还没有文章。
    </div>

    <nav
      v-if="totalPages > 1"
      class="mt-8 flex items-center justify-between border-t border-[var(--vp-c-divider)] pt-6"
      aria-label="文章分页"
    >
      <button
        type="button"
        class="h-10 inline-flex items-center gap-1.5 rounded-lg border border-[var(--vp-c-divider)] bg-[var(--vp-c-bg)] px-4 text-sm text-[var(--vp-c-text-1)] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 hover:not-disabled:border-[var(--vp-c-brand-1)] hover:not-disabled:text-[var(--vp-c-brand-1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--vp-c-brand-1)]"
        :disabled="currentPage <= 1"
        @click="goToPage(currentPage - 1)"
      >
        <span aria-hidden="true">←</span>
        上一页
      </button>
      <span class="text-sm text-[var(--vp-c-text-2)] tabular-nums">
        {{ currentPage }} / {{ totalPages }}
      </span>
      <button
        type="button"
        class="h-10 inline-flex items-center gap-1.5 rounded-lg border border-[var(--vp-c-divider)] bg-[var(--vp-c-bg)] px-4 text-sm text-[var(--vp-c-text-1)] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 hover:not-disabled:border-[var(--vp-c-brand-1)] hover:not-disabled:text-[var(--vp-c-brand-1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--vp-c-brand-1)]"
        :disabled="currentPage >= totalPages"
        @click="goToPage(currentPage + 1)"
      >
        下一页
        <span aria-hidden="true">→</span>
      </button>
    </nav>
  </main>
</template>
