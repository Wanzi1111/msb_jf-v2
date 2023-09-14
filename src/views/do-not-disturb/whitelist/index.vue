<template>
  <div class="app-container">
    <div class="home-top">
      <basics-title
        title="白名单列表"
        :actions="[{
          type: 'button', // 按钮
          label: '新增',
          click: addBlack,
          attr: {
            type: 'info',
            plain: true,
            size: 'mini',
            icon: 'el-icon-plus'
          }
        }]"
      />
    </div>
    <div class="home-content">
      <basics-search
        ref="searchs"
        :loading="loadings._ums_api_out_in_platForm_ObNotDisturbListList"
        :searchs="searchs"
        @submitSearch="submitSearch"
      />
      <basics-table
        ref="table"
        :table="table"
        :loading="loadings._ums_api_out_in_platForm_ObNotDisturbListList"
        :list="list"
        :get-list="getList"
        :columns="columns"
        :total="total"
        :list-query="listQuery"
        :action-function="actionFunction"
      >
        <template slot="disturbMobile" slot-scope="scope">
          <div>
            {{ (disturbMobileObj && scope.row.id === disturbMobileObj.id) ? scope.row.disturbMobile : scope.row.disturbMobile.replace(/([0-9]{3})([0-9]{5})([0-9]{3})/, '$1*****$3') }}
            <svg-icon
              style="cursor: pointer;"
              :icon-class="disturbMobileIcone(scope.row.id)"
              @click="isDisturbMobile(scope.row)"
            />
          </div>
        </template>
        <template slot="enjoinTime" slot-scope="scope">
          <div>{{ scope.row.enjoinTime | timeFormat }}</div>
        </template>
        <template slot="releaseTime" slot-scope="scope">
          <div>{{ scope.row.releaseTime | timeFormat }}</div>
        </template>
        <template slot="entryUser" slot-scope="scope">
          <div>{{ scope.row.entryUser }}</div>
          <div>{{ scope.row.entryMobile }}</div>
        </template>
      </basics-table>
    </div>
    <el-dialog
      width="650px"
      :title="'新增白名单'"
      :visible.sync="dialog"
    >
      <basics-form
        ref="dialogRef"
        :key="dialog"
        :forms="forms"
        :loading="loadings._ums_api_out_in_platForm_addOrUpdateObBusinessChannel"
        class="form-item"
        :actions="formActions(cancelForm)"
        @submitForm="onFormSubmit"
        @changeForm="changeNewForm"
      />
    </el-dialog>
    <el-dialog
      title=""
      :visible.sync="enableVisible"
      width="650px"
    >
      <span slot="title" style="font-size: 20px"> <i style="color: rgb(255,163,45)" class="el-icon-warning" /> 确定解除 </span>
      <span style="font-size: 16px; padding-left: 25px"> 解除后该数据移除勿扰名单 </span>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="enableVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="enable">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { searchs } from './search'
import BasicsTitle from '@/components/BasicsTitle'
import BasicsSearch from '@/components/BasicsSearch'
import BasicsForm from '@/components/BasicsForm'
import BasicsTable from '@/components/BasicsTable'
import { mapGetters } from 'vuex'
import { ObNotDisturbListList, addOrUpdateObNotDisturb } from '@/api/do-not-disturb/list'
import columns, { actions } from './columns'
import forms, { formActions } from './form'
import moment from 'moment'

const init_pagaination = {
  page: 1,
  limit: 20
}

