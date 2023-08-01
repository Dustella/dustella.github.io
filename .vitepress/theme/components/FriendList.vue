<script setup lang="ts">
import type { DefaultTheme } from 'vitepress/theme'
import {
  VPTeamPage,
  VPTeamPageTitle,
} from 'vitepress/theme'
import { computed, ref, triggerRef } from 'vue'
import VPTeamMembersItem from 'vitepress/dist/client/theme-default/components/VPTeamMembersItem.vue'

import friends, { webIcon } from '../../../friends'

const beiyan = ref<DefaultTheme.TeamMember>(
  {
    name: '北雁云依',
    links: [
      {
        icon: 'github',
        link: 'https://github.com/beiyanyunyi',
      }, {
        icon: webIcon,
        link: 'https://me.penclub.club/',
      }, {
        icon: 'twitter',
        link: 'https://twitter.com/Beiyan_Yunyi',
      }],
    avatar: 'https://img-cdn.dustella.net/byyy-avtr.png',
    desc: '嘿嘿，这是我家某位',
  },
)

const renderer = computed(() => [beiyan.value, ...friends.sort(() => Math.random() - 0.5)])

const classes = computed(() => [
  'small',
  `count-${renderer.value.length}`,
])

const doShuffle = () => {
  triggerRef(beiyan)
}
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
    <div class="flex items-center justify-center">
      <button class="text-sm underline text-center py-10 text-gray-500 tracking-[0.05rem]" @click="doShuffle">
        洗牌
      </button>
    </div>
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
    </ClientOnly>
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
