export const getTime = () => {
  let message = ''
  const nowHours = new Date().getHours()
  if (nowHours <= 9) {
    message = '早上好'
  } else if (nowHours > 9 && nowHours <= 14) {
    message = '上午好'
  } else if (nowHours > 14 && nowHours <= 18) {
    message = '下午好'
  } else {
    message = '晚上好'
  }
  return message
}
