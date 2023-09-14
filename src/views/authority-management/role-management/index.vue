<template>
  <div class="app-container">
    <div class="home-top">
      <basics-title
        title="角色管理"
        :actions="[{
          type: 'button', // 按钮
          label: '新增角色',
          click: addRole,
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
        :loading="loadings._ums_api_uc_api_role_list"
        :searchs="searchs"
        @submitSearch="submitSearch"
      />
      <basics-table
        ref="table"
        :table="table"
        :loading="loadings._ums_api_uc_api_role_list"
        :list="list"
        :get-list="getList"
        :columns="columns"
        :total="total"
        :list-query="listQuery"
        :action-function="actionFunction"
      />
    </div>
    <el-dialog
      width="650px"
      :title="actionObj ? '编辑角色' : '新增角色'"
      :visible.sync="dialog"
    >
      <basics-form
        ref="dialogRef"
        :key="dialog"
        :forms="forms"
        :loading="loadings._ums_api_uc_api_role_save"
        class="form-item"
        :actions="formActions(cancelForm)"
        @submitForm="onFormSubmit"
        @changeForm="changeNewForm"
      />
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
import { mapGetters } from 'vuex'
import { getRoleList, getRoleDetail, saveRole, delRoleConfirm, delRole } from '@/api/authority-management/role-management'
import { getTreeList } from '@/api/authority-management/resource-management'
import columns, { actions } from './columns'
import forms, { formActions } from './form'
import moment from 'moment'
import BasicsMenuTaps from '@/components/BasicsMenuTaps'

const init_pagaination = {
  page: 1,
  limit: 20
}

export default {
  name: 'RoleManagement',
  components: { BasicsTitle, BasicsSearch, BasicsForm, BasicsTable, BasicsMenuTaps },
  filters: {
    timeFormat(e) {
      return (e !== '0' && e) ? moment(+e).format('YYYY-MM-DD HH:mm:ss') : '永久'
    }
  },
  data() {
    return {
      TabList,
      forms,
      formActions,
      dialog: false,
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
        roleName: ""
      },
      listQuery: { ...init_pagaination },
      actionFunction: actions({
        tableAction: this.tableAction
      }),
      actionObj: null
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  mounted() {
    this.$nextTick(() => {
      this.getList()
    })
  },
  methods: {
    activeIndexChange(id) {
      this.activeIndex = id
      this.initGetList()
    },
    addRole() {
      this.actionObj = null
      this.dialog = true
    },
    cancelForm() {
      this.dialog = false
    },
    onFormSubmit(values) {
      const newData = {
        ...values,
        resIds: values.resIds?.map(v => v[v.length - 1]) || [],
        roleId: this.actionObj ? this.actionObj.roleId : undefined }
      saveRole(newData).then(res => {
        if (res?.status === 0) {
          this.getList()
          this.$message({
            type: 'success',
            message: this.actionObj ? '修改成功' : '新增完成'
          })
        }
      })
      this.dialog = false
    },
    tableAction(type, row) {
      switch (type) {
        case 'edit': {
          this.actionObj = row
          this.$nextTick(() => {
            this.dialog = true
            this.$nextTick(() => {
              getRoleDetail({ roleId: row.roleId }).then(res => {
                if (res?.status === 0) {
                  const { data: { treeNode }} = res
                  const checkedIdList = []
                  // eslint-disable-next-line no-inner-declarations
                  function findCheckedId(list) {
                    for (let index = 0; index < list.length; index++) {
                      const element = list[index];
                      if (element.checked) {
                        checkedIdList.push(element.id)
                      }
                      if (element.children?.length) {
                        findCheckedId(element.children)
                      }
                    }
                  }
                  findCheckedId(treeNode)
                  getTreeList({ platform: this.activeIndex }).then(res => {
                    if (res?.status === 0) {
                      const { data } = res
                      const roleId = []
                      // eslint-disable-next-line no-inner-declarations
                      function findParentIdList(list, parentIdList) {
                        for (let index = 0; index < list.length; index++) {
                          const element = list[index];
                          const newParentIdList = [...parentIdList]
                          newParentIdList.push(element.id)
                          if (checkedIdList.includes(element.id)) {
                            roleId.push(newParentIdList)
                          }
                          if (element.children?.length) {
                            findParentIdList(element.children, newParentIdList)
                          }
                        }
                      }
                      findParentIdList(data, [])
                      this.$refs.dialogRef.recoveryForm({
                        ...this.actionObj,
                        platform: this.activeIndex,
                        resIds: roleId
                      })
                    }
                  })
                }
              })
            });
          });
          break
        }
        case 'del': {
          const { roleId } = row
          delRoleConfirm({ roleId })
            .then(res => {
              const text = res.data === 0 ? '确定删除吗？' : '此角色下存在关联用户，确定删除吗？'
              this.$confirm(text, '', { type: 'warning' })
                .then(() => {
                  delRole({ roleId })
                    .then(() => {
                      this.$message.success('删除角色成功～')
                      this.getList()
                    })
                })
            })
          break
        }
      }
    },
    changeNewForm(value, oldval) {
      if (value.platform && value.platform !== oldval.platform) {
        getTreeList({ platform: value.platform }).then(res => {
          if (res?.status === 0) {
            const { data } = res
            if (oldval.platform) {
              this.$refs.dialogRef.set({
                type: 'defaultVal',
                data: { resIds: [] }
              })
            }
            this.$refs.dialogRef.set({
              type: 'options',
              data: { resIds: data }
            })
          }
        })
      }
      if (!value.platform && value.platform !== oldval.platform) {
        this.$refs.dialogRef.set({
          type: 'options',
          data: { resIds: [] }
        })
        this.$refs.dialogRef.set({
          type: 'defaultVal',
          data: { resIds: [] }
        })
      }
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
      getRoleList(newSearchQuery).then(res => {
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
</style>
