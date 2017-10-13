<template>
  <div>
    <tab :line-width="2">
      <tab-item :selected="item.value === currentStatus" v-for="(item, index) in status" @on-item-click="switchStatus" :key="index">
        {{item.label}}
      </tab-item>
    </tab>

    <div v-infinite-scroll="loadMore" :infinite-scroll-disabled="allLoaded" :infinite-scroll-immediate-check='false' :infinite-scroll-distance='10'>
      <group :title="'下单时间: '+item.created_at" label-width="5em" v-for="(item, index) in lists" :key="index" labelWidth="180px">
        <router-link :to="'mission/detail?id='+item.id" style="color: #000;">
          <cell :title="item.status" :inline-desc="'订单编号: '+item.order_num">
            <x-icon slot="icon" type="ios-email-outline" class="big-icon" size="50"></x-icon>
            <span slot="title" class="text-danger">{{item.status}}</span>
          </cell>

          <cell :title="item.express_com+'  '+item.express_type">
            <x-icon slot="icon" type="ios-information-outline" class="cell-icon" style="fill:rgb(65, 194, 215)"></x-icon>
          </cell>

          <cell :title="item.college+' '+item.area+' '+item.detail">
            <x-icon slot="icon" type="ios-location-outline" class="cell-icon"></x-icon>
          </cell>

          <cell>
            <x-icon slot="icon" type="social-usd-outline" class="cell-icon" style="fill:rgb(6255, 90, 0)"></x-icon>
            <span slot="title" class="text-danger">￥ {{item.total_price}}</span>
          </cell>
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
    queryParams () {
      return {
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
      let data = {pay_type: payType}
      this.pay(this.payId, data)
    }
  }
}
</script>

<style lang="less" scoped>
.big-icon{
  fill: rgb(255, 90, 0);
  margin-right: 2px;
}
.cell-icon{
  width: 20px;
  vertical-align:middle;
  margin:0 16px;
}
</style>

