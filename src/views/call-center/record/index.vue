<template>
  <div class="app-container">
    <div class="home-top">
      <basics-title
        title="外呼记录"
      />
    </div>
    <div class="home-content">
      <el-tabs v-model="activeTabsOneValue">
        <el-tab-pane v-for="item in TabList" :key="item.key" :disabled="item.disabled" :label="item.label" :name="item.value">
          <span slot="label">
            {{ item.label }}
          </span>
        </el-tab-pane>
      </el-tabs>
      <basics-search
        ref="searchs"
        :loading="loadings._ums_api_out_in_platForm_obQualityInspectionRecordList"
        :searchs="searchs"
        @submitSearch="submitSearch"
        @changeSearch="changeSearch"
      />
      <el-tabs v-model="activeTypeTabsOneValue">
        <el-tab-pane v-for="item in TypeTabList" :key="item.key" :disabled="item.disabled" :label="item.label" :name="item.value">
          <span slot="label">
            {{ item.label }}
          </span>
        </el-tab-pane>
      </el-tabs>
      <basics-table
        ref="table"
        :table="table"
        :loading="loadings._ums_api_out_in_platForm_obQualityInspectionRecordList"
        :list="list"
        :get-list="getList"
        :columns="columns"
        :total="total"
        :list-query="listQuery"
        :action-function="actionFunction"
      >
        <template slot="channelName" slot-scope="scope">
          <div>{{ scope.row.channelId }}</div>
          <div class="table-small-box">{{ scope.row.channelName }}</div>
        </template>
        <template slot="requestId" slot-scope="scope">
          <div>{{ scope.row.requestId }}</div>
          <div class="table-small-box">{{ scope.row.ctime | timeFormat }}</div>
        </template>
        <template slot="userId" slot-scope="scope">
          <div>UID：{{ scope.row.userId }}</div>
          <div class="table-small-box">{{ scope.row.areaCode }}-{{ scope.row.mobileEncrypt }}</div>
        </template>
        <template slot="time" slot-scope="scope">
          <div v-if="!['0', '1'].includes(scope.row.recordStatus)" class="time-box">
            <div style="margin: 0 auto;display: flex;flex-direction: column;align-items: flex-start;">
              <div>开始：{{ scope.row.startingTime | timeFormat }}</div>
              <div>接通：{{ scope.row.turnOnTime | timeFormat }}</div>
              <div>结束：{{ scope.row.endTime | timeFormat }}</div>
            </div>
          </div>
          <div v-else slot="time">
            <div>--</div>
          </div>
        </template>
      </basics-table>
    </div>
    <el-dialog
      v-if="Visible"
      title="通话详情"
      :visible.sync="Visible"
      width="700px"
    >
      <div class="info-box" style="">
        <div> <span>用户UID：</span> {{ actionObj.userId }} </div>
        <div> <span>渠道来源：</span> 美术宝1v1-{{ actionObj.channelName }} </div>
        <div> <span>主叫号码：</span> {{ actionObj.callingNumber }} </div>
        <div> <span>业务请求ID：</span> {{ actionObj.requestId }} </div>
        <div> <span>服务主体：</span> {{ actionObj.serviceSubjectType }} </div>
        <div> <span>供应商：</span> {{ actionObj.supplierName }} </div>
        <div> <span>服务主体ID：</span> {{ actionObj.serviceSubjectId }} </div>
        <div> <span>模板ID：</span> {{ actionObj.templateId }} </div>
      </div>
      <el-divider />
      <div style="display: flex; align-items: center;margin-bottom: 30px">
        <span style="color: #303133;font-size: 18px;margin-right: 20px">通话结果</span>
        <el-button type="warning" size="mini" plain>{{ actionObj.userEvaluation }}</el-button>
        <el-button :type="type[+actionObj.recordStatus]" size="mini" plain>{{ actionObj.callStatus }}</el-button>
      </div>
      <audios v-if="actionObj.recordingUrl" :url="actionObj.recordingUrl" />
      <div class="call-box">
        <div> <span>通话ID：</span> {{ actionObj.callId }} </div>
        <div> <span>通话时长：</span> {{ `呼叫 ${actionObj.callDuration || '--'} / 通话 ${actionObj.onTime || '--'}` }} </div>
        <div> <span>意向标签：</span> {{ actionObj.analysisBasis }} </div>
        <div style="display:flex">
          <span>采集反馈：</span>
          <div>
            <div v-for="(value, key) in actionObj.dynamicProperties" :key="key" style="margin-bottom: 3px;">
              <span>{{ key }}: </span> {{ value }}
            </div>
          </div>
        </div>
        <!-- <div> <span>采集不满意原因：</span> {{ actionObj.reasonsForDissatisfied }} </div>
        <div> <span>采集意见和建议：</span> {{ actionObj.suggest }} </div> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="Visible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="Visible = false">确 定</el-button>
      </span>

    </el-dialog>
  </div>
</template>

<script>
import { TabList, TypeTabList } from '../config'
import { searchs } from './search'
import { mapGetters } from 'vuex'
import BasicsSearch from '@/components/BasicsSearch'
import BasicsTitle from '@/components/BasicsTitle'
import BasicsTable from '@/components/BasicsTable'
import Audios from '@/components/BasicsForm/components/Audio'
import { obQualityInspectionRecordList, selectObdictionary } from '@/api/call-center/record'
import columns, { actions } from './columns'
import moment from 'moment'

