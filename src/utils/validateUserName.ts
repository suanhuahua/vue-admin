//自定义校验规则函数
const validateUserName = (_: any, value: any, callback: any) => {
  const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]{1,9}$/
  if (!value) {
    callback(new Error('Please input Activity name'))
  } else if (!usernameRegex.test(value)) {
    callback(new Error('用户名必须在2-10个字符，并且以字母开头，不能是纯数字！'))
  } else {
    callback()
  }
}
export default validateUserName
