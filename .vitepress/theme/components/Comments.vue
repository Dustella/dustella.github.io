<script lang="ts" setup>
import Giscus from '@giscus/vue'
import { useData } from 'vitepress'

const { frontmatter, isDark } = useData()
</script>

<template>
  <div v-if="!frontmatter.nocomment" class="comments-container">
    <!-- //   id="comments"
    //   repo="dustella/dustella.github.io"
    //   repo-id="R_kgDOHpBvMg"
    //   data-category="General"
    //   data-category-id="DIC_kwDOHpBvMs4CVYlQ"
    //   data-mapping="pathname"
    //   data-strict="0"
    //   data-reactions-enabled="1"
    //   data-emit-metadata="0"
    //   data-input-position="bottom"
    //   data-theme="preferred_color_scheme"
    //   data-lang="zh-CN"
    //   data-loading="lazy"
    //   crossorigin="anonymous"
    //   async -->
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
      :theme="isDark ? 'dark' : 'light'"
      lang="en"
      loading="lazy"
    >
      />
    </Giscus>
  </div>
</template>
