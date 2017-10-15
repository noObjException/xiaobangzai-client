<template>
  <div>
    <group title="联系人">
      <x-input title="收货人:" type="text" v-model="formData.realname"></x-input>
      <x-input title="手机号:" is-type=china-mobile v-model="formData.mobile"></x-input>
    </group>

    <group title="收货地址">
      <popup-picker title="学校/宿舍:" :data="addresses" :columns="2" v-model="formData.address" ref="chooseAddress" show-name></popup-picker>
      <x-textarea  title="详细地址:" placeholder="请填写详细地址" type="text" v-model="formData.detail"></x-textarea >
      <x-switch title="设为默认地址:" v-model="formData.is_default"></x-switch>
    </group>

    <box gap="10px 10px">
      <x-button type="primary" @click.native="createAddress()">保存</x-button>
    </box>
  </div>
</template>

<script>
import { Group, PopupPicker, XInput, XButton, Box, XSwitch, XTextarea, ToastPlugin } from 'vux'
import Vue from 'vue'
Vue.use(ToastPlugin)

export default {
  components: {
    Group,
    PopupPicker,
    XInput,
    XButton,
    Box,
    XSwitch,
    XTextarea
  },
  data () {
    return {
      addresses: [],
      formData: {
        realname: '',
        mobile: '',
        detail: '',
        is_default: true,
        address: []
      }
    }
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      let id = this.$route.query.id
      if (id) {
        await this.$http.get('/memberAddress/' + id).then(res => {
          this.formData = res.data
        })
      }
      await this.$http.get('/memberAddress/create').then(res => {
        this.addresses = res.data
      })
    },
    async createAddress () {
      await this.$http.post('/memberAddress', this.formData).then(res => {
        this.$vux.toast.show({
          text: '添加成功',
          onShow () {
            history.go(-1)
          }
        })
      })
    }
  }
}
</script>
