<template>
  <div>
    <swiper :list="list"></swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from 'vux'

const baseList = [{
  url: 'javascript:',
  img: 'https://static.vux.li/demo/1.jpg',
  title: '送你一朵fua'
}, {
  url: 'javascript:',
  img: 'https://static.vux.li/demo/2.jpg',
  title: '送你一辆车'
}, {
  url: 'javascript:',
  img: 'https://static.vux.li/demo/5.jpg',
  title: '送你一次旅行',
  fallbackImg: 'https://static.vux.li/demo/3.jpg'
}]

export default {
  components: {
    Swiper,
    SwiperItem
  },
  ready () {

  },
  methods: {
  },
  data () {
    return {
      list: baseList
    }
  }
}
</script>

<style>

</style>
