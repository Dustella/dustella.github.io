---
title: 项目
layout: page
---

<script lang="ts" setup>
import VPFeatures from 'vitepress/dist/client/theme-default/components/VPFeatures.vue'
import works from './works'
</script>

<main class="xl:max-w-[980px] max-w-7/8 mx-auto">
    <section v-for="([title, work]) in Object.entries(works)" :key="title">
        <h1 class="text-[1.2rem] text-gray-500 mt-10">
        {{ title }}
        </h1>
        <VPFeatures :features="work" class="my-6" />
    </section>
</main>

<style scoped>
:deep(.VPFeatures ){
    padding: 0;
}
</style>
