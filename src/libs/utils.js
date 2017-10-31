let Util = {}

/**
 * 存储localStorage
 */
Util.setLocalStorage = (key, value) => {
  if (!key) return
  if (typeof value !== 'string') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

/**
 * 获取localStorage
 */
Util.getLocalStorage = key => {
  if (!key) return
  let value = window.localStorage.getItem(key)
  try {
    value = JSON.parse(value)
  } catch (e) {}
  return value
}

/**
 * 删除localStorage
 */
Util.removeLocalStorage = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}

/**
 * 存储sessionStorage
 */
Util.setSessionStorage = (key, value) => {
  if (!key) return
  if (typeof value !== 'string') {
    value = JSON.stringify(value)
  }
  window.sessionStorage.setItem(key, value)
}

/**
 * 获取sessionStorage
 */
Util.getSessionStorage = key => {
  if (!key) return
  let value = window.sessionStorage.getItem(key)
  try {
    value = JSON.parse(value)
  } catch (e) {}
  return value
}

/**
 * 删除sessionStorage
 */
Util.removeSessionStorage = name => {
  if (!name) return
  window.sessionStorage.removeItem(name)
}

/**
 * 设置页面title标签
 */
Util.setTitle = name => {
  window.document.title = name || 'x-科技'
}

/**
 * 获取页面路径
 */
Util.getPath = path => {
  return r => require(['../views/' + path], r)
}

/**
 * 生成随机字符串
 */
Util.random_str = len => {
  let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  let max = chars.length
  let str = ''
  for (let i = 0; i < len; i++) {
    str += chars.charAt(Math.floor(Math.random() * max))
  }
  return str
}

/**
 * 是否在微信浏览器中
 */
Util.isWechat = () => {
  let ua = window.navigator.userAgent.toLowerCase()
  try {
    let userAgent = ua.match(/MicroMessenger/i)
    return userAgent[0] === 'micromessenger'
  } catch (e) {
    return false
  }
}

export default Util
