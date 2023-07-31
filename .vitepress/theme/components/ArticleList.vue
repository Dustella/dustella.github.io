<script lang="ts" setup>
import VPLink from "vitepress/dist/client/theme-default/components/VPLink.vue";
// @ts-expect-error load data from .data files
import { data as organizedFullPosts } from "../utils/getBlogList.data";
import { computed, ref, watch } from "vue";

// organized Posts is a list,
// do pagination, page size is 6

const pageSize = 6;

const currentPage = ref(1);
const totalPages = ref(Math.ceil(organizedFullPosts.length / pageSize));

const listToRender = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return organizedFullPosts.slice(start, end);
});

watch(currentPage, () => {
  if (currentPage.value === 1) {
    history.replaceState(null, "", location.pathname);
  } else {
    history.replaceState(
      null,
      "",
      `${location.pathname}?page=${currentPage.value}`
    );
  }
});
</script>

<template>
  <div class="flex sm:flex-row flex-col">
    <ul class="pl-2!">
      <li
        v-for="post in listToRender"
        :key="post.date"
        class="list-none p-0 m-0"
      >
        <div class="border-2 border-black p-4">
          <VPLink :href="post.url" class="sm:text-xl text-base">
            {{ post.title }}
          </VPLink>
          <p class="text-[0.9rem] text-gray">
            {{
              new Date(post.date).toLocaleDateString("zh-CN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            }},
            {{ post.folder }}
          </p>
        </div>
      </li>
    </ul>
    <!-- do pagination -->
  </div>
  <div class="flex flex-row justify-center items-center">
    <button
      class="border-2 border-black p-2 m-2"
      :disabled="currentPage === 1"
      @click="currentPage--"
      :class="currentPage === 1 ? 'opacity-50' : ''"
    >
      上一页
    </button>
    <span class="text-xl">{{ currentPage }} / {{ totalPages }}</span>
    <button
      class="border-2 border-black p-2 m-2"
      :disabled="currentPage === totalPages"
      @click="currentPage++"
      :class="currentPage === totalPages ? 'opacity-50' : ''"
    >
      下一页
    </button>
  </div>
</template>
