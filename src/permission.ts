import router from './router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import pinia from './store'
import useUserStore from './store/modules/user'
import { GET_TOKEN } from './utils/token'
let userStore = useUserStore(pinia)
router.beforeEach(async (to, from, next) => {
  nprogress.start()
  document.title = `${to.meta.title} - 后台管理系统`
  // 每次都从 localStorage 取 token，保证同步
  // console.log(userStore.token)
  userStore.token = GET_TOKEN() || ''
  if (userStore.token) {
    if (to.path === '/login') {
      next({ path: '/home' })
    } else {
      if (userStore.username) {
        next()
      } else {
        try {
          await userStore.userInfo()
          next({ ...to })
        } catch (error) {
          userStore.userLogout()
          next('/login')
        }
      }
    }
  }

  else {
    if (to.path === '/login') {
      next()
    } else {
      alert('您尚未登录，请先登录！')
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

router.afterEach((to, from) => {
  nprogress.done()
  // 设置页面标题
  document.title = `${to.meta.title} - 后台管理系统`
})
