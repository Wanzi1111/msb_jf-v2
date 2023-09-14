<template>
  <div class="app-container">
    <div class="home-top">
      <basics-title
        title="短信记录"
      />
      <basics-menu-taps
        :actions="BusinessTabList"
        :active-index="activeIndex"
        :handle-select="activeIndexChange"
      />
    </div>
    <div class="home-content">
      <basics-search
        ref="searchs"
        :loading="loadings._ums_api_sms_api_messagePlatForm_selectSmsRecordList || loadings._ums_api_sms_api_messagePlatForm_downLoadSmsRecord"
        :searchs="searchs"
        :is-download="false"
        @download="download"
        @submitSearch="submitSearch"
        @changeSearch="changeSearch"
      />
      <el-tabs v-model="activeTypeTabsOneValue">
        <el-tab-pane v-for="item in TypeTabList" :key="item.key" :disabled="item.disabled" :label="item.label" :name="item.value">
          <span slot="label">
            <el-badge :value="groupCountMap[item.key]" :max="99999" style="line-height: 25px">
              {{ item.label }}
            </el-badge>
          </span>
        </el-tab-pane>
      </el-tabs>
      <basics-table
        ref="table"
        :table="table"
        :loading="loadings._ums_api_sms_api_messagePlatForm_selectSmsRecordList"
        :list="list"
        :get-list="getList"
        :columns="columns"
        :total="total"
        :list-query="listQuery"
        :action-function="actionFunction"
      >
        <template slot="scenarioId" slot-scope="scope">
          <div>{{ scope.row.scenarioId }}</div>
          <div class="table-small-box">{{ scope.row.scenarioName }}</div>
        </template>
        <template slot="SMSType" slot-scope="scope">
          <div>{{ scope.row | SMSType }}</div>
        </template>
        <template slot="uid" slot-scope="scope">
          <div>UID：{{ scope.row.uid }}</div>
          <div class="table-small-box">
            {{ scope.row.area }}
            {{ (disturbMobileObj && (scope.row.mobile === disturbMobileObj.mobile)) ?
              scope.row.mobile :
              scope.row.mobile.replace(/([0-9]{3})([0-9]{1,5})([0-9]{3})/, '$1*****$3') }}
            <svg-icon
              style="cursor: pointer;"
              :icon-class="disturbMobileIcone(scope.row)"
              @click="isDisturbMobile(scope.row)"
            />
          </div>
        </template>
        <template slot="messageContent" slot-scope="scope">
          <el-tooltip v-if="scope.row.messageContent" :hide-after="0" effect="dark" :content="scope.row.messageContent" placement="top">
            <div style="
              text-overflow: -o-ellipsis-lastline;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              line-clamp: 2;
              -webkit-box-orient: vertical;
              "
            >{{ scope.row.messageContent }}</div>
          </el-tooltip>
        </template>
        <template slot="numberWords" slot-scope="scope">
          <div>{{ scope.row.numberWords }}/{{ scope.row.apartSize }}</div>
        </template>
        <template slot="sendTime" slot-scope="scope">
          <div>{{ timeFormat(scope.row.sendTime,scope.row.supplierName) }}</div>
        </template>
      </basics-table>
    </div>
    <el-dialog
      width="800px"
      :title="'短信详情'"
      :visible.sync="dialog"
    >
      <div style="display: flex; align-items: center">
        <span style="color: #555;font-size: 16px;margin-right: 20px">短信信息</span>
      </div>
      <el-divider />
      <div class="info-box">
        <div> <span>场景ID：</span> {{ actionObj.scenarioId }} </div>
        <div> <span>供应商：</span> {{ actionObj.supplierName | getSupplierName }} </div>
        <div> <span>场景名称：</span> {{ actionObj.scenarioName }} </div>
        <div> <span>中台模版ID：</span> {{ actionObj.templateId }} </div>
        <div> <span>短信类型：</span> {{ actionObj | SMSType }} </div>
        <div> <span>UID：</span> {{ actionObj.uid }} </div>
        <div> <span>短信签名：</span> 【{{ actionObj.signature }}】 </div>
        <div> <span>手机号：</span>
          {{ disturbMobileObj ?
            actionObj.mobile :
            actionObj.mobile && actionObj.mobile.replace(/([0-9]{3})([0-9]{1,5})([0-9]{3})/, '$1*****$3') }}
          <svg-icon
            style="cursor: pointer;"
            :icon-class="disturbMobileIcone(actionObj)"
            @click="isDisturbMobile(actionObj)"
          />
        </div>
        <div> <span>字数/拆分条数：</span> {{ actionObj.numberWords }}/{{ actionObj.apartSize }} </div>
        <div> <span>业务请求ID：</span> {{ actionObj.requestId }} </div>
      </div>
      <div class="call-box">
        <div> <span>短信内容：</span> {{ actionObj.messageContent }} </div>
      </div>
      <div style="display: flex; align-items: center">
        <span style="color: #555;font-size: 16px;margin-right: 20px;margin-top: 20px">发送情况</span>
      </div>
      <el-divider />
      <div class="call-box">
        <div>
          <span>请求时间：
            <el-tooltip effect="dark" content="请求时间：业务请求中台的时间" placement="top">
              <i style="color: rgb(176,176,176)" class="el-icon-warning-outline" />
            </el-tooltip>
          </span>
          {{ timeFormat(actionObj.requestTime,actionObj.supplierName) }}
        </div>
        <div>
          <span>发送时间：
            <el-tooltip effect="dark" content="发送时间：中台请求供应商的时间" placement="top">
              <i style="color: rgb(176,176,176)" class="el-icon-warning-outline" />
            </el-tooltip>
          </span>
          {{ timeFormat(actionObj.sendTime,actionObj.supplierName) }}
        </div>
        <div>
          <span>供应商发送时间：
            <el-tooltip effect="dark" content="供应商发送时间：供应商发送短信的时间" placement="top">
              <i style="color: rgb(176,176,176)" class="el-icon-warning-outline" />
            </el-tooltip>
          </span>
          {{ timeFormat(actionObj.supplierSendTime,actionObj.supplierName) }}
        </div>
        <div>
          <span>返回结果时间：
            <el-tooltip effect="dark" content="返回结果时间：运营商返回状态的时间" placement="top">
              <i style="color: rgb(176,176,176)" class="el-icon-warning-outline" />
            </el-tooltip>
          </span>
          {{ timeFormat(actionObj.backTime,actionObj.supplierName) }}
        </div>
        <div> <span>短信状态：</span> <el-button :type="type[+actionObj.sendStatus]" size="mini" plain>{{ actionObj.messageStatus }}</el-button> </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialog = false; disturbMobileObj = null ">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { BusinessTabList, TypeTabList } from '@/views/sms-middle-station/config'
