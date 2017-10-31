<template>
  <div>
    <group>
      <cell :title="info.realname+ ' '+info.mobile" :inline-desc="info.college+ ' ' +info.area+' '+info.detail">
        <x-icon slot="icon" type="ios-location-outline"></x-icon>
      </cell>
    </group>

    <group labelWidth="90px">
      <cell title="快递公司:" :value="info.express_com"></cell>
      <cell title="物品信息:" :value="info.express_type+'/'+info.express_weight"></cell>
      <cell title="送达时间:" :value="info.arrive_time"></cell>
      <cell title="配送费用:">
        <span class="text-danger">￥ {{info.price}}</span>
      </cell>
      <cell title="上楼加价:" v-if="info.upstairs_price">
        <span class="text-danger">￥ {{info.upstairs_price}}</span>
      </cell>
      <cell title="超重加价:" v-if="info.overweight_price">
        <span class="text-danger">￥ {{info.overweight_price}}</span>
      </cell>
       <cell title="跑腿赏金:">
        <span class="text-danger">￥ {{info.bounty}}</span>
      </cell>
      <cell title="备注信息:" :value="info.remark" value-align="right">{{info.remark||'无'}}</cell>
    </group>

    <group labelWidth="150px"> 
      <x-switch :title="deductionTitle" v-model="formData.is_use_credit" :disabled="deductionDisabled" v-if="settings.switch_credit_to_money"></x-switch>
      <cell title="应付金额:">
        <span class="text-danger">￥ {{totalPrice}}</span>
      </cell>
    </group>

    <box gap="40px 6px">
      <x-button type="primary" @click.native="wxPay">立即支付</x-button>
    </box>

    <actionsheet v-model="showPayType" :menus="payTypes" @on-click-menu="handlePay" show-cancel>
      <p slot="header">请选择支付方式</p>
    </actionsheet>
  </div>
</template>

<script>
import { Group, Cell, XButton, Box, ToastPlugin, Actionsheet, XSwitch } from 'vux'
import Vue from 'vue'
import mixin from 'src/mixins/expressMission.js'

Vue.use(ToastPlugin)

export default {
  data () {
    return {
      info: {},
      showPayType: false,
      formData: {
        is_use_credit: false
      },
      member: {},
      settings: {},
      payTypes: [{
        label: '微信支付',
        value: 'WECHAT_PAY'
      }, {
        label: '余额支付',
        value: 'BALANCE_PAY'
      }]
    }
  },
  mixins: [mixin],
  components: {
    Group, Cell, XButton, Box, Actionsheet, XSwitch
  },
  computed: {
    totalPrice () {
      let price = this.info.total_price
      if (this.formData.is_use_credit) {
        price -= this.deduction
      }
      return price
    },
    deductionTitle () {
      if (this.deduction > 0) {
        return '使用积分抵扣 <span class=text-danger>￥ ' + this.deduction + '</span>'
      }
      return '<span class=text-danger>积分不足, 无法抵扣</span>'
    },
    deductionDisabled () {
      if (this.deduction <= 0) {
        this.formData.is_use_credit = false
        return true
      }
      return false
    },
    deduction () {
      let deduction = this.member.credit / this.settings.credit_to_money
      return deduction.toFixed(2)
    }
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      let id = this.$route.query.id
      await this.$http.get('/getExpress/' + id).then(res => {
        // 从支付成功页点返回的时候跳到详情页
        if (res.data.status !== '待支付') {
          this.routeTo('/member/mission/detail', {id: id})
          return false
        }

        this.info = res.data
        this.member = res.meta.member

        this.settings = res.meta.settings
        if (this.settings.switch_credit_to_money) {
          this.formData.is_use_credit = true
        }
      })
    },
    async handlePay (payType) {
      let data = this.formData
      data['pay_type'] = payType
      this.pay(this.info.id, data)
    },
    wxPay () {
      this.$http.post('wxPay').then(res => {
        this.$wechat.chooseWXPay(res.data)
      })
    }
  }
}
</script>

