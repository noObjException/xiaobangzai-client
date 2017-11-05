<template>
  <div>
      <group>
          <x-input title="姓名:" v-model="formData.username"></x-input>
          <popup-picker title="学校/学院:" :data="schools" :columns="2" ref="schools" v-model="formData.school_college" show-name></popup-picker>
          <x-input title="学号:" v-model="formData.study_no"></x-input>
      </group>

      <group gutter="6px">
        <uploader title="学生证拍照(参考照片)" dir="identify" v-model="formData.pictures"></uploader>
      </group>

      <box gap="30px 6px">
        <x-button type="primary" @click.native="create">提交</x-button>
      </box>
  </div>
</template>

<script>
import { Group, Cell, XInput, PopupPicker, XButton, Box, ToastPlugin } from 'vux'
import Uploader from 'src/components/Uploader'
import Vue from 'vue'
Vue.use(ToastPlugin)

export default {
  data () {
    return {
      schools: [],
      formData: {
        username: '',
        school_college: [],
        study_no: '',
        pictures: []
      }
    }
  },
  components: {
    Group, Cell, XInput, PopupPicker, XButton, Box, Uploader
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      await this.$http.get('/staffs').then(res => {
        this.schools = res.data
      })
    },
    async create () {
      let that = this
      this.$http.post('/member/identifys', this.formData).then(res => {
        this.$vux.toast.show({
          type: 'text',
          text: '申请提交成功, 请耐心等候',
          position: 'middle',
          isShowMask: true,
          onShow () {
            that.routeTo('/member')
          }
        })
      })
    }
  }
}
</script>

<style>

</style>
