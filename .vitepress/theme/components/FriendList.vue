<script setup lang="ts">
import {
  VPTeamPage,
  VPTeamPageTitle,
} from 'vitepress/theme'
import type { DefaultTheme } from 'vitepress/theme'
import { computed, unref } from 'vue'
import VPTeamMembersItem from 'vitepress/dist/client/theme-default/components/VPTeamMembersItem.vue'

const props = defineProps<{ friends: DefaultTheme.TeamMember[] }>()
const friends = unref(props.friends)

const renderer = computed(() => friends.slice(0).sort(() => Math.random() - 0.5))

const classes = computed(() => [
  'small',
  `count-${renderer.value.length}`,
])
</script>

<template>
  <VPTeamPage>
    <VPTeamPageTitle>
      <template #title>
        朋友们
      </template>
      <template #lead>
        欢迎扩列
      </template>
    </VPTeamPageTitle>
    <ClientOnly>
      <div class="VPTeamMembers" :class="classes">
        <div class="container">
          <TransitionGroup name="list">
            <div v-for="i in renderer" :key="i.name" class="item">
              <VPTeamMembersItem size="small" :member="i" />
            </div>
          </TransitionGroup>
        </div>
      </div>
    </ClientOnly>Z
  </VPTeamPage>
</template>

<style scoped>
.list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.VPTeamMembers.small .container {
  grid-template-columns: repeat(auto-fit, minmax(224px, 1fr));
}

.VPTeamMembers.small.count-1 .container { max-width: 276px; }
.VPTeamMembers.small.count-2 .container { max-width: calc(276px * 2 + 24px); }
.VPTeamMembers.small.count-3 .container { max-width: calc(276px * 3 + 24px * 2); }

.VPTeamMembers.medium .container {
  grid-template-columns: repeat(auto-fit, minmax(256px, 1fr));
}

@media (min-width: 375px) {
  .VPTeamMembers.medium .container {
    grid-template-columns: repeat(auto-fit, minmax(288px, 1fr));
  }
}

.VPTeamMembers.medium.count-1 .container { max-width: 368px; }
.VPTeamMembers.medium.count-2 .container { max-width: calc(368px * 2 + 24px); }

.container {
  display: grid;
  gap: 24px;
  margin: 0 auto;
  max-width: 1152px;
}
</style>
