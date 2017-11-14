<template>
  <div>
    <tab :line-width="2" :animate='false'>
      <tab-item :selected="item.value === currentStatus" v-for="(item, index) in status" @on-item-click="switchStatus" :key="index">
        {{item.label}}
      </tab-item>
    </tab>

    <div v-if="lists.length > 0" style="-webkit-overflow-scrolling: touch"> 
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" @bottom-status-change="handleBottomChange">
        <group :title="'下单时间: '+item.created_at" label-width="5em" v-for="(item, index) in lists" :key="index" labelWidth="180px">
          <router-link :to="'/member/mission/detail?id='+item.id" style="color: #000;">
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
              <x-button mini type="warn" v-if="item.status === '待支付'" @click.native="wxPay({order_id: item.id})">立即支付</x-button>
              <x-button mini type="warn" v-else-if="item.status === '配送中'" @click.native="completed(item.id)">确认收货</x-button>
              <x-button mini type="warn" v-else-if="item.status === '待接单'" @click.native="addBounty(item.id)">追加赏金</x-button>
              <x-button mini type="warn" v-else-if="item.status === '已完成'" @click.native="addComment(item.id)">评价</x-button>
            </div>
          </cell>
        </group>

        <div slot="bottom" class="loadmore-bottom">
              <span v-show="bottomStatus === 'loading'">加载中<inline-loading></inline-loading></span>
              <span v-show="allLoaded === true">没有更多了</span>
        </div>
      </mt-loadmore>
    </div>

    <no-content title="暂无订单" v-else>
      <x-icon type="ios-cart-outline" size="160"></x-icon>
    </no-content>
  </template>
</template>

<script>
import { Loadmore as MtLoadmore } from 'mint-ui'
import { Tab, TabItem, Group, Cell, XButton, ConfirmPlugin, ToastPlugin, Actionsheet, InlineLoading } from 'vux'
import NoContent from 'src/components/NoContent'
import mixin from 'src/mixins/expressMission.js'
import Vue from 'vue'

Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)

export default {
  components: {
    Tab, TabItem, Group, Cell, XButton, ConfirmPlugin, ToastPlugin, Actionsheet, MtLoadmore, NoContent, InlineLoading
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
      currentPage: 0,
      totalPages: 0,
      allLoaded: false,
      bottomStatus: ''
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
    this.loadData(true)
  },
  beforeRouteUpdate (to, from, next) {
    this.currentStatus = to.params.status
    this.loadData(true)
    next()
  },
  methods: {
    async loadBottom () {
      await this.loadData()
      await this.$refs.loadmore.onBottomLoaded()
    },
    async loadData (loading = false) {
      this.$store.commit('UPDATE_LOADING_STATUS', { title: '加载中...', status: loading })

      this.currentPage += 1

      if (!this.currentStatus) {
        this.currentStatus = this.$route.params.status
      }

      await this.$http.get('/getExpress', { params: this.queryParams }).then(res => {
        this.lists = this.lists.concat(res.data)
        this.totalPages = res.meta.pagination.total_pages
      })

      if (this.currentPage === this.totalPages) {
        this.allLoaded = true
      }

      this.$store.commit('UPDATE_LOADING_STATUS', { status: false })
    },
    async switchStatus (index) {
      this.lists = []
      this.currentPage = 0
      this.allLoaded = false
      this.$router.push({ path: '/member/mission/list/' + this.status[index].value })
    },
    async handleBottomChange (status) {
      this.bottomStatus = status
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
.loadmore-bottom{
  text-align: center;
}
</style>

