<template>
  <div>
    <tab :line-width="2">
      <tab-item :selected="item.value === currentStatus" v-for="(item, index) in status" @on-item-click="switchStatus" :key="index">
        {{item.label}}
      </tab-item>
    </tab>

    <div v-infinite-scroll="loadMore" :infinite-scroll-disabled="allLoaded" :infinite-scroll-immediate-check='false' :infinite-scroll-distance='10'>
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
          <div>
            <x-button mini v-if="item.status === '待支付'" @click.native="cancel(item.id)">取消订单</x-button>
            <x-button mini type="warn" v-if="item.status === '待支付'" @click.native="payType(item.id)">立即支付</x-button>
            <x-button mini type="warn" v-else-if="item.status === '配送中'" @click.native="completed(item.id)">确认收货</x-button>
            <x-button mini type="warn" v-else-if="item.status === '待接单'" @click.native="addBounty(item.id)">追加赏金</x-button>
            <x-button mini type="warn" v-else-if="item.status === '已完成'" @click.native="addComment(item.id)">评价</x-button>
          </div>
        </cell>
      </group>
      <load-more background-color="#fbf9fe" :show-loading="false" tip="没有更多了" v-if="allLoaded"></load-more>
    </div>

    <actionsheet v-model="showPayType" :menus="payTypes" @on-click-menu="handlePay" show-cancel>
      <p slot="header">请选择支付方式</p>
    </actionsheet>
  </div>
</template>

<script>
import { Tab, TabItem, Group, Cell, XButton, ConfirmPlugin, ToastPlugin, Actionsheet, LoadMore } from 'vux'
import { mapGetters } from 'vuex'
import { InfiniteScroll } from 'mint-ui'
import Vue from 'vue'
Vue.use(InfiniteScroll)
import mixin from 'src/mixins/expressMission.js'

Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)

export default {
  components: {
    Tab,
    TabItem,
    Group,
    Cell,
    XButton,
    Actionsheet,
    LoadMore
  },
  mixins: [mixin],
  data () {
    return {
      status: [
        { label: '全部', value: 'all' },
        { label: '待支付', value: 'waitPay' },
        { label: '待接单', value: 'waitOrder' },
        { label: '配送中', value: 'processing' },
        { label: '已完成', value: 'completed' }],
      lists: [],
      currentStatus: '',
      currentPage: 1,
      totalPages: '',
      allLoaded: false,
      showPayType: false,
      payTypes: [{
        label: '微信支付',
        value: 'WECHAT_PAY'
      }, {
        label: '余额支付',
        value: 'BALANCE_PAY'
      }],
      payId: 0
    }
  },
  computed: {
    ...mapGetters([
      'openid'
    ]),
    queryParams () {
      return {
        openid: this.openid,
        per_page: 15,
        status: this.currentStatus,
        page: this.currentPage
      }
    }
  },
  created () {
    this.getMissionLists()
  },
  methods: {
    async loadMore () {
      if (this.currentPage === this.totalPages) {
        this.allLoaded = true
      } else {
        this.currentPage += 1
        this.$http.get('/getExpress', { params: this.queryParams }).then(res => {
          this.lists = this.lists.concat(res.data)
        })
      }
    },
    async getMissionLists (index = -1) {
      this.currentPage = 1
      let status = this.$route.query.status
      if (index >= 0) {
        status = this.status[index].value
      }
      this.currentStatus = status

      await this.$http.get('/getExpress', { params: this.queryParams }).then(res => {
        this.lists = res.data
        this.totalPages = res.meta.pagination.total_pages
      })
    },
    async switchStatus (index) {
      this.getMissionLists(index)
    },
    async payType (id) {
      this.showPayType = true
      this.payId = id
    },
    async handlePay (payType) {
      this.pay(this.payId, payType)
    }
  }
}
</script>

