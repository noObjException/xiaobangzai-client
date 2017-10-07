<template>
  
</template>

<script>
import { cookie } from 'vux'

export default {
  data () {
    return {
      BASE_URL: process.env.BASE_URL,
      BASE_API: process.env.BASE_API
    }
  },
  created () {
    if (!cookie.get('token')) {
      console.log(cookie.get('token'))
      // let ua = window.navigator.userAgent.toLowerCase()
      // if (ua.match(/MicroMessenger/i) === 'micromessenger') {
      window.location.href = this.BASE_URL + '/token'
      // }
    } else {
      console.log('登录')
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
