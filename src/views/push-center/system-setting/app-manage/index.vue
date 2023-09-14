<!--
 * @Author: ZhangYeLei
 * @Date: 2022-05-09 15:39:04
 * @LastEditTime: 2022-05-17 15:27:34
 * @LastEditors: ZhangYeLei
-->
<template>
  <div class="app-container">
    <basics-title
      title="应用管理"
    />

    <basics-table
      :loading="loadings._ums_api_sms_api_push_selectPushApplyConfigList || loadings._ums_api_sms_api_push_addOrUpdatePushApplyConfig"
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
import { selectPushApplyConfigList, addOrUpdatePushApplyConfig } from '@/api/push-center';
import BasicsTable from '@/components/BasicsTable';
import columns, { tableActions } from './columns'

const init_pagination = {
  page: 1,
  limit: 20
}

export default {
  name: 'PushAppManage',
  components: { BasicsTable },
  data() {
    return {
      list: [{ id: 1 }],
      total: 0,
      listQuery: { ...init_pagination },
      columns,
      actionFunction: tableActions({ handleTableAction: this.handleTableAction }),
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  watch: {},
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      const { listQuery: { page: pageNum, limit: pageSize }} = this
      selectPushApplyConfigList({ pageNum, pageSize })
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
    handleTableAction(type, row) {
      switch (type) {
        case 'set': {
          this.$prompt(`当前应用：${row.applyName}`, '设置通知条数', { inputPattern: /[1-9][0-9]|[5-9]/, inputPlaceholder: '默认展示5条' })
            .then(({ value }) => {
              const { applyId, supplierId } = row
              addOrUpdatePushApplyConfig({ applyId, supplierId, noticeNumber: value })
                .then(() => {
                  this.$message.success('设置成功～')
                  this.getList()
                })
            })
          break
        }
      }
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
