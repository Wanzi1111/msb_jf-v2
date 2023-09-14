<template>
  <div>
    <router-view />
    <div v-show="$route.path === '/sms-middle-station/configure/classification-configuration'" class="app-container">
      <div class="home-top">
        <basics-title
          title="分类配置"
          :actions="[{
            type: 'button', // 按钮
            label: '新增科目',
            click: addModel,
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
          :loading="loadings._ums_api_sms_api_messagePlatForm_selectSmsOneTypeList"
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
        <template v-if="['delete','nodelete', 'confirm_delete'].includes(actionType)">
          <span slot="title" style="font-size: 20px"> <i style="color: rgb(255,163,45)" class="el-icon-warning" />
            <!-- 删除提示文案 -->
            {{ actionType === 'delete' ? '如删除该项，存在数据缺失风险，确定删除吗？此操作无法恢复！' : '' }}
            <!-- 禁止删除文案删除提示文案 -->
            {{ actionType === 'nodelete' ? '此科目下包含启用中的场景，禁止删除！' : '' }}
            <!-- 可删除二次确认 -->
            {{ actionType === 'confirm_delete' ? '此科目下存在已停用的场景，确定删除吗？' : '' }}
          </span>
          <span style="font-size: 16px; padding-left: 25px">
            <!-- 删除提示文案 -->
            {{ actionType === 'delete' ? '请先确认该项下是否存在相关数据' : '' }}
            <!-- 禁止删除文案删除提示文案 -->
            {{ actionType === 'nodelete' ? '如需删除请先停用相关场景' : '' }}
            <!-- 可删除二次确认 -->
            {{ actionType === 'confirm_delete' ? '删除科目不会删除已停用的场景' : '' }}
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button v-if="['delete', 'confirm_delete'].includes(actionType)" size="small" @click="dialog = false">取 消</el-button>
            <el-button size="small" type="primary" @click="enable">确 定</el-button>
          </span>
        </template>
        <p v-if="actionType === 'edit'" style="color: red;margin-bottom: 20px;margin-top: 0">如进行编辑的分类已被使用，本次修改将直接影响该字段的展示，确定编辑吗？</p>
        <basics-form
          v-if="['add', 'edit'].includes(actionType)"
          ref="dialogRef"
          :key="dialog"
          :forms="oneTypeNameForm"
          :loading="loadings._ums_api_sms_api_messagePlatForm_addOrUpdateSmsOneType"
          class="form-item"
          :actions="formActions(cancelForm)"
          @submitForm="onFormSubmit"
        />
      </el-dialog>
    </div>
  </div>
</template>

<script>

import { TabList } from './config'
import BasicsTitle from '@/components/BasicsTitle'
import BasicsMenuTaps from '@/components/BasicsMenuTaps'
import BasicsForm from '@/components/BasicsForm'
import BasicsTable from '@/components/BasicsTable'
import { mapGetters } from 'vuex'
import { selectSmsOneTypeList, addOrUpdateSmsOneType } from '@/api/sms-middle-station/classification-configuration'
import columns, { actions } from './columns'
import { formActions, oneTypeNameForm } from './form'
import moment from 'moment'

const init_pagaination = {
  page: 1,
  limit: 20
}

export default {
  name: 'ClassificationConfiguration',
  components: { BasicsTitle, BasicsMenuTaps, BasicsForm, BasicsTable },
  filters: {
    timeFormat(e) {
      return (e !== '0' && e) ? moment(+e).format('YYYY-MM-DD HH:mm:ss') : '暂无'
    }
  },
  data() {
    return {
      TabList,
      activeIndex: "101",
      oneTypeNameForm,
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
    this.$nextTick(() => {
      this.selectSmsOneTypeList(this.activeIndex)
      this.getList()
    })
  },
  methods: {
    activeIndexChange(id) {
      this.activeIndex = id
      this.selectSmsOneTypeList(id)
      this.initParamsAndGetList()
    },
    selectSmsOneTypeList(activeIndex) {
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
    },
    cancelForm() {
      this.dialog = !this.dialog
    },
    // 新增分类
    addModel() {
      this.actionType = 'add'
      this.dialog = true
    },
    // 新增或修改
    onFormSubmit(values) {
      const newData = { businessType: this.activeIndex, id: this.actionType === 'edit' ? this.actionObj?.id : undefined, ...values }
      addOrUpdateSmsOneType(newData).then(res => {
        if (res?.code === 0) {
          this.initParamsAndGetList()
          this.$message({
            type: 'success',
            message: this.actionType === 'edit' ? "修改成功" : '新增成功'
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
        } else if (type === 'check') {
          this.$router.push({ path: '/sms-middle-station/configure/classification-configuration/secondary-classification', query: { activeIndex: this.activeIndex, parentId: row.id, label: row.oneTypeName }})
        } else if (type === 'edit') {
          this.dialog = true
          this.$nextTick(() => {
            this.$refs.dialogRef.recoveryForm({
              oneTypeName: this.actionObj.oneTypeName
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
        const newData = { businessType: this.activeIndex, id: this.actionObj?.id, delete: "1", type: "1" }
        addOrUpdateSmsOneType(newData).then(res => {
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
        const newData = { businessType: this.activeIndex, id: this.actionObj?.id, delete: "1", type: "2" }
        addOrUpdateSmsOneType(newData).then(res => {
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
      const { activeIndex, listQuery } = this
      const newSearchQuery = {
        businessType: activeIndex,
        pageNum: listQuery.page,
        pageSize: listQuery.limit }
      selectSmsOneTypeList(newSearchQuery).then(res => {
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
