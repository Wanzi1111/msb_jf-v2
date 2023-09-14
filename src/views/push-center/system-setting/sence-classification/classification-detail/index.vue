<template>
  <div class="app-container">
    <basics-title
      :title="title"
      :actions="actions"
    />

    <basics-table
      :loading="loadings._ums_api_sms_api_push_selectPushScenarioTypeList || loadings._ums_api_sms_api_push_selectPushScenarioTypeList"
      :list="list"
      :get-list="getList"
      :columns="columns"
      :total="total"
      :list-query="listQuery"
      :action-function="actionFunction"
    />

    <template>
      <dialog-add-push-classifition
        v-if="['addPushClassifition', 'editPushClassifition'].includes(dialogType)"
        :type="dialogType"
        :dialog-data="dialogData"
        @handleDialogVis="handleDialogVis"
      />
    </template>

  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { selectPushScenarioTypeList, addOrUpdatePushScenarioType } from '@/api/push-center/index'
import columns, { tableActions } from './columns'
import { actions } from './config'
import DialogAddPushClassifition from './components/dialogAddPushClassifition';

const init_pagination = {
  page: 1,
  limit: 20
}

export default {
  name: 'PushSenceClassificationDetail',
  components: { DialogAddPushClassifition },
  data() {
    return {
      columns,
      total: 0,
      dialogType: '',
      list: [],
      title: '',
      activeTab: '101',
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
      this.title = this.$route.query.title
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
      const { id, businessType } = this.$route.query
      const { listQuery: { page: pageNum, limit: pageSize }} = this
      selectPushScenarioTypeList({ pageNum, pageSize, businessType, parentId: id })
        .then(res => {
          const { payload: { list, totalSize }} = res
          this.list = list
          this.total = totalSize
        })
    },
    handleTabClick(val) {
      this.activeTab = val
      this.getList()
    },
    handleTableAction(type, row) {
      switch (type) {
        case 'edit': {
          this.handleDialogVis('editPushClassifition', row)
          break
        }
        case 'delete': {
          this.$confirm('如删除该项，将存在数据缺失风险，确定删除吗？此操作无法恢复！请先确认该项下是否存在相关数据', '删除', { type: 'warning' })
            .then(() => {
              const { id, parentId, businessType } = row
              addOrUpdatePushScenarioType({ parentId, delete: 1, id, businessType })
                .then(() => {
                  this.$message.success('删除成功～')
                  this.getList()
                })
            })
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
      this.handleDialogVis('addPushClassifition')
    },
  }
}
</script>
<style lang="scss" scoped>
</style>
