<template>
  <div>
      <group>
          <x-input title="姓名:" v-model="formData.username"></x-input>
          <popup-picker title="学校/学院:" :data="schools" :columns="2" ref="schools" show-name></popup-picker>
          <x-input title="学号:" v-model="formData.study_num"></x-input>
      </group>

      <group gutter="6px">
        <uploader title="学生证拍照(参考照片)"></uploader>
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
    }
  }
}
</script>

<style>

</style>
