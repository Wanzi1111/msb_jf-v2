<template>
  <div class="app-container">
    <div class="home-top">
      <basics-title
        title="业务渠道"
        :actions="[{
          type: 'button', // 按钮
          label: '新增业务渠道',
          click: addBusinessChannel,
          attr: {
            type: 'info',
            plain: true,
            size: 'mini',
            icon: 'el-icon-plus'
          }
        }]"
      />
      <el-tabs v-model="activeTabsOneValue">
        <el-tab-pane v-for="item in TabList" :key="item.key" :disabled="item.disabled" :label="item.label" :name="item.value">
          <span slot="label" class="tabpaneBadge">
            {{ item.label }}
          </span>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="home-content">
      <basics-search
        ref="searchs"
        :loading="loadings._ums_api_out_in_platForm_listObBusinessChannels"
        :searchs="searchs"
        @submitSearch="submitSearch"
      />
      <basics-table
        ref="table"
        :table="table"
        :loading="loadings._ums_api_out_in_platForm_listObBusinessChannels"
        :list="list"
        :get-list="getList"
        :columns="columns"
        :total="total"
        :list-query="listQuery"
        :action-function="actionFunction"
      >
        <template slot="channel" slot-scope="scope">
          <div class="table-blue-title">{{ scope.row.channelId }}</div>
          <div class="table-small-box">{{ scope.row.channelName }}</div>
        </template>
        <template slot="supplier" slot-scope="scope">
          <div>{{ scope.row.supplierName | supplierName }}</div>
          <div class="table-small-box">{{ scope.row.templateId }}</div>
        </template>
        <template slot="time" slot-scope="scope">
          <div style="margin: 0 auto;display: flex;flex-direction: column;align-items: flex-start;">
            <div>创建：{{ scope.row.ctime | timeFormat }}</div>
            <div>更新：{{ scope.row.utime | timeFormat }}</div>
          </div>
        </template>
      </basics-table>
    </div>
    <el-dialog
      width="650px"
      :title="actionObj ? '修改业务渠道' : '新增业务渠道'"
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
      />
    </el-dialog>
    <el-dialog
      title=""
      :visible.sync="testVisible"
      width="650px"
    >
      <span slot="title" style="font-size: 20px"> <i style="color: rgb(0,131,225)" class="el-icon-warning" /> 启动外呼通道测试 </span>
      <el-form :inline="true" :model="formInline">
        <el-form-item
          prop="mobile"
          label="测试手机号"
          :rules="validateTaskMobile"
        >
          <el-input v-model="formInline.mobile" size="small" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="test">发起测试</el-button>
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="{testFlag}">
        <el-form-item
          prop="testFlag"
        >
          <span slot="label" style="width: 79.5px !important;display: inline-block;">测试结果</span>
          <el-radio-group v-model="testFlag">
            <el-radio :label="0">正常</el-radio>
            <el-radio :label="1">异常</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeTestBox">取 消</el-button>
        <el-button size="small" type="primary" @click="closeTestBox">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="用户意向配置"
      :visible.sync="editVisible"
      width="650px"
    >
      <el-form ref="dynamicValidateForm" label-position="top" :model="dynamicValidateForm" label-width="100px" class="demo-dynamic">
        <template v-for="(domain, index) in dynamicValidateForm.domains">
          <div :key="domain.key" class="dynamicValidateForm-box" :loading="loadings._ums_api_out_in_platForm_listObdictionary || loadings._ums_api_out_in_platForm_addObdictionary">
            <el-form-item
              :label="index ? '' : '意向参数'"
              :prop="'domains.' + index + '.intentionCode'"
              class="dynamicValidateForm-intentionCode"
              :rules="{
                required: true, message: '意向参数不能为空', trigger: 'blur'
              }"
            >
              <el-input v-model="domain.intentionCode" />
            </el-form-item>
            <el-form-item
              :label="index ? '' : '意向名称'"
              :prop="'domains.' + index + '.intentionName'"
              class="dynamicValidateForm-intentionName"
              :rules="{
                required: true, message: '意向名称不能为空', trigger: 'blur'
              }"
            >
              <el-input v-model="domain.intentionName" />
            </el-form-item>
            <el-button class="dynamicValidateForm-delete" @click.prevent="removeDomain(domain)">删除</el-button>
          </div>
        </template>
        <el-form-item>
          <el-button style="margin: 0 auto;" icon="el-icon-plus" @click="addDomain">新增用户意向</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="editVisible = !editVisible">取 消</el-button>
        <el-button size="small" type="primary" :loading="loadings._ums_api_out_in_platForm_addObdictionary" @click="submitForm('dynamicValidateForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title=""
      :visible.sync="enableVisible"
      width="650px"
    >
      <span slot="title" style="font-size: 20px"> <i style="color: rgb(255,163,45)" class="el-icon-warning" /> {{ actionObj && +actionObj.isEnable ? '启用渠道' : '停用渠道' }} </span>
      <span style="font-size: 16px; padding-left: 25px"> {{ actionObj && +actionObj.isEnable ? '启用后可通过中台正常发起外呼任务' : '停用后暂停向第三方发起外呼任务' }} </span>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="enableVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="enable">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { TabList } from '../config'
