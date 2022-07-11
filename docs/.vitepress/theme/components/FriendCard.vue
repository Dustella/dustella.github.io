<script setup>
import { computed } from 'vue'

const props = defineProps({ userInfo: { type: Object } })
const avtr = computed(() => {
  return `url(${props.userInfo.avatar})`
})
const jump = () => window.open(props.userInfo.link)
</script>

<template>
  <div class="card" @click="jump">
    <div class="card_load" />
    <div class="right-container">
      <div class="card_load_extreme_title">
        {{ props.userInfo.name }}
      </div>
      <div class="card_load_extreme_descripion">
        {{ props.userInfo.desc }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
    position: relative;
  width: 80%;
  height: 5.5rem;
  background: #ffff;
  box-shadow: 0 1px 25px rgba(0,0,0,0.2);
  margin: 2rem auto;
  padding: 2rem;
  cursor: pointer;
}

.card_load {
  width: 5rem;
  height: 5rem;
  position: relative;
  border: solid 1px #ccc;
  float: left;
  background: v-bind(avtr);
  background-size: cover;
  border-radius: 50%;
  animation: load89234 2s infinite;
}

.right-container{
    width: 70%;
  float: left;
  position: relative;
  left: 2rem;
  right: 1rem;
}

.card_load_extreme_title {
    text-decoration: underline;
  width: 100%;
  height: 10px;
  position: relative;
  border-radius: 5px;
  background-size: 200% 100%;
  background-position: 100% 0;
  font-size: 2rem;
  color: #828282;
}

.card_load_extreme_descripion {
  width: 100%;
  height: 47px;
  position: relative;
  border-radius: 5px;
  /* background: linear-gradient(120deg, #e5e5e5 30%, #f0f0f0 38%, #f0f0f0
  40%, #e5e5e5 48%); */
  margin-top: 10px;
  background-size: 200% 100%;
  background-position: 100% 0;
  line-height: 4.5rem;
  font-size: 1.4rem;
  color: #a4a4a4;
}

</style>
