# js事件循环机制-宏任务和微任务是如何工作的?
1. 同步任务直接执行
2. 遇到微任务放到微任务队列(Promise.then Promise.nextTick)
3. 遇到宏任务放到宏任务队列(setTimeout/setInterval)
4. 首先执行完所有的同步任务
5. 然后执行微任务队列中的任务, 如果执行过程中遇到宏任务，放入宏任务队队列。等所有的微任务执行完，最后执行宏任务队列中的任务
6. 执行宏任务队列中的任务
```
console.log(1);
Promise.resolve().then(() => {
  console.log(2);
  setTimeout(() => {
    console.log(3)
  }, 0);
});
setTimeout(()=> {
  console.log(4);
  new Promise((resolve) => {
    console.log(5)
    resolve()
  }).then(() => {
    console.log(6)
  })
},0);

//1 2 4 5 6 3

```