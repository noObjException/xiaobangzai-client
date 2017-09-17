import {
    CHOOSED_ADDRESS
} from './mutations-types.js'
import Utils from 'src/libs/utils.js'

export default {
  choosedAddress ({commit, state}, address) {
    Utils.setLocalStorage('choosedAddress', address)
    commit(CHOOSED_ADDRESS, address)
  }
}
