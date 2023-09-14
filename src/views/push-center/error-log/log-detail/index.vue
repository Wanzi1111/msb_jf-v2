<template>
  <div class="app-container">
    <basics-title :title="$route.query.title" />

    <basics-search
      ref="searchs"
      :loading="loadings._ums_api_sms_api_push_selectPushErrLogParamList || loadings._ums_api_sms_api_push_downloadPushErrLogList"
      :is-download="true"
      :searchs="searchs"
      @download="handleExport"
      @submitSearch="submitSearch"
    />

    <basics-table
      :loading="loadings._ums_api_sms_api_push_selectPushErrLogParamList"
      :list="list"
      :get-list="getList"
      :columns="columns"
      :total="total"
      :list-query="listQuery"
    />

  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { cloneDeep, omit } from 'lodash';
import moment from 'moment';
import { selectPushErrLogParamList, downloadPushErrLogList } from '@/api/push-center'
import BasicsSearch from '@/components/BasicsSearch'
import searchs from './searchs'
import columns from './columns'

const init_pagination = {
  page: 1,
  limit: 20
}

export default {
  name: 'PushErrorLogDetail',
  components: { BasicsSearch },
  data() {
    return {
      columns,
      searchs,
      total: 0,
      type: 2,
      list: [{ id: 1 }],
      searchQuery: {},
      listQuery: { ...init_pagination },
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
    initGetList() {
      this.listQuery = { ...init_pagination }
      this.$nextTick(() => {
        this.getList()
      })
    },
    getList() {
      const { searchQuery, type, $route: { query: { id }}, listQuery: { page: pageNum, limit: pageSize }} = this
      selectPushErrLogParamList({ pageNum, pageSize, type, supplierId: id, ...searchQuery })
        .then(res => {
          console.log('【res】', res);
          const { payload: { list, totalSize }} = res
          this.list = list
          this.total = totalSize
        })
        .catch(() => {
          this.list = []
          this.total = 0
        })
    },
    submitSearch(value) {
      console.log('【value】', value);
      const newValue = cloneDeep(value)
      // 时间处理
      if (newValue.time?.length) {
        newValue.addTimeStart = moment(newValue.time[0]).format('YYYYMMDD')
        newValue.addTimeEnd = moment(newValue.time[1]).format('YYYYMMDD')
        delete newValue.time
      }
      newValue[newValue.sceneInfoInputSelectProp] = newValue.sceneInfoInputSelect

      // 剔除无用属性
      this.searchQuery = omit(newValue, ['time', 'sceneInfoInputSelectProp', 'sceneInfoInputSelect'])
      this.initGetList()
    },
    handleExport() {
      const { searchQuery, type } = this
      downloadPushErrLogList({ type, ...searchQuery })
    },
  }
}
</script>
<style lang="scss" scoped>
</style>
