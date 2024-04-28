# HOC（高阶组件模式）
**HOC（高阶组件模式） 是一种复用组件逻辑的技术。**
1. 函数包装器：HOC 是一个函数，接受一个组件为参数，并返回新的组件，这个函数负责将所有的逻辑应用于组件。
2. 组件代理： HOC可以通过属性代理的方式，将额外的属性传递给被包装的组件。这样可以增加组件的功能或者自改其行为。
```
// 首先，我们假设有一个基础组件，它只需要一个列表数据来进行渲染
const ListComponent = ({ listData }) => (
  <ul>
    {listData.map(item => (
      <li key={item.id}>{item.text}</li>
    ))}
  </ul>
);

// 现在我们创建一个HOC，它负责异步获取数据并将其作为props传递给被包装组件
function withDataFetching(WrappedComponent) {
  return class DataFetcher extends React.Component {
    state = {
      listData: [],
      loading: true,
    };

    componentDidMount() {
      fetch('https://api.example.com/items')
        .then(response => response.json())
        .then(data => this.setState({ listData: data, loading: false }));
    }

    render() {
      // 属性代理：将额外的loading状态和获取的数据作为props传递给被包装的组件
      const { loading, listData } = this.state;
      return (
        <WrappedComponent 
          {...this.props}
          loading={loading}
          listData={listData}
        />
      );
    }
  }
}

// 使用HOC包装ListComponent
const EnhancedListComponent = withDataFetching(ListComponent);

// 现在EnhancedListComponent不仅拥有原始的渲染列表功能，还具备了异步获取数据和处理loading状态的能力
ReactDOM.render(<EnhancedListComponent />, document.getElementById('root'));
```
3. 组件复用：通过使用 HOC，我们可以将公共逻辑从组件中提取出来，并将其应用于多个组件中，从而实现代码的复用。
```
function withAuthorization(Component, allowedRoles) {
   
  return class extends React.Component {
   
    render() {
   
      const currentUserRole = getCurrentUserRole();

      if (allowedRoles.includes(currentUserRole)) {
   
        return <Component {
   ...this.props} />;
      } else {
   
        return null; // 或者显示一个无权限的提示信息
      }
    }
  }
}

const MyComponent = () => {
   
  return <div>My Component</div>;
}

const AuthorizedComponent = withAuthorization(MyComponent, ['admin', 'manager']);
```

4. 透明性：HOC 不会修改传入的组件，而是通过组合的方式将额外的功能应用于它。这种透明性使得组件的结构和行为保持一致。
```
function withLogging(Component) {
   
  return class extends React.Component {
   
    componentDidMount() {
   
      console.log('Component is mounted');
    }

    componentWillUnmount() {
   
      console.log('Component is unmounted');
    }

    render() {
   
      return <Component {
   ...this.props} />;
    }
  }
}

const MyComponent = () => {
   
  return <div>My Component</div>;
}

const MyComponentWithLogging = withLogging(MyComponent);
```
