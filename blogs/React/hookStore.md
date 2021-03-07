---
title: 实现hooks的全局状态管理
date: 2021-03-04
tags:
  - Store
categories:
  - React
---


# 前言
其实在 React 中，状态管理有很多方式，除了常见的 Redux、Mobx、 React-saga 这些外，在使用 hooks 的时候，很多人都尝试使用 useContext 和 useReducer 来管理状态，其实我并不是喜欢这样的方式，使用 dispatch 这种派发形式在 hooks 中真的一点也不优雅，后来发现其他更优雅的形式，类似unseated这种，阅读源码后发现，其实实现原理还是很简单的，也给我了一些很多想法，似乎在hooks中实现一个状态管理，并不是很难，那么自己写一个如何？ 

## 设计
在思考🤔状态管理的时候，我们可以参考很多已有的轮子，类似Vuex或Redux、Mobx，我们可以创建一个简单的对象用来存放当前状态及修改状态的方法

```js
const listStore = {
  title: '状态管理',
  count: 10,
  changeName(){
    this.title = '状态修改了'
  },
  changeCount(){
    this.count = Math.random()
  }
}
```
这是个简单的一个`Model`，我们可以使用`call`或者`apply`调用当前方法来修改当前值，但这样的方式好么？其实我们在项目中会遇到`Model A` 依赖`Model B`的状态或者调用其方法，那么这样的实现好么？其实我更希望这个状态管理能够简单明了，灵活复用，那么上述的`Model`就无法实现之间相互依赖了，我们其实可以换个方式。既然对象内部无法依赖其他部分依赖，那么我们是不是可以设计成一个`function`？这样一来，我们可以传递一个方法，让当前的`Model`通过使用该方法调用其他的状态呢？同时我们可以在`Model`注册的过程中缓存当前`Model`，实现复用，另外，我们可以像`Effect`那样，使用依赖，这些听起来似乎更像一个全局的useState对么？那我们来上手试试吧！

## 实践

### 1. Model的设计
我们先设计一个方法，能够让他返回当前`Model`，同时在方法中能够使用其他Model的状态，如下代码：

