<!--
 * @Author: ZhangYeLei
 * @Date: 2022-03-30 18:24:28
 * @LastEditTime: 2022-04-15 19:03:37
 * @LastEditors: ZhangYeLei
-->
<template>
  <div class="app-container">
    <basics-title title="push模板操作日志" />

    <basics-table
      :loading="loadings._ums_api_sms_api_push_selectOperation"
      :list="list"
      :get-list="getList"
      :columns="columns"
      :total="total"
      :list-query="listQuery"
    />

  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { selectOperation } from '@/api/push-center/index';
import BasicsTable from '@/components/BasicsTable';
import columns from './columns'

const init_pagination = {
  page: 1,
  limit: 20
}

export default {
  name: 'PushTempLog',
  components: { BasicsTable },
  data() {
    return {
      columns,
      total: 0,
      list: [{ id: 1 }],
      listQuery: { ...init_pagination },
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
    getList() {
      const { listQuery: { page: pageNum, limit: pageSize }} = this
      console.log(this.$route);
      const { query: { id: operationId }} = this.$route
      selectOperation({ pageNum, pageSize, operationId, operationType: 2 })
        .then(res => {
          const { payload: { list, totalSize }} = res
          this.list = list
          this.total = totalSize
        })
    },
  }
}
</script>
