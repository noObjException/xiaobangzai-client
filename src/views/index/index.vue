<template>
  <div>
    <swiper :list="swipers" auto></swiper>

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

    <div class="notice">
    <flexbox>
      <flexbox-item :span="1">
        <icon type="info"></icon>
      </flexbox-item>
      <flexbox-item :span="9">
        <swiper auto height="30px" direction="vertical" :show-dots="false">
          <swiper-item v-for="(item, index) in notices" :key="index">
            <router-link :to="item.url">
            {{item.title}}
            </router-link>
            </swiper-item>
        </swiper>
      </flexbox-item>
    </flexbox>
    </div>

    <div class="cube">
      <flexbox>
        <flexbox-item>
          <router-link :to="String(cubes.left.url)" class="cube-left">
            <div class="icon">
              <img :src="BASE_IMG + cubes.left.image">
            </div>
            <h3>{{cubes.left.title}}</h3>
            <p>{{cubes.left.desc}}</p>
          </router-link>
        </flexbox-item>

        <flexbox-item>
          <flexbox>
            <flexbox-item style="margin-bottom:10px">
              <router-link :to="String(cubes.top.url)" class="cube-right">
                <div class="icon">
                  <img :src="BASE_IMG + cubes.top.image">
                </div>
                <h3>{{cubes.top.title}}</h3>
                <p>{{cubes.top.desc}}</p>
              </router-link>
            </flexbox-item>
          </flexbox>

          <flexbox>
            <flexbox-item>
              <router-link :to="String(cubes.bottom.url)" class="cube-right">
                <div class="icon">
                  <img :src="BASE_IMG + cubes.bottom.image">
                </div>
                <h3>{{cubes.bottom.title}}</h3>
                <p>{{cubes.bottom.desc}}</p>
              </router-link>
            </flexbox-item>
          </flexbox>
        </flexbox-item>
      </flexbox>
    </div>

    
  </div>
</template>

<script>
import { Swiper, SwiperItem, Flexbox, FlexboxItem, Group, Cell, Icon } from 'vux'

export default {
  data () {
    return {
      BASE_IMG: process.env.BASE_IMG,
      swipers: [],
      navs: [],
      notices: [],
      cubes: {
        left: [],
        top: [],
        bottom: []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem,
    Flexbox,
    FlexboxItem,
    Group,
    Cell,
    Icon
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
        this.cubes = {
          left: data.cubes[0],
          top: data.cubes[1],
          bottom: data.cubes[2]
        }
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

.notice{
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  line-height: 30px;
}
</style>
