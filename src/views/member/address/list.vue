<template>
    <div>
        <swipeout>
            <swipeout-item transition-mode="follow" v-for="(item, index) in addresses" :key="index">
                <div slot="right-menu">
                    <swipeout-button @click.native="setDefaultAddress(item.id)" type="primary">设为默认</swipeout-button>
                    <swipeout-button @click.native="routeTo('/member/address/edit', {id: item.id})" type="default">编辑</swipeout-button>
                    <swipeout-button @click.native="handleDelete(item.id)" type="warn">删除</swipeout-button>
                </div>
                <div slot="content" class="demo-content vux-1px-t">
                    <group gutter="0px">
                        <cell :title="item.realname+' '+item.mobile" :inline-desc="item.college+ ' ' +item.area+' '+item.detail">
                            <x-icon slot="icon" type="ios-location-outline" class="g-icon"></x-icon>
                        </cell>
                    </group>
                </div>
            </swipeout-item>
        </swipeout>
        <x-button type="warn" class="button-bottom" style="position: fixed;bottom: 0;border-radius:0;" @click.native="routeTo('/member/address/edit')">添加新收货地址</x-button>
    </div>
</template>

<script>
import { Swipeout, SwipeoutItem, SwipeoutButton, Group, Cell, XButton } from 'vux'

export default {
  data () {
    return {
      addresses: []
    }
  },
  components: {
    Swipeout, SwipeoutItem, SwipeoutButton, Group, Cell, XButton
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      this.$http.get('/memberAddress').then(res => {
        this.addresses = res.data
      })
    },
    async setDefaultAddress (id) {
      this.$http.put('/setDefaultAddress/' + id).then(res => {
        let that = this

        this.$vux.toast.show({
          type: 'text',
          text: '设置成功',
          width: '8.6rem',
          position: 'middle',
          isShowMask: true,
          onShow () {
            that.initData()
          }
        })
      })
    },
    async handleDelete (id) {
      this.$http.delete('/memberAddress/' + id).then(res => {
        let that = this

        this.$vux.toast.show({
          type: 'text',
          text: '删除成功',
          position: 'middle',
          isShowMask: true,
          onShow () {
            that.initData()
          }
        })
      })
    }
  }
}
</script>

<style>

</style>

