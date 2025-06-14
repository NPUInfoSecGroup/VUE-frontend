import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 创建Vue应用实例
const app = createApp(App)

// 使用插件
app.use(ElementPlus)
app.use(store)
app.use(router)

// 挂载应用
app.mount('#app')

// 移除DOMContentLoaded事件监听器