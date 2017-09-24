<template>
  <div>
    <div class="avatar">
      <img :src="avatar"/>
      <p>{{nickname}}</p>
    </div>
    <group>
      <cell title="我的订单" value="查看全部任务" is-link link="/member/mission">
        <img slot="icon" width="20" src="../../assets/logo.png" />
      </cell>
    </group>

    <div class="menu">
      <div class="menu-item">
        <router-link to="/">
          <img src="../../assets/logo.png" />
          <p>待支付</p>
        </router-link>
      </div>
      <div class="menu-item">
        <router-link to="/">
          <img src="../../assets/logo.png" />
          <p>待接单</p>
        </router-link>
      </div>
      <div class="menu-item">
        <router-link to="/">
          <img src="../../assets/logo.png" />
          <p>配送中</p>
        </router-link>
      </div>
      <div class="menu-item">
        <router-link to="/">
          <img src="../../assets/logo.png" />
          <p>已完成</p>
        </router-link>
      </div>
      <div class="menu-item vux-1px-l">
        <router-link to="/">
          <img src="../../assets/logo.png" />
          <p>已取消</p>
        </router-link>
      </div>
    </div>

    <group>
      <cell title="我的余额" :value="balance" is-link>
        <img slot="icon" width="20" src="../../assets/logo.png" />
      </cell>
      <cell title="我的积分" :value="credit" is-link link="/member/credit">
        <img slot="icon" width="20" src="../../assets/logo.png" />
      </cell>
    </group>

    <group>
      <cell title="我的资料" is-link>
        <img slot="icon" width="20" src="../../assets/logo.png" />
      </cell>
      <cell title="我的地址" is-link>
        <img slot="icon" width="20" src="../../assets/logo.png" />
      </cell>
      <cell title="关于我们" is-link>
        <img slot="icon" width="20" src="../../assets/logo.png" />
      </cell>
    </group>

  </div>
</template>

<script>
import { Badge, Group, Cell, Grid, GridItem } from 'vux'
import { mapGetters } from 'vuex'

export default {
  components: {
    Badge,
    Group,
    Cell,
    Grid,
    GridItem
  },
  data () {
    return {
      avatar: '../../../static/logo.png',
      nickname: '',
      balance: 0.00,
      credit: 0
    }
  },
  computed: {
    ...mapGetters([
      'openid'
    ])
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      await this.$http.get('/members/' + this.openid).then(res => {
        let data = res.data

        if (data.avatar) {
          this.avatar = data.avatar
        }
        this.nickname = data.nickname
        this.balance = data.balance
        this.credit = data.credit
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~vux/src/styles/1px.less';
.avatar {
  text-align: center;
  background-color: #88843f;
  padding: 30px 0;
  img {
    border: 1px solid #fff;
    border-radius: 50%;
    width: 80px;
  }
  p {
    color: #fff;
  }
}

.menu {
  background-color: #fff;
  display: flex;
  .menu-item {
    width: 20%;
    text-align: center;
    padding: 10px 0;
    img {
      width: 30px;
      height: 24px;
    }
    p {
      font-size: 12px;
      color: #000;
    }
  }
}
</style>

