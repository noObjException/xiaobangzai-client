import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import Utils from 'src/libs/utils.js'
import { cookie } from 'vux'

Vue.use(Vuex)

const state = {
  openid: Utils.getLocalStorage('openid'), // 用户openid
  token: cookie.get('token'), // api请求token
  memberInfo: Utils.getLocalStorage('memberInfo'), // 用户信息
  choosedAddress: Utils.getLocalStorage('choosedAddress'),
  isLoading: { title: '加载中...', status: false },
  expressMissionInfo: Utils.getLocalStorage('expressMissionInfo')
}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
