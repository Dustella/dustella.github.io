---
title: 丝滑度升级：ES6 之后的特性
layout: ../../layouts/BlogPost.astro
---

# 丝滑度升级：ES6 之后的特性

我们都知道不同浏览器使用的布局引擎和 js 引擎有所差异，但是大家都相对遵循同一个标准。现在 CSS 比较公用版本是 CSS3，但是 JS 方面有非常多的标准。习惯上我们喜欢吧 ES2015+之后的标准，统称为 ES6 或者 ES6+。

这些标准可以比较好的运行在 2017 年之后的现代浏览器（如新版的 Firefox、Chrome 和新的 Edge）上，因此我们不再考虑对 IE 等老浏览器的支持

## 更好的 for 遍历

我们都知道 js 的设计非常神奇。对于一个数组

```js
obj = [2, 3, 4]
```

我们使用 for 遍历其中的对象

```js
for (const i in obj) console.log(i) // 1,2,3
```

我们都知道这样会输出 1,2,3，也就是数组前面的下标。

在 ES6 中，我们可以使用 of 进行内容的遍历：

```js
for (const i of obj) console.log(i) // 2,3,4
```

这样，of 取到的是数组内的内容而不是下标

这个其实是非常有用的，尤其当我们的数组内容相对复杂的时候

## let, const！别用 var 了！

在 js 中，我们最强调的其实是 var 去声明一个变量。但是这么做经常导致一些不可预料的事情发生：

```jsx
for (var i in 4) {
  //do something with i
}

console.log(i);
```

我们在 for 中，为了遍历内容设置了一个临时变量 i，但是这个 i 在循环之后不会被自动销毁。

再循环体之后，我们依然可以操作这个 i。

我们有可能在循环体之后再使用名称为 i 的变量，因此经常会导致问题。

ES6 引入了 let 标识符，let 标识符定义的变量只具有块级作用域，在执行完块之后，let 定义的变量会自动销毁。

```html
for (let i in 4) { //do something with i } console.log(i);
```

在循环体外面，i 会被自动销毁，因此输出 i 会报错

当然这也不是我们一直做的。如果一个变量在声明之后没有被重新绑定过，我们非常建议直接使用 const

```jsx
for (const i in 4) {
  //do something with i
}

console.log(i);
```

学过 C++和其他一些高级语言的人应当会对 js 的 const 感到困惑。实际上，js 的 const 不那么严格的需要列表是一个常量，例如

>

这是完全可以的

只要没有发生重新赋值，对列表和对象的那些看上去修改了它的操作，其实是无所谓的

如果重新给 ls 赋值那么当然还是会报错的

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8940821c-013d-4947-9967-604fa67f32cf/Untitled.png)

## 模板字符串

在许多许多高级语言里面都有模板字符串这玩意儿。我们有大量的情况需要做字符串的拼接，传统做法有两种，一种是使用大量的加号或者是流运算符（C++）,还有一种就是使用 StringBuilder 去 append（Java）

但是显然这些方法不是那么的优雅。我们想到了一些办法使得字符串的拼接更加直观，而不是大量的 xxx.append()以及大量大量的引号和加号

不妨先欣赏一下别的高级语言的模板字符串是怎么玩的

python:

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/de764667-5a74-4fff-b1c3-9171270b734c/Untitled.png)

kotlin：

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d7542b0f-4a2e-476f-9a3b-9e3f47dc3836/Untitled.png)

dart：

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e8b3d4a9-5ef8-490f-94b0-017c9899aba3/Untitled.png)

那么，我们的 JS 是这么玩的

```jsx
message_2 = `I am ${name}, and I am ${role}, I am ${age} years old.`;
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5d5d8d3f-bb97-421e-bc81-d1a7369247d5/Untitled.png)

使用 Tab 上面那个键代替原来的引号，然后使用 ${变量名} 来直接插入。插入的东西也可以是字符串可以是数字，不用手动转换。

除了少打字，也大大提高了代码可读性。

## 解构赋值

解构，都给我解构

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/690d7bb6-bf8c-4d23-a4f9-8255e61a6018/Untitled.png)

（

考虑到我们需要把一个对象或者一个列表里面的某些东西拿出来，我们平常的做法都类似于

```jsx
const info = ["Dustella", "student", 24];

const name = info[0];
const job = info[1];
const age = info[2];

console.log(`${name} is a ${job} and is ${age} years old.`);
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bd002df2-6671-4c1a-a5d3-bd286ce2fad6/Untitled.png)

