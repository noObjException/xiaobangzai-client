import {
    UPDATE_LOADING_STATUS,
    CHOOSED_ADDRESS
} from './mutations-types.js'

export default {
  [UPDATE_LOADING_STATUS] (state, payload) {
    state.isLoading = payload.isLoading
  },
  [CHOOSED_ADDRESS] (state, address) {
    state.choosedAddress = address
  }
}

