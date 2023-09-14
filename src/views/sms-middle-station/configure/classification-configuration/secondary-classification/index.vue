<template>
  <div class="app-container">
    <div class="home-top">
      <basics-title
        :title="label"
        :actions="[{
          type: 'button', // 按钮
          label: '新增分类',
          click: addModel,
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
      <basics-table
        ref="table"
        :table="table"
        :loading="loadings._ums_api_sms_api_messagePlatForm_selectSmsTwoTypeList"
        :list="list"
        :get-list="getList"
        :columns="columns"
        :total="total"
        :list-query="listQuery"
        :action-function="actionFunction"
      >
        <template slot="ctime" slot-scope="scope">
          <div>{{ scope.row.ctime | timeFormat }}</div>
        </template>
      </basics-table>
    </div>
    <el-dialog
      width="650px"
      :title="['edit','add'].includes(actionType) ? `${ actionType === 'add' ? '新增分类' : '科目' }` : ''"
      :visible.sync="dialog"
    >
      <p v-if="actionType === 'edit'" style="color: red;margin-bottom: 20px;margin-top: 0">如进行编辑的分类已被使用，本次修改将直接影响该字段的展示，确定编辑吗？</p>
      <basics-form
        v-if="actionType === 'edit' || actionType === 'add'"
        ref="dialogRef"
        :key="dialog"
        :forms="forms"
        :loading="loadings._ums_api_sms_api_messagePlatForm_addOrUpdateSmsTwoType"
        class="form-item"
        :actions="formActions(cancelForm)"
        @submitForm="onFormSubmit"
      />
      <template v-if="['delete','nodelete', 'confirm_delete'].includes(actionType)">
        <span slot="title" style="font-size: 20px"> <i style="color: rgb(255,163,45)" class="el-icon-warning" />
          <!-- 删除提示文案 -->
          {{ actionType === 'delete' ? '如删除该项，存在数据缺失风险，确定删除吗？此操作无法恢复！' : '' }}
          <!-- 禁止删除文案删除提示文案 -->
          {{ actionType === 'nodelete' ? '此分类下包含启用中的场景，禁止删除！' : '' }}
          <!-- 可删除二次确认 -->
          {{ actionType === 'confirm_delete' ? '此分类下存在已停用的场景，确定删除吗？' : '' }}
        </span>
        <span style="font-size: 16px; padding-left: 25px">
          <!-- 删除提示文案 -->
          {{ actionType === 'delete' ? '请先确认该项下是否存在相关数据' : '' }}
          <!-- 禁止删除文案删除提示文案 -->
          {{ actionType === 'nodelete' ? '如需删除请先停用相关场景' : '' }}
          <!-- 可删除二次确认 -->
          {{ actionType === 'confirm_delete' ? '删除分类不会删除已停用的场景' : '' }}
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button v-if="['delete', 'confirm_delete'].includes(actionType)" size="small" @click="dialog = false">取 消</el-button>
          <el-button size="small" type="primary" @click="enable">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>

import BasicsTitle from '@/components/BasicsTitle'
import BasicsForm from '@/components/BasicsForm'
import BasicsTable from '@/components/BasicsTable'
import { mapGetters } from 'vuex'
import { selectSmsOneTypeList } from '@/api/sms-middle-station/classification-configuration'
import { selectSmsTwoTypeList, addOrUpdateSmsTwoType } from '@/api/sms-middle-station/classification-configuration'
import columns, { actions } from './columns'
import forms, { formActions } from '../form'
import moment from 'moment'

const init_pagaination = {
  page: 1,
  limit: 20
}

