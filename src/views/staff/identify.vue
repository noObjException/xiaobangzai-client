<template>
  <div>
      <group>
          <x-input title="姓名:" v-model="formData.username"></x-input>
      </group>
  </div>
</template>

<script>
import { Group, Cell, XInput } from 'vux'

export default {
  data () {
    return {
      formData: {
        username: '',
        school: '',
        college: '',
        class: '',
        study_num: ''
      }
    }
  },
  components: {
    Group, Cell, XInput
  }
}
</script>

<style>

</style>
