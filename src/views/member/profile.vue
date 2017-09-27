<template>
    <div>
        <div class="avatar">
            <img src="../../../static/logo.png" />
            <p>陈总</p>
        </div>
        <group>
            <x-input title="昵称" v-model="formData.nickname"></x-input>
        </group>
    </div>
</template>

<script>
import { Group, Cell, XInput } from 'vux'

export default {
  data () {
    return {
      formData: {
        nickname: ''
      }
    }
  },
  components: {
    Group, Cell, XInput
  }
}
</script>

<style lang="less" scoped>
.avatar {
    text-align: center;
    background-color: #88843f;
    padding: 30px 0;
    img {
        border: 1px solid #fff;
        border-radius: 50%;
        width: 80px;
    }
    p {
        color: #fff;
    }
}
</style>

