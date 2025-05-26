// 进行axios二次封装  使用请求与响应拦截器
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { GET_TOKEN } from './token'

let request = axios.create({
  //基础路径
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000
})

request.interceptors.request.use(config => {
  const token = GET_TOKEN()
  if (token !== undefined && token !== null && token !== '') {
    config.headers.token = token
  }
  return config
})

request.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    let message = ''
    const status = error.response.status
    switch (status) {
      case 401:
        message = 'token过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = '网络出现问题'
        break
    }
    ElMessage({
      type: 'error',
      message
    })
    return Promise.reject(error)
  }
)

export default request
