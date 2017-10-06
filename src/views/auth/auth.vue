<template>
  
</template>

<script>
import { cookie } from 'vux'

export default {
  data () {
    return {
      BASE_URL: process.env.BASE_URL
    }
  },
  created () {
    console.log('sox/...')
    if (!cookie.get('token')) {
      let ua = window.navigator.userAgent.toLowerCase()
      console.log(ua.match(/MicroMessenger/i))
    //   if (ua.match(/MicroMessenger/i) === 'micromessenger') {
      window.location.href = this.BASE_URL + '/openid'
    //   }
    } else {
      this.login()
    }
  },
  methods: {
    login () {
      let url = this.BASE_URL + '/authMember'
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
