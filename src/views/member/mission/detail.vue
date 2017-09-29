<template>
    <div>
        <div class="mission-status">
            <div class="content">
                <x-icon slot="icon" type="android-bus" class="g-icon" size="30"></x-icon>
                {{info.status}}
            </div>
        </div>

        <group>
            <cell :title="info.realname+ ' '+info.mobile" :inline-desc="info.college+ ' ' +info.area+ ' ' +info.detail">
                <x-icon slot="icon" type="ios-location-outline"></x-icon>
            </cell>
        </group>

        <group labelWidth="90px">
            <cell title="快递公司:" :value="info.express_com"></cell>
            <cell title="物品信息:" :value="info.express_type+'/'+info.express_weight"></cell>
            <cell title="送达时间:" :value="info.arrive_time"></cell>
            <cell title="跑腿赏金:">
                <span class="text-danger">￥ {{info.bounty}}</span>
            </cell>
            <cell title="备注信息:" :value="info.remark"></cell>
        </group>

        <group>
            <cell title="价格总计:">
                <span class="text-danger">￥ {{info.total_price}}</span>
            </cell>
            <cell>
                <x-button mini v-if="info.status === '待支付'" @click.native="cancel(info.id)">取消订单</x-button>
                <x-button mini type="warn" v-if="info.status === '待接单'" @click.native="addBounty(info.id)">追加赏金</x-button>
                <x-button mini type="warn" v-if="info.status === '待支付'" @click.native="pay(info.id)">立即支付</x-button>
                <x-button mini type="warn" v-if="info.status === '配送中'" @click.native="completed(info.id)">确认收货</x-button>
                <x-button mini type="warn" v-if="info.status === '已完成'" @click.native="addComment(info.id)">评价</x-button>
            </cell>
        </group>
    </div>
</template>

<script>
import { Group, Cell, XButton } from 'vux'
import { mapGetters } from 'vuex'
import mixin from './mixin.js'

export default {
  data () {
    return {
      info: {}
    }
  },
  mixins: [mixin],
  components: {
    Group, Cell, XButton
  },
  computed: {
    ...mapGetters([
      'choosedAddress',
      'openid'
    ])
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
  }
}
</script>

<style lang="less" scoped>
.mission-status {
    background-color: #ef843f;
    color: #fff;
    .content {
        text-align: center;
        padding: 40px 0;
        font-size: 20px;
        .g-icon{
            color: #fff;
        }
    }
}
</style>

