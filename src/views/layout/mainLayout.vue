<template>
    <div style="height: 100%;">
        <view-box ref="viewBox">
        <x-header slot="header">youbang</x-header>

            <router-view></router-view>

            <tabbar slot="bottom" style="position:fixed;">
                <tabbar-item v-for="(item, index) in tabbars" :key="index" :link="item.url">
                    <img slot="icon" :src="item.icon">
                    <p slot="label">{{item.label}}</p>
                </tabbar-item>
            </tabbar>
        </view-box>
    </div>
</template>

<script>
import { XHeader, ViewBox, Tabbar, TabbarItem } from 'vux'
export default {
  components: {
    XHeader,
    ViewBox,
    Tabbar,
    TabbarItem
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
          url: '/staff',
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

<style>

</style>

