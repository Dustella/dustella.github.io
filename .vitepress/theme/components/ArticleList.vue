<script lang="ts" setup>
import { reactive, watch } from 'vue'
// @ts-expect-error load data from .data files
import { data as rawFullPosts } from '../../utils/posts.data'
import ListProvider from './ListProvider.vue'

// organized Posts is a list,
// do pagination, page size is 6

const props = withDefaults(defineProps<{
  folder?: string
}>(),
  { folder: "" })

const organizedFullPosts =
  (rawFullPosts as { folder: string, url: string, date: string, title: string }[])
    .filter((post) => post.folder == props.folder || props.folder == "")

const pageSize = 6
const indexFromQuery = parseInt(location.search.match(/page=(\d+)/)?.[1] ?? '1')

const pageIndex = reactive({
  total: Math.ceil(organizedFullPosts.length / pageSize),
  current: indexFromQuery,
})

const slots = reactive({
  slot1: indexFromQuery,
  slot2: indexFromQuery,
  slot1Active: true,
  direction: 'toright',
})

const renderPage = (index: number) => {
  const start = (index - 1) * pageSize
  const end = start + pageSize
  return organizedFullPosts.slice(start, end)
}

watch(() => pageIndex.current, (oldValue, newValue) => {
  slots.slot1Active = !slots.slot1Active

  if (slots.slot1Active)
    slots.slot1 = pageIndex.current
  else
    slots.slot2 = pageIndex.current

  slots.direction = oldValue < newValue ? 'toleft' : 'toright'

  const newQuery = pageIndex.current === 1 ? '' : `?page=${pageIndex.current}`

  history.replaceState(null, '', `${location.pathname}${newQuery}`)

  window.scrollTo({ top: 0 })
})
</script>

<template>
  <div class="flex sm:flex-row flex-col px-0">
    <Transition :name="slots.direction" mode="out-in">
      <ListProvider v-if="slots.slot1Active" :list="renderPage(slots.slot1)" />
      <ListProvider v-else :list="renderPage(slots.slot2)" />
    </Transition>
    <!-- do pagination -->
  </div>
  <div class="flex flex-row justify-begin items-center transition-all duration-500">
    <button class="border-2 border-black p-2 m-2" :disabled="pageIndex.current === 1"
      :class="pageIndex.current === 1 ? 'opacity-50' : ''" @click="pageIndex.current--">
      上一页
    </button>
    <span class="text-base">{{ pageIndex.current }} / {{ pageIndex.total }}</span>
    <button class="border-2 border-black p-2 m-2" :disabled="pageIndex.current === pageIndex.total"
      :class="pageIndex.current === pageIndex.total ? 'opacity-50' : ''" @click="pageIndex.current++">
      下一页
    </button>
  </div>
</template>

<style scoped>
.toleft-enter-active,
.toleft-leave-active {
  transition: all 0.5s ease;
}

.toleft-enter-from {
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

.toright-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.toright-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
