<template>
  <div>
    <div class="avatar">
      <img src="../../../static/logo.png" />
      <p>陈总</p>
    </div>
    <group gutter="0">
      <grid :cols='2'>
        <grid-item label="余额: 999.00"></grid-item>
        <grid-item label="信誉点:59"></grid-item>
      </grid>
    </group>

    <group gutter="6px">
      <cell title="任务大厅" value="全部任务" link="/staff/mission/list"></cell>
      <grid :cols='4' class="menus">
        <grid-item label="67">
          <p class="menu-item">已接单</p>
        </grid-item>
        <grid-item label="34">
          <p class="menu-item">待取货</p>
        </grid-item>
        <grid-item label="45">
          <p class="menu-item">配送中</p>
        </grid-item>
        <grid-item label="3">
          <p class="menu-item">已完成</p>
        </grid-item>
      </grid>

      <grid :cols='2' class="menus">
        <grid-item label="3"><p class="menu-item">已取消</p></grid-item>
        <grid-item label="66"><p class="menu-item">评价管理</p></grid-item>
      </grid>
    </group>

  </div>
</template>

<script>
import { Grid, GridItem, Group, Cell } from 'vux'

export default {
  data () {
    return {

    }
  },
  components: {
    Grid, GridItem, Group, Cell
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

.menus {
  background-color: #fff;
  .menu-item {
    color: #000;
    text-align: center;
    margin-top: 4px;
  }
}
</style>

