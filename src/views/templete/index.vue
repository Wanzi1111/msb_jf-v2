<template>
  <div class="app-container">
    <basics-title
      title="Title"
      :actions="actions"
    />

    <basics-tabs
      :tab-list="tabList"
      :active-tab="activeTab"
      @handleTabClick="handleTabClick"
    />

    <basics-search
      ref="searchs"
      :loading="loadings._ums_api_uc_api_platform_user_list"
      :searchs="searchs"
      @submitSearch="submitSearch"
    />
    <basics-table
      :loading="loadings._ums_api_uc_api_platform_user_list"
      :list="list"
      :get-list="getList"
      :columns="columns"
      :total="total"
      :list-query="listQuery"
      :action-function="actionFunction"
    />
    <template v-if="dialogType">
      <dialog-confirm-logis v-if="['pass', 'rePush'].includes(dialogType)" :dialog-data="dialogData" @handleDialogVis="handleDialogVis" />
    </template>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import searchs from './search'
import columns, { tableActions } from './columns'
import { tabList, actions } from './config'
import DialogConfirmLogis from './components/dialogCom'
// import { getRoleList } from '@/api/'

const init_pagaination = {
  page: 1,
  limit: 20
}

export default {
  name: 'PushSenceList',
  components: { DialogConfirmLogis },
  data() {
    return {
      columns,
      searchs,
      tabList,
      total: 0,
      list: [],
      activeTab: '0',
      searchQuery: {},
      dialogType: '',
      dialogData: '',
      listQuery: { ...init_pagaination },
      actions: actions({ handleActions: this.handleActions }),
      actionFunction: tableActions({ handleTableAction: this.handleTableAction }),
    }
  },
  computed: {
    ...mapGetters(['loadings']),
  },
  mounted() {
    this.$nextTick(() => {
      this.getList()
    })
  },
  methods: {
    initGetList() {
      this.listQuery = { ...init_pagaination }
      this.$nextTick(() => {
        this.getList()
      })
    },
    getList() {
      const { searchQuery, listQuery } = this
    },
    submitSearch(value) {
      this.searchQuery = { ...value }
      this.initGetList()
    },
    handleTabClick(val) {
      this.activeTab = val
      this.getList()
    },
    handleTableAction(type, row) {
      switch (type) {
        case '': {
          break
        }
      }
    },
    handleActions() { },
    handleDialogVis(type, data, refresh) {
      this.dialogType = type || ''
      this.dialogData = data || ''
      refresh && this.getList()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
