<template>
<div>
  <tab :line-width="2" :animate='false' v-if="showTabs">
    <tab-item :selected="item.value === currentStatus" v-for="(item, index) in status" @on-item-click="switchStatus" :key="index">
      {{item.label}}
    </tab-item>
  </tab>

  <div v-if="lists.length > 0" style="-webkit-overflow-scrolling: touch">
    <group v-for="(item, index) in lists" :key="index" gutter="8px">
        <cell :title="item.realname" :inline-desc="'下单时间: ' + item.created_at" style="border-bottom: 1px solid #D9D9D9;">
            <img slot="icon" :src="item.avatar" class="avatar" />
            <a :href="'tel:'+item.mobile">{{item.mobile}}</a>
        </cell>

        <cell :title="item.express_com+' '+item.pickup_code+' '+(item.upstairs_price > 0 ? '送到宿舍' : '')" @click.native="toDetail(item.id)">
            <x-icon slot="icon" type="android-plane" class="g-icon" size="20" style="fill: rgb(65, 194, 215)"></x-icon>
        </cell>
        <cell :title="item.college+' '+item.area+' '+item.detail" @click.native="toDetail(item.id)">
            <x-icon slot="icon" type="location" class="g-icon" size="20"></x-icon>
        </cell>
        <cell :title="'送达时间: '+item.arrive_time" @click.native="toDetail(item.id)">
            <x-icon slot="icon" type="ios-clock-outline" class="g-icon" size="20" style="fill: rgb(255, 49, 0)"></x-icon>
        </cell>

        <cell>
            <x-icon slot="icon" type="cash" class="g-icon" size="20"></x-icon>
            <span slot="title" class="text-danger">￥{{item.total_price}}</span>
            <span v-if="isStaff">
                <x-button mini type="warn" @click.native="acceptOrder(item.id)" v-if="item.status === '待接单'">立即接单</x-button>
            </span>
        </cell>
    </group>

    <x-button class="loadmore-bottom" @click.native="loadData()" v-show="!loading && !allLoaded">点击加载更多</x-button>
    <load-more :show-loading="loading" :tip="loadMoreTip" background-color="#fbf9fe" v-show="loading || allLoaded"></load-more>
  </div>

  <no-content title="暂无订单" v-else>
    <x-icon type="ios-cart-outline" size="160"></x-icon>
  </no-content>
</div>
</template>

<script>
import { Group, Cell, XButton, Tab, TabItem, LoadMore } from 'vux'
import mixin from 'src/mixins/expressMission.js'
import NoContent from 'src/components/NoContent'

export default {
  data () {
    return {
      isStaff: false,
      status: [
        { label: '全部', value: 'all' },
        { label: '待接单', value: 'waitOrder' },
        { label: '配送中', value: 'processing' },
        { label: '已完成', value: 'completed' },
        { label: '已取消', value: 'canceled' }
      ],
      currentStatus: '',
      totalPages: 0,
      currentPage: 0,
      lists: [],
      allLoaded: false,
      loading: false
    }
  },
  components: {
    Group,
    Cell,
    XButton,
    Tab,
    TabItem,
    NoContent,
    LoadMore
  },
  created () {
    this.loadData(true)
  },
  computed: {
    // 用于任务大厅中隐藏状态tab
    showTabs () {
      return this.$route.name === 'staff.mission.list'
    },
    queryParams () {
      return {
        per_page: 25,
        status: this.currentStatus,
        page: this.currentPage
      }
    },
    loadMoreTip () {
      if (this.loading && !this.allLoaded) {
        return '正在加载中'
      } else {
        return '没有更多了'
      }
    }
  },
  mixins: [mixin],
  beforeRouteUpdate (to, from, next) {
    this.currentStatus = to.params.status
    this.loadData(true)
    next()
  },
  methods: {
    async loadData (loading = false) {
      this.currentPage += 1
      this.loading = true

      if (!this.currentStatus) {
        this.currentStatus = this.$route.params.status
      }

      await this.$http.get('/missions', { params: this.queryParams }).then(res => {
        const member = res.meta.member

        this.totalPages = res.meta.pagination.total_pages

        if (member.is_staff) {
          this.lists = [...this.lists, ...res.data]
          this.isStaff = true
        } else {
          this.lists = res.data.map(item => ({
            id: item.id,
            realname: item.realname.slice(0, 1) + '**',
            mobile: '',
            created_at: item.created_at,
            avatar: item.avatar,
            express_com: item.express_com,
            express_type: item.express_type,
            college: item.college,
            area: item.area,
            detail: item.detail,
            arrive_time: item.arrive_time,
            total_price: item.total_price
          }))
        }
      })

      if (this.currentPage === this.totalPages) {
        this.allLoaded = true
      }

      this.loading = false
    },
    // 查看任务详情, 非配送员无法进入
    toDetail (id) {
      if (this.isStaff) {
        this.$router.push({ path: '/staff/mission/detail', query: { id: id } })
      }
    },
    async switchStatus (index) {
      this.lists = []
      this.currentPage = 0
      this.allLoaded = false
      this.$router.push({ path: '/staff/mission/list/' + this.status[index].value })
    }
  }
}
</script>

<style lang="less" scoped>
.avatar {
  width: 40px;
  margin-right: 6px;
  border-radius: 50%;
}
.loadmore-bottom{
  margin: 8px auto;
  text-align: center;
  background-color: #fff;
}
</style>
