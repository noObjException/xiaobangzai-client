<template>
  <div>
    <transition name="router-fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <loading v-model="isLoading.status" :text="isLoading.title"></loading>
  </div>
</template>

<script>
import { Loading } from 'vux'
import { mapGetters } from 'vuex'

export default {
  created () {
    this.initJsSDK()
  },
  components: {
    Loading
  },
  computed: {
    ...mapGetters([
      'isLoading'
    ])
  },
  methods: {
    initJsSDK () {
      this.$http.get('/jsSDKConfig', {params: {request_url: location.href.split('#')[0]}}).then(res => {
        this.$wechat.config(res.data)

        this.$wechat.ready(() => {
          console.log('配置成功')
        })

        this.$wechat.error(() => {
          console.log('配置失败')
        })
      })
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import './styles/theme.less';
@import './styles/commons.less';
 .router-fade-enter-active, .router-fade-leave-active {
  transition: opacity .3s;
}
  .router-fade-enter, .router-fade-leave-active {
  opacity: 0;
}
</style>
