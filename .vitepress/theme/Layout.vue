<script setup lang="ts">
import Layout from 'vitepress/dist/client/theme-default/Layout.vue'
import { useData } from 'vitepress'
import Comments from './components/Comments.vue'
import NewNotFound from './components/NewNotFound.vue'
import BackLast from './components/BackLast.vue'
</script>

<template>
  <Layout>
    <template #not-found>
      <NewNotFound />
    </template>
    <template #doc-after>
      <Comments />
    </template>
    <template #doc-before>
      <BackLast />
    </template>
  </Layout>
</template>
