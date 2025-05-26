export interface loginForm {
  username: string
  password: string
}
interface dataType {
  token?: string
  message?: string
}
interface userInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}
interface userType {
  token: string
  checkUser: userInfo
}
export interface userResponseData {
  code: number
  data: userType
}
export interface loginResponseData {
  code: number
  data: dataType
}
