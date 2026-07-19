<script lang="ts" setup>
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'

interface Post {
  folder: string
  url: string
  date: string
  title: string
}

defineProps<{
  list: Post[]
}>()

const dateFormatter = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

function formatDate(date: string) {
  return dateFormatter.format(new Date(date))
}
</script>

<template>
  <ul class="m-0! flex list-none flex-col p-0!">
    <li
      v-for="post in list"
      :key="post.url"
      class="border-b border-[var(--vp-c-divider)] first:border-t"
    >
      <VPLink
        :href="post.url"
        class="group block rounded-lg px-3 py-5 no-underline! transition-colors sm:px-4 sm:py-6 hover:bg-[var(--vp-c-bg-soft)]"
      >
        <article class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <h2 class="m-0! text-lg text-[var(--vp-c-text-1)] font-semibold leading-snug transition-colors sm:text-xl group-hover:text-[var(--vp-c-brand-1)]">
            {{ post.title }}
          </h2>
          <time
            :datetime="post.date"
            class="shrink-0 text-sm text-[var(--vp-c-text-2)] tabular-nums"
          >
            {{ formatDate(post.date) }}
          </time>
        </article>
      </VPLink>
    </li>
  </ul>
</template>
