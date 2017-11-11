import { ConfirmPlugin } from 'vux'
import Vue from 'vue'
Vue.use(ConfirmPlugin)

export default {
  methods: {
    async identifyConfirm () {
      let that = this
      await this.$http.get('/authMember').then(res => {
        const isIdentify = res.data.is_identify
        const memberSettings = res.meta.member_settings
        if (!isIdentify && memberSettings.switch_member_identify) {
          this.$vux.confirm.show({
            title: '温馨提示',
            content: '为了您的快递物品信息安全, 该服务需要认证后使用!',
            confirmText: '去认证',
            cancelText: '先看看',
            onConfirm () {
              that.$router.push('/member/identify')
            }
          })
          return false
        }
        return true
      })
    }
  }
}
