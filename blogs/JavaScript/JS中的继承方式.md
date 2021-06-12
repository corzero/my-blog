---
title: JS中的继承方式
date: 2019-09-15
tags:
  - es6
categories:
  - JS
---

## JS中的继承方式

### 继承分类

先来个整体印象。如图所示，JS中继承可以按照是否使用object函数（在下文中会提到），将继承分成两部分（Object.create是ES5新增的方法，用来规范化这个函数）。

其中，原型链继承和原型式继承有一样的优缺点，构造函数继承与寄生式继承也相互对应。寄生组合继承基于Object.create, 同时优化了组合继承，成为了完美的继承方式。ES6 Class Extends的结果与寄生组合继承基本一致，但是实现方案又略有不同。

<img :src="$withBase('/image/js继承.png')" alt="js继承"  height='400'/>

### 继承方式

上图上半区的原型链继承，构造函数继承，组合继承，网上内容比较多，本文不作详细描述，只指出重点。

1. 原型链继承

核心：将父类的实例作为子类的原型

```js
SubType.prototype = new SuperType() 
// 所有涉及到原型链继承的继承方式都要修改子类构造函数的指向，否则子类实例的构造函数会指向SuperType。
SubType.prototype.constructor = SubType;
```

**优点**:
+ 父类方法可以复用

**缺点**：
父类的引用属性会被所有子类实例共享
子类构建实例时不能向父类传递参数

2. 构造函数继承

核心：将父类构造函数的内容复制给了子类的构造函数。这是所有继承中唯一一个不涉及到prototype的继承。

```js
SuperType.call(SubType);
```

**优点**：
+ 和原型链继承完全反过来。
+ 父类的引用属性不会被共享
+ 子类构建实例时可以向父类传递参数

**缺点**：
父类的方法不能复用，子类实例的方法每次都是单独创建的。

3. 组合继承

核心：原型式继承和构造函数继承的组合，兼具了二者的优点。

```js
function SuperType() {
    this.name = 'parent';
    this.arr = [1, 2, 3];
}

SuperType.prototype.say = function() { 
    console.log('this is parent')
}

function SubType() {
    SuperType.call(this) // 第二次调用SuperType
}

SubType.prototype = new SuperType() // 第一次调用SuperType
```

**优点**：
+ 父类的方法可以被复用
+ 父类的引用属性不会被共享
+ 子类构建实例时可以向父类传递参数

**缺点**：
+ 调用了两次父类的构造函数，第一次给子类的原型添加了父类的name, arr属性，第二次又给子类的构造函数添加了父类的name, arr属性，从而覆盖了子类原型中的同名参数。这种被覆盖的情况造成了性能上的浪费。

4.  原型式继承

核心：原型式继承的object方法本质上是对参数对象的一个浅复制。

```js
function object(o){
  function F(){}
  F.prototype = o;
  return new F();
}

var person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};

var anotherPerson = object(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");

var yetAnotherPerson = object(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");
alert(person.friends);   //"Shelby,Court,Van,Rob,Barbie"
```

**优点**：
+ 父类方法可以复用

**缺点**：
+ 父类的引用属性会被所有子类实例共享
+ 子类构建实例时不能向父类传递参数

5. 寄生式继承

核心：使用原型式继承获得一个目标对象的浅复制，然后增强这个浅复制的能力。

```js
function createAnother(original){ 
    var clone=object(original);    //通过调用函数创建一个新对象
    clone.sayHi = function(){      //以某种方式来增强这个对象
        alert("hi");
    };
    return clone;                  //返回这个对象
}

var person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};

var anotherPerson = createAnother(person);
anotherPerson.sayHi(); //"hi"
```

优缺点：仅提供一种思路，没什么优点。

6. 寄生组合继承

刚才说到组合继承有一个会两次调用父类的构造函数造成浪费的缺点，寄生组合继承就可以解决这个问题。

```js
function inheritPrototype(subType, superType){
    var prototype = object(superType.prototype); // 创建了父类原型的浅复制
    prototype.constructor = subType;             // 修正原型的构造函数
    subType.prototype = prototype;               // 将子类的原型替换为这个原型
}

function SuperType(name){
    this.name = name;
    this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function(){
    alert(this.name);
};

function SubType(name, age){
    SuperType.call(this, name);
    this.age = age;
}
// 核心：因为是对父类原型的复制，所以不包含父类的构造函数，也就不会调用两次父类的构造函数造成浪费
inheritPrototype(SubType, SuperType);
SubType.prototype.sayAge = function(){
    alert(this.age);
}
```

优缺点：这是一种完美的继承方式。

7. <font color="red">ES6 Class extends</font>

核心： ES6继承的结果和寄生组合继承相似，本质上，ES6继承是一种语法糖。但是，<font color="red">寄生组合继承是先创建子类实例this对象，然后再对其增强；而ES6先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。</font>

<font color="red" size="3">**差别**(面试题)：</font> ES5 的继承，实质是先创造子类的实例对象`this`，然后再将父类的方法添加到`this`上面`Parent.apply(this)`。ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到`this`上面（所以必须先调用super方法），然后再用子类的构造函数修改`this`。

```js
class A {}

class B extends A {
  constructor() {
    super();
  }
}
```

ES6实现继承的具体原理：

```js
class A {
}

class B {
}

Object.setPrototypeOf = function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
}

// B 的实例继承 A 的实例
Object.setPrototypeOf(B.prototype, A.prototype);

// B 继承 A 的静态属性
Object.setPrototypeOf(B, A);
```

**ES6继承与ES5继承的异同：**

**相同点：**
本质上ES6继承是ES5继承的语法糖

**不同点：**
ES6继承中子类的构造函数的原型链指向父类的构造函数，ES5中使用的是构造函数复制，没有原型链指向。
ES6子类实例的构建，基于父类实例，ES5中不是。

### 总结

ES6 Class extends是ES5继承的语法糖
JS的继承除了构造函数继承之外都基于原型链构建的
可以用寄生组合继承实现ES6 Class extends，但是还是会有细微的差别