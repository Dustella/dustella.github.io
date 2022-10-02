<script lang="ts" setup>
import type { PropType } from 'vue'

defineProps({
  userInfo: {
    type: Object as PropType<{
      avatar: string,
      name: string,
      desc: string,
      link: string
    }>,
    required: true
  }
})
</script>

<template>
  <a :href="userInfo.link" target="_blank">
    <div
      :id="userInfo.name"
      class="transition-all duration-200 rounded-xl border-1 w-full flex flex-col justify-center items-center mx-auto card-aside container bg-base-100 shadow-xl m-4 image-full hover:scale-105  hover:cursor-pointer bg-slate-50">
      <!-- {{ userInfo }} -->
      <figure><img :src="userInfo.avatar" alt="" class="bg-center bg-cover w-10 h-10"></figure>
      <div>
        <h3 class="text-center text-dark-800">
          {{ userInfo.name }}
        </h3>
        <p class="text-center underline-unset text-gray-500">
          {{ userInfo.desc }}
        </p>
      </div>
    </div>
  </a>
</template>

