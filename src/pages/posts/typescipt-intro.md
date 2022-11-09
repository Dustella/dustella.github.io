---
layout: ../../layouts/BlogPost.astro
title: 10分钟光速入门TypeScipt
---

# 10分钟光速入门TypeScipt

花十分钟时间，跟着特菈这篇教程做一遍，你也可以掌握基础的 TS 使用

本文假定你具有一定的 JS 基础

## 0. 重要的废话：为什么我们需要 TypeScript

一项流行的技术，能火起来，那一定是解决了工程上的重要问题。否则，许多技术会消失在历史长河中，而不是被大量工程使用。

TypeScript 出现，是为了解决 JavaScript 的两个重要问题：一个是**类型声明**、ES6+特性

ES6+的特性我在另外的文章介绍过了。ES6 之后的特性虽然顺滑，但是不被老的浏览器支持。因此，我们出现了 babel 这样的工具，把新标准的代码转换为老标准的代码。而我们的 TS，原生支持所有 ES6 特性，TS 编译成 JS 的过程中也把新标准的代码转换成为了老标准的代码（可以设置目标标准），等于做了一遍 babel 的事情。因此，我们不需要过度关心浏览器兼容问题。

那么，本文着重介绍一下 TS 的类型系统来帮助朋友们入门 TypeScript。这篇文章的目的是介绍**开发中 80%的情况需要用到的 TS 中 20%的最重要的内容**。至于剩下 20%，可以等下一篇文章。

## 1. TypeScript 环境

TypeScript 最后是编译成为 JavaScript 的。至于如何手动打包从 TS 编译到 JS，大家可以看这篇文章稍作了解。

### 1.1 在线测试 TypeScript

