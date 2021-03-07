---
title: BFC、IFC概念
date: 2019-09-15
tags:
  - 布局
categories:
  - Css
---

## BFC、IFC概念及布局规则

### BFC 
>BFC(Block formatting context)直译为"块级格式化上下文"。它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。浮动元素和绝对定位元素，非块级盒子的块级容器（例如 inline-blocks, table-cells, 和 table-captions），以及overflow值不为“visiable”的块级盒子，都会为他们的内容创建新的BFC（块级格式上下文）。

先了解一下那么首先需要了解Box、Formatting Context的概念。

**Box**：是 CSS 布局的对象和基本单位， 直观点来说，就是一个页面是由很多个 Box 组成的。元素的类型和 display 属性，决定了这个 Box 的类型。 不同类型的 Box， 会参与不同的 Formatting Context（一个决定如何渲染文档的容器），因此Box内的元素会以不同的方式渲染。让我们看看有哪些盒子：
+ **block-level box**: `display:block|list-item|table` 的元素，会生成 `block-level box`。并且参与 `block fomatting context`
+ **inline-level box**：`display:inline|inline-block|inline-table` 的元素，会生成 `inline-level box`，并且参与 `inline formatting context`
+ **run-in box**:（内容可能会有点绕，仔细理解一下就行） 
    + 如果 `run-in box` 包含 `block box`，那么这个 `run-in box` 也成为 `block box`。
    + 如果紧跟在 `run-in box` 之后的兄弟节点是 `block box`，那么这个 `run-in box` 就会做为此 `block box` 里的 `inline box`，`run-in box` 不能进入已经一个已经以 `run-in box` 开头的块内，也不能进入本身就是 `display:run-in` 的块内。
    + 否则，`run-in box` 成为 `block box`

**Formatting Context**：`Formatting context` 是 W3C CSS2.1 规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。最常见的 Formatting context 有 Block fomatting context (简称BFC)和 Inline formatting context (简称IFC)。

#### BFC的作用
+ 利用BFC避免margin重叠
+ 自适应两栏布局
+ BFC的区域不会与float box重叠
+ 清除环绕

<font color="red">核心：BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素</font>

#### 如何创建BFC
+ float的值不是none。
+ position的值不是static或者relative。
+ display的值是inline-block、table-cell、flex、table-caption或者inline-flex
+ overflow的值不是visible


### 什么是IFC

>Inline Formatting Context 内敛格式化上下文。IFC的line box（线框高度由其包含行内元素中最高的实际高度计算而来（不受到竖直方向的padding/margin影响）

IFC的inline box一般左右都贴紧整个IFC，但是因为float元素二扰乱。float元素会位于IFC与line box之间，使得line box宽度缩短。同个IFC下的多个line box高度会不同。IFC中不可能有块级元素，当插入块级元素时（如p中插入div）会产生两个匿名块与div分隔开，即产生两个IFC，每个IFC对外表现为块级元素，与div垂直排列。

### IFC的作用
+ 水平居中：当一个块要在环境中水平居中时候，设置其为inline-block则会在外层产生IFC，通过text-align:center则可以使其水平居中。
+ 垂直居中：创建一个IFC，用其中一个元素撑开父元素的高度，然后设置其vertical-align:middle,其他行内元素则可以在此父元素下垂直居中。
