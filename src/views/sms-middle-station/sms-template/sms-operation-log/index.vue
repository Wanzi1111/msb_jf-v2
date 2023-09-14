<template>
  <div class="app-container">
    <div class="home-top">
      <basics-title
        title="操作日志"
      />
    </div>
    <div class="home-content">
      <basics-table
        ref="table"
        :table="table"
        :loading="loadings._ums_api_sms_api_messagePlatForm_selectOperation"
        :list="list"
        :get-list="getList"
        :columns="columns"
        :total="total"
        :list-query="listQuery"
      >
        <template slot="operation" slot-scope="scope">
          <template v-for="(item, index) in scope.row.operation.split(';')">
            <p v-if="index !== scope.row.operation.split(';').length - 1" :key="index">{{ `${index + 1}、${item}` }}</p>
          </template>
        </template>
      </basics-table>
    </div>
  </div>
</template>

<script>

import BasicsTitle from '@/components/BasicsTitle'
import BasicsTable from '@/components/BasicsTable'
import { mapGetters } from 'vuex'
import { selectOperation } from '@/api/sms-middle-station/scene-configuration'
import columns from './columns'

const init_pagaination = {
  page: 1,
  limit: 20
}

export default {
  name: 'SMSOperationLog',
  components: { BasicsTitle, BasicsTable },
  data() {
    return {
      table: {
        stripe: false,
        border: false
      },
      columns,
      total: 0,
      list: [],
      searchQuery: {
        operationType: 2,
        operationId: ''
      },
      listQuery: { ...init_pagaination }
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  mounted() {
    this.searchQuery = { operationType: 2, operationId: this.$route.query?.actionObj?.templateId }
    this.$nextTick(() => {
      this.getList()
    })
  },
  methods: {
    initParamsAndGetList() {
      this.listQuery = {
        ...init_pagaination
      }
      this.$nextTick(() => {
        this.getList()
      })
    },
    getList() {
      const { searchQuery, listQuery } = this
      const newSearchQuery = {
        ...searchQuery,
        pageNum: listQuery.page,
        pageSize: listQuery.limit }
      selectOperation(newSearchQuery).then(res => {
        if (res?.code === 0) {
          const { payload: { list, totalSize }} = res
          this.list = list
          this.total = totalSize
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.home-top, .home-content {
  /deep/ .el-tabs__item {
    font-size: 16px;
  }
  border-radius: 10px;
}
</style>

