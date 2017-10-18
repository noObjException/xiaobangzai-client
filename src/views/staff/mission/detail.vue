<template>
    <div>
        <group labelWidth="90px">
            <cell :title="info.realname" :inline-desc="'下单时间: ' + info.created_at">
                <img slot="icon" :src="info.avatar" class="avatar" />
                <span class="text-danger">
                    {{info.status}}
                </span>
            </cell>
            <cell title="快递公司:" :value="info.express_com">
                <x-icon slot="icon" type="android-plane" class="g-icon" size="20"></x-icon>
            </cell>
            <cell title="物品信息:" :value="info.express_type+'/'+info.express_weight">
                <x-icon slot="icon" type="briefcase" class="g-icon" size="20"></x-icon>
            </cell>
            <cell title="收货地址:" :value="info.college+' '+info.area+' '+info.detail">
                <x-icon slot="icon" type="location" class="g-icon" size="20"></x-icon>
            </cell>
            <cell title="送达时间:" :value="info.arrive_time">
                <x-icon slot="icon" type="ios-clock-outline" class="g-icon" size="20"></x-icon>
            </cell>
            <cell title="跑题赏金:">
                <x-icon slot="icon" type="cash" class="g-icon" size="20"></x-icon>
                <span class="text-danger">￥{{info.bounty}}</span>
            </cell>
            <cell title="备注信息:" :value="info.remark">
                <x-icon slot="icon" type="compose" class="g-icon" size="20"></x-icon>
            </cell>
            <cell title="开始时间:" :value="info.start_time" v-if="info.start_time">
                <x-icon slot="icon" type="compass" class="g-icon" size="20"></x-icon>
            </cell>
            <cell>
                <span>
                    <x-button mini type="warn" @click.native="acceptOrder(info.id)" v-if="info.status === '待接单'">立即接单</x-button>
                </span>
            </cell>
        </group>
    </div>
</template>

<script>
import { Group, Cell, XButton } from 'vux'
import mixin from 'src/mixins/expressMission.js'

export default {
  data () {
    return {
      info: {}
    }
  },
  components: {
    Group, Cell, XButton
  },
  mixins: [mixin],
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
  }
}
</script>

<style lang="less" scoped>
.avatar {
    width: 50px;
    margin-right: 6px;
    border-radius: 50%;
}
</style>
