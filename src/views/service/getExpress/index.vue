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
      <x-button type="primary" @click.native="routeTo('/service/getExpress/create')">确定</x-button>
      <load-more background-color="#fbf9fe" :show-loading="false" tip="注:一件一单,重量小于3kg,超出此重量,每公斤额外收取1元费用"></load-more>
    </box>

    <popup v-model="show" height="100%">
      <div class="info-container">
        <p>物品类型</p>

        <div class="info-type">
            <div class="info-type-item" v-for="(item, index) in expressTypes" :key="index">
              <x-button mini :type="isChoosed(item)" @click.native="chooseType(item)">{{item}}</x-button>
            </div>
            <div class="info-type-item" >
              <x-button mini :type="isChoosed()" @click.native="chooseType()">其他</x-button>
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
      'openid',
      'expressMissionInfo'
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
    let data = this.formData
    data['address'] = this.choosedAddress
    data['openid'] = this.openid
    this.$store.dispatch('saveExpressMissionInfo', data)
    next()
  },
  methods: {
    async initData () {
      await this.$http.get('/expressMission/index').then(res => {
        let data = res.data
        this.expressCompanys = data.expressCompanys
        this.arriveTimes = data.arriveTimes
        this.expressTypes = data.expressTypes
        this.expressWeights = data.expressWeights
        this.formData.express_type = this.expressTypes[0]
        this.formData.express_weight = this.expressWeights[0]

        // 回填缓存中的信息
        if (!this.expressMissionInfo) {
          return true
        }
        let expressCom = this.expressMissionInfo.express_com
        if (this.expressCompanys.indexOf(expressCom) !== -1) {
          this.formData.express_com = expressCom
        }
        let arriveTime = this.expressMissionInfo.arrive_time
        if (this.arriveTimes.indexOf(arriveTime) !== -1) {
          this.formData.arrive_time = arriveTime
        }
        let expressType = this.expressMissionInfo.express_type
        if (this.expressTypes.indexOf(expressType) !== -1) {
          this.formData.express_type = expressType
        }
        let expressWeight = this.expressMissionInfo.express_weight
        if (this.expressWeights.indexOf(expressWeight) !== -1) {
          this.formData.express_weight = expressWeight
        }
      })
    },
    async inputInfo () {
      this.show = true
    },
    fillInfo () {
      this.show = false
    },
    chooseType (name = '') {
      this.formData.express_type = name
    },
    isChoosed (name = '') {
      return this.formData.express_type === name ? 'primary' : 'default'
    },
    cencel () {
      this.formData.express_type = ''
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

