<template>
  <div>
    <div class="avatar">
      <img :src="avatar"/>
      <p>{{nickname}}</p>
    </div>
    <group>
      <cell title="我的订单" value="查看全部任务" link="/member/mission?status=all">
        <x-icon slot="icon" type="android-list" class="cell-icon"></x-icon>
      </cell>
    </group>

    <div class="menu">
      <div class="menu-item" @click="routeTo('waitPay')">
        <x-icon slot="icon" type="speedometer"></x-icon>
        <p>待支付</p>
      </div>
      <div class="menu-item" @click="routeTo('waitOrder')">
        <x-icon slot="icon" type="ios-calculator-outline"></x-icon>
        <p>待接单</p>
      </div>
      <div class="menu-item" @click="routeTo('processing')">
        <x-icon slot="icon" type="android-send"></x-icon>
        <p>配送中</p>
      </div>
      <div class="menu-item" @click="routeTo('completed')">
        <x-icon slot="icon" type="ios-checkmark-outline"></x-icon>
        <p>已完成</p>
      </div>
      <div class="menu-item" @click="routeTo('cancel')">
        <x-icon slot="icon" type="android-cancel"></x-icon>
        <p>已取消</p>
      </div>
    </div>

    <group>
      <cell title="我的余额" :value="balance" is-link>
        <x-icon slot="icon" type="social-usd-outline" class="cell-icon"></x-icon>
      </cell>
      <cell title="我的积分" :value="credit" link="/member/credit">
        <x-icon slot="icon" type="social-euro-outline" class="cell-icon"></x-icon>
      </cell>
    </group>

    <group>
      <cell title="个人认证" link="/staff/identify" v-if="settings.identify">
        <x-icon slot="icon" type="android-clipboard" class="cell-icon"></x-icon>
      </cell>
      <cell title="我的地址" is-link>
        <x-icon slot="icon" type="ios-location" class="cell-icon"></x-icon>
      </cell>
      <cell title="关于我们" is-link>
        <x-icon slot="icon" type="android-alert" class="cell-icon"></x-icon>
      </cell>
    </group>

  </div>
</template>

<script>
import { Badge, Group, Cell, Grid, GridItem } from 'vux'

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
      settings: ''
    }
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      await this.$http.get('/members').then(res => {
        let data = res.data

        if (data.avatar.length !== 0) {
          this.avatar = data.avatar
        }
        this.nickname = data.nickname
        this.balance = data.balance
        this.credit = data.credit

        this.settings = res.meta.settings
      })
    },
    routeTo (status) {
      this.$router.push({path: '/member/mission', query: {status: status}})
    }
  }
}
</script>

<style lang="less" scoped>
// @import '~vux/src/styles/1px.less';
.avatar {
  text-align: center;
  background-color: #88843f;
  padding: 30px 0;
  img {
    border: 1px solid #fff;
    border-radius: 50%;
    width: 80px;
    height: 80px;
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
    // img {
    //   width: 30px;
    //   height: 24px;
    // }
    p {
      font-size: 12px;
      color: #000;
    }
  }
}
.cell-icon{
  width: 18px;
  vertical-align:middle;
  margin-right: 4px;
}
</style>

