<template>
  <div>
    <div class="app-container">
      <basics-title
        title="场景列表"
        :actions="actions"
      />

      <basics-tabs
        :tab-list="tabList"
        :active-tab="businessType"
        @handleTabClick="handleTabClick"
      />

      <basics-search
        ref="searchs"
        :loading="loadings._ums_api_sms_api_push_selectPushScenarioConfigurationList || loadings._ums_api_sms_api_push_downLoadPushScenarioConfigurationList"
        :is-download="true"
        :searchs="searchs"
        @download="handleExport"
        @submitSearch="submitSearch"
      />

      <basics-table
        :loading="loadings._ums_api_sms_api_push_selectPushScenarioConfigurationList"
        :list="list"
        :get-list="getList"
        :columns="columns"
        :total="total"
        :list-query="listQuery"
        :action-function="actionFunction"
      />

      <template>
        <dialog-add-push-sence
          v-if="['addPushSence', 'editPushSence'].includes(dialogType)"
          :type="dialogType"
          :dialog-data="dialogData"
          @handleDialogVis="handleDialogVis"
        />
      </template>
    </div>
    <router-view />
  </div>
</template>

<script>

import { mapGetters, mapState } from 'vuex'
import { cloneDeep, omit } from 'lodash';
import moment from 'moment';
import {
  addOrUpdatePushScenarioConfiguration,
  selectPushScenarioConfigurationList,
  downLoadPushScenarioConfigurationList
} from '@/api/push-center/index'
import BasicsSearch from '@/components/BasicsSearch'
import BasicsTable from '@/components/BasicsTable'
import DialogAddPushSence from './components/dialogAddPushSence';
import columns, { tableActions } from './columns'
import searchs from './searchs'
import { tabList, actions } from './config'

const init_pagination = {
  page: 1,
  limit: 20
}

export default {
  name: 'PushSenceList',
  components: { BasicsSearch, BasicsTable, DialogAddPushSence },
  data() {
    return {
      columns,
      searchs,
      tabList,
      total: 0,
      dialogType: '',
      dialogData: {},
      list: [{ id: 1 }],
      businessType: '101',
      searchQuery: {},
      listQuery: { ...init_pagination },
      actions: actions({ handleActions: this.handleActions }),
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
      const { searchQuery, businessType, listQuery: { page: pageNum, limit: pageSize }} = this
      selectPushScenarioConfigurationList({ pageNum, pageSize, businessType, ...searchQuery })
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
      // 启用状态处理
      if (newValue.enableStatus.length) {
        newValue.enableStatus = newValue.enableStatus.toString()
      } else {
        delete newValue.enableStatus
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
    handleTableAction(type, row) {
      switch (type) {
        // 场景发送明细
        case 'detail': {
          this.$router.push({ name: 'PushSenceDetail', query: { id: row.scenarioId }})
          break
        }
        // 编辑场景
        case 'edit': {
          this.handleDialogVis('editPushSence', row)
          break
        }
        // 删除场景
        case 'delete': {
          this.$confirm('删除该场景，存在数据缺失风险，此操作无法恢复，请先确认该场景是否存在相关数据', '删除场景', { type: 'warning' })
            .then(() => {
              addOrUpdatePushScenarioConfiguration({ delete: 1, id: row.id })
                .then(() => {
                  this.$message.success('删除场景成功～')
                  this.getList()
                })
            })
          break
        }
        // 启用场景
        case 'enable': {
          this.$confirm('启用后可通过中台正常发起短信任务', '启用场景', { type: 'warning' })
            .then(() => {
              addOrUpdatePushScenarioConfiguration({ enableStatus: 0, id: row.id })
                .then(() => {
                  this.$message.success('启用场景成功～')
                  this.getList()
                })
            })
          break
        }
        // 停用场景
        case 'stop': {
          this.$confirm('停用后暂停向第三方发起短信任务', '停用场景', { type: 'warning' })
            .then(() => {
              addOrUpdatePushScenarioConfiguration({ enableStatus: 1, id: row.id })
                .then(() => {
                  this.$message.success('停用场景成功～')
                  this.getList()
                })
            })
          break
        }
        case 'log': {
          this.$router.push({ name: 'PushSenceLog', query: { id: row.scenarioId }})
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
      this.handleDialogVis('addPushSence')
    },
    handleExport() {
      const { searchQuery, businessType } = this
      downLoadPushScenarioConfigurationList({ ...searchQuery, businessType })
    },
  }
}
</script>
<style lang="scss" scoped>
</style>
