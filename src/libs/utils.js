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
  var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  var max = chars.length
  var str = ''
  for (var i = 0; i < len; i++) {
    str += chars.charAt(Math.floor(Math.random() * max))
  }
  return str
}

export default Util
