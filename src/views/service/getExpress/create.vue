<template>
  <div>
    <group gutter="4px">
      <cell v-if="choosedAddress"  link="/address" :title="choosedAddress.realname+ ' '+choosedAddress.mobile" :inline-desc="address">
        <x-icon slot="icon" type="ios-location-outline"></x-icon>
      </cell>
      <cell v-else link="/address" inline-desc="请选择您的收货地址"></cell>
    </group>

    <group gutter="4px">
      <popup-radio title="快递公司" :options="expressCompanys" v-model="formData.express_com" value-text-align="right" placeholder="请选择"></popup-radio>
      <cell title="物品信息" @click.native="inputInfo" :value="info" is-link></cell>
      <popup-radio title="送达时间" :options="arriveTimes" v-model="formData.arrive_time" value-text-align="right"></popup-radio>
    </group>

    <group gutter="4px">
      <x-textarea placeholder="备注:若有其他特别注意事项请在此说明" :show-counter="false" :rows="3" v-model="formData.remark"></x-textarea>
    </group>

    <group gutter="4px">
      <cell title="配送费用">
        <span class="text-danger">￥ {{ totalPrice }}</span>
      </cell>
      <cell primary="content">
        <span slot="title">增加 <span class="text-danger" style="font-size:20px;">{{formData.bounty}}</span> 元赏金</span>
        <range v-model="formData.bounty" :min="0" :max="10" :step="0.5" :rangeBarHeight='6'></range>
      </cell>
    </group>

    <load-more background-color="#fbf9fe" :show-loading="false" tip="亲，您可以增加赏金上快递员优先配送哦"></load-more>

    <box gap="0 6px">
      <x-button type="primary" @click.native="createMission">立即下单</x-button>
    </box>

    <div class="price-rule">
      <a href="javascript:void(0);" @click="showPriceRule = true">查看计价规则</a>
    </div>
    
    <x-dialog v-model="showPriceRule" hide-on-blur>
      <div v-html="priceRule"></div>
    </x-dialog>

    <!-- 物品信息 -->
    <popup v-model="showInfo" height="100%">
      <group>
        <selector title="包裹规格:" :options="expressOptions" v-model="formData.option_id" ref="choosedOption"></selector>
        <x-input title="取货号:" v-model="formData.pickup_code"></x-input>
      </group>

      <group>
        <checklist title="额外收费项" :options="extraCostsList" v-model="formData.extra_costs"></checklist>
      </group>

      <div class="info-container">
        <p>物品类型:</p>

        <div class="info-type">
          <div class="info-type-item" v-for="(item, index) in expressTypes" :key="index">
            <x-button mini :type="isChoosed(item)" @click.native="chooseType(item)">{{item}}</x-button>
          </div>
          <div class="info-type-item">
            <x-button mini :type="isOtherType ? 'primary' : 'default'" @click.native="chooseType('other')">其他</x-button>
          </div>
        </div>
      </div>

      <group v-if="isOtherType" gutter="6px">
        <x-input title="其他:" v-model="formData.express_type"></x-input>
      </group>

      <box gap="80px 6px">
        <x-button type="primary" @click.native="fillInfo">确定</x-button>
        <x-button type="default" @click.native="cencel">取消</x-button>
      </box>
    </popup>

  </div>
</template>

<script>
import { Selector, PopupRadio, XButton, Popup, Group, Cell, XInput, XTextarea, Range, Box, LoadMore, ToastPlugin, Checklist, XDialog } from 'vux'
import { mapGetters } from 'vuex'
import Vue from 'vue'
Vue.use(ToastPlugin)
import mixin from 'src/mixins/identify.js'

