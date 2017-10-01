<template>
    <div>
        <group v-for="(item, index) in lists" :key="index">
            <router-link :to="'detail?id='+item.id" style="color: #000;">
                <cell :title="item.realname" :inline-desc="'下单时间: ' + item.created_at">
                    <img slot="icon" :src="item.avatar" class="avatar" />
                    <span class="text-danger">
                        {{item.status}}
                    </span>
                </cell>

                <cell :title="item.express_com+' '+item.express_type">
                    <x-icon slot="icon" type="android-plane" class="g-icon" size="20"></x-icon>
                </cell>
                <cell :title="item.college+' '+item.area+' '+item.detail">
                    <x-icon slot="icon" type="location" class="g-icon" size="20"></x-icon>
                </cell>
                <cell :title="'送达时间: '+item.arrive_time">
                    <x-icon slot="icon" type="ios-clock-outline" class="g-icon" size="20"></x-icon>
                </cell>
            </router-link>
            
            <cell>
                <x-icon slot="icon" type="cash" class="g-icon" size="20"></x-icon>
                <span slot="title" class="text-danger">￥{{item.total_price}}</span>
                <span>
                    <x-button mini type="warn">立即接单</x-button>
                </span>
            </cell>
        </group>
    </div>
</template>

<script>
import { Group, Cell, XButton } from 'vux'

export default {
  data () {
    return {
      lists: []
    }
  },
  components: {
    Group, Cell, XButton
  },
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
    width: 50px;
    margin-right: 6px;
    border-radius: 50%;
}
</style>