import { searchs } from './search'
import BasicsTitle from '@/components/BasicsTitle'
import BasicsTable from '@/components/BasicsTable'
import BasicsSearch from '@/components/BasicsSearch'
import BasicsForm from '@/components/BasicsForm'
import { mapGetters } from 'vuex'
import { listObBusinessChannels, addOrUpdateObBusinessChannel, testChannelIsOk, listObdictionary, addObdictionary } from '@/api/call-center/channel'
import columns, { actions } from './columns'
import forms, { formActions } from './form'
import moment from 'moment'

const { supplierNameList = [] } = window?.baseData

const init_pagaination = {
  page: 1,
  limit: 20
}

export default {
  name: 'BusinessChannel',
  components: { BasicsTitle, BasicsSearch, BasicsForm, BasicsTable },
  filters: {
    timeFormat(e) {
      return (e && e !== '0') ? moment(+e).format('YYYY-MM-DD HH:mm:ss') : '--'
    },
    supplierName(e) {
      return supplierNameList.find(v => v.value === e)?.label
    }
  },
  data() {
    const checkMobile = (rule, value, callback) => {
      const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      if (!reg.test(value)) {
        return callback(new Error('请输入正确的手机号'))
      }
    }
    return {
      validateTaskMobile: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { required: true, message: '请输入正确的手机号', validator: checkMobile, trigger: 'blur' }
      ],
      forms,
      formActions,
      dialog: false,
      testVisible: false,
      editVisible: false,
      testFlag: null,
      formInline: {
        mobile: ''
      },
      enableVisible: false,
      TabList,
      activeTabsOneValue: '101',
      table: {
        stripe: false,
        border: false
      },
      columns,
      searchs,
      total: 0,
      list: [],
      searchQuery: {
        businessType: "",
        channelId: "",
        channelName: "",
        isEnable: '0',
        supplierName: "",
      },
      listQuery: { ...init_pagaination },
      actionFunction: actions({
        tableAction: this.tableAction
      }),
      actionObj: null,
      dynamicValidateForm: {
        domains: [{
          intentionCode: '',
          intentionName: '',
          key: Date.now()
        }],
      }
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  watch: {
    activeTabsOneValue() {
      this.initParamsAndGetList()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getList()
    })
  },
  methods: {
    cancelForm() {
      this.dialog = !this.dialog
    },
    // 新增/修改 业务渠道
    addOrUpdateObBusinessChannelNew(data) {
      const { actionObj, testVisible } = this
      addOrUpdateObBusinessChannel(data).then((res) => {
        this.enableVisible = false
        this.dialog = false
        if (res?.code === 0) {
          if (!actionObj) {
            this.initParamsAndGetList()
          } else {
            this.$nextTick(() => {
              this.getList()
            })
          }
          if (!testVisible) {
            this.$message({
              type: 'success',
              message: actionObj ? '修改成功' : '新增成功'
            })
          }
        }
      })
    },
    onFormSubmit(values) {
      const { actionObj } = this
      const data = { ...actionObj, ...values, businessType: values.businessType?.join() }
      this.addOrUpdateObBusinessChannelNew(data)
    },
    addBusinessChannel() {
      this.actionObj = null
      this.$nextTick(() => {
        this.dialog = true
        this.$nextTick(() => {
          this.$refs.dialogRef.set({
            type: 'attr',
            data: { businessType: {
              disabled: false,
            }}
          })
        });
      });
    },
    tableAction(dat, row, index, type) {
      this.actionObj = row
      this.testFlag = row.isNormal
      this.$nextTick(() => {
        if (type === 'enable') {
          this.enableVisible = true
        } else if (type === 'updata') {
          this.actionObj = row
          this.$nextTick(() => {
            this.dialog = true
            this.$nextTick(() => {
              this.$refs.dialogRef.set({
                type: 'attr',
                data: { businessType: {
                  disabled: true,
                }}
              })
              this.$refs.dialogRef.recoveryForm({ ...row, businessType: row.businessType?.split(',') }, true)
            })
          })
        } else if (type === 'test') {
          this.testVisible = true
        } else if (type === 'edit') {
          this.editVisible = true
          listObdictionary({ businessType: row.businessType, channelId: row.channelId, templateId: row.templateId }).then(res => {
            if (res?.code === 0) {
              this.dynamicValidateForm = {
                domains: res?.payload?.list?.map(v => { return { ...v, key: Date.now() } }) ||
                [{ intentionCode: '', intentionName: '', key: Date.now() }]
              }
            }
          })
        }
      });
    },
    closeTestBox() {
      this.testVisible = false
      this.actionObj = null
      this.testFlag = false
    },
    test() {
      const { actionObj } = this
      const data = {
        channelId: actionObj.channelId,
        mobile: this.formInline.mobile
      }
      testChannelIsOk(data).then((res) => {
        const newData = { ...actionObj }
        if (res?.code === 0) {
          this.testFlag = 0
          newData.isNormal = 0
          this.addOrUpdateObBusinessChannelNew(newData)
        } else {
          this.testFlag = 1
          newData.isNormal = 1
          this.addOrUpdateObBusinessChannelNew(newData)
        }
      })
    },
    enable() {
      const { actionObj } = this
      const data = { ...actionObj }
      data.isEnable = +!+data.isEnable + ''
      this.addOrUpdateObBusinessChannelNew(data)
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
      const { isEnable } = value
      const newSearchQuery = { ...this.searchQuery, ...value }
      newSearchQuery.isEnable = isEnable[0] || ''
      this.searchQuery = newSearchQuery
      this.initParamsAndGetList()
    },
    getList() {
      const { searchQuery, listQuery } = this
      const newSearchQuery = {
        ...searchQuery,
        businessType: this.activeTabsOneValue,
        pageNum: listQuery.page,
        pageSize: listQuery.limit }
      listObBusinessChannels(newSearchQuery).then(res => {
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
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { actionObj } = this
          const data = {
            businessType: actionObj.businessType,
            channelId: actionObj.channelId,
            channelName: actionObj.channelName,
            list: this.dynamicValidateForm.domains,
            operationType: "1",
            templateId: actionObj.templateId,
          }
          addObdictionary(data).then(res => {
            if (res?.code === 0) {
              this.editVisible = false
              this.getList()
            }
          })
        } else {
          return false;
        }
      });
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        intentionCode: '',
        intentionName: '',
        key: Date.now()
      });
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .dynamicValidateForm-box {
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  .dynamicValidateForm-intentionCode {
    flex-basis: 20%;
    margin-right: 20px;
  }
  .dynamicValidateForm-intentionName {
    flex-basis: 50%;
    margin-right: 20px;
  }
  .dynamicValidateForm-delete {
    margin-bottom: 22px;
  }
}
</style>
