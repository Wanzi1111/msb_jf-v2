<template>
  <div class="app-container">

    <router-view />
    <basics-title title="错误日志" />

    <basics-tabs
      :tab-list="tabList"
      :active-tab="activeTab"
      @handleTabClick="handleTabClick"
    />

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
      :action-function="actionFunction"
    />

  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { cloneDeep, omit } from 'lodash';
import moment from 'moment';
import BasicsSearch from '@/components/BasicsSearch'
import { selectPushErrLogParamList, downloadPushErrLogList } from '@/api/push-center'
import { tabList } from './config'
import searchs from './searchs'
import columns, { tableActions } from './columns'

const init_pagination = {
  page: 1,
  limit: 20
}

export default {
  name: 'PushErrorLog',
  components: { BasicsSearch },
  data() {
    return {
      columns,
      searchs,
      tabList,
      total: 0,
      type: 1, // 1 错误明细； 2 错误明细
      list: [{ id: 1 }],
      activeTab: '0',
      searchQuery: {},
      listQuery: { ...init_pagination },
      actionFunction: tableActions({ handleTableAction: this.handleTableAction }),
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
      const { searchQuery, activeTab, type, listQuery: { page: pageNum, limit: pageSize }} = this
      const payload = { pageNum, pageSize, type, ...searchQuery }
      if (activeTab !== '0') {
        payload.supplierId = activeTab
      }
      selectPushErrLogParamList(payload)
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
    handleTabClick(val) {
      this.activeTab = val
      this.initGetList()
    },
    handleTableAction(type, row) {
      switch (type) {
        case 'detail': {
          this.$router.push({ path: '/push-center/error-log-detail', query: { title: row.supplierName, id: row.supplierId }})
          break
        }
      }
    },
    handleExport() {
      const { searchQuery, activeTab, type } = this
      const payload = { type, ...searchQuery }
      if (activeTab !== '0') {
        payload.supplierId = activeTab
      }
      downloadPushErrLogList(payload)
    },
  }
}
</script>
<style lang="scss" scoped>
</style>
