let Utils = {}

Utils.getPath = path => {
  return r => require(['../views/' + path], r)
}

export default Utils
