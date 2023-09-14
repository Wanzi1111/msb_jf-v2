<template>
  <div class="app-container">
    <div class="home-top">
      <basics-title
        title="供应商配置"
      />
      <basics-menu-taps
        :actions="TabList"
        :active-index="activeIndex"
        :handle-select="activeIndexChange"
      />
    </div>
    <div class="home-content">
      <el-tooltip class="item" effect="dark" content="供应商签名仅显示供应商后台审核通过的签名数据" placement="top-end">
        <i style="color: rgb(176,176,176)" class="el-icon-warning-outline" />
      </el-tooltip>
      <basics-table
        ref="table"
        :table="table"
        :loading="loadings._ums_api_sms_api_messagePlatForm_selectSmsMessageTemplateList"
        :list="list"
        :get-list="getList"
        :columns="columns"
        :total="total"
        :list-query="listQuery"
      />
    </div>
  </div>
</template>

<script>

import { TabList } from '@/views/sms-middle-station/config'
import BasicsTitle from '@/components/BasicsTitle'
import BasicsMenuTaps from '@/components/BasicsMenuTaps'
import BasicsTable from '@/components/BasicsTable'
import { mapGetters } from 'vuex'
import { selectSmsMessageTemplateList } from '@/api/sms-middle-station/supplier-configuration'
import columns from './columns'

const init_pagaination = {
  page: 1,
  limit: 20
}

export default {
  name: 'SupplierConfiguration',
  components: { BasicsTitle, BasicsMenuTaps, BasicsTable },
  data() {
    return {
      TabList,
      activeIndex: 'null',
      table: {
        stripe: false,
        border: false
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
    activeIndexChange(id) {
      this.activeIndex = id
      this.initParamsAndGetList()
    },
    getList() {
      const { activeIndex, listQuery } = this
      const newSearchQuery = {
        supplierName: activeIndex === 'null' ? undefined : activeIndex,
        pageNum: listQuery.page,
        pageSize: listQuery.limit }
      selectSmsMessageTemplateList(newSearchQuery).then(res => {
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
.home-top {
  border-radius: 10px;
}
.home-content {
  position: relative;
  .item {
    position: absolute;
    z-index: 30;
    top: -15px;
    right: 0;
  }
}
</style>
