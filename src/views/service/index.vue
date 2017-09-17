<template>
    <div>
        <tab :line-width="2" active-color='#fc378c'>
            <tab-item>
                <img src="../../assets/logo.png" width="20"/>
            </tab-item>
            <tab-item :selected="index === 0" v-for="(item, index) in services" @click="demo2 = item" :key="index">{{item}}</tab-item>
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
      services: ['取快递', '任务大厅', '自由市场', '发现好货']
    }
  }
}
</script>

<style lang="less" scoped>
</style>

