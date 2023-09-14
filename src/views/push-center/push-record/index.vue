<template>
  <div v-loading="loadings._ums_api_sms_api_push_selectPushRecordList" class="app-container">
    <basics-title
      title="推送记录"
    />

    <basics-tabs
      :tab-list="tabList"
      :active-tab="businessType"
      @handleTabClick="handleTabClick"
    />

    <basics-search
      ref="searchs"
      :is-download="true"
      :searchs="searchs"
      :loading="loadings._ums_api_sms_api_push_downLoadPushRecord"
      @download="handleExport"
      @submitSearch="submitSearch"
    />

    <basics-tabs
      :tab-list="cTabList"
      :active-tab="activeCTab"
      show-badge
      @handleTabClick="handleCTabClick"
    />

    <basics-table
      :list="list"
      :get-list="getList"
      :columns="columns"
      :total="total"
      :list-query="listQuery"
      :action-function="actionFunction"
    />

    <template>
      <drawer-push-record-detail v-if="dialogType === 'detail'" :row-data="dialogData" @handleDialogVis="handleDialogVis" />
    </template>

  </div>
</template>

<script>

import { mapGetters, mapState } from 'vuex'
import { cloneDeep, omit } from 'lodash';
import moment from 'moment';
import {
  downLoadPushRecord,
  selectPushRecordList
} from '@/api/push-center/index'
import BasicsSearch from '@/components/BasicsSearch'
import BasicsTable from '@/components/BasicsTable'
import DrawerPushRecordDetail from './components/drawerPushRecordDetail';
import columns, { tableActions } from './columns'
import searchs from './searchs'
import { tabList, statusList } from './config'

const init_pagination = {
  page: 1,
  limit: 20
}

export default {
  name: 'PushRecord',
  components: { BasicsSearch, BasicsTable, DrawerPushRecordDetail },
  data() {
    return {
      columns,
      searchs,
      tabList,
      businessType: '101',
      cTabList: statusList,
      activeCTab: '-1',
      total: 0,
      dialogType: '',
      dialogData: {},
      list: [{ id: 1 }],
      searchQuery: {},
      listQuery: { ...init_pagination },
      actionFunction: tableActions({ handleTableAction: this.handleTableAction }),
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    ...mapState((['pushCenter']))
  },
  mounted() {
    this.$nextTick(() => {
      const { pushCenter: { dinc, typeList }} = this
      this.$refs.searchs.set({
        type: 'options',
        data: {
          type: typeList.filter(v => v.businessType === ~~dinc.listBusinessType[0].value && v.parentId === 0) || [],
        }
      })
      this.$refs.searchs.search()
    })
  },
  methods: {
    initGetList() {
      this.listQuery = { ...init_pagination }
      this.getList()
    },
    getList() {
      const { cTabList, searchQuery, businessType, activeCTab, listQuery: { page: pageNum, limit: pageSize }} = this
      const payload = { pageNum, pageSize, businessType, ...searchQuery }
      if (activeCTab !== '-1') {
        payload.status = activeCTab
      }
      selectPushRecordList(payload)
        .then(res => {
          const { payload: { list, totalSize, groupCountMap }} = res
          groupCountMap['-1'] = Object.values(groupCountMap).reduce((a, b) => a + b)
          this.cTabList = cTabList.map(v => {
            v.badge = groupCountMap[v.value]
            return v
          })
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
      // 组合查询处理
      if (newValue.leader) {
        newValue.departmentId = newValue.leaderSelectProp
      }
      newValue[newValue.sceneInfoInputSelectProp] = newValue.sceneInfoInputSelect
      // 科目分类
      if (newValue.type?.length) {
        const oneTypeList = []
        const twoTypeList = []
        newValue.type.forEach(v => {
          if (v.length === 1) {
            oneTypeList.push(v[0])
          } else if (v.length > 1) {
            v.forEach((val, ind) => {
              if (ind !== 0) {
                twoTypeList.push(val)
              }
            })
          }
        })
        newValue.oneTypeId = oneTypeList.toString()
        newValue.twoTypeId = twoTypeList.toString()
      }
      // 剔除无用属性
      this.searchQuery = omit(newValue, ['type', 'leaderSelectProp', 'sceneInfoInputSelectProp', 'sceneInfoInputSelect'])
      this.initGetList()
    },
    handleExport() {
      const { searchQuery, businessType } = this
      downLoadPushRecord({ ...searchQuery, businessType })
    },
    handleTabClick(val) {
      this.businessType = val
      // 科目分类区分业务线
      this.$refs.searchs.set({
        type: 'defaultVal',
        data: {
          type: []
        }
      })
      this.$nextTick(() => {
        this.$refs.searchs.set({
          type: 'options',
          data: {
            type: this.pushCenter.typeList.filter(v => v.businessType === ~~val && v.parentId === 0)
          }
        })
        this.$refs.searchs.search()
      })
    },
    handleCTabClick(val) {
      this.activeCTab = val
      this.getList()
    },
    handleTableAction(type, row) {
      switch (type) {
        // 场景发送明细
        case 'detail': {
          this.handleDialogVis('detail', row)
          break
        }
      }
    },
    handleDialogVis(type, data, refreshFlag) {
      this.dialogType = type
      this.dialogData = data
      refreshFlag && this.initGetList()
    },
  }
}

</script>
<style lang="scss" scoped>
</style>
