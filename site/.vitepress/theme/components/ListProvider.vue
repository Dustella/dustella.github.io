<script setup>
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'
defineProps(['list'])
</script>

<template>
  <ul class=" w-full pl-0!">
    <li
      v-for="post in list"
      :key="post.date"
      class="list-none  my-1 b-b-(solid 1 [--vp-c-divider])"
    >
      <div class="py-4">
        <VPLink :href="post.url" class="sm:text-xl no-underline! hover:underline! text-base">
          <!-- <h2 -->

            {{ post.title }}
          <!-- </h2 -->
        </VPLink>
        <span class="text-[0.9rem]! text-gray! block lg:inline">

          {{
            new Date(post.date).toLocaleDateString("zh-CN", {
              // weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }}
        </span>
      </div>
    </li>
  </ul>
</template>
