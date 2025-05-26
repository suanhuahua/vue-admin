import { reqLogin, reqUserInfo } from '@/api/user'
import type { loginForm, loginResponseData } from '@/api/user/type'
import { defineStore } from 'pinia'
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'
import { anyRoute, asyncRoute, constantRoute } from '@/router/router'
import router from '@/router'
//@ts-ignore
import cloneDeep from 'lodash/cloneDeep'
const filterAsyncRoute = (routes: any[], allowedNames: string[]): any[] => {
  return routes.filter((item: any) => {
    if (allowedNames.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, allowedNames)
      }
      return true
    }
    return false
  })
}
let useUserStore = defineStore('User', {
  state: () => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute,
      avatar: '',
      username: '',
      buttons: [] as string[]
    }
  },
  actions: {
    async userLogin(data: loginForm) {
      let res: loginResponseData = await reqLogin(data)
      // 200代表成功
      if (res.code === 200) {
        SET_TOKEN(res.data.token as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(res.data.message))
      }
    },
    async userInfo() {
      let result = await reqUserInfo()
      if (result.code === 200) {
        this.avatar = result.data.checkUser.avatar
        this.username = result.data.checkUser.username
        this.buttons = result.data.checkUser.buttons
        let userAsyncRoute = filterAsyncRoute(cloneDeep(asyncRoute), result.data.checkUser.routes)
        this.menuRoutes = [...constantRoute, ...userAsyncRoute, ...anyRoute]
        let allUserRoutes = [...userAsyncRoute, anyRoute]
        allUserRoutes.forEach((route: any) => {
          router.addRoute(route)
        })
        return 'ok'
      }
    },
    userLogout() {
      // 清除本地 token
      localStorage.removeItem('TOKEN')
      // 清空 pinia 状态
      this.token = ''
      this.username = ''
      this.avatar = ''
    }
  },
})
export default useUserStore
