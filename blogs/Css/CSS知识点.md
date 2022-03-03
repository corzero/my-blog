---
title: CSS知识点
date: 2019-09-15
tags:
  - 面试
categories:
  - CSS
---

CSS 的基础知识是师范重要的，对应日常的开发而已，我们可能享受到来自各种预处理器和工作流插件的便利，但基础知识不能忘，以下是常见的基础知识内容。

## 1. 标准盒模型和怪异盒模型有什么不同的？

标准盒模型：宽度 = 内容的宽度（content）+ border + padding + margin
怪异盒模型：宽度 = 内容宽度（content+border+padding）+ margin

更改盒模型使用 `box-sizing:border-box | content-box`

## 2. CSS 选择器有哪些？优先级是什么？

### 选择器：

- [0]通配符选择器: \* { padding: 0 }
- [1]标签选择器：div, p { color: red }
- [10]class 选择器：.class { color: red }
- [100]id 选择器：#root { color: red }
- 相邻选择器: div + p { color: red }
- 子选择器(只会第一层的，不会匹配孙元素): ul > li { color: red }
- 后代选择器（子孙都会匹配）：ul li { color: red }
- 属性选择器:input[type="password"] { height: 30px }
- 伪类选择器: a:hover { color: red }

### 优先级:

| 描述                                               | 权重 |
| -------------------------------------------------- | ---- |
| !important(慎用)                                   | ∞    |
| 内联样式，如：style=”xxx”                          | 1000 |
| ID 选择器，如：#id                                 | 100  |
| 类、伪类和属性选择器，如.class、:hover、[attr]     | 10   |
| 标签选择器，如 div、p                              | 1    |
| 通用选择器、子选择器和相邻兄弟选择器等，如\*、>、+ | 0    |

优先按照上述权重计算，多个选择器则权重累加，权重相同的情况下，最后声明的将被应用。

可继承的属性：`font-size`, `font-family`, `color`
不可继承的样式：`border`, `padding`, `margin`, `width`, `height`

## 3. CSS3 新增伪类有哪些? 哪些属性可以继承？

### 新增伪类

- p:first-of-type 选择属于其父元素的首个元素
- p:last-of-type 选择属于其父元素的最后元素
- p:only-of-type 选择属于其父元素唯一的元素
- p:only-child 选择属于其父元素的唯一子元素
- p:nth-child(2) 选择属于其父元素的第二个子元素
- :enabled :disabled 表单控件的禁用状态。
- :checked 单选框或复选框被选中。

### 继承性的属性

- 字体系列属性

  - font-family：字体系列
  - font-weight：字体的粗细
  - font-size：字体的大小
  - font-style：字体的风格

- 文本系列属性

  - text-indent：文本缩进
  - text-align：文本水平对齐
  - line-height：行高
  - word-spacing：单词之间的间距
  - letter-spacing：中文或者字母之间的间距
  - text-transform：控制文本大小写（就是 uppercase、lowercase、capitalize- 这三个）
  - color：文本颜色

- 元素可见性

  - visibility：控制元素显示隐藏

- 列表布局属性

  - list-style：列表风格，包括 list-style-type、list-style-image 等

- 光标属性
  - cursor：光标显示为何种形态

### 无继承性的属性

- display：规定元素应该生成的框的类型
- 文本属性：

* vertical-align：垂直文本对齐
* text-decoration：规定添加到文本的装饰
* text-shadow：文本阴影效果
* white-space：空白符的处理
* unicode-bidi：设置文本的方向

- 盒子模型的属性：width、height、margin、border、padding
- 背景属性：background、background-color、background-image、+ background-repeat、background-position、background-attachment
- 定位属性：float、clear、position、top、right、bottom、left、min-width、min-height、max-width、max-height、overflow、clip、z-index
- 生成内容属性：content、counter-reset、counter-increment
- 轮廓样式属性：outline-style、outline-width、outline-color、outline
- 页面样式属性：size、page-break-before、page-break-after
- 声音样式属性：pause-before、pause-after、pause、cue-before、cue-after、cue、play-during

## 4. 垂直水平居中

行内元素：`text-align: center`

块元素：

- 固定宽度：绝对定位 + `margin:auto`
- 固定宽度：绝对定位 + `L-50%`、`T-50%` + `ML:width/2`、`MT:width/2`
- 绝对定位 + `L-50%`、`T-50%` + `transform(-50%)`
- flex：`display:flex`、`justify-content:center`、`align-items:center`