```js
const listAStore = (updateModel, getModel) => ({
  title: '状态管理',
  count: 10,
  changeName(){
    updateModel({title:'状态修改了'})
    // 如果当前状态依赖其他Model的状态呢？
    // const { otherTitle } = getModel('ModelName')
    // updateModel({title: otherTitle + '依赖其他model' })
  },
  changeCount(){
    // 当然我们也可以设计成一个function，
    updateModel(state => ({count: Math.random()}))
    // 如果在A里面需要修改B的一些状态呢？
    // 我们可以在第二个参数追加一个字符串，即指定某个Store就好
    updateModel({b:'b的新状态'}, 'listBStore')

  }
})
```
### 2. Store的设计
上述内容我讲了当前Model的基本设计，那么如何使用这些内容就是我们现在需要做的，Model就好像包工头手下的工人，每个人都各司其职，但我们需要一个包工头用来接纳这些工人。那么包工头如何知道有哪些工人呢？是不是需要工人找包工头注册一下才能工作呢？所以Model在一开始需要在Store中注册一下，那我们开始设计一下包工头吧。
```js
const createStore = modelList => {
  const Deps = Symbol('deps');
  const store = {}
  // 这里的modelList就是一个Model的数组，我们之间一次性注册完成
  modelList.forEach(model => {
    // ****部分方法我使用的lodash中的工具函数****

    // 这里我们主要是使用function.name来确定当前Model的名称，
    if (!isFunction(model) || !model.name) {
      throw new Error('model must be an named function ');
    }
    // 需要保证每个model的名称不能重名，因为这样后期可能会覆盖前一个已经注册的，这里做了过滤
    if (Store[model]) {
      throw new Error(`${model.name} model is exist, please set new name `);
    }
    // 之前讲过了，我们可能需要进行依赖收集，按照指定的依赖进行更新
    // 通过一个声明的Symbol值，并将其创建到新的对象中，也就是说所用的model都是基于这个带有Symbol值的对象
    // 确保我们能够获取到其依赖
    const objProperty = Object.defineProperty({}, Deps, { value: [] });
    const newModel = Object.create(objProperty);

    // updateModel 方法，默认的model就是当前调用方法所在的model，当然也可以替换成其他的modelName
    const updateModel = (newState = {}, modelName = model.name) => {
      if (!isString(modelName)) {
        throw new Error(`modelName must be an object`);
      }
      const assignModel = Store[modelName];
      if (!assignModel || !isObject(assignModel)) {
        throw new Error(`${modelName} model is not exist or ${modelName} model is not a object`);
      }

      // update model
      const newValue = isFunction(newState) ? newState(assignModel) : newState;
      Store[modelName] = Object.assign(Store[modelName], newValue);

      // 获取当前model中的依赖
      const depsList = Store[modelName][Deps];
      // 这里需要获取拿到新的值，并获取其key和我们所依赖的属性进行比较
      // 如果depsList中的deps为undefined，则说明，只要值发生更改，那么就更新视图
      // 为什么depsList是个数组，因为在hooks中，可能对同一个model，调用两次，
      // 当然这样似乎并不是很常见，但确保我们写的hook 能够正常使用，需要这样的容错。
      const newKeys = Object.keys(newValue);
      depsList.forEach(({ deps, setState }) => {
        if (!deps || newKeys.some(key => deps.includes(key))) {
          setState({});
        }
      });
    };

    // 返回指定的model状态或者自身的状态
    const getModel = modelName => Store[modelName] || Store[model.name]

    // 获取当前model值
    const modelState = model(updateModel, getModel);

    // 需要对每个属性解析一下，然后添加到带有依赖的对象中
    Object.entries(modelState).forEach(([key, value]) => {
      if (isFunction(value)) {
        newModel[key] = (...rest) => {
          const result = value(...rest);
          // is not a promise
          if (!result || !(result instanceof Promise)) return result;
          newModel[Deps].forEach(({ d, setState }) => {
            if (!d || d.includes(key)) {
              setState({});
            }
          });
          return result;
        };
      } else {
        newModel[key] = value;
      }
    });

    // 注册到Store中
    Store[convertModel.name] = newModel;
  })
  // 因为全局使用，我们希望哪里使用就引入，像hook一样，同时为了保证store是唯一的
  // 所以我们这里使用闭包，返回一个hook，而这个hook就是我们要用的。
  return (modelName, deps) => {
    // 指定要使用的model store
    if (!isString(modelName)) {
      throw new Error('model must be an named function ');
    }
    const existModel = Store[modelName];

    // 这里需要注意，我们在上面的内容修改其实是无法直接驱动视图修改的
    // 所以我们这里借用了useState可以更新视图的方法。
    const [, setState] = useState();

    // 在组件挂在的时候，收集我们需要的依赖
    // hook的第二个参数dep，可以想象一下effect中的第二个参数，就是我们需要依赖的变量字符串
    // 如果是undefined，那么只要值修改了，都要刷新
    // 如果是数组，那么就需要判断一下新产生的值对应的key是否是我们依赖的
    // 如果依赖了，那么需要返回一个函数在组件卸载的时候去删除对应的依赖，不然会引起内存泄漏
    useEffect(() => {
      if (deps?.length === 0) return () => {};
      const newDeps = { deps, setState };
      existModel[Deps].push(newDeps);
      return () => {
        existModel[Deps].splice(existModel[Deps].indexOf(newDeps), 1);
      };
    }, []);
    return existModel;
  };
  
}

```

### 3. 使用

使用如下：

```js

// store/index.js
const storeFiles = require.context('./store', true, /\.store\.js$/);

// ...CreateStore...

// 获取全部model
const modelList = storeFiles.keys().map(key => storeFiles(key).default);

// 注册后返回这个 store 的 hook就可以了
export default createStore(modelList);



// Component/someComponent.js

import useModel from './store'
const demo = () => {
  const { propsA, propsB, aFn } = useModel('modelName')
  return (
    <div>
      <h1>{propsA}</h1>
      <h1>{propsB}</h1>
      <button onClick={aFn}>change A</button>
    </div>
  )

}


```