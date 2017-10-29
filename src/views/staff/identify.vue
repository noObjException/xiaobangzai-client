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

      this.$wechat.chooseImage({
        count: 6, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          var localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          console.log(localIds)
        }
      })

      // this.$wechat.uploadImage({
      //   localId: '', // 需要上传的图片的本地ID，由chooseImage接口获得
      //   isShowProgressTips: 1, // 默认为1，显示进度提示
      //   success: function (res) {
      //     let serverId = res.serverId // 返回图片的服务器端ID
      //     console.log(serverId)
      //   }
      // })
    }
  }
}
</script>

<style>

</style>
