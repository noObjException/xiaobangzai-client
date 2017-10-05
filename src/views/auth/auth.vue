<template>
  
</template>

<script>
import Utils from 'src/libs/utils.js'

export default {
  data () {
    return {
      BASE_API: process.env.BASE_API
    }
  },
  created () {
    console.log('sox/...')
    if (!Utils.getLocalStorage('memberInfo')) {
      let ua = window.navigator.userAgent.toLowerCase()
      console.log(ua.match(/MicroMessenger/i))
    //   if (ua.match(/MicroMessenger/i) === 'micromessenger') {
      window.location.href = this.BASE_API + '/openid'
    //   }
    } else {
      this.login()
    }
  },
  methods: {
    login () {
      let url = this.BASE_API + '/authMember'
      this.$http.get(url).then(res => {
        this.$store.commit('memberInfo', res.data)
        setTimeout(() => {
          this.goBeforeLoginUrl()
        }, 1500)
      })
    }
  }
}
</script>

<style>

</style>
