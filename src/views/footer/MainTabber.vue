<template>
    <tabbar class="footer">
      <tabbar-item v-for="(item, index) in tabbars" :key="index">
        <img slot="icon" :src="item.icon">
        <p slot="label">{{item.label}}</p>
      </tabbar-item>
    </tabbar>
</template>

<script>
import { Tabbar, TabbarItem, Swiper, SwiperItem } from 'vux'

export default {
  components: {
    Swiper,
    SwiperItem,
    Tabbar,
    TabbarItem
  },
  ready () {

  },
  methods: {
  },
  data () {
    return {
      tabbars: [
        {
          label: '首页',
          url: '/',
          icon: 'static/logo.png'
        },
        {
          label: '任务大厅',
          url: '/mission',
          icon: 'static/logo.png'
        },
        {
          label: '我的任务',
          url: '/myMission',
          icon: 'static/logo.png'
        },
        {
          label: '个人中心',
          url: '/member',
          icon: 'static/logo.png'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.footer{
  position: fixed;
  left: 0;
  bottom: 0;
}
</style>

