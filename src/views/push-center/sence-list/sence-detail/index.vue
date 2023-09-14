<!--
 * @Author: ZhangYeLei
 * @Date: 2022-03-30 18:24:28
 * @LastEditTime: 2022-04-21 16:30:13
 * @LastEditors: ZhangYeLei
-->
<template>
  <div class="app-container">
    <basics-title
      title="场景发送明细"
    />

    <basics-search
      ref="searchs"
      :loading="loadings._ums_api_sms_api_push_selectPushScenarioSendStatisticsList"
      :searchs="searchs"
      @submitSearch="submitSearch"
    />

    <basics-table
      :loading="loadings._ums_api_sms_api_push_selectPushScenarioSendStatisticsList"
      :list="list"
      :get-list="getList"
      :columns="columns"
    />
    <div style="margin-top: 20px; font-size: 13px; font-weight: normal; color: #606266; text-align: right">共{{ total }}条数据</div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { cloneDeep } from 'lodash';
import moment from 'moment';
import { selectPushScenarioSendStatisticsList } from '@/api/push-center'
import BasicsSearch from '@/components/BasicsSearch'
import searchs from './searchs'
import columns from './columns'

export default {
  name: 'PushSenceDetail',
  components: { BasicsSearch },
  data() {
    return {
      columns,
      searchs,
      list: [],
      total: 0,
      searchQuery: {},
    }
  },
  computed: {
    ...mapGetters(['loadings']),
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.searchs.search()
    })
  },
  methods: {
    getList() {
      const { searchQuery, $route: { query: { id: scenarioId }}} = this
      selectPushScenarioSendStatisticsList({ scenarioId, ...searchQuery })
        .then(res => {
          const { payload } = res
          this.list = payload
          this.total = payload.length || 0
        })
        .catch(() => {
          this.list = []
          this.total = 0
        })
    },
    submitSearch(value) {
      if (!value.time || value.time.length <= 0) {
        this.$message.warning('请先选择查询时间范围～')
        return
      }
      const newValue = cloneDeep(value)
      // 时间处理
      if (newValue.time?.length) {
        newValue.addTimeStart = moment(newValue.time[0]).format('YYYYMMDD')
        newValue.addTimeEnd = moment(newValue.time[1]).format('YYYYMMDD')
        delete newValue.time
      }
      this.searchQuery = newValue
      this.getList()
    },
  }
}
</script>
<style lang="scss" scoped>
</style>
