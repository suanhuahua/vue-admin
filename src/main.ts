import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'virtual:svg-icons-register'
import '@/styles/index.scss'
import globalComponent from '@/components'
import router from '@/router'
import pinia from '@/store/index'
import './permission'
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(globalComponent)
app.use(ElementPlus, {
  locale: zhCn
})

app.mount('#app')
