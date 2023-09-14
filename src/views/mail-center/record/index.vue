
<template>
  <div class="app-container">
    <div class="title-container">
      <basics-title title="邮件记录" line />
    </div>
    <div>

      <el-tabs v-model="activeBusinessTabValue">
        <el-tab-pane v-for="v in businessTabList" :key="v.value" :label="v.label" />
      </el-tabs>

      <basics-search ref="search" :loading="loadings._ums_api_sms_api_v1_mail_selectMailRecordList" :searchs="searchs" @submitSearch="submitSearch" />

      <el-tabs v-model="status" @tab-click="statusChange">
        <el-tab-pane v-for="v in tabList" :key="v.value" :name="v.value">
          <template slot="label">
            <el-badge :value="statisticsData[v.key] || 0" class="custom-el-badge" :type="v.type">
              <span>{{ v.label }}</span>
            </el-badge>
          </template>
        </el-tab-pane>
      </el-tabs>

      <basics-action v-show="status === '1'" :actions="act" />

      <basics-table
        :columns="columns"
        :list="list"
        :get-list="getList"
        :total="total"
        :loading="loadings._ums_api_sms_api_v1_mail_selectMailRecordList"
        :list-query="listQuery"
      >
        <template slot="contentSlot" slot-scope="scope">
          <p> {{ scope.row.title }} &nbsp; (<el-link type="primary" @click="viewHand(scope.row)">查看详情</el-link>)</p>
        </template>
      </basics-table>
    </div>

    <div v-if="modalVis">
      <ModalRejectRemarks :modal-data="modalData" :vis="modalVis" @handleModalVis="handleModalVis" />
    </div>

  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import moment from 'moment'
import { selectMailRecordList, selectMailSceneList } from '@/api/mail-center/record'
import act from './actions/index'
import ModalRejectRemarks from './components/modal-reject-remarks'
import columns from './columns'
import searchs from './searchs'
import { init_pagination, businessTabList, tabList } from './enum'

export default {
  name: 'ReviewActivities',
  components: { ModalRejectRemarks },
  data() {
    return {
      status: 'all',
      activeBusinessTabValue: '0',
      columns,
      searchs,
      businessTabList,
      list: [],
      tabList,
      total: 0,
      listQuery: { ...init_pagination },
      modalVis: false,
      modalData: {},
      statisticsData: {},
      act: act(),
      searchQuery: {}
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  mounted() {
    this.$nextTick(() => {
      this.mailSceneList()
      this.getList()
    })
  },
  methods: {
    viewHand(row) {
      this.modalVis = true
      this.modalData = row
    },
    submitSearch(values) {
      const [sendTimeStart, sendTimeEnd] = values.auditTime || []
      this.searchQuery = { ...values, sendTimeStart: this.momentHandle(sendTimeStart), sendTimeEnd: this.momentHandle(sendTimeEnd) }
      this.initPaginationAndGetList()
    },
    momentHandle(val) {
      return val ? moment(val).valueOf() : ''
    },
    initPaginationAndGetList() {
      this.listQuery = { ...init_pagination }
      this.getList()
    },
    statusChange() {
      this.initPaginationAndGetList()
    },
    // 获取 列表数据
    getList() {
      const { listQuery: { page, limit }, status, searchQuery } = this
      const payload = {
        status: status === 'all' ? '' : status,
        ...searchQuery,
        pageNum: page,
        pageSize: limit
      }

      selectMailRecordList(payload).then((result) => {
        const { list, totalSize, groupCountMap, jumped, statusCount } = result.payload
        this.list = list || []
        this.total = totalSize
        this.statisticsData = {
          total: statusCount,
          untreated: groupCountMap[0],
          pass: groupCountMap[1],
          noPass: groupCountMap[2]
        }
        this.$nextTick(() => {
          this.$set(this, 'act', act(jumped))
        })
      })
    },
    // 处理对话框
    handleModalVis(vis, refresh) {
      this.modalVis = !!vis
      if (!vis) {
        this.modalData = {}
      }
      if (refresh) {
        this.initPaginationAndGetList()
      }
    },
    // 处理表格事件
    handleTableAction(type, row) {
      const { id } = row
    },
    mailSceneList() {
      selectMailSceneList().then((result) => {
        const arr = result.payload?.map(e => {
          const obj = { label: e.name, value: e.code }
          return obj
        })
        this.$nextTick(() => {
          this.$refs.search.set({
            type: 'options',
            data: {
              sceneCode: arr || []
            }
          })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-el-badge {
  /deep/ .el-badge__content.is-fixed {
    top: 12px;
    right: 2px;
  }
}
</style>
