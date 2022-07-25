<script setup>
import ls from '../../../friends.json'
import FriendCard from './FriendCard.vue'
const [lixiang, ...toSort] = ls
const info = [lixiang, ...toSort.sort(() => Array.from(crypto.getRandomValues(new Uint8Array(1)))[0] - 128)]
</script>

<template>
  <div class="grid md:grid-cols-3 gap-10 sm:grid-cols-2 grid-cols-1">
    <friend-card v-for="i in info" :key="i" :user-info="i" class="container relative" />
  </div>
</template>
