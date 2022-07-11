<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useData } from 'vitepress'
const { theme } = useData()
const { repo, issueTerm = 'pathname' } = theme.value.comment
const themes = document.body.classList.contains('dark') ? 'github-dark' : 'github-light'
const utterancesRef = ref()
onMounted(() => {
  if (repo) {
    const utterances = document.createElement('script')
    utterances.async = true
    utterances.setAttribute('src', 'https://utteranc.es/client.js')
    utterances.setAttribute('repo', repo)
    utterances.setAttribute('issue-term', issueTerm)
    utterances.setAttribute('theme', themes)
    utterances.setAttribute('crossorigin', 'anonymous')
    utterancesRef.value.appendChild(utterances)
  }
})
</script>

<template>
  <div ref="utterancesRef" />
</template>

<style>
/*global  style*/
.utterances {
    max-width: inherit !important;
}
</style>
