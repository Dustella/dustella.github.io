---
layout: page
title: 朋友们
noBack: true
nocomment: true
---

<script setup>
import { friends } from './data'
</script>


<FriendList :friends='friends' />
