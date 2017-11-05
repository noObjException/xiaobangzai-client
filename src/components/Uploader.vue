<template>
    <div>
        <div class="weui-uploader" style="padding:15px;">
            <div class="weui-uploader__hd">
                <p class="weui-uploader__title">{{title}}</p>
            </div>
            <div class="weui-uploader__bd">
                <ul class="weui-uploader__files">
                    <li class="weui-uploader__file" :style="'background-image:url('+ BASE_IMG + item +')'" v-for="(item, index) in currentImageLists" :key="index"></li>
                </ul>

                <vue-core-image-upload class="upload-button" 
                :crop="false" 
                inputOfFile="image"
                @imageuploaded="imageUploaded" 
                :max-file-size="5242880" 
                :url="BASE_API + '/pictures'"
                :credentials="false"
                :data="uploadData"
                :headers="headers">
                    <x-icon type="ios-plus-empty" size="72"></x-icon>
                </vue-core-image-upload>
            </div>
        </div>
    </div>
</template>

<script>
import VueCoreImageUpload from 'vue-core-image-upload'
import { mapGetters } from 'vuex'
import Vue from 'vue'
import { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)

export default {
  data () {
    return {
      BASE_API: process.env.BASE_API,
      BASE_IMG: process.env.BASE_IMG,
      uploadData: {
        upload_dir: this.dir
      },
      currentImageLists: this.value
    }
  },
  components: {
    VueCoreImageUpload
  },
  computed: {
    ...mapGetters([
      'token'
    ]),
    headers () {
      return {
        'Authorization': 'Bearer' + this.token
      }
    }
  },
  watch: {
    value (val) {
      this.currentImageLists = val
    },
    currentImageLists (val) {
      this.$emit('input', val)
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    dir: {
      type: String,
      default: ''
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    imageUploaded (res) {
      this.currentImageLists.push(res.data)
    }
  }
}
</script>

<style lang="less" scoped>
@import '~vux/src/styles/weui/widget/weui-uploader/index.less';
.upload-button {
    float: left;
    position: relative;
    margin-right: 9px;
    margin-bottom: 9px;
    width: 77px;
    height: 77px;
    text-align: center;
    border: 1px dashed #000;
    border-radius: 10%;
}
</style>

