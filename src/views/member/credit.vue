<template>
    <div>
        <div class="credit">
            <div class="title">当前积分</div>
            <div class="content">{{totalCredit}}</div>
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
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      totalCredit: 0,
      lists: []
    }
  },
  components: {
    Group, Cell
  },
  computed: {
    ...mapGetters([
      'openid'
    ])
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      await this.$http.get('/creditRecords/' + this.openid).then(res => {
        this.lists = res.data
        this.totalCredit = res.meta.total_credit
      })
    }
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

