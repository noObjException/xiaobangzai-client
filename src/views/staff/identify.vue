<template>
  <div>
      <group>
          <x-input title="姓名:" v-model="formData.username"></x-input>
          <popup-picker title="学校/学院:" :data="schools" :columns="2" ref="schools" show-name></popup-picker>
          <x-input title="学号:" v-model="formData.study_num"></x-input>
      </group>

      <group gutter="6px">
        <x-button @click.native="upload">上传</x-button>
      </group>

      <box gap="30px 6px">
        <x-button type="primary">提交</x-button>
      </box>
  </div>
</template>

<script>
import { Group, Cell, XInput, PopupPicker, XButton, Box } from 'vux'
import Uploader from 'src/components/Uploader'

export default {
  data () {
    return {
      schools: [],
      formData: {
        username: '',
        school: '',
        college: '',
        class: '',
        student_num: ''
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
    upload () {
      console.log('上传')

      this.$http.get('/jsSDKConfig', {params: {request_url: this.$route.fullPath}}).then(res => {
        this.$wechat.config(res.data)

        this.$wechat.uploadImage({
          localId: '', // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
            let serverId = res.serverId // 返回图片的服务器端ID
            console.log(serverId)
          }
        })

        this.$wechat.ready(() => {
          console.log('配置成功')
        })

        this.$wechat.error(() => {
          console.log('配置失败')
        })
      })
    }
  }
}
</script>

<style>

</style>
