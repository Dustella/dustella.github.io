<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
// @ts-expect-error load data from .data files
import { data as organizedFullPosts } from '../utils/getBlogList.data'
import ListProvider from './ListProvider.vue'

// organized Posts is a list,
// do pagination, page size is 6

const pageSize = 6

const currentPage = ref(parseInt(location.search.match(/page=(\d+)/)?.[1] ?? '1'))
const totalPages = ref(Math.ceil(organizedFullPosts.length / pageSize))

const activeList = ref(true)
const slot1 = ref(parseInt(location.search.match(/page=(\d+)/)?.[1] ?? '1'))
const slot2 = ref(parseInt(location.search.match(/page=(\d+)/)?.[1] ?? '1'))

const renderPage = (index: number) => {
  const start = (index - 1) * pageSize
  const end = start + pageSize
  return organizedFullPosts.slice(start, end)
}

const direction = ref(false)
const animateName = computed(() => direction.value ? 'toleft' : 'toright')

watch(currentPage, (oldValue, newValue) => {
  activeList.value = !activeList.value

  if (activeList.value)
    slot1.value = currentPage.value
  else
    slot2.value = currentPage.value

  direction.value = oldValue < newValue

  if (currentPage.value === 1) {
    history.replaceState(null, '', location.pathname)
  }
  else {
    history.replaceState(
      null,
      '',
      `${location.pathname}?page=${currentPage.value}`,
    )
  }
})
</script>

<template>
  <div class="flex sm:flex-row flex-col">
    <Transition :name="animateName" mode="out-in">
      <ListProvider v-if="activeList" :list-to-render="renderPage(slot1)" />
      <ListProvider v-else :list-to-render="renderPage(slot2)" />
    </Transition>
    <!-- do pagination -->
  </div>
  <div class="flex flex-row justify-center items-center">
    <button
      class="border-2 border-black p-2 m-2"
      :disabled="currentPage === 1"
      :class="currentPage === 1 ? 'opacity-50' : ''"
      @click="currentPage--"
    >
      上一页
    </button>
    <span class="text-base">{{ currentPage }} / {{ totalPages }}</span>
    <button
      class="border-2 border-black p-2 m-2"
      :disabled="currentPage === totalPages"
      :class="currentPage === totalPages ? 'opacity-50' : ''"
      @click="currentPage++"
    >
      下一页
    </button>
  </div>
</template>

<style scoped>
.toleft-enter-active,
.toleft-leave-active {
  transition: all 0.5s ease;
}
.toleft-enter-from{
  opacity: 0;
  transform: translateX(-30px);
}
.toleft-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.toright-enter-active,
.toright-leave-active {
  transition: all 0.5s ease;
}
.toright-enter-from{
  opacity: 0;
  transform: translateX(30px);
}
.toright-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
