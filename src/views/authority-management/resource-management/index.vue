<template>
  <div class="app-container">
    <div class="home-top">
      <basics-title
        title="资源管理"
        :actions="[{
          type: 'button', // 按钮
          label: '新增菜单',
          click: addMenu,
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
      <basics-table
        ref="table"
        :table="table"
        :loading="loadings._ums_api_uc_api_res_tree"
        :list="list"
        :get-list="getList"
        :columns="columns"
        :action-function="actionFunction"
      />
    </div>
    <el-dialog
      width="650px"
      :title="actionObj ? '编辑菜单' : '新增菜单'"
      :visible.sync="dialog"
    >
      <basics-form
        ref="dialogRef"
        :key="dialog"
        :forms="forms"
        :loading="loadings._ums_api_uc_api_res_save"
        :actions="formActions(cancelForm)"
        @submitForm="onFormSubmit"
      />
    </el-dialog>
  </div>
</template>

<script>

import BasicsTitle from '@/components/BasicsTitle'
import { TabList } from '../config'
import BasicsForm from '@/components/BasicsForm'
import BasicsTable from '@/components/BasicsTable'
import { mapGetters } from 'vuex'
import { getTreeList, save, delResource } from '@/api/authority-management/resource-management'
import columns, { actions } from './columns'
import forms, { formActions } from './form'
import BasicsMenuTaps from '@/components/BasicsMenuTaps'

export default {
  name: 'ResourceManagement',
  components: { BasicsTitle, BasicsForm, BasicsTable, BasicsMenuTaps },
  data() {
    return {
      TabList,
      activeIndex: 'BASE_MP',
      forms,
      formActions,
      dialog: false,
      table: {
        stripe: false,
        border: false,
        rowKey: 'id',
        defaultExpandAll: false,
        treeProps: { children: 'children', hasChildren: 'hasChildren' }
      },
      columns,
      list: [],
      actionFunction: actions({
        tableAction: this.tableAction
      }),
      actionObj: null
    }
  },
  computed: {
    ...mapGetters(['loadings']),
  },
  mounted() {
    this.$nextTick(() => {
      this.getList()
    })
  },
  methods: {
    activeIndexChange(id) {
      this.activeIndex = id
      this.$nextTick(() => {
        this.getList()
      });
    },
    cancelForm() {
      this.dialog = false
      this.actionObj = null
    },
    addMenu() {
      this.actionObj = null
      this.dialog = true
      this.$nextTick(() => {
        this.$refs.dialogRef.set({
          type: 'options',
          data: { parentId: this.list }
        })
      });
    },
    onFormSubmit(values) {
      const newData = {
        ...values,
        platform: this.activeIndex,
        parentId: values.parentId?.length ? values.parentId[values.parentId.length - 1] : '0',
        id: this.actionObj ? this.actionObj.id : undefined }
      save(newData).then(res => {
        if (res?.status === 0) {
          this.getList()
          this.$message({
            type: 'success',
            message: this.actionObj ? '修改成功' : '新增完成'
          })
        }
      })
      this.actionObj = null
      this.dialog = false
    },
    tableAction(type, row) {
      switch (type) {
        case 'edit': {
          this.actionObj = row
          this.$nextTick(() => {
            this.dialog = true
            this.$nextTick(() => {
              this.$refs.dialogRef.set({
                type: 'options',
                data: { parentId: this.list }
              })
              this.$nextTick(() => {
                let parentId = []
                function findParentIdList(list, parentIdList) {
                  for (let index = 0; index < list.length; index++) {
                    const element = list[index];
                    const newParentIdList = [...parentIdList]
                    newParentIdList.push(element.parentId)
                    if (element.parentId === row.parentId) {
                      parentId = newParentIdList
                      return
                    }
                    if (element.children?.length) {
                      findParentIdList(element.children, newParentIdList)
                    }
                  }
                }
                findParentIdList(this.list, [])
                parentId.shift()
                this.$refs.dialogRef.recoveryForm({ ...this.actionObj, parentId })
              });
            });
          });
          break
        }
        case 'del': {
          this.$confirm('确定删除吗？', '', { type: 'warning' })
            .then(() => {
              delResource({ id: row.id })
                .then(() => {
                  this.$message.success('删除资源成功～')
                  this.getList()
                })
            })
          break
        }
      }
    },
    getList() {
      getTreeList({ platform: this.activeIndex }).then(res => {
        if (res?.status === 0) {
          const { data } = res
          this.list = data
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
