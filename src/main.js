// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import routes from './router'
import App from './App'
import store from './stores'
import Http from 'src/libs/fetch.js'

Vue.use(Http)

Vue.use(VueRouter)
const router = new VueRouter({
  routes
})
router.beforeEach(function (to, from, next) {
  store.commit('UPDATE_LOADING_STATUS', {isLoading: true})
  next()
})

router.afterEach(function (to) {
  store.commit('UPDATE_LOADING_STATUS', {isLoading: false})
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
