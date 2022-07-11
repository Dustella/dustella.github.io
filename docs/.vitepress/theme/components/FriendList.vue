<script setup>
import ls from '../../../friends.json'
import FriendCard from './FriendCard.vue'
const [lixiang, ...toSort] = ls
const info = [lixiang, ...toSort.sort(() => Array.from(crypto.getRandomValues(new Uint8Array(1)))[0] - 128)]
</script>

<template>
  <friend-card v-for="i in info" :key="i" :user-info="i" />
</template>
