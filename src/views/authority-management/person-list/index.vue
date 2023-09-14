<template>
  <div class="app-container">
    <div class="home-top">
      <basics-title
        title="用户列表"
        :actions="[{
          type: 'button', // 按钮
          label: '新增用户',
          click: addUsers,
          attr: {
            type: 'info',
            plain: true,
            size: 'mini',
            icon: 'el-icon-plus'
          }
        }]"
      />
      <basics-menu-taps
        :actions="TabList"
        :active-index="activeIndex"
        :handle-select="activeIndexChange"
      />
    </div>
    <div class="home-content">
      <basics-search
        ref="searchs"
        :loading="loadings._ums_api_uc_api_platform_user_list"
        :searchs="searchs"
        @submitSearch="submitSearch"
      />
      <basics-table
        ref="table"
        :table="table"
        :loading="loadings._ums_api_uc_api_platform_user_list"
        :list="list"
        :get-list="getList"
        :columns="columns"
        :total="total"
        :list-query="listQuery"
        :action-function="actionFunction"
      >
        <template slot="phone" slot-scope="scope">
          <div>
            {{ (phoneObj && scope.row.id === phoneObj.id) ? scope.row.phone : scope.row.phone.replace(/([0-9]{3})([0-9]{5})([0-9]{3})/, '$1*****$3') }}
            <svg-icon
              style="cursor: pointer;"
              :icon-class="phoneIcone(scope.row.id)"
              @click="isphone(scope.row)"
            />
          </div>
        </template>
        <template slot="addTime" slot-scope="scope">
          <div>{{ scope.row.addTime | timeFormat }}</div>
        </template>
      </basics-table>
    </div>
    <el-dialog
      width="650px"
      :title="actionType === 'add' ? '添加用户' : '重置密码'"
      :visible.sync="dialog"
    >
      <basics-form
        ref="dialogRef"
        :key="dialog"
        :forms="actionType === 'add' ? userForm : forms"
        :loading="loadings._ums_api_uc_api_platform_password_reset"
        class="form-item"
        :actions="formActions(cancelForm)"
        @submitForm="onFormSubmit"
        @changeForm="changeNewForm"
      />
    </el-dialog>
    <el-dialog
      class="assign-dialog"
      title="分配角色"
      :visible.sync="dialogRoleVisible"
      width="960px"
      :before-close="closeMenuDialog"
    >
      <!-- destroy-on-close -->
      <assign-role :key="dialogRoleVisible" :role-ids="actionObj.roleIds" :data-prop="{platform: activeIndex}" @onCancel="closeMenuDialog" @onSubmit="onSubmit" />
    </el-dialog>
  </div>
</template>

<script>

import { searchs } from './search'
import { TabList } from '../config'
import BasicsTitle from '@/components/BasicsTitle'
import BasicsSearch from '@/components/BasicsSearch'
import BasicsForm from '@/components/BasicsForm'
import BasicsTable from '@/components/BasicsTable'
import AssignRole from './components/AssignRole'
import { mapGetters } from 'vuex'
import { getUserList, addUser, getUserName, resetPassword, allotRole } from '@/api/authority-management/person'
import columns, { actions } from './columns'
import forms, { formActions, userForm } from './form'
import moment from 'moment'
import BasicsMenuTaps from '@/components/BasicsMenuTaps'
var _ = require('lodash');

const init_pagaination = {
  page: 1,
  limit: 20
}

export default {
  name: 'WhiteList',
  components: { BasicsTitle, BasicsSearch, BasicsForm, BasicsTable, BasicsMenuTaps, AssignRole },
  filters: {
    timeFormat(e) {
      return (e !== '0' && e) ? moment(+e).format('YYYY-MM-DD HH:mm:ss') : '永久'
    }
  },
  data() {
    return {
      TabList,
      forms: forms(this),
      userForm,
      formActions,
      dialog: false,
      dialogRoleVisible: false,
      table: {
        stripe: false,
        border: false
      },
      activeIndex: 'BASE_MP',
      columns,
      searchs,
      total: 0,
      list: [],
      searchQuery: {
        name: "",
        phone: "",
      },
      listQuery: { ...init_pagaination },
      actionFunction: actions({
        tableAction: this.tableAction
      }),
      actionObj: {},
      phoneObj: null,
      actionType: 'add'
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    phoneIcone() {
      return function(e) {
        if (e !== this.phoneObj?.id) {
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
    addUsers() {
      this.dialog = true
      this.actionType = 'add'
    },
    activeIndexChange(id) {
      this.activeIndex = id
      this.initGetList()
    },
    isphone(e) {
      if (e?.id === this.phoneObj?.id) {
        this.phoneObj = null
      } else {
        this.phoneObj = e
      }
    },
    cancelForm() {
      this.dialog = false
    },
    onSubmit(list) {
      const roleIds = list.map(item => item.roleId)
      // 分配角色接口
      allotRole({
        id: this.actionObj.id,
        roleIds,
        platform: this.activeIndex
        // groupIds
      }).then(res => {
        this.initGetList()
        this.closeMenuDialog()
        this.$message.success('分配角色成功')
      })
    },
    closeMenuDialog() {
      this.dialogRoleVisible = false
    },
    onFormSubmit(values) {
      if (this.actionType === 'add') {
        const newData = { ...values }
        addUser(newData).then(res => {
          if (res?.status === 0) {
            this.getList()
            this.$message({
              type: 'success',
              message: '添加成功'
            })
          }
        })
      } else {
        const newData = { ...values, id: this.actionObj.id }
        resetPassword(newData).then(res => {
          if (res?.status === 0) {
            this.getList()
            this.$message({
              type: 'success',
              message: '修改成功'
            })
          }
        })
      }
      this.dialog = false
    },
    changeNewForm(value, oldval) {
      if (value.phone && (value.phone !== oldval.phone)) {
        this.getName(value.phone, this)
      }
    },
    getName: _.debounce((phone, that) => {
      getUserName({ phone }).then(res => {
        if (res?.status === 0) {
          const { data: { name, id }} = res
          if (name) {
            that.$refs.dialogRef.set({
              type: 'defaultVal',
              data: { name }
            })
            that.$refs.dialogRef.set({
              type: 'defaultVal',
              data: { id }
            })
          } else {
            that.$refs.dialogRef.set({
              type: 'defaultVal',
              data: { name: '' }
            })
            that.$refs.dialogRef.set({
              type: 'defaultVal',
              data: { id: '' }
            })
          }
        }
      })
    }, 500),
    tableAction(dat, row, index, type) {
      this.actionType = type
      this.actionObj = row
      this.$nextTick(() => {
        if (type === 'edit') {
          this.dialogRoleVisible = true
        } else {
          this.dialog = true
        }
      });
    },
    initGetList() {
      this.listQuery = {
        ...init_pagaination
      }
      this.$nextTick(() => {
        this.getList()
      })
    },
    submitSearch(value) {
      const newSearchQuery = { ...this.searchQuery, ...value }
      this.searchQuery = { ...newSearchQuery }
      this.initGetList()
    },
    getList() {
      const { searchQuery, listQuery } = this
      const newSearchQuery = {
        ...searchQuery,
        platform: this.activeIndex,
        pageNum: listQuery.page,
        pageSize: listQuery.limit }
      // 每次获取列表数据重置查看手机号
      this.phoneObj = null
      getUserList(newSearchQuery).then(res => {
        if (res?.status === 0) {
          const { data: { list, total }} = res
          this.list = list
          this.total = total * 1
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
.assign-dialog {
  /deep/ .el-dialog__body {
    padding: 20px 0;
  }
}
</style>