import { searchs } from './search'
import BasicsTitle from '@/components/BasicsTitle'
import BasicsSearch from '@/components/BasicsSearch'
import BasicsMenuTaps from '@/components/BasicsMenuTaps'
import BasicsTable from '@/components/BasicsTable'
import { mapGetters } from 'vuex'
import { selectSmsRecordList, downLoadSmsRecord } from '@/api/sms-middle-station/sms-record'
import { selectSmsOneTypeList, selectSmsTwoTypeList } from '@/api/sms-middle-station/classification-configuration'
import { selectSmsMessageTemplateList } from '@/api/sms-middle-station/supplier-configuration'
import columns, { actions } from './columns'
import moment from 'moment'

const init_pagaination = {
  page: 1,
  limit: 20
}

export default {
  name: 'SMSRecord',
  components: { BasicsTitle, BasicsSearch, BasicsMenuTaps, BasicsTable },
  filters: {
    SMSType(e) {
      const domesticForeign = { 0: '国内', 1: '国际' }
      const messageType = { 0: '通知短信', 1: '营销短信', 2: '验证码' }
      return `${domesticForeign[+e['domesticForeign']]}-${messageType[+e['messageType']]}`
    },
    getSupplierName(e) {
      const { listSupplierNameType } = window.baseData
      return listSupplierNameType.find(item => item.value === e)?.label || '-'
    }
  },
  data() {
    return {
      type: ['primary', 'primary', 'success', 'danger', 'warning', 'warning', 'warning'],
      BusinessTabList,
      TypeTabList,
      activeIndex: '101',
      activeTypeTabsOneValue: 'null',
      dialog: false,
      table: {
        stripe: false,
        border: false
      },
      columns,
      searchs,
      total: 0,
      list: [],
      groupCountMap: {},
      searchQuery: {
        oneId: "",
        twoId: "",
        uid: "",
        mobile: "",
        requestId: "",
        scenarioId: "",
        scenarioName: "",
        templateId: "",
        domesticForeign: "",
        messageType: "",
        signature: "",
        messageContent: "",
        sendCode: "",
        sendTimeEnd: moment().endOf('day').format('YYYYMMDD'),
        sendTimeStart: moment().startOf('day').format('YYYYMMDD'),
      },
      listQuery: { ...init_pagaination },
      actionFunction: actions({
        tableAction: this.tableAction
      }),
      actionObj: {},
      disturbMobileObj: null,
      props: {
        lazy: true,
        multiple: true,
        lazyLoad(node, resolve) {
          if (node.data) {
            const { activeIndex } = this
            const newSearchQuery = {
              businessType: activeIndex,
              parentId: node.data.value,
              pageNum: 1,
              pageSize: 9999 }
            selectSmsTwoTypeList(newSearchQuery).then(res => {
              if (res?.code === 0) {
                const { payload: { list }} = res
                const nodes = list?.map((item) => {
                  return {
                    label: item.twoTypeName,
                    value: item.id,
                    leaf: true
                  } || []
                })
                resolve([...nodes, {
                  label: '-',
                  value: '',
                  leaf: true
                }])
              }
            })
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    disturbMobileIcone() {
      return function(e) {
        if (e?.mobile !== this.disturbMobileObj?.mobile) {
          return "eye-open"
        } else {
          return "eye"
        }
      }
    }
  },
  watch: {
    activeTypeTabsOneValue() {
      this.initParamsAndGetList()
    }
  },
  mounted() {
    this.getSignatureOptions()
    const newSearchQuery = {
      businessType: '101',
      pageNum: 1,
      pageSize: 9999 }
    selectSmsOneTypeList(newSearchQuery).then(res => {
      if (res?.code === 0) {
        const { payload: { list }} = res
        this.$refs.searchs.set({
          type: 'options',
          data: { twoType: list?.map((item) => {
            return {
              label: item.oneTypeName,
              value: item.id,
              leaf: false
            } || []
          }) }
        })
      }
    })
    this.$refs.searchs.set({
      type: 'props',
      data: { twoType: this.props }
    })
    this.$nextTick(() => {
      this.getList()
    })
  },
  methods: {
    timeFormat(e, type) {
      return (e !== '0' && e) ? moment(+e).format(type === '4' ? 'YYYY-MM-DD HH:mm:00' : 'YYYY-MM-DD HH:mm:ss') : '-'
    },
    isDisturbMobile(e) {
      if (e?.id === this.disturbMobileObj?.id) {
        this.disturbMobileObj = null
      } else {
        this.disturbMobileObj = e
      }
    },
    getSignatureOptions(id) {
      const newSearchQuery = {
        supplierName: id || undefined,
        pageNum: 1,
        pageSize: 9999 }
      selectSmsMessageTemplateList(newSearchQuery).then(res => {
        if (res?.code === 0) {
          const { payload: { list }} = res
          this.$refs.searchs.set({
            type: 'options',
            data: { signature: list?.reduce((pre, cur) => {
              return pre.find((i) => i.signature === cur.signature)
                ? pre : [...pre, cur]
            }, [])
            .map((item) => {
              return {
                label: item.signature,
                value: item.signature,
              } || []
            }) }
          })
          this.$refs.searchs.set({
            type: 'defaultVal',
            data: { signature: '' }
          })
        }
      })
    },
    activeIndexChange(id) {
      this.activeIndex = id
      this.$refs.searchs.set({
        type: 'props',
        data: { twoType: this.props }
      })
      this.$refs.searchs.set({
        type: 'defaultVal',
        data: { twoType: [] }
      })
      const newSearchQuery = {
        businessType: id,
        pageNum: 1,
        pageSize: 9999 }
      selectSmsOneTypeList(newSearchQuery).then(res => {
        if (res?.code === 0) {
          const { payload: { list }} = res
          this.$refs.searchs.set({
            type: 'options',
            data: { twoType: list?.map((item) => {
              return {
                label: item.oneTypeName,
                value: item.id,
                leaf: false
              } || []
            }) }
          })
        }
      })
      this.searchQuery = { ...this.searchQuery, oneId: "", twoId: "" }
      this.initParamsAndGetList()
    },
    tableAction(dat, row, index, type) {
      this.actionObj = row
      this.disturbMobileObj = null
      this.$nextTick(() => {
        this.dialog = true
      });
    },
    initParamsAndGetList() {
      this.listQuery = {
        ...init_pagaination
      }
      this.$nextTick(() => {
        this.getList()
      })
    },
    changeSearch(value) {
      const newSearchQuery = { ...this.searchQuery, ...value }
      newSearchQuery.sendTimeStart = value.sendTimeList ? moment(value.sendTimeList[0]).startOf('day') : ''
      newSearchQuery.sendTimeEnd = value.sendTimeList ? moment(value.sendTimeList[1]).endOf('day') : ''
      if (newSearchQuery.sendTimeStart && newSearchQuery.sendTimeEnd && newSearchQuery.sendTimeEnd.diff(newSearchQuery.sendTimeStart, 'days') > 30) {
        this.$refs.searchs.set({
          type: 'defaultVal',
          data: { sendTimeList: [moment().startOf('day'), moment().endOf('day')] }
        })
        this.$message({
          type: 'error',
          message: '时间范围不能超过30天'
        })
      }
    },
    download() {
      const { searchQuery, activeTypeTabsOneValue, activeIndex } = this
      const newSearchQuery = {
        ...searchQuery,
        businessType: activeIndex,
        sendStatus: activeTypeTabsOneValue === 'null' ? undefined : activeTypeTabsOneValue
      }
      downLoadSmsRecord(newSearchQuery)
    },
    submitSearch(value) {
      const newSearchQuery = { ...this.searchQuery, ...value }
      newSearchQuery.domesticForeign = value.SMSType.length ? value.SMSType[1]?.split('-')?.[0] : ''
      newSearchQuery.messageType = value.SMSType.length ? value.SMSType[1]?.split('-')?.[1] : ''

      newSearchQuery.sendTime = value.sendTime ? moment(value.sendTime).format('YYYYMMDD') : ''

      newSearchQuery.sendTimeStart = value.sendTimeList ? moment(value.sendTimeList[0]).startOf('day').format('YYYYMMDD') : ''
      newSearchQuery.sendTimeEnd = value.sendTimeList ? moment(value.sendTimeList[1]).endOf('day').format('YYYYMMDD') : ''

      newSearchQuery.scenarioName = ''
      newSearchQuery.scenarioId = ''
      newSearchQuery.templateId = ''
      newSearchQuery.requestId = ''
      newSearchQuery[value.sceneInfoInputSelectProp] = value.sceneInfoInputSelect

      newSearchQuery.uid = ''
      newSearchQuery.mobile = ''
      newSearchQuery[value.userInfoInputSelectProp] = value.userInfoInputSelect

      const oneIdList = []
      const twoIdList = []
      if (value.twoType) {
        value.twoType?.forEach(v => {
          v[0] && !oneIdList.includes(v[0]) && oneIdList.push(v[0])
          v[1] && !oneIdList.includes(v[1]) && twoIdList.push(v[1])
        });
      }

      newSearchQuery.oneId = oneIdList.join(',')
      newSearchQuery.twoId = twoIdList.join(',')

      this.searchQuery = { ...newSearchQuery, twoType: undefined }
      this.initParamsAndGetList()
    },
    getList() {
      const { searchQuery, listQuery, activeTypeTabsOneValue, activeIndex } = this
      const newSearchQuery = {
        ...searchQuery,
        businessType: activeIndex,
        sendStatus: activeTypeTabsOneValue === 'null' ? undefined : activeTypeTabsOneValue,
        pageNum: listQuery.page,
        pageSize: listQuery.limit }
      // 每次获取列表数据重置查看手机号
      this.disturbMobileObj = null
      selectSmsRecordList(newSearchQuery).then(res => {
        if (res?.code === 0) {
          const { payload: { list, totalSize, groupCountMap }} = res
          this.list = list
          this.groupCountMap = { ...groupCountMap, 'null': Object.keys(groupCountMap).reduce((pre, cur) => {
            pre += groupCountMap[cur]
            return pre
          }, 0) }
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
      width: 130px;
      line-height: 40px;
      display: inline-block;
      text-align: right;
    }
  }
}
/deep/ .el-badge__content--undefined {
  background: transparent;
  color: #999;
  right: 5px;
}
.call-box {
  &>div {
    width: 100%;
    &>span {
      width: 130px;
      flex-shrink: 0;
    }
  }
}

</style>
