<script setup>
import { useRoute } from 'vitepress'

//   location.pathname !== "/blogs" && location.pathname !== "/blogs/";
// this should be made reactive
const shouldRender = () => {
  const route = useRoute()
  return route.path !== '/blogs' && route.path !== '/blogs/'
}

const backLast = () => {
  window.history.back()
}
</script>

<template>
  <div class="container mx-auto my-5">
    <a
      v-if="shouldRender()"
      class="text-sm underline py-10 text-gray-500 tracking-[0.05rem]"
      @click="backLast"
    >
      返回上一级
    </a>
  </div>
</template>
