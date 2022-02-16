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

这就话怎么理解？首先需要知道在浏览器中**更新dom是一个非常昂贵的操作**，为什么，因为更新dom，需要重新计算样式，布局，更新图层，然后绘制。所以每次我们更新数据就更新一次dom，代价太大了。而Vue 在**更新 DOM 时是异步执行**的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部对异步队列尝试使用原生的 Promise.then、MutationObserver 和 setImmediate，如果执行环境不支持，则会采用 setTimeout(fn, 0) 代替。

也就是说当你修改 组件内的数据时 `this.xxxTitle = new title` 时，该组件不会立即重新渲染。当刷新队列时，组件会在下一个事件循环“tick”中更新。多数情况其实不需要关心这个过程，但是如果想拿到最新的dom干点什么，比如滚动条定位这种需求。可以在数据变化之后立即使用 Vue.nextTick(callback)。这样回调函数将在 DOM 更新完成后被调用。

## nextTick 降级策略

上面我们讲到了，队列控制的最佳选择是microtask，而microtask的最佳选择是Promise.但如果当前环境不支持Promise，vue就不得不降级为macrotask来做队列控制了。macrotask有哪些可选的方案呢？前面提到了setTimeout是一种，但它不是理想的方案。因为
setTimeout执行的最小时间间隔是约4ms的样子，略微有点延迟。在vue2.5的源码中，macrotask降级的方案依次是：setImmediate、MessageChannel、setTimeout. setImmediate是最理想的方案了，可惜的是只有IE和nodejs支持。MessageChannel的onmessage回调也是microtask，但也是个新API，面临兼容性的尴尬。所以最后的兜底方案就是setTimeout了，尽管它有执行延迟，可能造成多次渲染，算是没有办法的办法了。
