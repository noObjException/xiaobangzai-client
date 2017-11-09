<template>
<div>
  <tab :line-width="2" :animate='false' v-if="currentUrl === '/staff/mission/list'">
    <tab-item :selected="item.value === currentStatus" v-for="(item, index) in status" @on-item-click="switchStatus" :key="index">
      {{item.label}}
    </tab-item>
  </tab>

  <div v-if="pageList.length > 0"  class="main-body" :style="{'-webkit-overflow-scrolling': scrollMode}">
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
        <group v-for="(item, index) in pageList" :key="index" gutter="8px">
            <cell :title="item.realname" :inline-desc="'下单时间: ' + item.created_at" style="border-bottom: 1px solid #D9D9D9;">
                <img slot="icon" :src="item.avatar" class="avatar" />
                <a :href="'tel:'+item.mobile">{{item.mobile}}</a>
            </cell>

            <group gutter="0" @click.native="toDetail(item.id)">
                <cell :title="item.express_com+' '+item.express_type">
                    <x-icon slot="icon" type="android-plane" class="g-icon" size="20" style="fill: rgb(65, 194, 215)"></x-icon>
                </cell>
                <cell :title="item.college+' '+item.area+' '+item.detail">
                    <x-icon slot="icon" type="location" class="g-icon" size="20"></x-icon>
                </cell>
                <cell :title="'送达时间: '+item.arrive_time">
                    <x-icon slot="icon" type="ios-clock-outline" class="g-icon" size="20" style="fill: rgb(255, 49, 0)"></x-icon>
                </cell>
            </group>

            <cell>
                <x-icon slot="icon" type="cash" class="g-icon" size="20"></x-icon>
                <span slot="title" class="text-danger">￥{{item.total_price}}</span>
                <span v-if="isStaff">
                    <x-button mini type="warn" @click.native="acceptOrder(item.id)" v-if="item.status === '待接单'">立即接单</x-button>
                </span>
            </cell>
        </group>
    </mt-loadmore>
  </div>

  <no-content title="暂无订单" v-else>
    <x-icon type="ios-cart-outline" size="160"></x-icon>
  </no-content>
</div>
</template>

<script>
import { Loadmore as MtLoadmore } from 'mint-ui'
import { Group, Cell, XButton, Tab, TabItem } from 'vux'
import { mapGetters } from 'vuex'
import mixin from 'src/mixins/expressMission.js'
import NoContent from 'src/components/NoContent'

export default {
  data: function () {
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
      totalPages: '',
      currentPage: 1,
      pageList: [],
      allLoaded: false,
      scrollMode: 'auto'
    }
  },
  components: {
    MtLoadmore,
    Group,
    Cell,
    XButton,
    Tab,
    TabItem,
    NoContent
  },
  created () {
    this.more()
  },
  computed: {
    ...mapGetters(['openid']),
    currentUrl () {
      return this.$route.path
    },
    queryParams () {
      return {
        per_page: 15,
        status: this.currentStatus,
        page: this.currentPage
      }
    }
  },
  mixins: [mixin],
  methods: {
    loadBottom () {
      this.more()
      this.$refs.loadmore.onBottomLoaded()
    },
    async more (index = -1) {
      this.$store.commit('UPDATE_LOADING_STATUS', {isLoading: true})

      this.queryParams.page += 1

      let status = this.$route.query.status

      if (index >= 0) {
        status = this.status[index].value
      }
      this.currentStatus = status

      await this.$http.get('/missions', { params: this.queryParams }).then(res => {
        const member = res.meta.member

        if (member.is_staff) {
          this.pageList = this.pageList.concat(res.data)
          this.isStaff = true
        } else {
          this.pageList = res.data.map(item => ({
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

        this.isHaveMore(res.data.length > 0)
      })
    },
    isHaveMore (isHaveMore) {
      this.allLoaded = true
      if (isHaveMore) {
        this.allLoaded = false
      }
    },
    // 查看任务详情, 非配送员无法进入
    toDetail (id) {
      if (this.isStaff) {
        this.$router.push({ path: '/staff/mission/detail', query: { id: id } })
      }
    },
    async switchStatus (index) {
      this.pageList = []
      this.more(index)
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
.mint-loadmore-bottom {
  text-align: center;
}
</style>
