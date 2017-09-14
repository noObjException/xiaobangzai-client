<template>
  <div>
    <swiper :list="swipers"></swiper>

    <flexbox>
      <flexbox-item v-for="(item, index) in navs" :key="index">
        <router-link :to="item.url" class="navs">
          <div class="icon">
            <img :src="BASE_IMG + item.image" />
          </div>
          <div class="label">
            {{item.title}}
          </div>
        </router-link>
      </flexbox-item>
    </flexbox>

     <group>
      <cell>
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=">
      
        <marquee>
          <marquee-item v-for="i in 5" :key="i">JavaScript is the best language</marquee-item>
        </marquee>
      </cell>
    </group>

    <main-tabber></main-tabber>
  </div>
</template>

<script>
import { Swiper, SwiperItem, Flexbox, FlexboxItem, Group, Cell, Marquee, MarqueeItem } from 'vux'
import MainTabber from '../footer/MainTabber'

export default {
  data () {
    return {
      BASE_IMG: process.env.BASE_IMG,
      swipers: [],
      navs: []
    }
  },
  components: {
    Swiper,
    SwiperItem,
    MainTabber,
    Flexbox,
    FlexboxItem,
    Group,
    Cell,
    Marquee,
    MarqueeItem
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      await this.$http.get('/index').then(res => {
        let data = res.data
        this.swipers = data.swipers.map(item => ({
          img: this.BASE_IMG + item.image,
          url: item.url,
          title: item.desc
        }))
        this.navs = data.navs
      })
    }
  }

}
</script>

<style lang="less" scoped>
.navs {
  text-align: center;
  padding-top: 10px;
  height: auto;
  display: block;
  .icon {
    height: 48px;
    img{
      height: 100%;
      width: 60%;
    }
  }
  .label{
    color: #000;
    font-size: 12px; 
  }
}
</style>
