---
title: Sass与Less区别
date: 2020-02-25
tags:
  - 预处理器
categories:
  - Css
---

# Sass与Less概念

### Sass
>Sass: Sass (Syntactically Awesome Stylesheets)是一种动态样式语言，Sass语法属于缩排语法，比css比多出好些功能(如变量、嵌套、运算,混入(Mixin)、继承、颜色处理，函数等)，更容易阅读。

### Less

>Less也是一种动态样式语言. 对CSS赋予了动态语言的特性，如变量，继承，运算， 函数.  Less 既可以在客户端上运行 (支持IE 6+, Webkit, Firefox)，也可在服务端运行 (借助 Node.js)。

# 区别

1. **安装体验不同**(我觉得这个是第一影响的): 
    用 npm 或者 yarn 安装less非常容易，而安装 Sass, 在国内没有翻墙的话，要么费了九牛二虎之力才能安装成功，要么就一直报安装失败。安装体验磕磕绊绊，很差劲。

2. **编译环境不同**

    Sass是在服务端处理的，以前是Ruby，现在是Dart-Sass或Node-Sass，而Less是需要引入less.js来处理Less代码输出CSS到浏览器，也可以在开发服务器将Less语法编译成css文件，输出CSS文件到生产包目录，有npm less, Less.app、SimpleLess、CodeKit.app这样的工具，也有在线编译地址。  

<br/>

3. **变量符不同**
    Less 是 @ ，Sass是$
    ```css
    // Less-变量定义
    @color: #00c; /* 蓝色 */
    .header {
    border: 1px solid @color; /* 蓝色边框 */
    }
    
    // Scss-变量定义
    $color: #00c; /* 蓝色 */

    .header {
     border: 1px solid $color; /* 蓝色边框 */
    }
    ```

<br/>

4. **输出设置**： Less没有输出设置，Sass提供4中输出选项：nested, compact, compressed 和 expanded。
输出样式的风格可以有四种选择，默认为nested。 

    + nested：嵌套缩进的css代码
    + expanded：展开的多行css代码
    + compact：简洁格式的css代码
    + compressed：压缩后的css代码

<br/>

5. **条件语句**： Sass支持条件语句，可以使用if{}else{},for{}循环等等。而Less不支持。  

    **if-else示例**
    ```css
    // 源码
    @mixin title($weight) { 
        color: #fff; 
        @if $weight == bold { 
            font-weight: bold;
        } 
        @else if $weight == light { 
            font-weight: 100;
        } 
        @else { 
            font-weight: normal;
        } 
    }

    .title-1 { 
        @include title(bold); 
    }

    // 编译后
    .title-1 {
        color: #fff;
        font-weight: bold; 
    }
    ```   

    **for示例**
    ```css
    // 源码
    @for $i from 1 to 3 {
        .border-#{$i} {
            border: #{$i}px solid blue;
        }
    }

    // 编译后
    .border-1 {
        border: 1px solid blue; 
    }
    .border-2 {
        border: 1px solid blue; 
    }
    .border-3 {
        border: 1px solid blue; 
    }
    ``` 

<br/>

6. **引用外部CSS文件**： Scss@import引用的外部文件如果不想编译时多生成同名的.css文件，命名必须以_开头, 文件名如果以下划线_开头的话，Sass会认为该文件是一个引用文件，不会将其编译为同名css文件。
    
    + Less引用外部文件和css中的@import没什么差异。
    + Sass引用外部需要额外注意，如下：

    ```css
    // 源码
    @import "_css1.Scss";
    @import "_css2.Scss";

    // 编译后
    h1 {
        font-size: 17px;
    }
    
    h2 {
        font-size: 17px;
    }
    
    h3 {
        font-size: 17px;
    }
    ```  
<br />

7. **工具库不同**:
    + Sass有工具库Compass, 简单说，Sass和Compass的关系有点像Javascript和jQuery的关系,Compass是Sass的工具库。在它的基础上，封装了一系列有用的模块和模板，补充强化了Sass的功能。  

    + Less有UI组件库Bootstrap,Bootstrap是web前端开发中一个比较有名的前端UI组件库，Bootstrap的样式文件部分源码就是采用Less语法编写。

<br />

8. **Scss和Sass（扩展）**
    Sass和Scss其实是一样的css预处理语言，SCSS 是 Sass 3 引入新的语法，其后缀名是分别为 .Sass和.Scss两种。SASS版本3.0之前的后缀名为.Sass，而版本3.0之后的后缀名.Scss。两者是有不同的，继Sass之后Scss的编写规范基本和css一致，Sass时代是有严格的缩进规范并且没有‘{}’和‘；’。而Scss则和css的规范是一致的。
