<template>
  <div>
    <tab :line-width="2">
      <tab-item :selected="item.value === currentStatus" v-for="(item, index) in status" @on-item-click="switchStatus" :key="index">
        {{item.label}}
      </tab-item>
    </tab>

    <!-- <loadmore :bottom-method="loadMore" :bottom-all-loaded="allLoaded" ref="loadmore"> -->
      <!-- <div> -->
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
              <x-button mini type="warn" v-if="item.status === '待支付'" @click.native="pay(item.id)">立即支付</x-button>
              <x-button mini type="warn" v-else-if="item.status === '配送中'" @click.native="completed(item.id)">确认收货</x-button>
              <x-button mini type="warn" v-else-if="item.status === '待接单'" @click.native="addBounty(item.id)">追加赏金</x-button>
              <x-button mini type="warn" v-else-if="item.status === '已完成'" @click.native="addComment(item.id)">评价</x-button>
            </div>
          </cell>
        </group>
      <!-- </div> -->
   <!-- </loadmore> -->

  </div>
</template>

<script>
import { Tab, TabItem, Group, Cell, XButton, ConfirmPlugin, ToastPlugin } from 'vux'
import { mapGetters } from 'vuex'
import Vue from 'vue'
import Loadmore from 'vue-loadmore'
import mixin from './mixin.js'

Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)

export default {
  components: {
    Tab,
    TabItem,
    Group,
    Cell,
    XButton,
    Loadmore
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
      winHeight: ''
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
  mounted () {
  },
  methods: {
    async loadMore () {
      console.log('加载更多...')
      this.currentPage += 1

      if (this.currentPage === this.totalPages) {
        this.allLoaded = true
      }

      setTimeout(() => {
        this.$http.get('/getExpress', { params: this.queryParams }).then(res => {
          this.lists = this.lists.concat(res.data)
        })
      }, 1000)
    },
    async getMissionLists (index = -1) {
      let status = this.$route.query.status
      if (index >= 0) {
        status = this.status[index].value
      }
      this.currentStatus = status

      await this.$http.get('/getExpress', { params: this.queryParams }).then(res => {
        this.lists = res.data
        this.totalPages = res.meta.pagination.total_pages
        this.$router.push({ path: '/member/mission', query: { status: status } })
      })
    },
    async switchStatus (index) {
      this.getMissionLists(index)
    }
  }
}
</script>

