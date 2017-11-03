<template>
  <div>
    <tab :line-width="2" :animate='false'>
      <tab-item :selected="item.value === currentStatus" v-for="(item, index) in status" @on-item-click="switchStatus" :key="index">
        {{item.label}}
      </tab-item>
    </tab>

    <div v-infinite-scroll="loadMore" :infinite-scroll-disabled="allLoaded" :infinite-scroll-immediate-check='false' :infinite-scroll-distance='10' v-if="lists.length > 0">
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
            <x-button mini type="warn" v-if="item.status === '待支付'" @click.native="wxPay({order_id: item.id})">立即支付</x-button>
            <x-button mini type="warn" v-else-if="item.status === '配送中'" @click.native="completed(item.id)">确认收货</x-button>
            <x-button mini type="warn" v-else-if="item.status === '待接单'" @click.native="addBounty(item.id)">追加赏金</x-button>
            <x-button mini type="warn" v-else-if="item.status === '已完成'" @click.native="addComment(item.id)">评价</x-button>
          </div>
        </cell>
      </group>
      <load-more background-color="#fbf9fe" :show-loading="false" tip="没有更多了" v-if="allLoaded"></load-more>
    </div>

    <no-content title="暂无订单" v-else>
      <x-icon type="ios-cart-outline" size="160"></x-icon>
    </no-content>
  </div>
</template>

<script>
import { Tab, TabItem, Group, Cell, XButton, ConfirmPlugin, ToastPlugin, Actionsheet, LoadMore } from 'vux'
import NoContent from 'src/components/NoContent'
import { InfiniteScroll } from 'mint-ui'
import Vue from 'vue'
Vue.use(InfiniteScroll)
import mixin from 'src/mixins/expressMission.js'

Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)

export default {
  components: {
    Tab, TabItem, Group, Cell, XButton, ConfirmPlugin, ToastPlugin, Actionsheet, LoadMore, NoContent
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
      showPayType: false
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
      this.$store.commit('UPDATE_LOADING_STATUS', {isLoading: true})

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

      this.$store.commit('UPDATE_LOADING_STATUS', {isLoading: false})
    },
    async switchStatus (index) {
      this.getMissionLists(index)
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

