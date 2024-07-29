<script lang="ts" setup>
import Giscus from '@giscus/vue'
import { useData } from 'vitepress'

const { frontmatter, isDark } = useData()

const shouldShowComments = frontmatter !== undefined && !frontmatter.value.noComment
</script>

<template>
  <div v-if="shouldShowComments" class="comments-container">
    <ClientOnly>
      <Giscus
        id="comments"
        repo="dustella/dustella.github.io"
        repo-id="R_kgDOHpBvMg"
        category="General"
        category-id="DIC_kwDOHpBvMs4CVYlQ"
        mapping="pathname"
        term="在这里评论"
        reactions-enabled="1"
        emit-metadata="0"
        input-position="top"
        host="https://giscus.app"
        :theme="isDark ? 'dark' : 'light'"
        lang="en"
      />
    </ClientOnly>
  </div>
</template>
