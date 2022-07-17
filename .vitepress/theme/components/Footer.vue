<script setup lang='ts'>
import { useRoute } from 'vitepress'
import { computed, ref } from 'vue'

const pathObj = computed(() => {
  const route = useRoute()
  const path = `${route.path.split('/').slice(0, -1).join('/')}` || '/'

  return { route, path }
})
</script>

<template>
  <!-- eslint-disable-next-line vue/valid-v-on -->
  <p>
    <a v-if="pathObj.route.path !== '/'" :href="pathObj.path">回到上一级</a>
  </p>
  <p v-if="pathObj.route.path !== '/'">
    Under CC BY-NC-ND 4.0
  </p>
  <p>
    <a class="icp">苏ICP备20013766号-2</a>
  </p>
</template>

<style scoped>
p {
  margin-top: 3rem;
  display: block;
  font-size: 1.3rem;
  text-align: center;
}

p a {
  color: #999;
  word-spacing: 0.1rem;
  letter-spacing: 0.1rem;
}
.icp {
  color: rgb(220, 220, 220);
}
</style>
