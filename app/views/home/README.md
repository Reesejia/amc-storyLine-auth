# 页面模块

> 框架内的路由，以前缀区分，作为模块名，每个模块内部有自己独立的express生态和context，
> 可以方便的把每个页面（或者叫页面组）封装成一个独立的模块。

## 规则

模块内部会有几个固定的几个文件或文件夹：

* `js` 存放模块相关的浏览器端js文件
* `css` 存放模块相关的样式文件
* `font` 存放模块相关的字体文件
* `img` 存放模块相关的图片文件
* `router.js` 模块路由文件（服务端js文件）
* `*.html` 模块相关的模板文件（可能多个，也可以在单独创建文件夹来存放模板）


## 关于router.js

实际上就是配置路由信息

```js
export default (router) => {

  router.get('/', (req, res) => {
    res.render('home/index', {
      title: 'home page 123'
    })
  })

  return router
}

```
