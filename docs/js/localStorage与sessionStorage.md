# localStorage与sessionStorage
两者都是web存储，但是localStorage一旦存储到浏览器，就永远不会删除，除非手动删除。sessionStorge窗口关闭，数据就删除。
1. 有些个人设置，服务器不需要获取。比如上某个网站都可以设置关灯模式，这些设置完全可以保存在客户端里。
2. 比如记录本次的搜索记录功能