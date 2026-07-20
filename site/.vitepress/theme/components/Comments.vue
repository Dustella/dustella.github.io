<script lang="ts" setup>
import { useData } from 'vitepress'
import { computed, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'
import type { Component } from 'vue'

const { frontmatter, isDark } = useData()

interface IdleCallbackWindow extends Window {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number
}

const shouldShowComments = computed(() => !frontmatter.value.noComment)
const commentContainer = ref<HTMLElement>()
const Giscus = shallowRef<Component>()

let observer: IntersectionObserver | undefined
let hasScheduledLoad = false

function loadGiscus() {
  if (hasScheduledLoad) {
    return
  }

  hasScheduledLoad = true

  const load = async () => {
    try {
      const { default: component } = await import('@giscus/vue')
      Giscus.value = component
    }
    catch {
      // Comments are optional: a failed third-party request must not affect the page.
    }
  }

  const windowWithIdleCallback = window as IdleCallbackWindow
  if (windowWithIdleCallback.requestIdleCallback) {
    windowWithIdleCallback.requestIdleCallback(() => { void load() }, { timeout: 1500 })
  }
  else {
    window.setTimeout(() => { void load() }, 0)
  }
}

onMounted(() => {
  if (!shouldShowComments.value || !commentContainer.value) {
    return
  }

  if (!('IntersectionObserver' in window)) {
    loadGiscus()
    return
  }

  observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) {
      return
    }

    observer?.disconnect()
    loadGiscus()
  }, { rootMargin: '480px 0px' })

  observer.observe(commentContainer.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <section
    v-if="shouldShowComments"
    ref="commentContainer"
    class="comments-container"
    aria-label="评论"
  >
    <ClientOnly>
      <component
        :is="Giscus"
        v-if="Giscus"
        id="comments"
        repo="dustella/dustella.github.io"
        repo-id="R_kgDOHpBvMg"
        category="General"
        category-id="DIC_kwDOHpBvMs4CVYlQ"
        mapping="pathname"
        term="在这里评论"
        reactions-enabled="1"
        emit-metadata="0"
        input-position="top"
        host="https://giscus.app"
        :theme="isDark ? 'dark' : 'light'"
        lang="en"
        loading="lazy"
      />
    </ClientOnly>
  </section>
</template>
