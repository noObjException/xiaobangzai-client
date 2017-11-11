<template>
    <div>
        <div class="point">
            <div class="title">当前积分</div>
            <div class="content">{{totalPoint}}</div>
        </div>

        <group gutter="0px" v-if="lists.length > 0">
           <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" @bottom-status-change="handleBottomChange">
            <cell :title="item.title" :inline-desc="item.created_at" v-for="(item, index) in lists" :key="index">
              <span v-if="item.value > 0" class="text-danger">
                + {{item.value}}
              </span>
              <span v-else>
                - {{Math.abs(item.value)}}
              </span>
            </cell>
            <div slot="bottom" class="loadmore-bottom">
              <span v-show="bottomStatus === 'loading'">加载中<inline-loading></inline-loading></span>
              <span v-show="allLoaded === true">没有更多了</span>
            </div>
          </mt-loadmore>
        </group>

        <no-content title="暂无积分记录" v-else>
          <x-icon type="sad-outline" size="160"></x-icon>
        </no-content>
    </div>
</template>

<script>
import { Group, Cell, InlineLoading } from 'vux'
import { Loadmore as MtLoadmore } from 'mint-ui'
import NoContent from 'src/components/NoContent'

export default {
  data () {
    return {
      totalPoint: 0,
      lists: [],
      totalPages: 0,
      currentPage: 0,
      allLoaded: false,
      bottomStatus: ''
    }
  },
  components: {
    Group,
    Cell,
    MtLoadmore,
    InlineLoading,
    NoContent
  },
  computed: {
    queryParams () {
      return {
        per_page: 15,
        page: this.currentPage
      }
    }
  },
  created () {
    this.$store.commit('UPDATE_LOADING_STATUS', { title: '加载中...', status: true })
    this.loadData()
    this.$store.commit('UPDATE_LOADING_STATUS', { status: false })
  },
  methods: {
    async loadBottom () {
      await this.loadData()
      await this.$refs.loadmore.onBottomLoaded()
    },
    async loadData () {
      this.currentPage += 1

      await this.$http.get('/pointRecords', { params: this.queryParams }).then(res => {
        this.lists = this.lists.concat(res.data)
        this.totalPoint = res.meta.total_point
        this.totalPages = res.meta.pagination.total_pages

        if (this.currentPage === this.totalPages) {
          this.allLoaded = true
        }
      })
    },
    async handleBottomChange (status) {
      this.bottomStatus = status
    }
  }
}
</script>

<style lang="less" scoped>
.point {
  background-color: #ef843f;
  color: #fff;
  .title {
    padding-top: 20px;
    padding-left: 20px;
  }
  .content {
    text-align: center;
    padding: 40px 0;
    font-size: 30px;
  }
}
.loadmore-bottom{
  text-align: center;
}
</style>

