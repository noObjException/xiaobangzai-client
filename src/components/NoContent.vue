<template>
   <div class="no-content">
      <slot></slot>
      <p>{{title}}</p>
    </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.no-content{
  text-align: center;
  fill:rgb(206, 206, 206);
  color: rgb(206, 206, 206);
  padding: 30% 0;
}
</style>
