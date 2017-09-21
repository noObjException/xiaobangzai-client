<template>
    <div>
        <div class="credit">
            <div class="title">当前积分</div>
            <div class="content">666</div>
        </div>

        <group>
            <cell :title="item.title" :value="item.value" :inline-desc="item.created_at" v-for="(item, index) in lists" :key="index"></cell>
        </group>
    </div>
</template>

<script>
import { Group, Cell } from 'vux'

export default {
  data () {
    return {
      lists: [
        {
          title: '使用积分抵扣',
          value: '-20',
          created_at: '2017-09-02 12:33'
        },
        {
          title: '使用积分抵扣',
          value: '-20',
          created_at: '2017-09-02 12:33'
        }
      ]
    }
  },
  components: {
    Group, Cell
  }
}
</script>

<style lang="less" scoped>
.credit {
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

