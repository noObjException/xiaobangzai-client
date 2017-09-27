<template>
  <div>
    <div class="avatar">
      <img :src="avatar"/>
      <p>{{nickname}}</p>
    </div>
    <group>
      <cell title="我的订单" value="查看全部任务" is-link link="/member/mission?status=all">
        <img slot="icon" width="20" src="../../assets/logo.png" />
      </cell>
    </group>

    <div class="menu">
      <div class="menu-item" @click="routeTo(item.status)" v-for="(item, index) in menus" :key="index">
        <img :src="item.img" />
        <p>{{item.label}}</p>
      </div>
    </div>

    <group>
      <cell title="我的余额" :value="balance" is-link>
        <img slot="icon" width="20" src="../../assets/logo.png" />
      </cell>
      <cell title="我的积分" :value="credit" link="/member/credit">
        <img slot="icon" width="20" src="../../assets/logo.png" />
      </cell>
    </group>

    <group>
      <cell title="个人认证" link="/staff/identify">
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
      credit: 0,
      menus: [{
        label: '待支付',
        img: '../../../static/logo.png',
        status: 'waitPay'
      }, {
        label: '待接单',
        img: '../../../static/logo.png',
        status: 'waitOrder'
      }, {
        label: '配送中',
        img: '../../../static/logo.png',
        status: 'processing'
      }, {
        label: '已完成',
        img: '../../../static/logo.png',
        status: 'completed'
      }, {
        label: '已取消',
        img: '../../../static/logo.png',
        status: 'cencel'
      }]
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
    },
    routeTo (status) {
      this.$router.push({path: '/member/mission', query: {status: status}})
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