export default {
  components: {
    Selector, PopupRadio, XButton, Popup, Group, Cell, XInput, XTextarea, Range, Box, LoadMore, ToastPlugin, Checklist, XDialog
  },
  data () {
    return {
      arriveTimes: [],
      expressCompanys: [],
      showInfo: false,
      showPriceRule: false,
      expressOptions: [],
      expressTypes: [],
      extraCostsList: [
        { key: 'upstairs_price', value: '送到宿舍(上楼)' }
      ],
      settings: {},
      formData: {
        arrive_time: '',
        express_com: '',
        express_type: '',
        pickup_code: '',
        express_option: '',
        option_id: '',
        option_price: 0,
        bounty: 0,
        remark: '',
        extra_costs: []
      },
      isSubmitted: false,
      priceRule: ''
    }
  },
  mixins: [mixin],
  created () {
    this.initData()
  },
  computed: {
    ...mapGetters([
      'choosedAddress',
      'expressMissionInfo'
    ]),
    address () {
      return this.choosedAddress.college + ' ' + this.choosedAddress.area + ' ' + (this.choosedAddress.detail || '')
    },
    info () {
      const type = this.formData.express_type
      const option = this.formData.express_option
      return type || option ? type + ' ' + option : ''
    },
    isOtherType () {
      let expressType = this.formData.express_type
      if (this.expressTypes.indexOf(expressType) === -1 && expressType !== '') {
        if (expressType === 'other') {
          this.formData.express_type = ''
        }
        return true
      }
    },
    // 计算配送费用
    totalPrice () {
      let price = Number(this.settings.price)
      // 赏金
      price += Number(this.formData.bounty)
      // 快递规格价
      price += Number(this.formData.option_price)
      // 额外收费(上楼加价)
      if (this.settings.switch_upstairs_price) {
        const extraCosts = Object.values(this.formData.extra_costs)
        if (extraCosts.indexOf('upstairs_price') !== -1) {
          price += Number(this.settings.upstairs_price)
        }
      }
      return price >= 0 ? price.toFixed(2) : 0
    }
  },
  beforeRouteLeave (to, from, next) {
    // 未提交时离开页面都缓存订单信息, 然后回填, 提交后清空缓存
    if (this.isSubmitted) {
      this.$store.dispatch('saveExpressMissionInfo', null)
      this.$store.dispatch('choosedAddress', null)
    } else {
      let data = this.formData
      data['address'] = this.choosedAddress
      this.$store.dispatch('saveExpressMissionInfo', data)
    }
    next()
  },
  methods: {
    async initData () {
      await this.$http.get('/getExpress/create').then(res => {
        let data = res.data
        this.expressCompanys = data.expressCompanies
        this.arriveTimes = data.arriveTimes
        this.expressTypes = data.expressTypes
        this.expressOptions = data.expressOptions
        this.settings = data.settings
        this.priceRule = data.priceRule
        if (data.defaultAddress && !this.choosedAddress) {
          this.$store.dispatch('choosedAddress', data.defaultAddress)
        }

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
        let expressOption = this.expressMissionInfo.express_option
        if (this.expressOptions.indexOf(expressOption) !== -1) {
          this.formData.express_option = expressOption
        }
      })
    },
    async createMission () {
      this.isSubmitted = true

      if (!this.identifyConfirm()) {
        return false
      }

      let data = this.formData
      data['address'] = this.choosedAddress
      if (!this.validation(data)) {
        return false
      }

      await this.$http.post('/getExpress', data).then(res => {
        let id = res.data.id
        let that = this

        this.$vux.toast.show({
          type: 'text',
          text: '下单成功',
          position: 'middle',
          isShowMask: true,
          onShow () {
            that.routeTo('/service/getExpress/pay', { id: id })
          }
        })
      })
    },
    validation (data) {
      let text = ''
      let width = '8.6em'
      if (data.express_com.length === 0) {
        text = '快递公司不能为空'
      } else if (data.express_type.length === 0) {
        text = '物品类型不能为空'
      } else if (data.express_option.length === 0) {
        text = '物品规格不能为空'
      } else if (!data.address) {
        text = '请选择收货地址'
      } else if (data.arrive_time.length === 0) {
        text = '送达时间不能为空'
      } else {
        return true
      }

      this.$vux.toast.show({
        type: 'text',
        text: text,
        position: 'middle',
        width: width
      })

      return false
    },
    async inputInfo () {
      this.showInfo = true
    },
    fillInfo () {
      const option = this.$refs.choosedOption.getFullValue()[0]
      this.formData.option_price = option.price
      this.formData.express_option = option.value
      this.showInfo = false
    },
    chooseType (name = '') {
      this.formData.express_type = name
    },
    isChoosed (name = '') {
      return this.formData.express_type === name ? 'primary' : 'default'
    },
    cencel () {
      this.formData.express_type = ''
      this.formData.express_option = ''
      this.formData.extra_costs = []
      this.showInfo = false
    }
  }
}
</script>

<style lang="less" scoped>
.info-container {
  margin-top: 20px;
  padding: 12px;
  background-color: #fff;
  .info-type {
    display: flex;
    flex-wrap: wrap;
    .info-type-item {
      margin-right: 4px;
      margin-top: 6px;
    }
  }
}
.price-rule{
  text-align:center; 
  font-size: 13px;
  margin: .5rem auto; 
}
</style>

