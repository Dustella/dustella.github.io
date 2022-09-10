<script setup lang='ts'>
import { useData } from 'vitepress'
import type { Post } from '../types'
import PostCard from './PostCard.vue'
const data = useData()
const whispers: Post[] = data.site.value.themeConfig.whispers
</script>

<template>
  <PostCard v-for="post in whispers" :key="post.frontmatter.title" :post="post" />
</template>

