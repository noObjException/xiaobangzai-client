import {
    CHOOSED_ADDRESS,
    EXPRESS_MISSION_INFO
} from './mutations-types.js'
import Utils from 'src/libs/utils.js'

export default {
  choosedAddress ({commit, state}, address) {
    Utils.setLocalStorage('choosedAddress', address)
    commit(CHOOSED_ADDRESS, address)
  },
  saveExpressMissionInfo ({commit, state}, payload) {
    Utils.setLocalStorage('expressMissionInfo', payload)
    commit(EXPRESS_MISSION_INFO, payload)
  }
}
