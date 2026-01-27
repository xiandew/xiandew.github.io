---
title: "Implement Object Pool in JS"
description: "Why object pools help smooth performance in GC-heavy JavaScript apps, plus a simple pool implementation and usage pattern suited to games and real-time loops."
pubDate: 2019-03-24
author: "Xiande Wen"
tags: ["javascript", "performance", "object-pool", "garbage-collection", "game-development"]
---

> JavaScript’s memory model is built on a technology known as a Garbage Collector. In many languages, the programmer is directly responsible for allocating and freeing memory from the system’s Memory Heap. A Garbage Collector system, however, manages this task on behalf of the programmer, meaning that objects aren’t directly freed from memory when the programmer dereferences it, but rather at a later time when the GC’s heuristics decide that it would be beneficial to do so. This decision process requires that the GC execute some statistical analysis on active and inactive objects, which takes a block of time to perform.
>
>  The process in which a GC reclaims memory is not free, it usually cuts into your available performance by taking a block of time to do its work; alongside that, the system itself makes the decision when to run. You have no control over this action, a GC pulse can occur at any time during code execution, which will block code execution until it’s completed. The duration of this pulse is generally unknown to you; will take some amount of time to run, depending on how your program is utilizing memory at any given point.
>
> High performance applications rely on consistent performance boundaries to ensure a smooth experience for users. Garbage collector systems can short circuit this goal, as they can run at random times for random durations, eating into the available time that the application needs to meet its performance goals.

Since high reliance to the garbage collector will cause a very bad performance, it is common
to implement an `object pool` pattern.

> The object pool pattern is a software creational design pattern that uses a set of initialized objects kept ready to use – a "pool" – rather than allocating and destroying them on demand. A client of the pool will request an object from the pool and perform operations on the returned object. When the client has finished, it returns the object to the pool rather than destroying it; this can be done manually or automatically.
>
> Object pools are primarily used for performance: in some circumstances, object pools significantly improve performance. Object pools complicate object lifetime, as objects obtained from and returned to a pool are not actually created or destroyed at this time, and thus require care in implementation.

Here is the sample codes being provided by WeChat platform on how to implement the object pool in JS:

Create a file called `pool.js` which contains the following code.

```javascript
const __ = {
  poolDic: Symbol('poolDic')
}

/**
 * Simple object pool implementation
 * For storing and recycling objects, which can effectively reducing the
 * frequency of object creation and garbage collection for a high performance
 */
export default class Pool {
  constructor() {
    this[__.poolDic] = {}
  }

  /**
   * According to the sign of the object, return in which pool it should be
   */
  getPoolBySign(name) {
    return this[__.poolDic][name] || ( this[__.poolDic][name] = [] )
  }

  /**
   * According to the sign of the object, get in which pool it should be
   * If the pool is empty,  create a new object. Otherwise return the first
   * in the pool.
   */
  getItemByClass(name, className) {
    let pool = this.getPoolBySign(name)

    let result = (  pool.length
                  ? pool.shift()
                  : new className()  )

    return result
  }

  /**
   * Store the invisible object to the pool for reusing later.
   */
  recover(name, instance) {
    this.getPoolBySign(name).push(instance)
  }
}
```

You can use it by:

**Instantiate a new pool**

```javascript
import Pool from './pool';

let pool = new Pool();
```

**Recycle objects**

```javascript
recycleObj(obj) {
    // suppose the 'obj' is at the front of the 'objArr', delete it from 'objArr'.
    // where objArr is the array storing all objects in use.
    let temp = objArr.shift();

    // initialise the object.
    obj.init();

    // recycle it
    pool.recover('objName', obj)
}
```

**Create objects**

```javascript
let obj = pool.getItemByClass('objName', obj);
objArr.push(obj);
```

# **References**

- [Static Memory Javascript with Object Pools](https://www.html5rocks.com/en/tutorials/speed/static-mem-pools/)
- [Object pool pattern - wikipedia](https://en.wikipedia.org/wiki/Object_pool_pattern)