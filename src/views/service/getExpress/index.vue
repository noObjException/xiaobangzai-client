<template>
  <div>
    <group>
      <cell v-if="!choosedAddress" link="/address" inline-desc="请选择您的收货地址"></cell>
      <cell v-else link="/address" :title="choosedAddress.realname+ ' '+choosedAddress.mobile" :inline-desc="choosedAddress.college+ ' ' +choosedAddress.area"></cell>
    </group>

    <group>
      <popup-radio title="快递公司" :options="expressCompanys" v-model="formData.express_com" value-text-align="right"></popup-radio>
      <cell title="物品信息" @click.native="inputInfo" :value="info" is-link></cell>
      <popup-radio title="送达时间" :options="arriveTimes" v-model="formData.arrive_time" value-text-align="right"></popup-radio>
    </group>

    <group>
      <x-textarea placeholder="备注:若有其他特别注意事项请在此说明" :show-counter="false" :rows="4" v-model="formData.remark"></x-textarea>
    </group>

    <group>
      <cell :inline-desc="'增加 '+formData.bounty+' 元运费'" primary="content">
        <range v-model="formData.bounty" :min="0" :max="10" :step="0.5"></range>
      </cell>
    </group>
    
    <load-more background-color="#fbf9fe" :show-loading="false" tip="亲,您可以加价让快递员优先配送哦"></load-more>

    <box gap="40px 6px">
      <x-button type="primary" @click.native="createMission">确认下单</x-button>
      <load-more background-color="#fbf9fe" :show-loading="false" tip="注:一件一单,重量小于3kg,超出此重量,每公斤额外收取1元费用"></load-more>
    </box>

    <popup v-model="show" height="100%">
      <div class="info-container">
        <p>物品类型</p>

        <div class="info-type">
            <div class="info-type-item" v-for="(item, index) in expressTypes" :key="index">
              <x-button mini :type="isChoose(item.title)" @click.native="chooseType(item.title)">{{item.title}}</x-button>
            </div>
            <div class="info-type-item" >
              <x-button mini :type="isChoose()" @click.native="chooseType()">其他</x-button>
            </div>
        </div>
      </div>

      <group v-if="isOtherType">
        <x-input title="其他:" v-model="formData.express_type"></x-input>
      </group>

      <group>
        <selector title="物品重量" :options="expressWeights" v-model="formData.express_weight"></selector>
      </group>

      <group>
        <x-button type="primary" @click.native="fillInfo">确定</x-button>
        <x-button type="default" @click.native="cencel">取消</x-button>
      </group>

    </popup>
  </div>
</template>
<script>
import { Selector, PopupRadio, XButton, Popup, Group, Cell, XInput, XTextarea, Range, Box, LoadMore, Flexbox, FlexboxItem, ToastPlugin } from 'vux'
import { mapGetters } from 'vuex'
import Vue from 'vue'
Vue.use(ToastPlugin)

export default {
  components: {
    Selector,
    PopupRadio,
    XButton,
    Popup,
    Group,
    Cell,
    XInput,
    XTextarea,
    Range,
    Box,
    LoadMore,
    Flexbox,
    FlexboxItem
  },
  data () {
    return {
      arriveTimes: [],
      expressCompanys: [],
      show: false,
      expressWeights: [],
      expressTypes: [],
      formData: {
        arrive_time: '马上',
        express_com: '',
        express_type: '',
        express_weight: '',
        bounty: 0,
        remark: ''
      }
    }
  },
  created () {
    this.initData()
  },
  computed: {
    ...mapGetters([
      'choosedAddress',
      'openid'
    ]),
    info () {
      let type = this.formData.express_type
      let weight = this.formData.express_weight
      return type || weight ? type + '/' + weight : ''
    },
    isOtherType () {
      return this.formData.express_type === ''
    }
  },
  beforeRouteLeave (to, from, next) {
    next()
  },
  methods: {
    async initData () {
      this.$http.get('/getExpress/initData').then(res => {
        let data = res.data
        this.expressCompanys = data.expressCompanys
        this.arriveTimes = data.arriveTimes
      })
    },
    async createMission () {
      let data = this.formData
      data['address'] = this.choosedAddress
      data['openid'] = this.openid
      await this.$http.post('/getExpress', data).then(res => {
        let id = res.data.id

        this.$vux.toast.show({
          type: 'text',
          text: '下单成功',
          position: 'middle'
        })

        this.$router.push({path: '/service/getExpress/create', query: {id: id}})
      })
    },
    async inputInfo () {
      await this.$http.get('/getExpress/initInfoData').then(res => {
        let data = res.data
        this.expressTypes = data.expressTypes
        this.expressWeights = data.expressWeights

        this.formData.express_type = this.expressTypes[0].title
        this.formData.express_weight = this.expressWeights[0]
      })
      this.show = true
    },
    fillInfo () {
      this.show = false
    },
    chooseType (name = '') {
      this.formData.express_type = name
    },
    isChoose (name = '') {
      return this.formData.express_type === name ? 'primary' : 'default'
    },
    cencel () {
      this.formData.express_type = ''
      this.formData.other = ''
      this.formData.express_weight = ''
      this.show = false
    }
  }
}
</script>

<style lang="less" scoped>
.info-container {
  padding: 12px;
  background-color: #fff;
  .info-type{
    display: flex;
    flex-wrap: wrap;
    .info-type-item{
      margin-right: 4px;
      margin-top: 6px;
    }
  }
}
</style>

