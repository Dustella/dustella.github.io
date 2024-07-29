<script lang="ts" setup>
import { useData } from 'vitepress'
import VPFeatures from 'vitepress/dist/client/theme-default/components/VPFeatures.vue'
import type { DefaultTheme } from 'vitepress/theme'

export interface Feature {
  icon?: DefaultTheme.FeatureIcon
  title: string
  details: string
  link?: string
  linkText?: string
  rel?: string
  target?: string
}

const { frontmatter } = useData()
const works = frontmatter.value.works as Record<string, Feature[]>
</script>

<template>
  <main class="xl:max-w-[980px] max-w-7/8 mx-auto">
    <section v-for="([title, work]) in Object.entries(works)" :key="title">
      <h1 class="text-[1.2rem] text-gray-500 mt-10">
        {{ title }}
      </h1>
      <VPFeatures :features="work" class="my-6" />
    </section>
  </main>
</template>

<style scoped>
:deep(.VPFeatures ){
    padding: 0;
}
</style>
