// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import routes from './router'
import App from './App'
import store from './stores'
import Http from 'src/libs/fetch.js'
import Utils from './libs/utils.js'
import { cookie } from 'vux'
import { request } from './libs/fetch.js'

Vue.use(Http)

Vue.use(VueRouter)
const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  store.commit('UPDATE_LOADING_STATUS', {isLoading: true})

  // 把token转移到sessionStorage中
  let token = cookie.get('token')
  if (token) {
    Utils.setSessionStorage('token', token)
    cookie.remove('token')
  }

  // 没有token就跳转到服务端做微信授权, 利用授权得到的信息生成token
  if (!store.getters.token) {
    Utils.setLocalStorage('beforeLoginUrl', to.fullPath)

    let url = process.env.BASE_URL + '/token'
    // 用于本地调试
    if (!Utils.isWechat()) {
      url += '?openid=' + process.env.TEST_OPENID
    }
    window.location.href = url
    return false
  }
  // 已有token没有用户信息, 调用接口获取用户信息做登录操作
  if (!store.getters.memberInfo) {
    request.get('/authMember').then(res => {
      store.commit('MEMBER_INFO', res.data)
      setTimeout(() => {
        let url = Utils.getLocalStorage('beforeLoginUrl')
        if (!url || url.indexOf('/auth') !== -1) {
          router.push('/')
        } else {
          router.push(url)
          Utils.removeLocalStorage('beforeLoginUrl', '')
        }
      }, 1500)
    })
    return false
  }
  next()
})

router.afterEach((to) => {
  store.commit('UPDATE_LOADING_STATUS', {isLoading: false})
})

FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    routeTo (url, query = {}) {
      router.push({path: url, query: query})
    }
  }
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