微软做了一个 Playground 可以在线测试 ts 代码，在[这里](https://www.typescriptlang.org/play)

### 1.1 本地使用 ts-node

为了方便，我们常常使用 ts-node 来加快我们的调试。确保你的电脑上有 nodejs 环境，然后在终端中输入

```bash
npm install -g ts-node
```

然后打开 VSCode，随便打开一个文件夹，然后安装插件 Code-Runner

![20220910152210](https://img-cdn.dustella.net/markdown/20220910152210.png)

例如，文件夹中随便新建一个 xxx.ts 文件，写一个 helloworld 之后，右上角有一个运行按钮（或者使用快捷键 Ctrl+Alt+N），直接运行就能看结果了

![20220910152351](https://img-cdn.dustella.net/markdown/20220910152351.png)

接下来我们也可以在这个文件里面玩耍 TypeScript

## 2. TS 的类型系统

我们都知道，所有的静态语言都是类型严格的。在我们声明一个变量\常量的时候，我们必须声明它的类型。同样地，在静态语言中，我们声明函数的传参、返回值也必须确定它的类型。

但是在 Python、JavaScipt 这些动态语言中，我们是类型不那么严格。不仅声明变量不需要告知类型，函数传参和返回也没有严格的类型声明。加以 JavaScipt 诡异的自动类型转换，不好的设计经常导致各种奇妙而且难以发现的错误。

在大工程中，我们常常需要确保类型严格。TS 的出现确实直接规避掉了原先项目中 30%的问题，直接让这些问题在编译期就暴露出来。

### 2.1 标注变量基本类型和列表

我们直接来观看一下 TypeScript 是如何进行类型声明的：

```ts
const a = ''
const b = 0
const c: number[] = [0, 0, 1]
```

直接在各种变量后面加一个冒号+类型。最常用基本数据的类型是：`number`, `string`,`boolean`

上述声明是合法的，但是注意：平常我们不会这么写，因为没有必要。TypeScipt 支持基本类型的类型推导。上述声明可以像原来 JS 那样书写：

```jsx
const a = ' // TS知道这是个字符串
const b = 0 // TS知道这是个数字
const c = [0, 0, 1] // TS知道这是个数字组成的列表
```

只是对于空列表、空对象来说，ts 需要知道里面是什么。否则，这个列表默认会被标记为 Never[]，就是不存在的值的类型。这当然不是我们希望的，我们就需要给空列表声明类型

对于空列表，我们需要这么声明类型：

```tsx
const ls: number[] = [] // TS知道这是个空列表，而且里面应该只能填数字
ls.push(111)
```

### 2.2 标注函数

对于一个函数，我们总是需要标注其接受的参数，因为调用函数的时候 JS 也不知道传入啥东西。标注很简单，也是加冒号：

```tsx
const next = (a: number): number => {
  // 这玩意儿接受参数a，得是个数字，这个函数也返回一个数字
  return a + 4
}
```

返回类型自然也是可以标注的，但是和上面那样，TS 能比较聪明地做类型推导。例如下面的例子，可以不写返回值，TS 也知道那总是个字符串。

```tsx
const repeat = (astr: string, b: number): string => {
  // 这个函数总是返回string，那么可以不标注返回类型
  return astr.repeat(b)
}
```

如果我们不按照我们声明的类型传入参数，会发生什么呢？

在这个例子里，我们希望 `greeter` 函数接收一个字符串参数。 然后尝试把 `greeter` 的调用改成传入一个数组：

```tsx
const greeter = (person: string) => {
  // 这个函数接受一个字符串
  return `Hello, ${person}`
}

const user = [0, 1, 2]

console.log(greeter(user)) // 我就是传入一个数组
```

重新编译，你会看到产生了一个错误：

error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'.

类似地，尝试删除 `greeter` 调用的所有参数。 TypeScript 会告诉你使用了非期望个数的参数调用了这个函数。 在这两种情况中，TypeScript 提供了静态的代码分析，它可以分析代码结构和提供的类型注解。

要注意：尽管有错误，`greeter.js` 文件还是被创建了。 就算你的代码里有错误，你仍然可以使用 TypeScript。但在这种情况下，TypeScript 会警告你代码可能不会按预期执行。

### 2.3 联合类型

如果你的列表里面有多种类型（但这很不常见），你可以

```tsx
const a: (number | boolean)[] = [] // 一个列表，里面只能有数或者布尔类型
a.push(true)
a.push(114)
```

`number | boolean`是一种联合类型，意思是可能是这几种类型中的几种。这里这个列表里可能是数字或者布尔。

注意：大部分情况下你不会用到联合类型，我们也不推荐这么做。

### 2.4 对象的类型标注

JS 中的对象极为灵活，运行时很难预测一个对象里面的属性。TypeScript 自然一定要对各种对象做标注。

这其中，我们最常用用来标注一个类型的是 interface，接口

没接触别的语言的朋友会对接口感到很困惑，原来写 C++和 Java 的朋友会对 TS 的接口感到很敏感。

TS 的接口可以为了让某个类去实现这个接口的功能，更多真的只是：给对象做类型标注，或者应该理解成它很像 golang 或者 C 里面的 `struct`。因此，对于简单对象的类型标注，我们也不会用到`implements`语句。

直接上例子。

假设：我们有一类对象，这些对象都是猫，这些猫都有年龄、名字、颜色这些属性。

根据这些属性就可以做出来一个接口：

```tsx
interface Cat {
  // 这个接口叫 Cat
  name: string // Cat一定有一个名字
  age: number // Cat 一定有一个年龄
  color: string // Cat一定有一个颜色
}
```

那么，我们就可以把这个 Cat 当成一个类似于 number, string 那样的类型去给对象打标注

```tsx
const dustella: Cat = {
  // TS知道dustella是一个Cat
  name: 'Dustella',
  age: 22,
  color: 'black',
}
```

这样做是合法的，但是如果我们这个对象里面缺少了一个属性，那么编辑器就会给出错误，如果强行编译也会在运行的时候放出错误。

如果我们希望某一个属性不总是出现，可以为空，我们在 interface 中给那个属性后面加上一个问号即可

```tsx
interface Cat {
  // 这个接口叫 Cat
  name: string // Cat一定有一个名字
  age?: number // Cat 可以有一个年龄，也可以没有
  color?: string // Cat可以有一个颜色，也可以没有
}

const dustella: Cat = { name: '' } // 这是合法的
```

对于一个复杂的嵌套的对象，interface 中可以出现别的 interface，这样就可以套娃，正如你所想的

```tsx
interface Article {
  content: string
  user: User
  comments?: Comment[]
}

interface User {
  name: string
  mail?: string
  id: number
  avatar: string
}

interface Comment {
  content: string
  user: User
}
```

对于这样一个复杂的对象声明，我们的对象就可以长成这个样子

```ts
const dreams: Article = {
  content: 'I am a dream',
  user: {
    name: 'John Doe',
    id: 1,
    avatar: 'https://placekitten.com/200/300',
  },
  comments: [
    {
      content: 'I am a dream',
      user: {
        name: 'John Doe',
        id: 1,
        avatar: 'https://placekitten.com/200/300',
      },
    },
  ],
}
```

## 结语

其实 TS 最基本的使用现在已经基本介绍完毕，只需要理解类型的各种标注，你就算是迈出了玩转 TS 的第一步
