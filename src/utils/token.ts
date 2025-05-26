// 定义 token 常量
export const TOKEN = 'TOKEN'

// 设置 token
export const SET_TOKEN = (token: string) => {
  localStorage.setItem(TOKEN, token)
}

// 获取 token
export const GET_TOKEN = () => {
  return localStorage.getItem(TOKEN)
}

// 删除 token
export const REMOVE_TOKEN = () => {
  localStorage.removeItem(TOKEN)
}
