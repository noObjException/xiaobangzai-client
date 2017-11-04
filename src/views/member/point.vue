<template>
    <div>
        <div class="point">
            <div class="title">当前积分</div>
            <div class="content">{{totalPoint}}</div>
        </div>

        <group>
            <cell :title="item.title" :inline-desc="item.created_at" v-for="(item, index) in lists" :key="index">
              <span v-if="item.value > 0" class="text-danger">
                + {{item.value}}
              </span>
              <span v-else>
                - {{Math.abs(item.value)}}
              </span>
            </cell>
        </group>
    </div>
</template>

<script>
import { Group, Cell } from 'vux'

export default {
  data () {
    return {
      totalPoint: 0,
      lists: []
    }
  },
  components: {
    Group, Cell
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      await this.$http.get('/pointRecords').then(res => {
        this.lists = res.data
        this.totalPoint = res.meta.total_point
      })
    }
  }
}
</script>

<style lang="less" scoped>
.point {
    background-color: #ef843f;
    color: #fff;
    .title {
        padding-top:20px; 
        padding-left:20px; 
    }
    .content {
        text-align: center;
        padding: 40px 0;
        font-size: 30px;
    }
}
</style>

