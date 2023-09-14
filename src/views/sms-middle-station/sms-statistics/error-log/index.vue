<template>
  <div>
    <router-view />
    <div v-show="$route.path === '/sms-middle-station/error-log'" class="app-container">
      <div class="home-top">
        <basics-title
          title="错误日志"
        />
        <basics-menu-taps
          :actions="TabList"
          :active-index="activeIndex"
          :handle-select="activeIndexChange"
        />
      </div>

      <div class="home-content">
        <basics-search
          ref="searchs"
          :loading="loadings._ums_api_sms_api_messagePlatForm_selectSmsErrLogParamList"
          :searchs="searchs"
          :is-download="true"
          @download="download"
          @submitSearch="submitSearch"
        />
        <basics-table
          ref="table"
          :table="table"
          :loading="loadings._ums_api_sms_api_messagePlatForm_selectSmsErrLogParamList"
          :list="list"
          :get-list="getList"
          :columns="columns"
          :total="total"
          :list-query="listQuery"
          :action-function="actionFunction"
        />
      </div>
    </div>
  </div>
</template>

<script>

import { TabList } from '@/views/sms-middle-station/config'
import BasicsTitle from '@/components/BasicsTitle'
import BasicsSearch from '@/components/BasicsSearch'
import BasicsTable from '@/components/BasicsTable'
import { searchs } from './search'
import BasicsMenuTaps from '@/components/BasicsMenuTaps'
import { mapGetters } from 'vuex'
import { selectSmsErrLogParamList, downloadSmsErrLogParamList } from '@/api/sms-middle-station/error-log'
import { selectSmsMessageTemplateList } from '@/api/sms-middle-station/supplier-configuration'
import columns, { actions } from './columns'
import moment from 'moment'

const init_pagaination = {
  page: 1,
  limit: 20
}

export default {
  name: 'ErrorLog',
  components: { BasicsTitle, BasicsSearch, BasicsMenuTaps, BasicsTable },
  data() {
    return {
      TabList,
      searchs,
      activeIndex: 'null',
      table: {
        stripe: false,
        border: false
      },
      searchQuery: {
        businessType: "", // 业务线
        domesticForeign: "",
        messageType: "",
        scenarioId: "",
        scenarioName: "",
        templateId: "",
        signature: "",
        timeEnd: moment().endOf('day') + '',
        timeStart: moment().startOf('day') + '',
        type: '1' // 1 全部 2 单个
      },
      columns,
      total: 0,
      list: [],
      listQuery: { ...init_pagaination },
      actionFunction: actions({
        tableAction: this.tableAction
      })
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  mounted() {
    this.getSignatureOptions()
    this.$nextTick(() => {
      this.getList()
    })
  },
  methods: {
    getSignatureOptions(id) {
      const newSearchQuery = {
        supplierName: id || undefined,
        pageNum: 1,
        pageSize: 9999 }
      selectSmsMessageTemplateList(newSearchQuery).then(res => {
        if (res?.code === 0) {
          const { payload: { list }} = res
          this.$refs.searchs.set({
            type: 'options',
            data: { signature: list?.reduce((pre, cur) => {
              return pre.find((i) => i.signature === cur.signature)
                ? pre : [...pre, cur]
            }, [])
            .map((item) => {
              return {
                label: item.signature,
                value: item.signature,
              } || []
            }) }
          })
          this.$refs.searchs.set({
            type: 'defaultVal',
            data: { signature: '' }
          })
        }
      })
    },
    activeIndexChange(id) {
      this.activeIndex = id
      this.getSignatureOptions(id)
      this.searchQuery = { ...this.searchQuery, signature: "" }
      this.initParamsAndGetList()
    },
    // 导出
    download() {
      downloadSmsErrLogParamList({ ...this.searchQuery, ...this.listQuery, supplierName: this.activeIndex === 'null' ? undefined : this.activeIndex })
    },
    tableAction(dat, row, index) {
      this.$router.push({ path: '/sms-middle-station/error-log/error-report', query: { activeIndex: row.supplierName, searchQuery: this.searchQuery }})
    },
    submitSearch(value) {
      const newSearchQuery = { ...this.searchQuery, ...value }
      newSearchQuery.scenarioName = ''
      newSearchQuery.scenarioId = ''
      newSearchQuery.templateId = ''
      newSearchQuery[value.sceneInfoInputSelectProp] = value.sceneInfoInputSelect

      newSearchQuery.timeStart = value.daterange ? moment(value.daterange[0]).startOf('day') + '' : ''
      newSearchQuery.timeEnd = value.daterange ? moment(value.daterange[1]).endOf('day') + '' : ''

      newSearchQuery.domesticForeign = value.SMSType.length ? value.SMSType[1]?.split('-')?.[0] : ''
      newSearchQuery.messageType = value.SMSType.length ? value.SMSType[1]?.split('-')?.[1] : ''
      this.searchQuery = newSearchQuery
      this.initParamsAndGetList()
    },
    initParamsAndGetList() {
      this.listQuery = {
        ...init_pagaination
      }
      this.$nextTick(() => {
        this.getList()
      })
    },
    getList() {
      const { searchQuery, listQuery, activeIndex } = this
      const newSearchQuery = {
        ...searchQuery,
        supplierName: activeIndex === 'null' ? undefined : activeIndex,
        pageNum: listQuery.page,
        pageSize: listQuery.limit }
      selectSmsErrLogParamList(newSearchQuery).then(res => {
        if (res?.code === 0) {
          const { payload: { list, totalSize, page }} = res
          this.list = list
          this.total = totalSize
          if (page > 1 && list.length === 0) {
            this.listQuery = {
              ...init_pagaination,
              page: page - 1
            }
            this.$nextTick(() => {
              this.getList()
            })
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.home-top {
  border-radius: 10px;
}
</style>
