<template>
  <div>
    <msg title="接单成功" icon="success" description="请尽快开始为客户配送!"></msg>

    <group>
      <cell title="可获佣金:">
        <span class="text-danger">￥ {{info.to_staff_money}}</span>
      </cell>
      <cell title="收货人:" :value="info.realname"></cell>
      <cell title="手机号:" :value="info.mobile"></cell>
      <cell title="收货地址:" :value="info.college+' '+info.area"></cell>
    </group>

    <box gap="40px 6px">
      <flexbox>
        <flexbox-item>
          <x-button @click.native="routeTo('/')">返回首页</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button type="primary" @click.native="routeTo('/member/mission/detail', {id: info.id})">查看详情</x-button>
        </flexbox-item>
      </flexbox>
    </box>
  </div>
</template>

<script>
import { Msg, XButton, Group, Cell, Flexbox, FlexboxItem, Box } from 'vux'

export default {
  components: {
    Msg,
    XButton,
    Group,
    Cell,
    Flexbox,
    FlexboxItem,
    Box
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      let id = this.$route.query.id
      await this.$http.get('/getExpress/' + id).then(res => {
        this.info = res.data
      })
    }
  },
  data () {
    return {
      info: {}
    }
  }
}
</script>

