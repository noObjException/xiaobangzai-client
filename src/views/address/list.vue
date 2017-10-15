<template>
    <div>
        <group>
            <cell :title="item.realname+ ' ' +item.mobile" @click.native="chooseAddress(item)" :inline-desc="item.college+' '+item.area+' '+item.detail" is-link v-for="(item, index) in addresses" :key="index">
                <icon type="success-circle" v-if="choosedAddress&&item.id === choosedAddress.id"></icon>
            </cell>
        </group>
        <x-button type="warn" class="button-bottom" style="position: fixed;bottom: 0;border-radius:0;" @click.native="addAddress">添加新收货地址</x-button>
    </div>
</template>

<script>
import { Cell, Group, XButton, Icon } from 'vux'
import { mapGetters } from 'vuex'

export default {
  components: {
    Group,
    Cell,
    XButton,
    Icon
  },
  data () {
    return {
      addresses: []
    }
  },
  computed: {
    ...mapGetters([
      'openid',
      'choosedAddress'
    ])
  },
  created () {
    this.addressLists()
  },
  methods: {
    addAddress () {
      this.$router.push('/address/edit')
    },
    async chooseAddress (item) {
      await this.$store.dispatch('choosedAddress', item)
      this.$router.go(-1)
    },
    async addressLists () {
      await this.$http.get('/memberAddress', { params: { openid: this.openid } }).then(res => {
        this.addresses = res.data
      })
    }
  }
}
</script>

