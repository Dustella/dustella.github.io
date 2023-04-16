<script lang="ts" setup>
import { useData, useRouter } from 'vitepress'
import VPIconAlignLeft from 'vitepress/dist/client/theme-default/components/icons/VPIconAlignLeft.vue'
import VPLocalNavOutlineDropdown from 'vitepress/dist/client/theme-default/components/VPLocalNavOutlineDropdown.vue'

defineProps<{
  open: boolean
}>()

const { theme } = useData()
const router = useRouter()
</script>

<template>
  <div class="VPLocalNav">
    <button
      class="menu"
      :aria-expanded="open"
      aria-controls="VPSidebarNav"
      @click="router.go('/blogs')"
    >
      <VPIconAlignLeft class="menu-icon" />
      <span class="menu-text">
        {{ theme.sidebarMenuLabel || 'Menu' }}
      </span>
    </button>

    <VPLocalNavOutlineDropdown />
  </div>
</template>

<style scoped>
.VPLocalNav {
  position: sticky;
  top: 10rem;
  /*rtl:ignore*/
  left: 0;
  z-index: var(--vp-z-index-local-nav);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--vp-c-gutter);
  padding-top: var(--vp-layout-top-height, 0px);
  width: 100%;
  background-color: var(--vp-local-nav-bg-color);
  transition: border-color 0.5s, background-color 0.5s;
}

@media (min-width: 960px) {
  .VPLocalNav {
    display: none;
  }
}

.menu {
  display: flex;
  align-items: center;
  padding: 12px 24px 11px;
  line-height: 24px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: color 0.5s;
}

.menu:hover {
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}

@media (min-width: 768px) {
  .menu {
    padding: 0 32px;
  }
}

.menu-icon {
  margin-right: 8px;
  width: 16px;
  height: 16px;
  fill: currentColor;
}

.VPOutlineDropdown {
  padding: 12px 24px 11px;
}

@media (min-width: 768px) {
  .VPOutlineDropdown {
    padding: 12px 32px 11px;
  }
}
</style>
