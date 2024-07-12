<script setup>
import { useData, useRoute } from 'vitepress'

//   location.pathname !== "/blogs" && location.pathname !== "/blogs/";
// this should be made reactive
const data = useData()
const shouldRender = () => {

  // if frontmatter has no `noBack` or `noBack` is false, render back button
  // otherwise, if there is no Back and `noBack` is true, don't render back button
  const shouldRenderBack = data.frontmatter.value.noBack === undefined || data.frontmatter.value.noBack !== true

  return shouldRenderBack
}

const backLast = () => {
  window.history.back()
}
</script>

<template>
  <div class="container mx-auto my-5">
    <a
      v-if="shouldRender()"
      class="text-sm underline py-10 text-gray-500 tracking-[0.05rem] cursor-pointer"
      @click="backLast"
    >
      返回上一级
    </a>

  </div>
</template>
