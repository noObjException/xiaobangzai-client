<template>
  <div>
    <div class="avatar">
      <img :src="member.avatar" />
      <p>{{member.nickname}}</p>
    </div>
    <group>
      <cell title="我的订单" value="查看全部任务" link="/member/mission/list?status=all">
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
      <cell title="我的余额" :value="member.balance" is-link>
        <x-icon slot="icon" type="social-usd-outline" class="cell-icon"></x-icon>
      </cell>
      <cell title="我的积分" :value="member.point" link="/member/point">
        <x-icon slot="icon" type="social-euro-outline" class="cell-icon"></x-icon>
      </cell>
    </group>

    <group>
      <cell title="申请成为有帮人" link="/staff/identify" v-if="settings.switch_staff_identify && !member.is_staff">
        <x-icon slot="icon" type="android-clipboard" class="cell-icon"></x-icon>
      </cell>
      <cell title="学生认证" link="/member/identify" v-if="settings.switch_member_identify && !member.is_identify">
        <x-icon slot="icon" type="clipboard" class="cell-icon"></x-icon>
      </cell>
      <cell title="我的地址" link="/member/address/list">
        <x-icon slot="icon" type="ios-location" class="cell-icon"></x-icon>
      </cell>
      <cell title="关于我们" is-link>
        <x-icon slot="icon" type="android-alert" class="cell-icon"></x-icon>
      </cell>
      <cell title="服务端" link="/staff" v-if="member.is_staff">
        <x-icon slot="icon" type="ios-people-outline" class="cell-icon"></x-icon>
      </cell>
    </group>

  </div>
</template>

<script>
import { Badge, Group, Cell, Grid, GridItem } from 'vux'

export default {
  components: {
    Badge, Group, Cell, Grid, GridItem
  },
  data () {
    return {
      member: {
        avatar: '../../../static/logo.png',
        nickname: '',
        balance: 0.00,
        point: 0
      },
      settings: ''
    }
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      await this.$http.get('/members').then(res => {
        this.member = res.data
        if (!res.data.avatar) {
          this.member.avatar = '../../../static/logo.png'
        }

        this.settings = res.meta.settings
      })
    },
    routeTo (status) {
      this.$router.push({ path: '/member/mission', query: { status: status } })
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
    p {
      font-size: 12px;
      color: #000;
    }
  }
}

.cell-icon {
  width: 18px;
  vertical-align: middle;
  margin-right: 4px;
}
</style>

