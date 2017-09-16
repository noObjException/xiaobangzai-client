<template>
  <div>
    <group>
      <cell :link="'/addressList'" :inline-desc="'请选择您的收货地址'"></cell>
    </group>

    <group>
      <popup-picker title="快递公司" :placeholder="'必选'" :data="expressCompany" v-model="expressValue" :value-text-align="'right'"></popup-picker>
      <cell title="物品信息" @click.native="inputInfo" is-link></cell>
      <popup-picker title="送达时间" :placeholder="'必选'" :data="sendTime" v-model="sendValue" :value-text-align="'right'"></popup-picker>
    </group>

    <group>
      <x-textarea :placeholder="'备注:若有其他特别注意事项请在此说明'" :show-counter="false" :rows="4"></x-textarea>
    </group>

    <group>
      <cell :inline-desc="'增加 '+addMoney+' 元运费'" :primary="'content'">
        <range v-model="addMoney" :min="1" :max="10" :step="0.5"></range>
      </cell>
    </group>

    <load-more :background-color="'#fbf9fe'" :show-loading="false" :tip="'亲,您可以加价让快递员优先配送哦'"></load-more>

    <box :gap="'10px 10px'">
      <x-button type="primary" @click.native="createMission">确认提交(支付)</x-button>
      <load-more :background-color="'#fbf9fe'" :show-loading="false" :tip="'注:一件一单,重量小于3kg,超出此重量,每公斤额外收取1元费用'"></load-more>
    </box>

    <div v-transfer-dom>
      <popup v-model="show" height="100%">
        <div class="info-container">
          <p>物品类型</p>

          <flexbox :gutter="0" wrap="wrap">
            <flexbox-item :span="1/3" v-for="(item, index) in expressTypes" :key="index">
              <x-button plain mini>{{item.name}}</x-button>
            </flexbox-item>
            </flexbox-item>
          </flexbox>
        </div>
        <group>
          <x-input title="其他:" v-model="other"></x-input>
        </group>

        <group>
          <selector title="物品重量" :options="weights" v-model="weight"></selector>
        </group>

        <group>
          <x-button type="primary" @click.native="fillInfo">确定</x-button>
        </group>

      </popup>
    </div>
  </div>
</template>
<script>
import { Selector, PopupRadio, XButton, TransferDom, Popup, Group, Cell, PopupPicker, XInput, XTextarea, Range, Box, LoadMore, Flexbox, FlexboxItem } from 'vux'

export default {
  components: {
    Selector,
    PopupRadio,
    XButton,
    TransferDom,
    Popup,
    Group,
    Cell,
    PopupPicker,
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
      sendValue: '',
      sendTime: ['马上', '尽快', '立刻'],
      expressValue: '',
      expressCompany: ['中通快递', '圆通快递', '顺丰快递'],
      expressNumber: '',
      addMoney: 1,
      show: false,
      other: '',
      weights: ['1kg', '2kg'],
      weight: '',
      expressTypes: []
    }
  },
  methods: {
    createMission () {
      this.$router.push('/missionConfirm/getExpress')
    },
    inputInfo () {
      this.$http.get('/expressTypes').then(res => {
        this.expressTypes = res.data
      })
      this.show = true
    },
    fillInfo () {
      this.show = false
    }
  }
}
</script>

<style lang="less" scoped>
.info-container {
  padding: 12px;
  background-color: #fff;
}

.vux-flexbox-item {
  text-align: center;
  margin-bottom: 10px;
}
</style>

