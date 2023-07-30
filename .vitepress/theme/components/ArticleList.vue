<script lang="ts" setup>
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'
// @ts-expect-error load data from .data files
import { data as organizedFullPosts } from '../utils/getBlogList.data'
</script>

<template>
  <div class="flex sm:flex-row flex-col">
    <ul class="pl-2!">
      <li v-for="post in organizedFullPosts" :key="post.date" class="list-none p-0 m-0">
        <VPLink :href="post.url" class="sm:text-xl text-base">
          {{ post.title }}
        </VPLink>
        <p class="text-[0.9rem]">
          {{ (new Date(post.date)).toLocaleDateString() }}
          {{ post.intro }}
        </p>
        <br>
      </li>
    </ul>
  </div>
</template>
