<script>
import { Group, Cell, XInput, Box, XButton, Msg } from 'vux'

export default {
  data () {
    return {
      balance: '',
      formData: {
        cash_balance: ''
      },
      successed: false,
      buttons: [{
        type: 'primary',
        text: '返回',
        onClick: () => {
          this.routeTo('/member')
        }
      }]
    }
  },
  components: {
    Group, Cell, XInput, Box, XButton, Msg
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      const res = await this.$http.get('members')
      this.balance = res.data.balance
    },
    async handleSubmit () {
      await this.$http.post('member/balances', this.formData).then(res => {
        this.successed = true
      })
    }
  }
}
</script>

<template>
  <div>
      <div v-show="!successed">
        <group>
            <x-input title="提现:" v-model="formData.cash_balance" :placeholder="'当前可提现￥' + balance" placeholder-align="right"></x-input>
        </group>
        <box gap="6px 6px">
            <x-button type="primary" @click.native="handleSubmit">申请提现</x-button>
        </box>
      </div>

      <msg title="申请成功" description="您的余额在通过我们的审核之后会在1-3个工作日内到账, 请内心等候!" :buttons="buttons" icon="waiting"  v-show="successed"></msg>
  </div>
</template>

<style>

</style>

