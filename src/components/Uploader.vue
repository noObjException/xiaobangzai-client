<template>
    <div>
        <div class="weui-uploader" style="padding:15px;">
            <div class="weui-uploader__hd">
                <p class="weui-uploader__title">{{title}}</p>
            </div>
            <div class="weui-uploader__bd">
                <ul class="weui-uploader__files">
                    <li class="weui-uploader__file" style="background-image:url(https://static.vux.li/uploader_bg.png)"></li>
                    <li class="weui-uploader__file" style="background-image:url(https://static.vux.li/uploader_bg.png)"></li>
                    <li class="weui-uploader__file" style="background-image:url(https://static.vux.li/uploader_bg.png)"></li>
                    <li class="weui-uploader__file" style="background-image:url(https://static.vux.li/uploader_bg.png)"></li>
                    <li class="weui-uploader__file" style="background-image:url(https://static.vux.li/uploader_bg.png)"></li>
                    <li class="weui-uploader__file" style="background-image:url(https://static.vux.li/uploader_bg.png)"></li>
                    <li class="weui-uploader__file" style="background-image:url(https://static.vux.li/uploader_bg.png)"></li>
                    <li class="weui-uploader__file" style="background-image:url(https://static.vux.li/uploader_bg.png)"></li>
                </ul>

                <vue-core-image-upload class="upload-button" 
                :crop="false" 
                inputOfFile="picture"
                @imageuploaded="imageuploaded" 
                :max-file-size="5242880" 
                :url="BASE_API + '/pictures'"
                :multiple="true"
                :multiple-size="4"
                :credentials="true"
                :headers="headers">
                    <x-icon type="ios-camera" size="48"></x-icon>
                    <p>添加照片</p>
                </vue-core-image-upload>
            </div>
        </div>
    </div>
</template>

<script>
import VueCoreImageUpload from 'vue-core-image-upload'
export default {
  data () {
    return {
      BASE_API: process.env.BASE_API,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  },
  components: {
    VueCoreImageUpload
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    imageuploaded (res) {

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