其实每次这样是有点多余，解构的写法是

```jsx
const info = ["Dustella", "student", 24];

const [name, job, age] = info;

console.log(`${name} is a ${job} and is ${age} years old.`);
```

第三行可能看不懂，仔细想想其实是

```jsx
const [name, job, age] = ["Dustella", "student", 24];
```

这样就非常好理解了

结构是可以嵌套的，例如

```jsx
const [id, [name, job, age]] = [810, ["Dustella", "student", 24]];

const info = `${id} ${name} is a ${job} and is ${age} years old.`;
```

更加复杂的结构也是完全可以被解构的，例如

```jsx
const [id, [name, [job, age]]] = [810, ["Dustella", ["student", 24]]];

const info = `${id} ${name} is a ${job} and is ${age} years old.`;
```

实际使用的时候效果类似于

```jsx
const rawInfo = [810, ["Dustella", ["student", 24]]];

const [id, [name, [job, age]]] = rawInfo;
```

那么不仅对于列表我们可以做解构，对象也是可以的

```jsx
const userInfo = {
  id: 11,
  name: "Dust",
  age: 21,
  address: "Bangalore",
};

const { id, name, age, address } = userInfo;

const info = `${id} ${name} is a ${address} and is ${age} years old.`;

console.log(info);
```

需要注意，解构之后的变量名需要和对象里面的属性是一致的。如果不一致，那么那个对象会被给到 undefined

```jsx
const userInfo = {
  id: 11,
  name: "Dust",
  age: 21,
  address: "Bangalore",
};

const { id, name, agelala, address } = userInfo;

const info = `${id} ${name} is a ${address} and is ${agelala} years old.`;
```

如果我们要自定义解构的变量名，我们应该这么写

```jsx
const { id, name: namelalala, age: agelala, address } = userInfo;

const info = `${id} ${namelalala} is a ${address} and is ${agelala} years old.`;
```

当然可以混着写

对象的解构同样适用于复杂的对象，例如

```jsx
const userInfo = {
  id: 11,
  name: "Dust",
  age: 21,
  address: {
    street: "Main St",
    city: "New York",
    state: "NY",
  },
};

const {
  id,
  name: namelalala,
  age: agelala,
  address: { street, city },
} = userInfo;

const info = `${namelalala} lives in ${city} ${street} and has an id of ${id}`;
// Dust lives in New York Main St and has an id of 11
```

最后，解构可以指定变量的默认值

```jsx
const userInfo = {
  id: 11,
  name: "Dust",
};

const { id, name: namelalala, age: agelala = 114 } = userInfo;

const info = `${namelalala} is ${agelala} years old`;
// Dust is 114 years old
```

## 拉风的箭头函数

这个特性其实叫做 lambda，匿名函数。许多语言也都有这个特性，在 JS 当中，非常多的情况是适用于回调函数。

我们一定知道下面这两种操作在做什么事情

```jsx
let time = 0;
setInterval(function () {
  time++;
  console.log(`${time}s has passed`);
}, 1000);

//第二种写法
let time = 0;
setInterval(timing, 1000);

function timing() {
  time++;
  console.log(`${time}s has passed`);
}
```

这是一个简单的计时器，setInterval 传入的第一个参数是一个函数

我们觉得，写一个 function 不太好看，于是我们大量可以看到这种箭头函数

```jsx
let time = 0;
setInterval(() => {
  time++;
  console.log(`${time}s has passed`);
}, 1000);
```

说实话这样好看多了

lambda 在这种可以用于给函数传参。如果这个回调函数有返回值而且返回比较简单，书写可以进一步简化。如

```jsx
const score = [1000, 66, 90];
// 如果列表里全部没有挂科
const isAllPassed = score.every((s) => s >= 60);
```

这等效于

```jsx
const isAllPassed = score.every((s) => {
  return s >= 60;
});
```

箭头函数也可以直接用声明函数，这样声明和实现函数实在是非常非常拉风

```jsx
const hello = () => {
  console.log("Hello World");
};
```

这样等于

```jsx
function hello() {
  console.log("Hello World");
}
```

实际上，箭头函数和普通函数是有一定区别的。但是实际上使用的时候，我不认为大家经常需要用到 this（这种场景也有 class）的话不会遇到这两种函数的区别

这篇文章说明了两种函数的区别

[2022 年了你还不了解箭头函数与普通函数的区别吗？ - 掘金 (juejin.cn)](https://juejin.cn/post/7069943937577779214)
