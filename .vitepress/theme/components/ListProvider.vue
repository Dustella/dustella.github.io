<script setup>
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'
defineProps(['listToRender'])
</script>

<template>
  <ul class="pl-2!">
    <li
      v-for="post in listToRender"
      :key="post.date"
      class="list-none p-0 m-0"
    >
      <div class="border-2 border-black p-4">
        <VPLink :href="post.url" class="sm:text-xl text-base">
          {{ post.title }}
        </VPLink>
        <p class="text-[0.9rem] text-gray">
          {{
            new Date(post.date).toLocaleDateString("zh-CN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }},
          {{ post.folder }}
        </p>
      </div>
    </li>
  </ul>
</template>
