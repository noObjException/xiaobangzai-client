import {
    UPDATE_LOADING_STATUS,
    CHOOSED_ADDRESS,
    EXPRESS_MISSION_INFO,
    MEMBER_INFO
} from './mutations-types.js'
import Utils from 'src/libs/utils.js'

export default {
  [UPDATE_LOADING_STATUS] (state, payload) {
    state.isLoading.status = payload.status
    state.isLoading.title = payload.title
  },
  [CHOOSED_ADDRESS] (state, address) {
    state.choosedAddress = address
  },
  [EXPRESS_MISSION_INFO] (state, payload) {
    state.expressMissionInfo = payload
  },
  [MEMBER_INFO] (state, payload) {
    Utils.setLocalStorage('memberInfo', payload)
    state.memberInfo = payload
  }
}

