import axios from 'axios'
import store from 'src/stores/'
import Utils from 'src/libs/utils.js'
import { ToastPlugin, cookie } from 'vux'
import Vue from 'vue'
Vue.use(ToastPlugin)

const fetch = axios.create({
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
    // let status = error.response.code
    let message = data.message
    // 临时处理token超时
    if (data.message === 'Token has expired') {
      Vue.$vux.toast.show({
        type: 'text',
        text: '登录超时',
        position: 'middle',
        isShowMask: true,
        onHide () {
          cookie.remove('token')
          Utils.removeLocalStorage('memberInfo')
          window.location.reload()
        }
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
