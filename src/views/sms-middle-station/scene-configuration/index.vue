<template>
  <div>
    <router-view />
    <div v-show="$route.path === '/sms-middle-station/scene-configuration'" class="app-container">
      <div class="home-top">
        <basics-title
          title="短信场景"
          :actions="[{
            type: 'button', // 按钮
            label: '新增短信场景',
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
          :actions="BusinessTabList"
          :active-index="activeIndex"
          :handle-select="activeIndexChange"
        />
      </div>
      <div class="home-content">
        <basics-search
          ref="searchs"
          :loading="loadings._ums_api_sms_api_messagePlatForm_selectSmsScenarioConfigurationList || loadings._ums_api_sms_api_messagePlatForm_downLoadSmsScenarioConfigurationList"
          :searchs="searchs"
          :is-download="true"
          @download="download"
          @submitSearch="submitSearch"
        />
        <basics-table
          ref="table"
          :table="table"
          :loading="loadings._ums_api_sms_api_messagePlatForm_selectSmsScenarioConfigurationList"
          :list="list"
          :get-list="getList"
          :columns="columns"
          :total="total"
          :list-query="listQuery"
          :action-function="actionFunction"
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
          <template slot="scenarioId" slot-scope="scope">
            <div class="table-blue-title">{{ scope.row.scenarioId }}</div>
            <div class="table-small-box">{{ scope.row.scenarioName }}</div>
          </template>
          <template slot="templateId" slot-scope="scope">
            <div class="table-small-box">{{ scope.row.templateId }}</div>
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
        </basics-table>
      </div>
      <el-dialog
        width="650px"
        :title="['edit','add'].includes(actionType) ? `${ actionType === 'add' ? '新增短信场景' : '短信场景' }` : '频次设置'"
        :visible.sync="dialog"
      >
        <basics-form
          v-if="['edit','add','check'].includes(actionType)"
          ref="dialogRef"
          :key="dialog"
          :forms="actionType === 'check' ? formCheck : forms"
          :loading="loadings._ums_api_sms_api_messagePlatForm_addOrUpdateSmsScenarioConfiguration"
          class="form-item"
          :actions="formActions(cancelForm)"
          @submitForm="onFormSubmit"
          @changeForm="changeNewForm"
        />
        <p v-if="['check'].includes(actionType)" style="font-size: 14px; color: rgb(223,16,40); padding-left: 25px"> 注：仅针对本次场景有效 </p>
        <template v-if="!['edit', 'add', 'check'].includes(actionType)">
          <span slot="title" style="font-size: 20px"> <i style="color: rgb(255,163,45)" class="el-icon-warning" />
            {{ actionType === 'disable' ? +actionObj.enableStatus ? '启用场景' : '停用场景' : actionType === 'noDelete' ? '此场景已产生数据，禁止删除！' : actionType === 'reEdit' ? '确认保存' : '删除该场景，存在数据缺失风险，确定删除吗？此操作无法恢复！' }}
          </span>
          <p v-if="['disable'].includes(actionType)" style="font-size: 16px; padding-left: 25px"> {{ actionType === 'disable' ? +actionObj.enableStatus ? '启用后可通过中台正常发起短信任务' : '停用后暂停向第三方发起短信任务' : '' }}  </p>
          <p v-if="['delete'].includes(actionType)" style="font-size: 16px; padding-left: 25px"> 请先确认该场景是否存在相关数据 </p>
          <p v-if="['reEdit'].includes(actionType)" style="font-size: 16px; padding-left: 25px"> 编辑修改后可能会对数据产生影响，确定保存吗？ </p>
          <span slot="footer" class="dialog-footer">
            <el-button v-if="['delete', 'disable', 'reEdit'].includes(actionType)" size="small" @click="dialog = false">取 消</el-button>
            <el-button size="small" type="primary" @click="enable">{{ ['delete', 'disable', 'noDelete', 'reEdit'].includes(actionType) ? '确 定' : '关 闭' }}</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>

</template>

<script>

import { BusinessTabList } from '@/views/sms-middle-station/config'
import { searchs } from './search'
import BasicsTitle from '@/components/BasicsTitle'
import BasicsSearch from '@/components/BasicsSearch'
import BasicsMenuTaps from '@/components/BasicsMenuTaps'
import BasicsForm from '@/components/BasicsForm'
import BasicsTable from '@/components/BasicsTable'
import { mapGetters } from 'vuex'
import { selectSmsScenarioConfigurationList, downLoadSmsScenarioConfigurationList, addOrUpdateSmsScenarioConfiguration } from '@/api/sms-middle-station/scene-configuration'
import { selectSmsOneTypeList, selectSmsTwoTypeList } from '@/api/sms-middle-station/classification-configuration'
import { selectSmsMessageTemplateList } from '@/api/sms-middle-station/supplier-configuration'
import columns, { actions } from './columns'
import forms, { formActions, formCheck } from './form'
import moment from 'moment'

