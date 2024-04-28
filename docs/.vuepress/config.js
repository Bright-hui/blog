module.exports = {
  title: '我的博客',
  description: 'XXX',
  themeConfig: {
    sidebar: [
      {
        title: "欢迎~",
        path: "/",
        collapsable: false,  // 是否折叠
        children: [{ title: "博客简介", path: "/" }],
      },
      // {
      //   title: "HTML",
      //   path: "/html/1",
      //   collapsable: true,
      //   children: [
      //     { title: "什么是重绘，什么是会流，如何减少回流", path: "/html/1" },
      //     { title: "第二篇", path: "/html/2" },
      //   ]
      // },
      // {
      //   title: "CSS",
      //   path: "/css/1",
      //   collapsable: true,
      //   children: [
      //     { title: "第二篇", path: "/handbook/2" },
      //   ]
      // },
      {
        title: "js",
        path: "/js/箭头函数与普通函数",
        collapsable: true,
        children: [
          { title: "箭头函数与普通函数", path: "/js/箭头函数与普通函数" },
          // { title: "原型链", path: "/js/2" },
          { title: 'js事件循环机制-宏任务和微任务是如何工作的?', path: '/js/js事件循环机制-宏任务和微任务是如何工作的' },
          { title: '内存泄漏', path: '/js/内存泄漏' },
          { title: 'localStorage 与 sessionStorage', path: '/js/localStorage与sessionStorage' }
        ]
      },
      {
        title: "react",
        path: "/react/hooks",
        collapsable: true,
        children: [
          { title: 'hooks', path: '/react/hooks' },
          { title: "hoc", path: "/react/hoc" },

        ]
      },
      // {
      //   title: 'webpack',
      //   path: "/webpack/1",
      //   collapsable: true,
      //   children: [
      //     { title: "第二篇", path: "/rebpack/1" },
      //   ]
      // }

    ]
  }
}
