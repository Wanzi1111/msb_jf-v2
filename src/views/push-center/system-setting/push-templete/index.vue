<template>
  <div class="app-container">
    <basics-title
      title="PUSH模板列表"
      :actions="actions"
    />

    <basics-tabs
      :tab-list="tabList"
      :active-tab="messageType"
      @handleTabClick="handleTabClick"
    />

    <basics-search
      ref="searchs"
      :loading="loadings._ums_api_sms_api_push_selectPushMessageTemplateList"
      :searchs="searchs"
      @submitSearch="submitSearch"
    />

    <basics-table
      :loading="loadings._ums_api_sms_api_push_selectPushMessageTemplateList"
      :list="list"
      :get-list="getList"
      :columns="columns"
      :total="total"
      :list-query="listQuery"
      :action-function="actionFunction"
    />

    <router-view />

  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { cloneDeep } from 'lodash';
import moment from 'moment';
import {
  selectPushMessageTemplateList,
  addOrUpdatePushMessageTemplate
} from '@/api/push-center/index'
import BasicsSearch from '@/components/BasicsSearch'
import BasicsTable from '@/components/BasicsTable';
import { tabList, actions } from './config'
import columns, { tableActions } from './columns'
import searchs from './searchs'

const init_pagination = {
  page: 1,
  limit: 20
}

export default {
  name: 'PushTemplete',
  components: { BasicsSearch, BasicsTable },
  data() {
    return {
      columns,
      searchs,
      tabList,
      total: 0,
      dialogType: '',
      list: [],
      messageType: '0',
      searchQuery: {},
      listQuery: { ...init_pagination },
      actions: actions({ handleActions: this.handleActions }),
      actionFunction: tableActions({ handleTableAction: this.handleTableAction }),
      adjustValue: 123
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
      this.getList()
      setTimeout(() => {
        this.handleTableAction('adjust')
      }, 2000)
    },
    getList() {
      const { searchQuery, messageType, listQuery: { page: pageNum, limit: pageSize }} = this
      selectPushMessageTemplateList({ pageNum, pageSize, messageType, ...searchQuery })
        .then(res => {
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
      const newValue = cloneDeep(value)
      // 时间处理
      if (newValue.time?.length) {
        newValue.addTimeStart = moment(newValue.time[0]).format('YYYYMMDD')
        newValue.addTimeEnd = moment(newValue.time[1]).format('YYYYMMDD')
        delete newValue.time
      }
      this.searchQuery = { ...newValue }
      this.initGetList()
    },
    // 业务切换
    handleTabClick(val) {
      this.messageType = val
      this.initGetList()
    },
    // 列表操作
    handleTableAction(type, row) {
      switch (type) {
        case 'edit': {
          this.$router.push({ path: '/push-center/system-setting/add-push-temp', query: row })
          break
        }
        case 'adjustAdopt': {
          this.$confirm('确定审核通过吗？', '审核通过', { type: 'warning' })
            .then(() => {
              addOrUpdatePushMessageTemplate({ auditStatus: 1, id: row.id })
                .then(() => {
                  this.$message.success('审核已通过～')
                  this.getList()
                })
            })
          break
        }
        case 'adjustReject': {
          this.$confirm('确定审核驳回吗？', '审核驳回', { type: 'warning' })
            .then(() => {
              addOrUpdatePushMessageTemplate({ auditStatus: 0, id: row.id })
                .then(() => {
                  this.$message.success('审核已驳回～')
                  this.getList()
                })
            })
          break
        }
        case 'delete': {
          this.$confirm('删除后该数据将被移除！', '删除', { type: 'warning' })
            .then(() => {
              addOrUpdatePushMessageTemplate({ delete: 1, id: row.id })
                .then(() => {
                  this.$message.success('删除成功～')
                  this.getList()
                })
            })
          break
        }
        case 'log': {
          this.$router.push({ path: '/push-center/system-setting/push-temp-log', query: { id: row.templateId }})
          break
        }
      }
    },
    handleDialogVis(type, data, refreshFlag) {
      this.dialogType = type
      this.dialogData = data
      refreshFlag && this.initGetList()
    },
    handleActions() {
      // this.handleDialogVis('addPushTemp')
      this.$router.push({ path: '/push-center/system-setting/add-push-temp' })
    },
  }
}
</script>
<style lang="scss" scoped>
</style>