export default {
  name: 'ClassificationConfiguration',
  components: { BasicsTitle, BasicsForm, BasicsTable },
  filters: {
    timeFormat(e) {
      return (e !== '0' && e) ? moment(+e).format('YYYY-MM-DD HH:mm:ss') : '暂无'
    }
  },
  data() {
    return {
      label: '',
      activeIndex: '',
      parentId: '',
      forms,
      formActions,
      dialog: false,
      table: {
        stripe: false,
        border: false
      },
      columns,
      total: 0,
      list: [],
      listQuery: { ...init_pagaination },
      actionFunction: actions({
        tableAction: this.tableAction
      }),
      actionObj: null,
      actionType: '',
      oneTypeNameList: []
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  mounted() {
    this.activeIndex = this.$route.query.activeIndex
    this.parentId = this.$route.query.parentId
    this.label = this.$route.query.label
    this.$nextTick(() => {
      const { activeIndex } = this
      const newSearchQuery = {
        businessType: activeIndex,
        pageNum: 1,
        pageSize: 99999 }
      selectSmsOneTypeList(newSearchQuery).then(res => {
        if (res?.code === 0) {
          const { payload: { list }} = res
          this.oneTypeNameList = list.map(v => {
            return {
              value: v.id,
              key: v.id,
              label: v.oneTypeName
            }
          })
        }
      })
      this.getList()
    })
  },
  methods: {
    cancelForm() {
      this.dialog = !this.dialog
    },
    // 新增二级分类
    addModel() {
      this.actionType = 'add'
      this.dialog = true
      this.$nextTick(() => {
        this.$refs.dialogRef.set({
          type: 'options',
          data: { oneTypeName: this.oneTypeNameList }
        })
        this.$refs.dialogRef.set({
          type: 'defaultVal',
          data: { oneTypeName: this.parentId }
        })
        this.$refs.dialogRef.set({
          type: 'attr',
          data: { oneTypeName: {
            filterable: true,
            disabled: true,
            placeholder: '请选择',
          }}
        })
      });
    },
    onFormSubmit(values) {
      const newData = { businessType: this.activeIndex, parentId: values.oneTypeName, twoTypeName: values.twoTypeName }
      if (this.actionType === 'edit') {
        newData['id'] = this.actionObj?.id
      }
      addOrUpdateSmsTwoType(newData).then(res => {
        if (res?.code === 0) {
          this.initParamsAndGetList()
          this.$message({
            type: 'success',
            message: this.actionType === 'edit' ? '修改成功' : '新增成功'
          })
        }
      })
      this.dialog = false
    },
    tableAction(dat, row, index, type) {
      this.actionObj = row
      this.actionType = type
      this.$nextTick(() => {
        if (type === 'delete') {
          this.dialog = true
        } else if (type === 'edit') {
          this.dialog = true
          this.$nextTick(() => {
            this.$refs.dialogRef.set({
              type: 'options',
              data: { oneTypeName: this.oneTypeNameList }
            })
            this.$refs.dialogRef.recoveryForm({
              oneTypeName: this.parentId,
              twoTypeName: this.actionObj.twoTypeName
            })
            this.$refs.dialogRef.set({
              type: 'attr',
              data: { oneTypeName: {
                filterable: true,
                disabled: true,
                placeholder: '请选择',
              }}
            })
          });
        }
      });
    },
    enable() {
      if (this.actionType === 'nodelete') {
        this.dialog = false
        return
      }
      if (this.actionType === 'delete') {
        const newData = { businessType: this.activeIndex, parentId: this.parentId, id: this.actionObj?.id, delete: "1", type: "1" }
        addOrUpdateSmsTwoType(newData).then(res => {
          if (res?.code === 0) {
            this.dialog = false
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.$nextTick(() => {
              this.getList()
            })
          } else if (res?.code === 10125) {
            this.actionType = 'confirm_delete'
            this.dialog = true
          } else if (res?.code === 10118) {
            this.actionType = 'nodelete'
            this.dialog = true
          }
        })
      }
      if (this.actionType === 'confirm_delete') {
        const newData = { businessType: this.activeIndex, parentId: this.parentId, id: this.actionObj?.id, delete: "1", type: "2" }
        addOrUpdateSmsTwoType(newData).then(res => {
          if (res?.code === 0) {
            this.dialog = false
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.$nextTick(() => {
              this.getList()
            })
          } else {
            this.actionType = 'nodelete'
            this.dialog = true
          }
        })
      }
    },
    initParamsAndGetList() {
      this.listQuery = {
        ...init_pagaination
      }
      this.$nextTick(() => {
        this.getList()
      })
    },
    getList() {
      const { activeIndex, parentId, listQuery } = this
      const newSearchQuery = {
        businessType: activeIndex,
        parentId,
        pageNum: listQuery.page,
        pageSize: listQuery.limit }
      selectSmsTwoTypeList(newSearchQuery).then(res => {
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
