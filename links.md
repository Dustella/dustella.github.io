---
layout: page
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'
import friends from './friends'
const members = [
    {
    name: '北雁云依',
    links: [{
      icon: 'github',
      link: 'https://beiyanyunyi.github.io/',
    }],
    avatar: 'https://img-cdn.dustella.net/byyy-avtr.png',
    desc: '嘿嘿，这是我家某位',
  },
  ...friends.sort(()=>Math.random()-0.5)
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      Team
    </template>
    <template #lead>
      咕噜咕噜
    </template>
  </VPTeamPageTitle>
  <ClientOnly>
    <VPTeamMembers
      :members="members"
    />
  </ClientOnly>
</VPTeamPage>
