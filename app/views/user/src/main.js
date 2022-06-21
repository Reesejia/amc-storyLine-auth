import router from '/router/index.js?v=8'
import App from '/src/app.js?v=6'

// 创建vue3的实例
const app = Vue.createApp(App)
  .use(router) // 挂载路由
  .use(ElementPlus) // 加载ElementPlus
  .mount('#app') // 挂载Vue的app实例

console.log('app', app)