var _ = require('lodash');

const init_pagaination = {
  page: 1,
  limit: 20
}

export default {
  name: 'SceneConfiguration',
  components: { BasicsTitle, BasicsSearch, BasicsMenuTaps, BasicsForm, BasicsTable },
  filters: {
    timeFormat(e) {
      return (e !== '0' && e) ? moment(+e).format('YYYY-MM-DD HH:mm:ss') : '-'
    },
    listSupplierNameType(e) {
      const { listSupplierNameType } = window.baseData
      return listSupplierNameType.find(item => item.value === e)?.label || ''
    }
  },
  data() {
    return {
      BusinessTabList,
      activeIndex: '101',
      dialog: false,
      table: {
        stripe: false,
        border: false
      },
      columns,
      searchs,
      forms,
      formCheck,
      formActions,
      total: 0,
      list: [],
      searchQuery: {
        oneId: "",
        twoId: "",
        supplierName: "",
        department: '',
        leader: '',
        domesticForeign: "",
        messageType: "",
        enableStatus: '0',
        sendTimeEnd: moment().endOf('day').format('YYYYMMDD'),
        sendTimeStart: moment().subtract(7, 'days').startOf('day').format('YYYYMMDD'),
        sortType: undefined, // 0 日期 1 到达率 2 发送量 3 成功量 4 失败量  5 计费条数
        sortStat: undefined // 2 倒序 1 正序
      },
      formData: null,
      listQuery: { ...init_pagaination },
      actionFunction: actions({
        tableAction: this.tableAction
      }),
      actionObj: null,
      isChangeForm: true,
      actionType: '',
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
    ...mapGetters(['loadings'])
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
            data: { signature: list?.map((item) => {
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
          'sendLever': 6,
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
    tableAction(dat, row, index, type) {
      this.actionObj = row
      this.actionType = type
      if (type === 'push') {
        this.$router.push({ path: '/sms-middle-station/scene-configuration/sms-secondary', query: {
          templateId: row.templateId,
          scenarioId: row.scenarioId,
          sendTimeEnd: this.searchQuery.sendTimeEnd,
          sendTimeStart: this.searchQuery.sendTimeStart

        }})
      } else if (type === 'log') {
        this.$router.push({ path: '/sms-middle-station/scene-configuration/operation-log', query: {
          actionObj: row
        }})
      } else {
        this.$nextTick(() => {
          this.dialog = true
          this.isChangeForm = false
          if (['check', 'edit'].includes(type)) {
            this.$nextTick(async function() {
              if (['edit'].includes(type)) {
                const OneTypeList = await selectSmsOneTypeList({ businessType: this.actionObj.businessType || undefined, pageNum: 1, pageSize: 9999 })
                const TwoTypeList = await selectSmsTwoTypeList({ businessType: this.actionObj.businessType || undefined, parentId: this.actionObj.oneId, pageNum: 1, pageSize: 9999 })
                this.$refs.dialogRef.set({
                  type: 'attr',
                  data: { businessType: {
                    filterable: true,
                    disabled: true,
                  }}
                })
                this.$refs.dialogRef.set({
                  type: 'noShow',
                  data: { scenarioId: false }
                })
                this.$refs.dialogRef.set({
                  type: 'noShow',
                  data: { ctime: false }
                })
                this.$refs.dialogRef.set({
                  type: 'noShow',
                  data: { utime: false }
                })
                this.$refs.dialogRef.set({
                  type: 'options',
                  data: { oneId: OneTypeList?.payload?.list.map((i) => {
                    return {
                      label: i.oneTypeName,
                      value: i.id
                    }
                  }) }
                })
                this.$refs.dialogRef.set({
                  type: 'options',
                  data: { twoId: TwoTypeList?.payload?.list.map((i) => {
                    return {
                      label: i.twoTypeName,
                      value: i.id
                    }
                  }) }
                })
                this.$nextTick(function() {
                  this.$refs.dialogRef.recoveryForm({
                    ...this.actionObj,
                    ctime: moment(this.actionObj.ctime * 1).format('YYYY-MM-DD HH:mm:ss'),
                    utime: moment(this.actionObj.utime * 1).format('YYYY-MM-DD HH:mm:ss')
                  })
                  this.$nextTick(function() {
                    this.isChangeForm = true
                  });
                });
              } else {
                this.$refs.dialogRef.recoveryForm({ ...this.actionObj })
                this.$nextTick(function() {
                  this.isChangeForm = true
                });
              }
            });
          }
        });
      }
    },
    addModel() {
      this.actionType = 'add'
      this.dialog = true
      this.$nextTick(() => {
        this.$refs.dialogRef.set({
          type: 'attr',
          data: { scenarioName: {
            placeholder: '请输入',
            disabled: false,
          }}
        })
        this.$refs.dialogRef.set({
          type: 'noShow',
          data: { scenarioId: true }
        })
        this.$refs.dialogRef.set({
          type: 'attr',
          data: { businessType: {
            filterable: true,
            disabled: false,
          }}
        })
        this.$refs.dialogRef.set({
          type: 'attr',
          data: { oneId: {
            filterable: true,
            disabled: false,
          }}
        })
        this.$refs.dialogRef.set({
          type: 'attr',
          data: { twoId: {
            filterable: true,
            disabled: false,
          }}
        })
        this.$refs.dialogRef.set({
          type: 'noShow',
          data: { ctime: true }
        })
        this.$refs.dialogRef.set({
          type: 'noShow',
          data: { utime: true }
        })
      });
    },
    enable() {
      const { actionObj } = this
      if (['disable'].includes(this.actionType)) {
        const newData = { id: this.actionObj?.id, enableStatus: +!+actionObj.enableStatus + '', }
        addOrUpdateSmsScenarioConfiguration(newData).then(res => {
          if (res?.code === 0) {
            this.dialog = false
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.$nextTick(() => {
              this.getList()
            })
          }
        })
      } else if (['delete'].includes(this.actionType)) {
        const newData = { id: this.actionObj?.id, delete: "1", }
        addOrUpdateSmsScenarioConfiguration(newData).then(res => {
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
            this.actionType = 'noDelete'
          }
        })
      } else if (['reEdit'].includes(this.actionType)) {
        if (this.formData) {
          addOrUpdateSmsScenarioConfiguration(this.formData).then((res) => {
            if (res?.code === 0) {
              this.$nextTick(() => {
                this.getList()
              });
              this.dialog = false
              this.$message({
                type: 'success',
                message: '修改成功'
              })
            }
          })
        }
      } else {
        this.dialog = false
      }
    },
    cancelForm() {
      this.dialog = !this.dialog
    },
    async onFormSubmit(values) {
      const newData = { ...(['check', 'edit'].includes(this.actionType) ? { id: this.actionObj?.id } : {}), ...values }
      const oneObj = await selectSmsOneTypeList({ businessType: values.businessType || undefined, id: values.oneId, pageNum: 1, pageSize: 1 })
      const twoObj = await selectSmsTwoTypeList({ businessType: values.businessType || undefined, id: values.twoId, pageNum: 1, pageSize: 1 })
      const formData = {
        ...newData,
        ctime: undefined,
        utime: undefined,
        oneType: ['add', 'edit'].includes(this.actionType) ? oneObj?.payload?.list?.[0]?.oneTypeName : undefined,
        twoType: ['add', 'edit'].includes(this.actionType) && values.twoId ? twoObj?.payload?.list?.[0]?.twoTypeName : undefined }
      if (['edit'].includes(this.actionType)) {
        this.actionType = 'reEdit'
        this.formData = formData
        return
      }
      const res = await addOrUpdateSmsScenarioConfiguration(formData)
      if (res?.code === 0) {
        this.$nextTick(() => {
          this.getList()
        });
        this.$message({
          type: 'success',
          message: this.actionType === 'check' ? '修改成功' : '新增成功'
        })
      }
      if (this.actionType !== 'check') {
        this.dialog = false
      }
    },
    changeNewForm(value, oldval) {
      if (this.isChangeForm && value.businessType && value.businessType !== oldval.businessType) {
        const newSearchQuery = {
          businessType: value.businessType,
          pageNum: 1,
          pageSize: 9999 }
        selectSmsOneTypeList(newSearchQuery).then(res => {
          if (res?.code === 0) {
            const { payload: { list }} = res
            this.$refs.dialogRef.set({
              type: 'options',
              data: { oneId: list?.map((item) => {
                return {
                  label: item.oneTypeName,
                  value: item.id
                } || []
              }) }
            })
            this.$refs.dialogRef.set({
              type: 'defaultVal',
              data: { oneId: '' }
            })
            this.$refs.dialogRef.set({
              type: 'options',
              data: { twoId: [] }
            })
            this.$refs.dialogRef.set({
              type: 'defaultVal',
              data: { twoId: '' }
            })
          }
        })
      }
      if (this.isChangeForm && !value.businessType && value.businessType !== oldval.businessType) {
        this.$refs.dialogRef.set({
          type: 'options',
          data: { oneId: [] }
        })
        this.$refs.dialogRef.set({
          type: 'defaultVal',
          data: { oneId: '' }
        })
        this.$refs.dialogRef.set({
          type: 'options',
          data: { twoId: [] }
        })
        this.$refs.dialogRef.set({
          type: 'defaultVal',
          data: { twoId: '' }
        })
      }
      if (this.isChangeForm && value.businessType && value.oneId && value.oneId !== oldval.oneId) {
        const newSearchQuery = {
          businessType: value.businessType,
          parentId: value.oneId,
          pageNum: 1,
          pageSize: 9999 }
        selectSmsTwoTypeList(newSearchQuery).then(res => {
          if (res?.code === 0) {
            const { payload: { list }} = res
            this.$refs.dialogRef.set({
              type: 'options',
              data: { twoId: list?.map((item) => {
                return {
                  label: item.twoTypeName,
                  value: item.id
                } || []
              }) }
            })
            this.$refs.dialogRef.set({
              type: 'defaultVal',
              data: { twoId: '' }
            })
          }
        })
      }
      if (this.isChangeForm && value.businessType && !value.oneType && value.oneId !== oldval.oneId) {
        this.$refs.dialogRef.set({
          type: 'options',
          data: { twoId: [] }
        })
        this.$refs.dialogRef.set({
          type: 'defaultVal',
          data: { twoId: '' }
        })
      }
      if (value.templateId && (value.templateId !== oldval.templateId)) {
        this.getTemplate(value.templateId, this)
      }
    },
    getTemplate: _.debounce((templateId, that) => {
      const newSearchQuery = { templateId }
      selectSmsMessageTemplateList(newSearchQuery).then(res => {
        if (res?.code === 0) {
          const { payload: { list }} = res
          if (list && list[0]) {
            that.$refs.dialogRef.set({
              type: 'defaultVal',
              data: { messageContent: list[0].messageContent }
            })
          } else {
            that.$refs.dialogRef.set({
              type: 'defaultVal',
              data: { messageContent: '' }
            })
          }
        }
      })
    }, 500),
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
      console.log('【values】', value);

      newSearchQuery.scenarioName = ''
      newSearchQuery.scenarioId = ''
      newSearchQuery.templateId = ''
      newSearchQuery[value.sceneInfoInputSelectProp] = value.sceneInfoInputSelect

      newSearchQuery.domesticForeign = value.SMSType.length ? value.SMSType[1]?.split('-')?.[0] : ''
      newSearchQuery.messageType = value.SMSType.length ? value.SMSType[1]?.split('-')?.[1] : ''

      newSearchQuery.department = value.departmentInfoInputSelect ? value.departmentInfoInputSelectProp : ''
      newSearchQuery.leader = value.departmentInfoInputSelect

      newSearchQuery.sendTimeStart = value.sendTimeList ? moment(value.sendTimeList[0]).startOf('day').format('YYYYMMDD') : ''
      newSearchQuery.sendTimeEnd = value.sendTimeList ? moment(value.sendTimeList[1]).endOf('day').format('YYYYMMDD') : ''
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

      newSearchQuery.enableStatus = value.enableStatus[0] === '0' ? "0" : ""
      this.searchQuery = { ...newSearchQuery, twoType: undefined }
      this.initParamsAndGetList()
    },
    // 导出场景列表
    download() {
      const { searchQuery, activeIndex } = this
      const newSearchQuery = {
        ...searchQuery,
        businessType: activeIndex
      }
      downLoadSmsScenarioConfigurationList(newSearchQuery)
    },
    getList() {
      const { searchQuery, listQuery, activeIndex } = this
      const newSearchQuery = {
        ...searchQuery,
        businessType: activeIndex,
        pageNum: listQuery.page,
        pageSize: listQuery.limit }
      selectSmsScenarioConfigurationList(newSearchQuery).then(res => {
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

