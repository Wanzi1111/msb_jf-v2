<!--
 * @Author: ZhangYeLei
 * @Date: 2022-03-04 15:05:51
 * @LastEditTime: 2022-04-15 19:03:51
 * @LastEditors: ZhangYeLei
-->
<template>
  <div class="app-container">
    <basics-title
      title="场景操作日志"
    />

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
import BasicsTable from '@/components/BasicsTable';
import { selectOperation } from '@/api/push-center/index';
import columns from './columns'

const init_pagination = {
  page: 1,
  limit: 20
}

export default {
  name: 'PushSenceLog',
  components: { BasicsTable },
  data() {
    return {
      columns,
      total: 0,
      list: [],
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
      selectOperation({ pageNum, pageSize, operationId, operationType: 1 })
        .then(res => {
          const { payload: { list, totalSize }} = res
          this.list = list
          this.total = totalSize
        })
    },
  }
}
</script>
