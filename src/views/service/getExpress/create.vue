<template>
    <div>
        <group>
            <cell :title="info.realname+ ' '+info.mobile" :inline-desc="info.college+ ' ' +info.area"></cell>
        </group>

        <group>
            <cell title="快递公司:" :value="info.express_com"></cell>
            <cell title="物品信息:" :value="info.express_type+'/'+info.express_weight"></cell>
            <cell title="送达时间:" :value="info.arrive_time"></cell>
            <cell title="跑腿赏金:" :value="'￥ '+info.bounty"></cell>
            <x-textarea title="备注信息:" v-model="info.remark" readonly></x-textarea>
        </group>

        <group>
            <cell title="应付金额:" :value="'￥ '+total_price"></cell>
        </group>

        <box gap="40px 6px">
            <x-button type="primary" @click.native="routeTo('pay?='+info.id)">立即支付</x-button>
        </box>
    </div>
</template>

<script>
import { Group, Cell, XButton, Box, XTextarea, PopupRadio, ToastPlugin } from 'vux'
import Vue from 'vue'
Vue.use(ToastPlugin)

export default {
  data () {
    return {
      info: {}
    }
  },
  components: {
    Group, Cell, XButton, Box, XTextarea, PopupRadio
  },
  computed: {
    total_price () {
      let price = 0
      price = this.info.total_price
      return price
    }
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      let id = this.$route.query.id
      if (!id) { }

      await this.$http.get('/getExpress/' + id).then(res => {
        this.info = res.data
      })
    }
  }
}
</script>

<style>

</style>

