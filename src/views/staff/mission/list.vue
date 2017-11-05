<template>
  <div v-if="pageList.length > 0"  class="main-body" :style="{'-webkit-overflow-scrolling': scrollMode}">
    <v-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false"
          ref="loadmore">
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
                        <x-button mini type="warn" @click.native="acceptOrder(item.id)">立即接单</x-button>
                    </span>
            </cell>
        </group>
    </v-loadmore>
  </div>
</template>
<script>
  import {Loadmore} from 'mint-ui'
  import { Group, Cell, XButton } from 'vux'
  import { mapGetters } from 'vuex'
  import mixin from 'src/mixins/expressMission.js'

  export default {
    data: function () {
      return {
        searchCondition: {
          page: '1',
          pageSize: '10'
        },
        pageList: [],
        allLoaded: false,
        scrollMode: 'auto',
        isStaff: false
      }
    },
    components: {
      'v-loadmore': Loadmore,
      Group,
      Cell,
      XButton
    },
    created () {
      this.more()
    },
    computed: {
      ...mapGetters([
        'openid'
      ])
    },
    mixins: [mixin],
    methods: {
      loadBottom: function () {
        this.more()
        this.$refs.loadmore.onBottomLoaded()
      },
      more: function () {
        this.searchCondition.page = parseInt(this.searchCondition.page) + 1

        this.$http.get('/missions', {params: this.searchCondition}).then(res => {
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
      isHaveMore: function (isHaveMore) {
        this.allLoaded = true
        if (isHaveMore) {
          this.allLoaded = false
        }
      },
      toDetail (id) {
        if (this.isStaff) {
          this.$router.push({path: '/staff/mission/detail', query: {id: id}})
        }
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