* table-cell 实现居中：`display:table-cell`、`text-align:center`、 `vertical-align: middle`
* grid：`justify-content: center`、 `align-content: center`、`justify-content`是控制整个内容区域在容器中的位置，`align-items: center`、 `justify-items: center`是控制单个单元格的位置

5. display 有哪些值？说明他们的作用?

- inline（行内元素默认）– 内联
- none–隐藏
- block（块元素默认）–块显示
- table–表格显示
- list-item–项目列表
- inline-block 内联情况下具有块元素的属性

差异：

- 块级元素可以包含行内元素和块级元素。
- 块元素高度，行高以及顶和底边距都可以控制。

- 行内元素不能包含块级元素，只能包含文本或者其它行内元素
- 行内元素高，行高及顶和底边距不可改变

6. position 的值？

- static（默认）：正常的布局行为，即元素在文档常规流中当前的布局位置。此时 top, right, bottom, left 和 z-index 属性无效。
- relative：该关键字下，元素先放置在未添加定位时的位置，再在不改变页面布局的前提下调整元素位置（因此会在此元素未添加定位时所在位置留下空白）。
- position:relative 对 table-\*-group, table-row, table-column, table-cell, table-caption 元素无效。
- absolute：元素会被移出正常文档流，并不为元素预留空间，通过指定元素相对于最近的非 static 定位祖先元素的偏移，来确定元素位置。绝对定位的元素可以设置外边距（margins），且不会与其他边距合并。
- fixed：元素会被移出正常文档流，并不为元素预留空间，而是通过指定元素相对于屏幕视口（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变。打印时，元素会出现在的每页的固定位置。fixed 属性会创建新的层叠上下文。当元素祖先的 transform, perspective 或 filter 属性非 none 时，容器由视口改为该祖先。
- sticky：元素根据正常文档流进行定位，然后相对它的最近滚动祖先（nearest scrolling ancestor）和 containing block (最近块级祖先 nearest block-level ancestor)，基于 top, right, bottom, 和 left 的值进行偏移。偏移值不会影响任何其他元素的位置。

该值总是创建一个新的层叠上下文（stacking context）。注意，一个 sticky 元素会“固定”在离它最近的一个拥有“滚动机制”的祖先上（当该祖先的 overflow 是 hidden, scroll, auto, 或 overlay 时），即便这个祖先不是最近的真实可滚动祖先。这有效地抑制了任何“sticky”行为。

7. FLex 布局（略，必会）

8. 为什么要初始化 CSS 样式？

因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对 CSS 初始化往往会出现浏览器之间的页面显示差异。

9. CSS 里的 visibility 属性有个 collapse 属性值？在不同浏览器下以后什么区别？

当一个元素的 visibility 属性被设置成 collapse 值后，对于一般的元素，它的表现跟 hidden 是一样的。

- chrome 中，使用 collapse 值和使用 hidden 没有区别。
- firefox，opera 和 IE，使用 collapse 值和使用 display：none 没有什么区别。

10. display:none 与 visibility：hidden 的区别？

display：none 不显示对应的元素，在文档布局中不再分配空间（重排+重绘）
visibility：hidden 隐藏对应元素，在文档布局中仍保留原来的空间（重绘）

11. position 跟 display、overflow、float 这些特性相互叠加后会怎么样？

display 属性规定元素应该生成的框的类型；position 属性规定元素的定位类型；float 属性是一种布局方式，定义元素在哪个方向浮动。类似于优先级机制：position：absolute/fixed 优先级最高，有他们在时，float 不起作用，display 值需要调整。float 或者 absolute 定位的元素，只能是块元素或表格。

12. 对 BFC 规范(块级格式化上下文：block formatting context)的理解？

> 块格式化上下文（Block Formatting Context，BFC） 是 Web 页面的可视 CSS 渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域

特点：

- 内部的 Box 会在垂直方向上一个接一个放置。
- 属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠。
- 每个元素的 margin box 的左边，与包含块 border box 的左边相接触。
- BFC 的区域不会与 float box 重叠。
- BFC 是隔离的独立容器，容器里面的子元素不会影响到外面的元素。
- 计算 BFC 的高度时，浮动元素也会参与计算。

