<template>
  <div>
    <group>
      <cell v-if="!choosedAddress" link="/address" inline-desc="请选择您的收货地址"></cell>
      <cell v-else link="/address/list" :title="choosedAddress.realname+ ' '+choosedAddress.mobile" :inline-desc="choosedAddress.college+ ' ' +choosedAddress.area">
      </cell>
    </group>

    <group>
      <popup-radio title="快递公司" :options="expressCompanys" v-model="formData.expressCompany" value-text-align="right"></popup-radio>
      <cell title="物品信息" @click.native="inputInfo" :value="info" is-link></cell>
      <popup-radio title="送达时间" :options="arriveTimes" v-model="formData.arriveTime" value-text-align="right"></popup-radio>
    </group>

    <group>
      <x-textarea :placeholder="'备注:若有其他特别注意事项请在此说明'" :show-counter="false" :rows="4" v-model="formData.remark"></x-textarea>
    </group>

    <group>
      <cell :inline-desc="'增加 '+formData.addMoney+' 元运费'" :primary="'content'">
        <range v-model="formData.addMoney" :min="0" :max="10" :step="0.5"></range>
      </cell>
    </group>
    
    <load-more :background-color="'#fbf9fe'" :show-loading="false" :tip="'亲,您可以加价让快递员优先配送哦'"></load-more>

    <box :gap="'10px 10px'">
      <x-button type="primary" @click.native="createMission">确认提交(支付)</x-button>
      <load-more :background-color="'#fbf9fe'" :show-loading="false" :tip="'注:一件一单,重量小于3kg,超出此重量,每公斤额外收取1元费用'"></load-more>
    </box>

    <popup v-model="show" height="100%">
      <div class="info-container">
        <p>物品类型</p>

        <div class="info-type">
            <div class="info-type-item" v-for="(item, index) in expressTypes" :key="index">
              <x-button mini :type="isChoose(item.title)" @click.native="chooseType(item.title)">{{item.title}}</x-button>
            </div>
        </div>
      </div>

      <group>
        <x-input title="其他:" v-model="formData.other"></x-input>
      </group>

      <group>
        <selector title="物品重量" :options="expressWeights" v-model="formData.expressWeight"></selector>
      </group>

      <group>
        <x-button type="primary" @click.native="fillInfo">确定</x-button>
        <x-button type="default" @click.native="cencel">取消</x-button>
      </group>

    </popup>
  </div>
</template>
<script>
import { Selector, PopupRadio, XButton, Popup, Group, Cell, XInput, XTextarea, Range, Box, LoadMore, Flexbox, FlexboxItem } from 'vux'
import { mapGetters } from 'vuex'

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
        arriveTime: '马上',
        expressCompany: '',
        other: '',
        expressType: '',
        expressWeight: '',
        addMoney: 0,
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
      let type = this.formData.expressType
      let weight = this.formData.expressWeight
      return type || weight ? type + '/' + weight : ''
    }
  },
  methods: {
    async initData () {
      this.$http.get('/getExpress/initData').then(res => {
        let data = res.data
        this.expressCompanys = data.expressCompanys
        this.arriveTimes = data.arriveTimes
      })
    },
    createMission () {
      this.$router.push('/missionConfirm/getExpress')
    },
    inputInfo () {
      this.$http.get('/getExpress/initInfoData').then(res => {
        let data = res.data
        this.expressTypes = data.expressTypes
        this.expressWeights = data.expressWeights
      })
      this.show = true
    },
    fillInfo () {
      this.show = false
    },
    chooseType (name) {
      this.formData.expressType = name
    },
    isChoose (name) {
      return this.formData.expressType === name ? 'primary' : 'default'
    },
    cencel () {
      this.formData.expressType = ''
      this.formData.other = ''
      this.formData.expressWeight = ''
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

