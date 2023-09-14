<template>
  <div>
    <div class="app-container">
      <div class="home-top">
        <basics-title :title="label" />
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
          @sort-change="sortChange"
        />
      </div>
    </div>
  </div>
</template>

<script>

import BasicsTitle from '@/components/BasicsTitle'
import BasicsSearch from '@/components/BasicsSearch'
import BasicsTable from '@/components/BasicsTable'
import { searchs } from './search'
import { mapGetters } from 'vuex'
import { selectSmsErrLogParamList, downloadSmsErrLogParamList } from '@/api/sms-middle-station/error-log'
import { selectSmsMessageTemplateList } from '@/api/sms-middle-station/supplier-configuration'
import columns from './columns'
import moment from 'moment'
import { createBlob } from '@/utils/index'

const init_pagaination = {
  page: 1,
  limit: 20
}

export default {
  name: 'ErrorReport',
  components: { BasicsTitle, BasicsSearch, BasicsTable },
  data() {
    return {
      label: '',
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
        timeEnd: "",
        timeStart: "",
        failReason: '',
        sortType: undefined,
        type: '2' // 1 全部 2 单个
      },
      columns,
      total: 0,
      list: [],
      listQuery: { ...init_pagaination }
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  mounted() {
    const { listSupplierNameType } = window.baseData
    this.activeIndex = this.$route.query.activeIndex
    this.searchQuery = { ...this.$route.query.searchQuery, type: '2' }
    this.label = listSupplierNameType.find(i => i.value === this.$route.query.activeIndex)?.label || '全部'
    this.getSignatureOptions()
    this.$nextTick(() => {
      this.$refs.searchs.recoveryForm({ ... this.$route.query.searchQuery })
      this.$nextTick(() => {
        this.getList()
      })
    });
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
    sortChange({ order }) {
      const { searchQuery } = this
      const newSearchQuery = { ...searchQuery }
      if (order) {
        if (order === 'descending') {
          newSearchQuery.sortType = '1'
        } else {
          newSearchQuery.sortType = '0'
        }
      } else {
        newSearchQuery.sortType = undefined
      }
      this.searchQuery = { ...newSearchQuery }
      this.$nextTick(() => {
        this.getList()
      });
    },
    // 导出
    download() {
      downloadSmsErrLogParamList({ ...this.searchQuery, ...this.listQuery, supplierName: this.activeIndex === 'null' ? undefined : this.activeIndex })
    },
    tableAction(dat, row, index) {
      this.$router.push({ path: '/sms-middle-station/error-log/error-report', query: { activeIndex: this.activeIndex }})
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
