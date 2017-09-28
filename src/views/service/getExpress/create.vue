<template>
    <div>
        <group>
            <cell :title="info.address.realname+ ' '+info.address.mobile" :inline-desc="info.address.college+ ' ' +info.address.area"></cell>
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
            <x-button type="primary" @click.native="createMission">确认下单</x-button>
        </box>
    </div>
</template>

<script>
import { Group, Cell, XButton, Box, XTextarea, PopupRadio, ToastPlugin } from 'vux'
import Vue from 'vue'
import { mapGetters } from 'vuex'

Vue.use(ToastPlugin)

export default {
  data () {
    return {
      info: '',
      settings: {}
    }
  },
  components: {
    Group, Cell, XButton, Box, XTextarea, PopupRadio
  },
  computed: {
    ...mapGetters([
      'openid',
      'expressMissionInfo'
    ]),
    total_price () {
      let price = 0
      price = this.settings.price + this.info.bounty
      return price
    }
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      this.info = this.expressMissionInfo
      await this.$http.get('/expressMission/create').then(res => {
        this.settings = res.data.settings
      })
    },
    async createMission () {
      await this.$http.post('/getExpress', this.expressMissionInfo).then(res => {
        this.$store.dispatch('saveExpressMissionInfo', null)

        let id = res.data.id
        let that = this

        this.$vux.toast.show({
          type: 'text',
          text: '下单成功',
          position: 'middle',
          onShow () {
            that.$router.push({path: '/service/getExpress/pay', query: {id: id}})
          }
        })
      })
    }
  }
}
</script>

