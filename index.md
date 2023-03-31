---
# https://vitepress.dev/reference/default-theme-home-page
layout: doc
nocomment: true
title: ""
---

<script setup>
import { onMounted, ref } from 'vue'

const isFromBeiyanyunyi = ref(false)
onMounted(()=>{
    const { referrer } = document
    isFromBeiyanyunyi.value = referrer.search("penclub.club") !== -1 ||  referrer.search("beiyanyunyi.github.io") !== -1
})
</script>

# {{ isFromBeiyanyunyi ? "北雁云依的伴侣 Dustella": "Dustella Here"}}

{{ isFromBeiyanyunyi ? "咕噜咕噜，这里是北雁云依的男朋友呢，看来你是从她的站点来的哦" : ""   }}

一个普通的前端开发、一个诗人、曾经是理想主义者。

是 [北雁云依](https://me.penclub.club) 的伴侣，Be one with Beiyanyunyi forever.

曾经整过不少活儿，这是我的不知道第几个博客。可以看看我写的笨拙的诗和非常少的技术文章。

我运营一些公共服务，例如资源站和 MC 服务器。可以去 [Projects](/projects) 中查看。

我 [有很多的朋友们](/links) 。我喜欢和大家交朋友。

欢迎关注我的 Github，关注 [我的 Telegram Channel](https://t.me/dailytella) 。你可以在 Telegram 上联系上我。

---

<p align="end">抑或是神明赐予我</p>

<p align="end">对生的无比憧憬　对万物消亡的怜悯  </P>

<p align="end">于黑夜之下　倾听阴影中无声的解答 </P>

<p align="end">愿背负前者之征　秉承血与泪的热忱  </P>
<p align="end">予万千繁华以新生  </P>