生成条件：

- 根元素，即 html
- float 的值不为 none（默认）
- overflow 的值不为 visible（默认）
- display 的值为 inline-block、table-cell、table-caption
- position 的值为 absolute 或 fixed

13. 为什么会出现浮动和什么时候需要清除浮动？清除浮动的方式？

浮动元素碰到包含它的边框或者浮动元素的边框停留。由于浮动元素不在文档流中，所以文档流的块框表现得就像浮动框不存在一样。浮动元素会漂浮在文档流的块框上。

原因是：

- 父元素的高度无法被撑开，影响与父元素同级的元素
- 与浮动元素同级的非浮动元素（内联元素）会跟随其后
- 若非第一个元素浮动，则该元素之前的元素也需要浮动，否则会影响页面显示的结构。

清除方式：
父级 div 定义 height

- 最后一个浮动元素后加空 div 标签 并添加样式 clear:both。
- 包含浮动元素的父标签添加样式 overflow 为 hidden 或 auto。
- 父级 div 定义 zoom

14. 设置元素浮动后，该元素的 display 会变么？

自动变成 display:block

15. CSS 优化、提高性能的方法有哪些？

- 避免过度约束
- 避免后代选择符
- 避免链式选择符
- 使用紧凑的语法
- 避免不必要的命名空间
- 避免不必要的重复
- 语义化的名字。
- 避免！important，可以选择其他选择器
- 尽可能的精简规则，你可以合并不同类里的重复规则

16. BEM 是什么？

> BEM 其实是一种命名的规范。或者说是一种 class 书写方式的方法论（methodology）。BEM 的意思就是块（block）、元素（element）、修饰符（modifier）。

```html
<ul class="list">
  <li class="list__item">learn html</li>
  <li class="list__item list__item--underline">learn css</li>
  <li class="list__item">learn js</li>
</ul>
<style>
  .list {
    margin: 15px;
    padding: 0;
  }
  .list__item {
    margin: 10px 0;
    border-left: 3px solid #333;
    font-size: 15px;
    color: #333;
    list-style: none;
  }
  .list__item--underline {
    color: #111;
    text-decoration: underline;
  }
</style>
```

BEM 命名规范里，我们的 CSS 并不会关心 HTML 中 dom 元素的层级结构。它的核心着眼点还是我们定义的块（block）、元素（element）、修饰符（modifier）这三部分。因为关注点不同，所以一个 block 内的所有 element，在 CSS 中并不会考虑层级

17. 什么是命名空间？

命名空间（namespaces）也是一种关于 CSS 中 class 命名方式的规范。

### Object: o-

- 当你使用面向对象的 CSS（Object-Oriented CSS）时，`o-`这个 namespace 将会非常有用。
- 对象是一个抽象的概念。
- 尽量避免修改它们的样式。
- 如果要使用`o-`时请慎重考虑。

### Component: c-

c-应该是一个更为常见的 namespace，表示 Components（组件）。

```css
.c-list {
}
.c-avatar {
}
```

从命名中我们就能知道：这是一个 list 组件；或者这是一个 avatar 组件。
Components 应该是一组具体的 UI。`c-`代表一个具体的组件。修改它们非常安全，只会对组件产生影响。

### Utility: u-

Utilities 符合单一职责原则，实现一个具体的功能或效果。其概念有些类似 JavaScript 中的通用工具方法。例如一个清除浮动的 Utility，或者一个文字居中的 Utility。

```css
.u-clearfix {
}
.u-text-center {
}
```

### Theme: `t-`

当我们使用 Stateful Themes 这种定义主题的方式时（后续有机会会介绍一些“自定义主题”的方式），往往我们会在最外层容器元素中加入一个代表不同主题的 class。这里就会用到`t-`。

- 主题`t-`是一个高层级的命名空间。
- 一定程度上它和下面的 Scope 一样，也为其内部的规则提供了一个作用空间。
- 可以很明显地标识当前 UI 的总体状态（主题）。

### Scope: s-

`s-`可能不是这么好理解，因为 CSS 中并没有 Scope 这个概念（或者说只有一个全局的 Scope）。而`s-`正是希望通过命名的方式来建立一个新的 Scope。

