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

Vue.use(Http)

Vue.use(VueRouter)
const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  store.commit('UPDATE_LOADING_STATUS', {isLoading: true})
  console.log(to)
  if (to.path === '/auth' && store.state.openid) {
    next('/')
    return false
  }
  if ((!Utils.getLocalStorage('memberInfo') || !store.state.token) && to.path !== '/auth') {
    Utils.setLocalStorage('beforeLoginUrl', to.fullPath)
    console.log('fsd')
    next('/auth')
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

Vue.prototype.goBeforeLoginUrl = () => {
  let url = Utils.getLocalStorage('beforeLoginUrl')
  if (!url || url.indexOf('/auth') !== -1) {
    router.push('/')
  } else {
    if (url === '/') {
      url = '/'
    }
    router.push(url)
    Utils.setLocalStorage('beforeLoginUrl', '')
  }
}

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
