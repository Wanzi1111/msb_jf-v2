<template>
  <div class="app-container">
    <div class="home-top">
      <basics-title
        title="白名单"
        :actions="[{
          type: 'button', // 按钮
          label: '手动导入',
          click: addBlack,
          attr: {
            type: 'primary',
            plain: true,
            size: 'mini',
            icon: 'el-icon-plus'
          }
        }]"
      />
      <el-tabs v-model="type">
        <el-tab-pane v-for="item in typeList" :key="item.key" :label="item.label" :name="item.value">
          <span slot="label">
            {{ item.label }}
          </span>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="home-content">
      <basics-search
        ref="searchs"
        :loading="loadings._ums_api_ig_v1_whitelists"
        :searchs="searchs"
        @submitSearch="submitSearch"
      />
      <basics-table
        ref="table"
        :table="table"
        :loading="loadings._ums_api_ig_v1_whitelists"
        :list="list"
        :get-list="getList"
        :columns="columns"
        :total="total"
        :list-query="listQuery"
        :action-function="actionFunction"
      >
        <template slot="disturbMobile" slot-scope="scope">
          <div>
            {{ (disturbMobileObj && scope.row.id === disturbMobileObj.id) ? scope.row.mobile : scope.row.mobile.replace(/([0-9]{3})([0-9]{5})([0-9]{3})/, '$1*****$3') }}
            <svg-icon
              style="cursor: pointer;"
              :icon-class="disturbMobileIcone(scope.row.id)"
              @click="isDisturbMobile(scope.row)"
            />
          </div>
        </template>
        <template slot="cname" slot-scope="scope">
          <div>{{ scope.row.cname }}</div>
          <div>{{ scope.row.cmobile }}</div>
        </template>
      </basics-table>
    </div>
    <el-dialog
      width="650px"
      :title="'手动导入'"
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
      <span slot="title" style="font-size: 20px"> <i style="color: rgb(255,163,45)" class="el-icon-warning" /> 是否确定解除 </span>
      <span style="font-size: 16px; padding-left: 25px"> 解除后将不再进行勿扰过滤 </span>
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
import { getWhitelists, setWhitelists, deleteWhite } from '@/api/do-not-disturb/list'
import columns, { actions } from './columns'
import forms, { formActions, typeList } from './form'
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
      typeList,
      type: '0',
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
      searchQuery: {},
      listQuery: { ...init_pagaination },
      actionFunction: actions({
        tableAction: this.tableAction
      }),
      actionObj: null,
      disturbMobileObj: null
    }
  },
  watch: {
    type(val, oldVal) {
      if (val !== oldVal) {
        this.$refs.searchs.reset()
        this.searchQuery = {};
      }
    },
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
      newData.startTime = (values.daterange?.[0] && values.takeEffectType === '1') ? moment(values.daterange[0]).format("YYYY-MM-DD") : ''
      newData.endTime = (values.daterange?.[1] && values.takeEffectType === '1') ? moment(values.daterange[1]).format("YYYY-MM-DD") : ''
      newData.mobile = values.mobile?.replace(/\n/g, ',')
      setWhitelists(newData).then(res => {
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
    // 列表的action按钮时间
    tableAction(dat, row, index, type) {
      this.actionObj = row
      this.$nextTick(() => {
        this.enableVisible = true
      });
    },
    // 解除白名单
    enable() {
      const { actionObj } = this
      deleteWhite({ id: actionObj.id }).then(res => {
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
    // 列表初始化
    initParamsAndGetList() {
      this.listQuery = {
        ...init_pagaination
      }
      this.$nextTick(() => {
        this.getList()
      })
    },
    // 列表搜索
    submitSearch(value) {
      const newSearchQuery = { ...this.searchQuery, ...value }
      newSearchQuery.startTime = value.daterange?.[0] ? moment(value.daterange[0]).format("YYYY-MM-DD") : ''
      newSearchQuery.endTime = value.daterange?.[1] ? moment(value.daterange[1]).format("YYYY-MM-DD") : ''
      newSearchQuery.cname = "";
      newSearchQuery.cmobile = "";
      newSearchQuery[value.userInfoInputSelectProp] = value.userInfoInputSelect;
      this.searchQuery = newSearchQuery;
      this.initParamsAndGetList()
    },
    getList() {
      const { searchQuery, listQuery, type } = this
      const newSearchQuery = {
        ...searchQuery,
        type,
        page: listQuery.page,
        pageSize: listQuery.limit
      }
      // 每次获取列表数据重置查看手机号
      this.disturbMobileObj = null
      getWhitelists(newSearchQuery).then(res => {
        if (res?.code === 0) {
          const { payload: { list, totalSize, totalPage }} = res
          this.list = list
          this.total = totalSize
          if (totalPage > 1 && list.length === 0) {
            this.listQuery = {
              ...init_pagaination,
              page: totalPage - 1
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
