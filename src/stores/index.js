import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import Utils from 'src/libs/utils.js'

Vue.use(Vuex)

const state = {
  openid: 'openid10086111', // 用户openid
  token: '', // api请求token
  userInfo: null, // 用户信息
  choosedAddress: Utils.getLocalStorage('choosedAddress'),
  isLoading: false,
  expressMissionInfo: Utils.getLocalStorage('expressMissionInfo')
}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
