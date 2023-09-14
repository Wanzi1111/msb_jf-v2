<template>
  <div class="app-container">
    <div class="home-top">
      <basics-title
        title="短信场景"
      />
    </div>
    <div class="home-content">
      <basics-search
        ref="searchs"
        :loading="loadings._ums_api_sms_api_messagePlatForm_selectDetailSmsScenarioList || loadings._ums_api_sms_api_messagePlatForm_downLoadDetailSmsScenarioList"
        :searchs="searchs"
        :is-download="true"
        @download="download"
        @submitSearch="submitSearch"
      />
      <basics-table
        ref="table"
        :table="table"
        :loading="loadings._ums_api_sms_api_messagePlatForm_selectDetailSmsScenarioList"
        :list="list"
        :get-list="getList"
        :columns="columns"
        :total="total"
        :list-query="listQuery"
        @sort-change="sortChange"
      >
        <template slot="businessNumberHeader">
          <span>业务请求量&nbsp; <el-tooltip class="item" effect="dark" content="长短信记为1条，即发送手机号码的总数量" placement="top">
            <i style="color: rgb(176,176,176)" class="el-icon-warning-outline" />
          </el-tooltip>
          </span>
        </template>
        <template slot="allErrNumberHeader">
          <span>过滤量&nbsp; <el-tooltip class="item" effect="dark" content="长短信记为1条，即发送手机号码的总数量" placement="top">
            <i style="color: rgb(176,176,176)" class="el-icon-warning-outline" />
          </el-tooltip>
          </span>
        </template>
        <template slot="arriveLever" slot-scope="scope">
          {{
            scope.row.arriveLever + '%'
          }}
        </template>
        <template slot="arriveLeverHeader">
          <span>请求到达率&nbsp; <el-tooltip class="item" effect="dark" content="请求到达率=成功量/业务请求量" placement="top">
            <i style="color: rgb(176,176,176)" class="el-icon-warning-outline" />
          </el-tooltip>
          </span>
        </template>
        <template slot="sendLever" slot-scope="scope">
          {{
            scope.row.sendLever + '%'
          }}
        </template>
        <template slot="sendLeverHeader">
          <span>发送到达率&nbsp; <el-tooltip class="item" effect="dark" content="发送到达率=成功量/（成功量+失败量）" placement="top">
            <i style="color: rgb(176,176,176)" class="el-icon-warning-outline" />
          </el-tooltip>
          </span>
        </template>
        <template slot="allLengthNumberHeader">
          <span>计费条数&nbsp; <el-tooltip class="item" effect="dark" content="1、短信长度（签名+正文）不超过70字时，按照1条短信计费；超过70字即为长短信时，按67字/条分隔成多条计费。例如，短信长度为150字，则按照67字/67字/16字分隔成3条计费，所以成功量不直接等于计费条数2、由于运营商存在72小时内返回全部状态报告的机制，所以当天返回的计费状态报告可能会包含前两天发送的短信对应的状态报告，所以会出现计费条数与当天下发的短信返回计费状态报告的条数不一致的情况" placement="top">
            <i style="color: rgb(176,176,176)" class="el-icon-warning-outline" />
          </el-tooltip>
          </span>
        </template>
      </basics-table>
    </div>
  </div>
</template>

<script>

import { searchs } from './search'
import BasicsTitle from '@/components/BasicsTitle'
import BasicsSearch from '@/components/BasicsSearch'
import BasicsTable from '@/components/BasicsTable'
import { mapGetters } from 'vuex'
import { selectSmsScenarioTemplateList, selectDetailSmsScenarioList, downLoadDetailSmsScenarioList } from '@/api/sms-middle-station/scene-configuration'
import columns from './columns'

const init_pagaination = {
  page: 1,
  limit: 20
}

export default {
  name: 'SMSSecondary',
  components: { BasicsTitle, BasicsSearch, BasicsTable },
  data() {
    return {
      table: {
        stripe: false,
        border: false
      },
      columns,
      searchs,
      total: 0,
      list: [],
      searchQuery: {
        templateId: "",
        scenarioId: "",
        sendTimeEnd: "",
        sendTimeStart: "",
        sortType: undefined, // 0 日期 1 到达率 2 发送量 3 成功量 4 失败量  5 计费条数
        sortStat: undefined // 2 倒序 1 正序
      },
      listQuery: { ...init_pagaination }
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  mounted() {
    this.searchQuery = { ...this.$route.query }
    if (!this.$route.query?.sendTimeEnd) {
      this.$message('错误！请先选择查询时间');
    }
    this.$refs.searchs.set({
      type: 'defaultVal',
      data: { templateId: this.$route.query.templateId }
    })
    selectSmsScenarioTemplateList({ scenarioId: this.$route.query.scenarioId }).then(res => {
      if (res?.code === 0) {
        const { payload } = res
        this.$refs.searchs.set({
          type: 'options',
          data: { templateId: payload.map(v => {
            return {
              label: v.templateId,
              value: v.templateId,
            }
          }) }
        })
      }
    })
    this.$nextTick(() => {
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
    // 导出场景明细
    download() {
      const { searchQuery } = this
      const newSearchQuery = {
        ...searchQuery
      }
      downLoadDetailSmsScenarioList(newSearchQuery)
    },
    sortChange({ prop, order }) {
      const { searchQuery } = this
      const newSearchQuery = { ...searchQuery }
      if (order) {
        const propMap = {
          'arriveLever': 1,
          'sendNumber': 2,
          'sucessNumber': 3,
          'failNumber': 4,
          'allLengthNumber': 5,
        }
        newSearchQuery.sortType = propMap[prop]
        if (order === 'descending') {
          newSearchQuery.sortStat = 2
        } else {
          newSearchQuery.sortStat = 1
        }
      } else {
        newSearchQuery.sortStat = undefined
        newSearchQuery.sortType = undefined
      }
      this.searchQuery = { ...newSearchQuery }
      this.$nextTick(() => {
        this.getList()
      });
    },
    submitSearch(value) {
      const newSearchQuery = { ...this.searchQuery, ...value }
      this.searchQuery = { ...newSearchQuery }
      this.initParamsAndGetList()
    },
    getList() {
      const { searchQuery, listQuery } = this
      const newSearchQuery = {
        ...searchQuery,
        pageNum: listQuery.page,
        pageSize: listQuery.limit }
      selectDetailSmsScenarioList(newSearchQuery).then(res => {
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
.home-top, .home-content {
  /deep/ .el-tabs__item {
    font-size: 16px;
  }
  border-radius: 10px;
}
</style>

