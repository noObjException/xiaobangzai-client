<template>
    <div>
        <group v-for="(item, index) in lists" :key="index" v-if="lists">
            <cell :title="item.realname" :inline-desc="'下单时间: ' + item.created_at" style="border-bottom: 1px solid #D9D9D9;">
                <img slot="icon" :src="item.avatar" class="avatar" />
                <a :href="'tel:'+item.mobile">{{item.mobile}}</a>
            </cell>

            <router-link :to="'/staff/mission/detail?id='+item.id" style="color: #000;">
                <cell :title="item.express_com+' '+item.express_type">
                    <x-icon slot="icon" type="android-plane" class="g-icon" size="20" style="fill: rgb(65, 194, 215)"></x-icon>
                </cell>
                <cell :title="item.college+' '+item.area+' '+item.detail">
                    <x-icon slot="icon" type="location" class="g-icon" size="20"></x-icon>
                </cell>
                <cell :title="'送达时间: '+item.arrive_time">
                    <x-icon slot="icon" type="ios-clock-outline" class="g-icon" size="20" style="fill: rgb(255, 49, 0)"></x-icon>
                </cell>
            </router-link>

            <cell>
                <x-icon slot="icon" type="cash" class="g-icon" size="20"></x-icon>
                <span slot="title" class="text-danger">￥{{item.total_price}}</span>
                <span>
                    <x-button mini type="warn" @click.native="acceptOrder(item.id, {openid: openid})">立即接单</x-button>
                </span>
            </cell>
        </group>

        <no-content title="暂无订单" v-else>
            <x-icon type="ios-cart-outline" size="160"></x-icon>
        </no-content>
    </div>
</template>


<script>
import { Group, Cell, XButton } from 'vux'
import NoContent from 'src/components/NoContent'
import { mapGetters } from 'vuex'
import mixin from 'src/mixins/expressMission.js'
import { InfiniteScroll } from 'mint-ui'
import Vue from 'vue'
Vue.use(InfiniteScroll)

export default {
  data () {
    return {
      lists: []
    }
  },
  components: {
    Group, Cell, XButton, NoContent
  },
  computed: {
    ...mapGetters([
      'openid'
    ])
  },
  mixins: [mixin],
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      await this.$http.get('/missions').then(res => {
        this.lists = res.data
      })
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
</style>

