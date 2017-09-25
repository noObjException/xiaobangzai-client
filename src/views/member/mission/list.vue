<template>
  <div>
        <tab :line-width="2">
            <tab-item :selected="item.value === currentStatus" v-for="(item, index) in status" @on-item-click="switchStatus" :key="index">
                {{item.label}}
            </tab-item>
        </tab>

        <group :title="'下单时间: '+item.created_at" label-width="5em" v-for="(item, index) in lists" :key="index">
            <router-link :to="'mission/detail?id='+item.id" style="color: #000;">
              <cell title="订单状态:">
                  <span class="text-danger">{{item.status}}</span>
              </cell>
              <cell title="订单编号:" :value="item.order_num"></cell>
              <cell title="快递公司:" :value="item.express_com"></cell>
              <cell title="货物信息:" :value="item.express_type"></cell>
              <cell title="收货地址:" :value="item.college+' '+item.area+' '+item.detail" value-align="right" align-items="flex-start"></cell>
              <cell title="订单金额:" :value="'￥ '+item.total_price"></cell>
            </router-link>
            <cell>
                <x-button mini>取消订单</x-button>
                <x-button mini type="warn" v-if="item.status === '待支付'">立即支付</x-button>
                <x-button mini type="warn" v-if="item.status === '配送中'">确认收货</x-button>
                <x-button mini type="warn" v-if="item.status === '待接单'">追加赏金</x-button>
                <x-button mini type="warn" v-if="item.status === '已完成'">评价</x-button>
            </cell>
        </group>
    </div>
</template>

<script>
import { Tab, TabItem, Group, Cell, XButton } from 'vux'
import { mapGetters } from 'vuex'

export default {
  components: {
    Tab,
    TabItem,
    Group,
    Cell,
    XButton
  },
  data () {
    return {
      status: [
          {label: '全部', value: 'all'},
          {label: '待支付', value: 'waitPay'},
          {label: '待接单', value: 'waitOrder'},
          {label: '配送中', value: 'processing'},
          {label: '已完成', value: 'completed'}],
      lists: [],
      currentStatus: ''
    }
  },
  computed: {
    ...mapGetters([
      'openid'
    ])
  },
  created () {
    this.getMissionLists()
  },
  methods: {
    async getMissionLists (index = 0) {
      let state = this.$route.query.status
      if (index) {
        state = this.status[index].value
      }
      this.currentStatus = state

      let params = {openid: this.openid, status: state}
      await this.$http.get('/memberMissions', {params: params}).then(res => {
        this.lists = res.data
      })
    },
    switchStatus (index) {
      this.getMissionLists(index)
    }
  }
}
</script>

<style lang="less" scoped>
.left-icon{
    margin-right: 6px;
    width: 18px;
}
</style>

