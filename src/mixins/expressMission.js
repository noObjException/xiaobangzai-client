import { ConfirmPlugin, ToastPlugin } from 'vux'
import Vue from 'vue'

Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)

export default {
  methods: {
    // 完成订单
    async completed (id) {
      let that = this
      this.$vux.confirm.show({
        title: '确认收货',
        content: '您确认要收货吗?',
        onConfirm () {
          that.$http.put('/expressMission/completed/' + id).then(res => {
            that.$vux.toast.show({
              text: '订单完成',
              onShow () {
                that.$router.push({path: '/member/mission/detail', query: {id: id}})
              },
              onHide () {
                if (that.$route.path === '/member/mission/detail') {
                  window.location.reload()
                }
              }
            })
          })
        }
      })
    },
    // 支付订单
    async wxPay (data) {
      await this.$http.post('/expressMission/wxPay', data).then(res => {
        let that = this
        const config = res.data

        this.$wechat.chooseWXPay({
          timestamp: config.timestamp,
          nonceStr: config.nonceStr,
          package: config.package,
          signType: config.signType,
          paySign: config.paySign,
          success: res => {
            that.$router.push({path: '/service/getExpress/result', query: {id: data.order_id}})
          }
        })
      })
    },
    // 追加赏金
    async addBounty (id) {
      let that = this
      this.$vux.confirm.show({
        title: '追加赏金',
        onConfirm () {
          that.$http.put('/expressMission/addBounty/' + id).then(res => {
            that.$vux.toast.show({
              text: '订单完成',
              onShow () {
                that.$router.push({path: '/member/mission/detail', query: {id: id}})
              }
            })
          })
        }
      })
    },
    async addComment (id) {

    },
    // 取消订单
    async cancel (id) {
      let that = this
      this.$vux.confirm.show({
        title: '取消订单',
        content: '您确认要取消该订单吗?',
        onConfirm () {
          that.$http.put('/expressMission/cancel/' + id).then(res => {
            that.$vux.toast.show({
              type: 'text',
              text: '取消成功',
              position: 'middle',
              onShow () {
                that.$router.push({path: '/member/mission/detail', query: {id: id}})
              }
            })
          })
        }
      })
    },
    // 接单
    async acceptOrder (id) {
      let that = this
      await this.$http.put('/expressMission/acceptOrder/' + id).then(res => {
        this.$vux.toast.show({
          text: '接单成功',
          onShow () {
            that.$router.push({path: '/staff/mission/detail', query: {id: id}})
          }
        })
      })
    }
  }
}