const init_pagaination = {
  page: 0,
  limit: 20
}
const type = ['warning', 'primary', 'success', 'danger', 'primary']
const recordStatusMap = {
  '0': '待处理',
  '1': '处理中',
  '2': '呼叫成功',
  '3': '呼叫失败',
  '4': '已过滤',
}
export default {
  name: 'OutboundCallRecord',
  components: { BasicsTitle, BasicsSearch, Audios, BasicsTable },
  filters: {
    timeFormat(e) {
      return (e && e !== '0') ? moment(+e).format('YYYY-MM-DD HH:mm:ss') : '--'
    }
  },
  data() {
    return {
      type,
      recordStatusMap,
      TabList,
      activeTabsOneValue: '101',
      TypeTabList,
      activeTypeTabsOneValue: 'null',
      searchs,
      listQuery: { ...init_pagaination },
      total: 0,
      list: [],
      searchQuery: {
        businessType: "", // 大类ID
        recordStatus: "", // 呼叫状态
        channelId: "", // 业务渠道ID
        callStatus: "", // 通话状态
        requestId: "", // ID查询
        userId: "",
        timeStart: "", // 开始时间
        timeEnd: "", // 结束时间
        timeType: "0", // 时间类型
        // pageNum: 0,
        // pageSize: 0,
        serviceSubjectId: "", // 服务主体
        serviceSubjectType: "", // 服务主体
      },
      columns,
      table: {
        stripe: false,
        border: false
      },
      actionObj: {},
      Visible: false,
      actionFunction: actions({
        tableAction: this.toDetails
      }),
      obdictionaryMap: {}
    }
  },
  computed: {
    ...mapGetters(['loadings', 'baseData'])
  },
  watch: {
    activeTabsOneValue() {
      this.initParamsAndGetList()
    },
    activeTypeTabsOneValue(newVal) {
      const { allCallStatusList, pendingList, processingList, successfulCallList, callFailedList } = window.baseData
      const type = { 'null': allCallStatusList, '0': pendingList, '1': processingList, '2': successfulCallList, '3': callFailedList }
      this.$refs.searchs.set({
        type: 'options',
        data: { callStatus: type[newVal] }
      })
      this.$refs.searchs.set({
        type: 'defaultVal',
        data: { callStatus: '' }
      })
      this.searchQuery = { ...this.searchQuery, callStatus: '' }
      this.initParamsAndGetList()
    }
  },
  mounted() {
    this.$nextTick(() => {
      selectObdictionary({ businessType: this.activeTabsOneValue }).then(res => {
        if (res?.code === 0) {
          this.obdictionaryMap = res.payload || {}
        }
      })
      this.$refs.searchs.set({
        type: 'options',
        data: { channelId: this.baseData.channelList }
      })
      this.getList()
    })
  },
  methods: {
    initParamsAndGetList() {
      this.listQuery = {
        ...init_pagaination
      }
      this.$nextTick(() => {
        this.getList()
      })
    },
    changeSearch(newVal, oldVal) {
      // 业务渠道 改变 联动 用户意向
      if (newVal.channelId !== oldVal.channelId) {
        if (newVal.channelId) {
          this.$refs.searchs.set({
            type: 'options',
            data: { intentionCode: this.obdictionaryMap[newVal.channelId]?.map(v => {
              return {
                value: v.intentionCode,
                label: `${v.intentionCode}（${v.intentionName}）`
              }
            }) }
          })
          this.$refs.searchs.set({
            type: 'defaultVal',
            data: { intentionCode: '' }
          })
        } else {
          this.$refs.searchs.set({
            type: 'options',
            data: { intentionCode: [] }
          })
          this.$refs.searchs.set({
            type: 'defaultVal',
            data: { intentionCode: '' }
          })
        }
      }
    },
    submitSearch(value) {
      const { timeInfo, userInfo, userInfoInputSelectProp } = value
      const newSearchQuery = { ...this.searchQuery, ...value }
      newSearchQuery.timeStart = timeInfo ? moment(timeInfo[0]) + '' : ''
      newSearchQuery.timeEnd = timeInfo ? moment(timeInfo[1]).endOf('day') + '' : ''
      if (userInfoInputSelectProp === '1') {
        newSearchQuery.userId = userInfo
        newSearchQuery.requestId = ''
      } else {
        newSearchQuery.userId = ''
        newSearchQuery.requestId = userInfo
      }
      this.searchQuery = newSearchQuery
      this.initParamsAndGetList()
    },
    toDetails(dat, row, index, type) {
      this.actionObj = row
      this.actionObj.dynamicProperties = row.feedBack ? JSON.parse(row.feedBack) : {}
      this.$nextTick(() => {
        this.Visible = true
      });
    },
    getList() {
      const { searchQuery, listQuery } = this
      const newSearchQuery = {
        ...searchQuery,
        businessType: this.activeTabsOneValue,
        recordStatus: this.activeTypeTabsOneValue === 'null' ? '' : this.activeTypeTabsOneValue,
        pageNum: listQuery.page,
        pageSize: listQuery.limit }
      obQualityInspectionRecordList(newSearchQuery).then(res => {
        if (res?.code === 0) {
          const { payload: { list, totalSize }} = res
          this.list = list
          this.total = totalSize
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.info-box, .call-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  &>div {
    width: 50%;
    margin-bottom: 16px;
    &>span {
      width: 90px;
      display: inline-block;
      text-align: right;
    }
  }
}
.call-box {
  margin-top: 30px;
  &>div {
    width: 100%;
    &>span {
      width: 120px;
      flex-shrink: 0;
    }
  }
}
</style>
