# react hooks 诞生的原因是什么？解决了什么问题
1. 复杂组件逻辑难以复用
在react 16.8 之前，如果想要在多个组件之间复用一些状态逻辑，我们会想到高阶组件HOC 或者渲染属性render props等模式。这些模式可以工作，但是这些模式会使得组件层次嵌套比较深，难以理解。

2. 难以理解的类组件
类组件让许多开发者感到困惑，特别是对于初学者来说，需要理解js关键字的工作方式，以及如何正确地绑定事件处理方法。此外类组件生命周期方法经常让人头疼，尤其是当需要在不同生命周期方法中进行相同逻辑处理时。

3. 副作用代码分散
在类组件中，相关的业务逻辑代码往往被分散在多个生命周期方法中（比如componentDidMount 和 componentDidUpdate）中都需要进行数据的加载操作，这使得逻辑难以追踪和维护

hooks的引入解决了这些问题，提供了一种更简单、更直观的方式来使用react 的特性，而不需要编写类。并且在不改变组件的层次的情况下，做到逻辑复用

# react hooks 存在的闭包问题
hooks的闭包问题通常是由于函数组件的局部变量在创建时捕获了特定的作用域状态，而当这个函数组件重新渲染时，这些不活状态已经过时。这就导致了函数内部的事件处理器或者效果引用的状态不是最新的状态。
```
function MyComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // 这里的count值是这个闭包创建时的值，而不是最新的count值
      console.log(count);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []); // 空依赖数组意味着effect只会在挂载时运行

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```
上面的代码中，setInterval的回调函数引用的count值是useEffect运行时的count值，而当点击按钮更新count时，定时器中的闭包并不会获取更新后的count值
**解决方案**
1. 使用最新的状态
```
setCount((currentCount) => currentCount + 1);

```

2. 使用引用（useRef）
```
const countRef = useRef(count);
countRef.current = count;

useEffect(() => {
  const intervalId = setInterval(() => {
    // 使用countRef.current总是获取到最新的count值
    console.log(countRef.current);
  }, 1000);

  return () => clearInterval(intervalId);
}, []);

```
3. 在useEffect中包含所有依赖项
```
useEffect(() => {
  // ...
}, [count]); // count包含在依赖数组中，这样每次count更新时都会重新设置定时器

```

#  虚拟DOM的优点
**虚拟DOM本质上是一个JS对象**
1. 虚拟DOM可以将多次DOM操作合并为一次操作
eg: 比如你添加100个节点.原生js是一次一次操作的，虚拟DOM是一次操作。

2. 虚拟DOM借助DOM diff 可以把多余的操作省掉。
eg:比如 页面上有990个，现在要添加10个节点。js直接操作 DOM 是把原来1000个全部放到新的DOM中。js没有办法区分哪些是新增的。 