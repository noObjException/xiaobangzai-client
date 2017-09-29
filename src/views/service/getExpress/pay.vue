<template>
    <div>
        <group>
            <cell :title="info.realname+ ' '+info.mobile" :inline-desc="info.college+ ' ' +info.area"></cell>
        </group>

        <group labelWidth="90px">
            <cell title="快递公司:" :value="info.express_com"></cell>
            <cell title="物品信息:" :value="info.express_type+'/'+info.express_weight"></cell>
            <cell title="送达时间:" :value="info.arrive_time"></cell>
            <cell title="配送费用:" :value="'￥ '+info.price"></cell>
            <cell title="跑腿赏金:" :value="'￥ '+info.bounty"></cell>
            <cell title="备注信息:" :value="info.remark" value-align="left"></cell>
        </group>

        <group>
            <cell title="应付金额:" :value="'￥ '+totalPrice"></cell>
        </group>

        <box gap="40px 6px">
            <x-button type="primary" @click.native="showPayType = true">立即支付</x-button>
        </box>

        <actionsheet v-model="showPayType" :menus="payTypes" @on-click-menu="handlePay" show-cancel>
          <p slot="header">请选择支付方式</p>
        </actionsheet>
    </div>
</template>

<script>
import { Group, Cell, XButton, Box, ToastPlugin, Actionsheet } from 'vux'
import Vue from 'vue'
import { mapGetters } from 'vuex'
import mixin from 'src/mixins/expressMission.js'

Vue.use(ToastPlugin)

export default {
  data () {
    return {
      info: {},
      showPayType: false,
      payTypes: [
        {
          label: '微信支付',
          value: 'WECHAT_PAY'
        }, {
          label: '余额支付',
          value: 'BALANCE_PAY'
        }
      ]
    }
  },
  mixins: [mixin],
  components: {
    Group, Cell, XButton, Box, Actionsheet
  },
  computed: {
    ...mapGetters([
      'openid'
    ]),
    totalPrice () {
      let price = 0
      price = this.info.price
      return price
    }
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
    },
    async handlePay (payType) {
      this.pay(this.info.id, payType)
    }
  }
}
</script>

