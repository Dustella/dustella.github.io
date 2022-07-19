---
title: 主页
---

<script setup>
const isFromMyWife = document.referrer == "https://stblog.penclub.club/" 
if (isFromMyWife) {
    console.log("我和lixiang永远属于彼此")
}
</script>

<h3 align="center"> 嘿，这里是 lixiang 的老公 Dustella </h3>

<h4 align="center">
我会在花室凿一扇天窗，为你接住霓虹与星光。
</h4>

<h4 align="center" v-if="isFromMyWife">
是 <a href="https://lixiang810.github.io" target="_blank">lixiang810</a> 的伴侣
</h4>