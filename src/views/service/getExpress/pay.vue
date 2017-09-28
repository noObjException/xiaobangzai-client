<template>
  <div>
      <group>
          <cell title="订单编号:" :value="info.order_num"></cell>
          <cell title="订单金额:">
              <span class="text-danger">
                ￥ {{info.total_price}}
              </span>
          </cell>
      </group>

      <group>
          <cell title="微信支付" is-link><img slot="icon" width="20" src="../../../../static/logo.png"/></cell>
          <cell title="余额支付" :value="'当前余额:'+member.credit" is-link @click.native="pay('CREDIT_PAY')"><img slot="icon" width="20" src="../../../../static/logo.png"></cell>
      </group>
  </div>
</template>

<script>
import { Group, Cell, ToastPlugin } from 'vux'
import { mapGetters } from 'vuex'
import Vue from 'vue'

Vue.use(ToastPlugin)

export default {
  data () {
    return {
      info: {},
      member: {}
    }
  },
  components: {
    Group,
    Cell
  },
  computed: {
    ...mapGetters([
      'openid'
    ])
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      let id = this.$route.query.id
      await this.$http.get('/getExpress/' + id).then(res => {
        this.info = res.data
      })
      await this.$http.get('/members/' + this.openid).then(res => {
        this.member = res.data
      })
    },
    async pay (payType) {
      await this.$http.put('/expressMission/pay/' + this.info.id, {pay_type: payType}).then(res => {
        let that = this
        that.$vux.toast.show({
          text: '支付成功',
          position: 'middle',
          onShow () {
            that.routeTo('/service/getExpress/result', {id: that.info.id})
          }
        })
      })
    }
  }
}
</script>

<style>

</style>
