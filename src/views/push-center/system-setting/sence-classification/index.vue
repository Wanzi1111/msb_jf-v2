<template>
  <div class="app-container">
    <basics-title
      title="PUSH场景"
      :actions="actions"
    />

    <basics-tabs
      :tab-list="tabList"
      :active-tab="businessType"
      @handleTabClick="handleTabClick"
    />

    <basics-table
      :loading="loadings._ums_api_sms_api_push_selectPushScenarioTypeList"
      :list="list"
      :get-list="getList"
      :columns="columns"
      :total="total"
      :list-query="listQuery"
      :action-function="actionFunction"
    />

    <template>
      <dialog-add-push-subject
        v-if="['addPushSubject', 'editPushSubject'].includes(dialogType)"
        :type="dialogType"
        :dialog-data="dialogData"
        @handleDialogVis="handleDialogVis"
      />
    </template>

    <!-- <router-view /> -->

  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import BasicsTable from '@/components/BasicsTable';
import { selectPushScenarioTypeList, addOrUpdatePushScenarioType } from '@/api/push-center/index'
import columns, { tableActions } from './columns'
import { tabList, actions } from './config'
import DialogAddPushSubject from './components/dialogAddPushSubject';

const init_pagination = {
  page: 1,
  limit: 20
}

export default {
  name: 'PushSenceClassification',
  components: { BasicsTable, DialogAddPushSubject },
  data() {
    return {
      columns,
      tabList,
      total: 0,
      dialogType: '',
      list: [],
      businessType: '101',
      listQuery: { ...init_pagination },
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
      this.listQuery = { ...init_pagination }
      this.$nextTick(() => {
        this.getList()
      })
    },
    getList() {
      const { businessType, listQuery: { page: pageNum, limit: pageSize }} = this
      selectPushScenarioTypeList({ pageNum, pageSize, businessType, parentId: 0 })
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
    handleTabClick(val) {
      this.businessType = val
      this.getList()
    },
    handleTableAction(type, row) {
      switch (type) {
        case 'edit': {
          this.handleDialogVis('editPushSubject', row)
          break
        }
        case 'delete': {
          this.$confirm('如删除该项，将存在数据缺失风险，确定删除吗？此操作无法恢复！请先确认该项下是否存在相关数据', '删除', { type: 'warning' })
            .then(() => {
              const { parentId, id, businessType } = row
              addOrUpdatePushScenarioType({ parentId, delete: 1, id, businessType })
                .then(() => {
                  this.$message.success('删除成功～')
                  this.getList()
                })
            })
          break
        }
        case 'classify': {
          this.$router.push({ path: '/push-center/system-setting/classification-detail', query: { title: row.typeName, id: row.id, businessType: row.businessType }})
          break
        }
        case 'log': {
          this.$router.push({ name: 'PushSenceLog', query: { id: 1 }})
          break
        }
      }
    },
    handleDialogVis(type, data, refreshFlag) {
      this.dialogType = type
      this.dialogData = data
      refreshFlag && this.initGetList()
    },
    handleActions(type) {
      this.handleDialogVis('addPushSubject', { businessType: this.businessType })
    },
  }
}
</script>
<style lang="scss" scoped>
</style>
