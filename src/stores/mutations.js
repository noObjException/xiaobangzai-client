import {
    UPDATE_LOADING_STATUS,
    CHOOSED_ADDRESS,
    EXPRESS_MISSION_INFO,
    MEMBER_INFO
} from './mutations-types.js'

export default {
  [UPDATE_LOADING_STATUS] (state, payload) {
    state.isLoading = payload.isLoading
  },
  [CHOOSED_ADDRESS] (state, address) {
    state.choosedAddress = address
  },
  [EXPRESS_MISSION_INFO] (state, payload) {
    state.expressMissionInfo = payload
  },
  [MEMBER_INFO] (state, payload) {
    state.memberInfo = payload
  }
}

