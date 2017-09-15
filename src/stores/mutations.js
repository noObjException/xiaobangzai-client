import {
    UPDATE_LOADING_STATUS
} from './mutations-types.js'

export default {
  [UPDATE_LOADING_STATUS] (state, payload) {
    state.isLoading = payload.isLoading
  }
}
