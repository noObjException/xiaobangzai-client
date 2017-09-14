<template>
    <tabbar>
      <tabbar-item v-for="(item, index) in tabbars" :key="index">
        <img slot="icon" src="../../assets/logo.png">
        <span slot="label">{{item.label}}</span>
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
          icon: ''
        },
        {
          label: '任务大厅',
          url: '/mission',
          icon: ''
        },
        {
          label: '我的任务',
          url: '/myMission',
          icon: ''
        },
        {
          label: '个人中心',
          url: '/member',
          icon: ''
        }
      ]
    }
  }
}
</script>