export default {
  name: 'WhiteList',
  components: { BasicsTitle, BasicsSearch, BasicsForm, BasicsTable },
  filters: {
    timeFormat(e) {
      return (e !== '0' && e) ? moment(+e).format('YYYY-MM-DD HH:mm:ss') : '永久'
    }
  },
  data() {
    return {
      forms,
      formActions,
      dialog: false,
      enableVisible: false,
      table: {
        stripe: false,
        border: false
      },
      columns,
      searchs,
      total: 0,
      list: [],
      searchQuery: {
        businessChildType: "0", // 父类型
        businessClassification: "0", // 子类型
        disturbMobile: "", // 手机号码
        listType: "1000", //  勿扰类型
        enjoinTime: "",
        releaseTime: "",
        entryUser: "",
        entryMobile: ""
      },
      listQuery: { ...init_pagaination },
      actionFunction: actions({
        tableAction: this.tableAction
      }),
      actionObj: null,
      disturbMobileObj: null
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    disturbMobileIcone() {
      return function(e) {
        if (e !== this.disturbMobileObj?.id) {
          return "eye-open"
        } else {
          return "eye"
        }
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.getList()
    })
  },
  methods: {
    isDisturbMobile(e) {
      if (e?.id === this.disturbMobileObj?.id) {
        this.disturbMobileObj = null
      } else {
        this.disturbMobileObj = e
      }
    },
    cancelForm() {
      this.dialog = !this.dialog
    },
    // 新增白名单
    addBlack() {
      this.dialog = true
    },
    onFormSubmit(values) {
      const newData = { ...values }
      newData.enjoinTime = (values.daterange?.[0] && values.takeEffectType === '1') ? moment(values.daterange[0]) + '' : ''
      newData.releaseTime = (values.daterange?.[1] && values.takeEffectType === '1') ? moment(values.daterange[1]).endOf('day') + '' : ''
      newData.disturbMobile = values.disturbMobile.replace(/\n/g, ',')
      newData.businessChildType = '0'
      newData.businessClassification = '0'
      newData.listType = '1000'
      addOrUpdateObNotDisturb(newData).then(res => {
        if (res?.code === 0) {
          this.initParamsAndGetList()
          this.$message({
            type: 'success',
            message: '新增成功'
          })
        }
      })
      this.dialog = false
    },
    changeNewForm(value, oldval) {
      // 是否显示时间选择器
      if (value.takeEffectType === '1') {
        this.$refs.dialogRef.set({
          type: 'noShow',
          data: { daterange: false }
        })
      } else if (value.takeEffectType === '0') {
        this.$refs.dialogRef.set({
          type: 'noShow',
          data: { daterange: true }
        })
      }
    },
    tableAction(dat, row, index, type) {
      this.actionObj = row
      this.$nextTick(() => {
        this.enableVisible = true
      });
    },
    enable() {
      const { actionObj } = this
      const newData = { ...actionObj, isRelease: "1", }
      addOrUpdateObNotDisturb(newData).then(res => {
        if (res?.code === 0) {
          this.enableVisible = false
          this.$message({
            type: 'success',
            message: '解除成功'
          })
          this.$nextTick(() => {
            this.getList()
          })
        }
      })
    },
    initParamsAndGetList() {
      this.listQuery = {
        ...init_pagaination
      }
      this.$nextTick(() => {
        this.getList()
      })
    },
    submitSearch(value) {
      const newSearchQuery = { ...this.searchQuery, ...value }
      newSearchQuery.enjoinTime = value.daterange?.[0] ? moment(value.daterange[0]) + '' : ''
      newSearchQuery.releaseTime = value.daterange?.[1] ? moment(value.daterange[1]).endOf('day') + '' : ''
      newSearchQuery.entryUser = ''
      newSearchQuery.entryMobile = ''
      newSearchQuery[value.userInfoInputSelectProp] = value.userInfoInputSelect
      this.searchQuery = newSearchQuery
      this.initParamsAndGetList()
    },
    getList() {
      const { searchQuery, listQuery } = this
      const newSearchQuery = {
        ...searchQuery,
        pageNum: listQuery.page,
        pageSize: listQuery.limit }
      // 每次获取列表数据重置查看手机号
      this.disturbMobileObj = null
      ObNotDisturbListList(newSearchQuery).then(res => {
        if (res?.code === 0) {
          const { payload: { list, totalSize, page }} = res
          this.list = list
          this.total = totalSize
          if (page > 1 && list.length === 0) {
            this.listQuery = {
              ...init_pagaination,
              page: page - 1
            }
            this.$nextTick(() => {
              this.getList()
            })
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.home-top {
  border-radius: 10px;
}
</style>
