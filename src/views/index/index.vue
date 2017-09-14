<template>
  <div class="container">
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
          <marquee-item v-for="(item, index) in notices" :key="index">{{item.title}}</marquee-item>
        </marquee>
      </cell>
    </group>

    <div class="cube">
      <flexbox>
        <flexbox-item>
          <router-link :to="cubes[0].url" class="cube-left">
            <div class="icon">
              <img :src="BASE_IMG + cubes[0].image">
            </div>
            <h3>{{cubes[0].title}}</h3>
            <p>{{cubes[0].desc}}</p>
          </router-link>
        </flexbox-item>

        <flexbox-item>
          <flexbox>
            <flexbox-item style="margin-bottom:10px">
              <router-link :to="cubes[1].url" class="cube-right">
                <div class="icon">
                  <img :src="BASE_IMG + cubes[1].image">
                </div>
                <h3>{{cubes[1].title}}</h3>
                <p>{{cubes[1].desc}}</p>
              </router-link>
            </flexbox-item>
          </flexbox>

          <flexbox>
            <flexbox-item>
              <router-link :to="cubes[2].url" class="cube-right">
                <div class="icon">
                  <img :src="BASE_IMG + cubes[2].image">
                </div>
                <h3>{{cubes[2].title}}</h3>
                <p>{{cubes[2].desc}}</p>
              </router-link>
            </flexbox-item>
          </flexbox>
        </flexbox-item>
      </flexbox>
    </div>

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
      navs: [],
      notices: [],
      cubes: []
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
        this.notices = data.notices
        this.cubes = data.cubes
      })
    }
  }

}
</script>

<style lang="less" scoped>
.container {
  margin-bottom: 20%;
}

.navs {
  text-align: center;
  padding-top: 10px;
  height: auto;
  display: block;
  .icon {
    height: 48px;
    img {
      height: 100%;
      width: 60%;
    }
  }
  .label {
    color: #000;
    font-size: 12px;
  }
}

.cube {
  margin: 6px;
  text-align: center;
  .cube-left {
    text-align: center;
    height: 200px;
    padding: 120px 20px 10px 20px;
    border: 1px solid #444;
    border-radius: 10px;
    display: block;
    color: #000;
    img {
      width: 48%;
    }
    p {
      font-size: 12px;
    }
  }
  .cube-right {
    text-align: center;
    height: 120px;
    padding: 40px 20px 0 20px;
    border: 1px solid #444;
    border-radius: 10px;
    display: block;
    color: #000;
    img {
      width: 40%;
    }
    p {
      font-size: 12px;
    }
  }
}
</style>
