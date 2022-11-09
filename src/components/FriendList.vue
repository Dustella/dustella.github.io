<script lang="ts" setup>
import ls from '../../friends.json'
import FriendCard from './FriendCard.vue'

const [lixiang, ...toSort] = ls
const info = [lixiang, ...(toSort.sort(() => Math.random() - 0.5))]
</script>

<template>
  <div class="grid md:grid-cols-3 gap-10 sm:grid-cols-2 grid-cols-1">
    <FriendCard v-for="i in info" :key="i.name" :user-info="i" class="container relative" />
  </div>
</template>
