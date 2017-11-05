<template>
    <div>
        <group labelWidth="90px">
            <cell :title="info.realname" :inline-desc="'下单时间: ' + info.created_at">
                <img slot="icon" :src="info.avatar" class="avatar" />
                <span class="text-danger">{{info.status}}</span>
            </cell>
            <cell title="订单编号:" :value="info.order_num">
                <x-icon slot="icon" type="ios-paper-outline" class="g-icon" size="20"></x-icon>
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
            <cell title="备注信息:" :value="info.remark">
                <x-icon slot="icon" type="compose" class="g-icon" size="20"></x-icon>
            </cell>
        </group>
        <group>
            <cell title="支付金额:">
                <x-icon slot="icon" type="ios-pricetags-outline" class="g-icon" size="20"></x-icon>
                <span class="text-danger">￥{{info.total_price}}</span>
            </cell>
            <cell title="预计佣金:">
                <x-icon slot="icon" type="social-yen-outline" class="g-icon" size="20"></x-icon>
                <span class="text-danger">￥{{info.to_staff_money}}</span>
            </cell>
            <cell title="取货编号:" :value="info.pickup_code">
                <x-icon slot="icon" type="clipboard" class="g-icon" size="20"></x-icon>
            </cell>

            <cell title="开始时间:" :value="info.start_time" v-if="info.start_time">
                <x-icon slot="icon" type="compass" class="g-icon" size="20"></x-icon>
            </cell>
            <cell title="完成时间:" :value="info.finish_time" v-if="info.finish_time">
                <x-icon slot="icon" type="compass" class="g-icon" size="20"></x-icon>
            </cell>
            <cell v-if="info.status === '待接单'">
                <span>
                    <x-button mini type="warn" @click.native="acceptOrder(info.id)">立即接单</x-button>
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
    Group,
    Cell,
    XButton
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
