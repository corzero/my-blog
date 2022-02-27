---
title: Vue 的nextTick
date: 2021-05-03
tags:
  - Vue
categories:
  - JS
---

## nextTick是什么？
>定义：在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

通俗理解： 异步执行，在下一次事件循环中尽早调用

其实这句话里有很多我们需要知道的点：

+ 什么是DOM 更新循环？
+ 下次更新循环是什么时候？
+ 在什么情况下要用到？
### 什么是DOM 更新循环？

首先需要知道在浏览器中**更新dom是一个非常昂贵的操作**，为什么，因为更新dom，需要重新计算样式，布局，更新图层，然后绘制。所以每次我们更新数据就更新一次dom，代价太大了。而Vue 在**更新 DOM 时是异步执行**的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部对异步队列尝试使用原生的 Promise.then、MutationObserver 和 setImmediate，如果执行环境不支持，则会采用 setTimeout(fn, 0) 代替。

也就是说当你修改 组件内的数据时 `this.xxxTitle = new title` 时，该组件不会立即重新渲染。当刷新队列时，组件会在下一个事件循环“tick”中更新。多数情况其实不需要关心这个过程，但是如果想拿到最新的dom干点什么，比如滚动条定位这种需求。可以在数据变化之后立即使用 Vue.nextTick(callback)。这样回调函数将在 DOM 更新完成后被调用。

### 下次更新

```js
// step1 改变数据是同步的，特别注意更改数据后会通知多个watcher，vue是额外开了一个队列去缓存这些任务
vm.message = 'changed'
//想要立即使用更新后的DOM。这样不行，因为设置message后DOM还没有更新
console.log(vm.$el.textContent) // 并不会得到'changed'

// step2 dom 更新

// 这样可以，nextTick里面的代码会在DOM更新后执行
Vue.nextTick(function(){
    // step3 
    console.log(vm.$el.textContent) //可以得到'changed'
})
```

第一个 tick（step1）：
首先修改数据，这是同步任务。同一事件循环的所有的同步任务都在主线程上执行，形成一个执行栈，此时还未涉及 DOM 。
Vue 开启一个异步队列，并缓冲在此事件循环中发生的所有数据改变。如果同一个 watcher 被多次触发，只会被推入到队列中一次。

第二个 tick（step2 下次循环）：

同步任务执行完毕，开始执行异步 watcher 队列的任务，然后更新 DOM 。Vue 在内部尝试对异步队列使用原生的 Promise.then 和 MessageChannel 方法，如果执行环境不支持，会采用 setTimeout(fn, 0) 代替。

第三个 tick（step3）：

回调函数执行，此时可以拿到新的Dom

下次 DOM 更新循环结束之后
此时通过 Vue.nextTick 获取到改变后的 DOM 。通过 setTimeout(fn, 0) 也可以同样获取到。

### 为什么要延迟执行？

我们都知道 JS 是单线程的，一次只能干一件事，即同步，就是说所有的任务都需要排队，后面的任务需要等前面的任务执行完才能执行，如果前面的任务耗时过长，后面的任务就需要一直等，这是非常影响用户体验的，所以才出现了异步的概念。
+ 同步任务：指排队在主线程上依次执行的任务
+ 异步任务：不进入主线程，而进入任务队列的任务，又分为宏任务和微任务
+ 宏任务： 渲染事件、请求、script、setTimeout、setInterval、Node中的setImmediate 等
+ 微任务： Promise.then、MutationObserver(监听DOM)、Node 中的 Process.nextTick等
当执行栈中的同步任务执行完后，就会去任务队列中拿一个宏任务放到执行栈中执行，执行完该宏任务中的所有微任务，再到任务队列中拿宏任务，即一个宏任务、所有微任务、渲染、一个宏任务、所有微任务、渲染...(不是所有微任务之后都会执行渲染)，如此形成循环，即事件循环(EventLoop)，这里不额外讲 事件循环，可以在本站搜索事件循环文章查看。

nextTick 就是创建一个异步任务，那么它自然要等到同步任务执行完成后才执行
## nextTick 降级策略

队列控制的最佳选择是microtask，而microtask的最佳选择是Promise.但如果当前环境不支持Promise，vue就不得不降级为macrotask来做队列控制了。macrotask有哪些可选的方案呢？前面提到了setTimeout是一种，但它不是理想的方案。因为
setTimeout执行的最小时间间隔是约4ms的样子，略微有点延迟。在vue2.5的源码中，macrotask降级的方案依次是：setImmediate、MessageChannel、setTimeout. setImmediate是最理想的方案了，可惜的是只有IE和nodejs支持。MessageChannel的onmessage回调也是microtask，但也是个新API，面临兼容性的尴尬。所以最后的兜底方案就是setTimeout了，尽管它有执行延迟，可能造成多次渲染，算是没有办法的办法了。
