<script lang="ts" setup>
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'
import { useData } from 'vitepress'
import { computed } from 'vue'

interface Breadcrumb {
  link: string
  text: string
}

const { frontmatter, page } = useData()

const categoryByFolder: Record<string, Breadcrumb> = {
  Fantasy: { text: '生活', link: '/blogs/life' },
  Tech: { text: '技术', link: '/blogs/tech' },
}

const shouldRender = computed(() => frontmatter.value.noBack !== true)
const isBlogPost = computed(() => page.value.relativePath.startsWith('blogs/'))
const folder = computed(() => page.value.relativePath.split('/')[1])
const currentTitle = computed(() => frontmatter.value.title || page.value.title || '当前页面')

const breadcrumbs = computed(() => {
  const items: Breadcrumb[] = [{ text: '首页', link: '/' }]

  if (!isBlogPost.value) {
    return items
  }

  const category = categoryByFolder[folder.value]
  if (category) {
    items.push(category)
  }

  return items
})
</script>

<template>
  <nav v-if="shouldRender" class="mb-6 mt-2 sm:mb-8" aria-label="文章面包屑">
    <ol class="m-0! flex list-none flex-wrap items-center gap-y-1 overflow-hidden rounded-xl border border-[var(--vp-c-divider)] bg-[var(--vp-c-bg-soft)] px-2 py-1.5 text-xs! leading-5 sm:px-3 sm:text-sm!">
      <li
        v-for="breadcrumb in breadcrumbs"
        :key="breadcrumb.link"
        class="flex shrink-0 items-center text-[color:var(--vp-c-text-2)]"
      >
        <VPLink
          :href="breadcrumb.link"
          class="rounded-md px-1.5 py-0.5 no-underline! transition-colors duration-200 hover:(bg-[var(--vp-c-brand-dimm)] text-[color:var(--vp-c-brand-1)]) focus-visible:(outline-2 outline-offset-2 outline-[var(--vp-c-brand-1)])"
        >
          {{ breadcrumb.text }}
        </VPLink>
        <svg class="mx-0.5 h-3.5 w-3.5 text-[color:var(--vp-c-text-3)] sm:mx-1" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="m8 4.5 5 5-5 5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </li>

      <li class="min-w-0 text-[color:var(--vp-c-text-1)]" aria-current="page">
        <span class="block max-w-[13rem] truncate px-1.5 py-0.5 font-medium sm:max-w-[28rem]" :title="currentTitle">
          {{ currentTitle }}
        </span>
      </li>
    </ol>
  </nav>
</template>
