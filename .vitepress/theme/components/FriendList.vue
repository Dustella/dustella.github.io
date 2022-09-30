<script lang="ts" setup>
import ls from '../../../friends.json'
import FriendCard from './FriendCard.vue'

const shuffle = (arr: any[]) => {
  let l = arr.length
  const brr = arr
  while (l > 0) {
    const index = Math.floor(Math.random() * l)
    const temp = brr[l - 1]
    brr[l - 1] = brr[index]
    brr[index] = temp
    l -= 1
  }
  return brr
}

const [lixiang, ...toSort] = ls
const info = [lixiang, ...shuffle(toSort)]
</script>

<template>
  <ClientOnly>
    <div class="grid md:grid-cols-3 gap-10 sm:grid-cols-2 grid-cols-1">
      <friend-card v-for="i in info" :key="i" :user-info="i" class="container relative" />
    </div>
  </ClientOnly>
</template>
