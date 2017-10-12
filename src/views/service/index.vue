<template>
    <div>
        <tab :line-width="2" active-color='#fc378c'>
            <tab-item disabled @click.native="routeTo('/member')">
                <x-icon type="android-person" class="avatar"></x-icon>
            </tab-item>
            <tab-item :selected="index === 0" v-for="(item, index) in services" @click.native="chooseService(item.url)" :key="index">{{item.title}}</tab-item>
        </tab>

        <router-view></router-view>
    </div>
</template>

<script>
import { Tab, TabItem } from 'vux'

export default {
  components: {
    Tab,
    TabItem
  },
  data () {
    return {
      services: [
        { title: '取快递', url: '/service/getExpress/create' },
        { title: '任务大厅', url: '/service/getExpress/list' },
        { title: '自由市场', url: '' },
        { title: '二手书籍', url: '' }
      ]
    }
  },
  methods: {
    chooseService (url) {
      this.$router.push(url)
    }
  }
}
</script>

<style lang="less" scoped>
.avatar{
  width: 24px;
  vertical-align:middle;
  border-radius: 50%;
  border: 1px solid #000;
}
</style>

