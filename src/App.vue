<template>
  <div>
    <transition name="router-fade" mode="out-in">
			<keep-alive>
			    <router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
    	</transition>
    	<transition name="router-fade" mode="out-in">
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</transition>

    <loading v-model="isLoading.status" :text="isLoading.title"></loading>
  </div>
</template>

<script>
import { Loading } from 'vux'
import { mapGetters } from 'vuex'
import Utils from 'src/libs/utils.js'

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
      if (Utils.isWechat()) {
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
