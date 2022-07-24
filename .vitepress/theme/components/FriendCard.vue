<script setup>
import { computed } from 'vue'

const props = defineProps({ userInfo: { type: Object } })
const avtr = computed(() => {
  return `url(${props.userInfo.avatar})`
})
const jump = () =>
  setTimeout(() => {
    window.open(props.userInfo.link)
  }, 300)
</script>

<template>
  <div class="card flex-row mx-auto card-aside container bg-base-100 shadow-xl m-10 image-full" @click="jump">
    <figure><img :src="props.userInfo.avatar" alt="" class="bg-center bg-cover"></figure>
    <div class="card-body">
      <h3 class="card-title">
        {{ props.userInfo.name }}
      </h3>
      <p>
        {{ props.userInfo.desc }}
      </p>
    </div>
  </div>
</template>