意义：BEM 和 namespace 是一种命名规范，或者说是一种使用建议。他的目的是帮助我们写出更易维护与协作的代码，更多的是在代码规范的层面上帮助我们解决 CSS 模块化中的问题。

18. 元素竖向的百分比设定是相对于容器的高度吗？

当按百分比设定一个元素的宽度时，它是相对于父容器的宽度计算的，但是，对于一些表示竖向距离的属性，例如 `padding-top` , `padding-bottom` , `margin-top` , `margin-bottom` 等，当按百分比设定它们时，依据的也是父容器的宽度，而不是高度。

19. ::before 和 :after 中双冒号和单冒号有什么区别？

- 单冒号(:)用于 CSS3 伪类，双冒号(::)用于 CSS3 伪元素。
- ::before 就是以一个子元素的存在，定义在元素主体内容之前的一个伪元素。并不存在于 dom 之中，只存在在页面之中。
- :before 和 :after 这两个伪元素，是在 CSS2.1 里新出现的。起初，伪元素的前缀使用的是单冒号语法，但随着 Web 的进化，在 CSS3 的规范里，伪元素的语法被修改成使用双冒号，成为::before ::after

20. display:inline-block 什么时候会显示间隙？

- 有空格时候会有间隙 解决：移除空格
- margin 正值的时候 解决：margin 使用负值
- 使用 font-size 时候 解决：font-size:0、letter-spacing、word-spacing

21. 常见的图片格式及使用场景

1. BMP，是无损的、既支持索引色也支持直接色的点阵图。这种图片格式几乎没有对数据进行压缩，所以 BMP 格式的图片通常是较大的文件。
1. GIF 是无损的、采用索引色的点阵图。采用 LZW 压缩算法进行编码。文件小，是 GIF 格式的优点，同时，GIF 格式还具有支持动画以及透明的优点。但是 GIF 格式仅支持 8bit 的索引色，所以 GIF 格式适用于对色彩要求不高同时需要文件体积较小的场景。
1. JPEG 是有损的、采用直接色的点阵图。JPEG 的图片的优点是采用了直接色，得益于更丰富的色彩，JPEG 非常适合用来存储照片，与 GIF 相比，JPEG 不适合用来存储企业 Logo、线框类的图。因为有损压缩会导致图片模糊，而直接色的选用，又会导致图片文件较 GIF 更大。
1. PNG-8 是无损的、使用索引色的点阵图。PNG 是一种比较新的图片格式，PNG-8 是非常好的 GIF 格式替代者，在可能的情况下，应该尽可能的使用 PNG-8 而不是 GIF，因为在相同的图片效果下，PNG-8 具有更小的文件体积。除此之外，PNG-8 还支持透明度的调节，而 GIF 并不支持。除非需要动画的支持，否则没有理由使用 GIF 而不是 PNG-8。
1. PNG-24 是无损的、使用直接色的点阵图。PNG-24 的优点在于它压缩了图片的数据，使得同样效果的图片，PNG-24 格式的文件大小要比 BMP 小得多。当然，PNG24 的图片还是要比 JPEG、GIF、PNG-8 大得多。
1. SVG 是无损的矢量图。SVG 是矢量图意味着 SVG 图片由直线和曲线以及绘制它们的方法组成。当放大 SVG 图片时，看到的还是线和曲线，而不会出现像素点。SVG 图片在放大时，不会失真，所以它适合用来绘制 Logo、Icon 等。
1. WebP 是谷歌开发的一种新图片格式，WebP 是同时支持有损和无损压缩的、使用直接色的点阵图。从名字就可以看出来它是为 Web 而生的，什么叫为 Web 而生呢？就是说相同质量的图片，WebP 具有更小的文件体积。现在网站上充满了大量的图片，如果能够降低每一个图片的文件大小，那么将大大减少浏览器和服务器之间的数据传输量，进而降低访问延迟，提升访问体验。目前只有 Chrome 浏览器和 Opera 浏览器支持 WebP 格式，兼容性不太好。

- 在无损压缩的情况下，相同质量的 WebP 图片，文件大小要比 PNG 小 26%；
- 在有损压缩的情况下，具有相同图片精度的 WebP 图片，文件大小要比 JPEG 小+25%~34%；
- WebP 图片格式支持图片透明度，一个无损压缩的 WebP 图片，如果要支持透明度只需要 22%的格外文件大小。
