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
      <cell title="配送费用:" is-link :arrow-direction="showPriceDetail ? 'up' : 'down'" @click.native="showPriceDetail = !showPriceDetail">
        <span class="text-danger">￥ {{info.total_price}}</span>
      </cell>
      <template v-if="showPriceDetail">
        <cell-form-preview :list="priceDetail"></cell-form-preview>
      </template>
      <cell title="备注信息:" :value="info.remark" value-align="right">{{info.remark||'无'}}</cell>
    </group>

    <group labelWidth="150px"> 
      <x-switch :title="deductionTitle" v-model="formData.is_use_point" :disabled="deductionDisabled" v-if="settings.switch_point_to_money"></x-switch>
      <cell title="应付金额:">
        <span class="text-danger">￥ {{totalPrice}}</span>
      </cell>
    </group>

    <box gap="40px 6px">
      <x-button type="primary" @click.native="wxPay(formData)">立即支付</x-button>
    </box>
  </div>
</template>

<script>
import {
  Group,
  Cell,
  XButton,
  Box,
  ToastPlugin,
  XSwitch,
  CellFormPreview
} from 'vux'
import Vue from 'vue'
import mixin from 'src/mixins/expressMission.js'

Vue.use(ToastPlugin)

export default {
  data () {
    return {
      info: {},
      showPayType: false,
      formData: {
        order_id: 0,
        is_use_point: false
      },
      member: {},
      settings: {},
      showPriceDetail: false,
      priceDetail: []
    }
  },
  mixins: [mixin],
  components: {
    Group,
    Cell,
    XButton,
    Box,
    XSwitch,
    CellFormPreview
  },
  computed: {
    totalPrice () {
      let price = this.info.total_price
      if (this.formData.is_use_point) {
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
        this.formData.is_use_point = false
        return true
      }
      return false
    },
    deduction () {
      let deduction = this.member.point / this.settings.point_to_money
      if (deduction > this.info.total_price) {
        deduction = this.info.total_price
      }
      return Number(deduction).toFixed(2)
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
          this.routeTo('/member/mission/detail', { id: id })
          return false
        }

        this.info = res.data
        this.member = res.meta.member

        this.formData.order_id = res.data.id

        this.settings = res.meta.settings
        if (this.settings.switch_point_to_money) {
          this.formData.is_use_point = true
        }

        this.priceDetail = [
          {
            label: '上楼加价:',
            value: '￥ ' + res.data.upstairs_price
          }, {
            label: '超重加价:',
            value: '￥ ' + res.data.overweight_price
          }, {
            label: '跑腿赏金:',
            value: '￥ ' + res.data.bounty
          }
        ]
      })
    }
  }
}
</script>

