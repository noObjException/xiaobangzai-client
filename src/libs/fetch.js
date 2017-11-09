import store from 'src/stores/'
import Utils from 'src/libs/utils.js'
import { ToastPlugin, cookie, AjaxPlugin } from 'vux'
import Vue from 'vue'
Vue.use(ToastPlugin)
Vue.use(AjaxPlugin)

const fetch = Vue.http.create({
  baseURL: process.env.BASE_API,
  timeout: 5000,
  headers: {
    // 'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  mode: 'cors',
  cache: 'force-cache'
})

fetch.interceptors.request.use(request => {
  if (store.getters.token) {
    request.headers['Authorization'] = 'Bearer' + store.getters.token
  }
  return request
}, error => {
  // Do something with request error
  console.log(error) // for debug
  return Promise.reject(error)
})

fetch.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    let data = error.response.data
    let status = error.response.status
    let message = data.message

    // 临时处理token超时
    if (data.message === 'Token has expired') {
      console.log('登录超时')
      cookie.remove('token')
      Utils.removeLocalStorage('memberInfo')
      Vue.$vux.toast.show({
        type: 'text',
        text: '登录超时',
        position: 'middle',
        isShowMask: true,
        onHide () {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        }
      })
    } else if (status === 422) { // 服务端表单验证失败提示
      let error = ''
      for (let key in data.errors) {
        error = data.errors[key]
        break
      }
      Vue.$vux.toast.show({
        type: 'text',
        text: error[0],
        width: '8.6rem',
        position: 'middle',
        isShowMask: true
      })
    } else {
      Vue.$vux.toast.show({
        type: 'text',
        text: message,
        position: 'middle',
        isShowMask: true
      })
    }
    console.log(error.response)
    return Promise.reject(error)
  }
)

export default {
  install (Vue) {
    Vue.prototype.$http = fetch
    Vue.http = fetch
  },
  $http: fetch
}

export const $http = fetch

export const request = fetch
