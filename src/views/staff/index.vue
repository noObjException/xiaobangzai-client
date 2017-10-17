<template>
  <div>
    <div class="avatar">
      <img :src="staff.avatar" />
      <p>{{staff.nickname}}</p>
    </div>
    <group gutter="0">
      <grid :cols='2'>
        <grid-item :label="'余额: '+staff.credit"></grid-item>
        <grid-item label="信誉点:59"></grid-item>
      </grid>
    </group>

    <group gutter="6px">
      <cell title="任务大厅" value="去接单" link="/staff/mission/list"></cell>
      <grid :cols='3' class="menus">
        <grid-item :label="order_counts.processing || '0'">
          <p class="menu-item">配送中</p>
        </grid-item>
        <grid-item :label="order_counts.completed || '0'">
          <p class="menu-item">已完成</p>
        </grid-item>
        <grid-item :label="order_counts.canceled || '0'">
          <p class="menu-item">已取消</p>
        </grid-item>
      </grid>

    </group>

    <group gutter="6px">
      <cell title="评价管理" value="0" is-link></cell>
    </group>
  </div>
</template>

<script>
import { Grid, GridItem, Group, Cell } from 'vux'

export default {
  data () {
    return {
      staff: {},
      order_counts: {}
    }
  },
  components: {
    Grid, GridItem, Group, Cell
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      this.$http.get('/staffs/0').then(res => {
        this.staff = res.data
        this.order_counts = res.meta.order_counts
      })
    }
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

