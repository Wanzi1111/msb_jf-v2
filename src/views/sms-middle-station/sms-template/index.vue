<template>
  <div>
    <router-view />
    <div v-show="$route.path === '/sms-middle-station/configure/sms-template'" class="app-container">
      <div class="home-top">
        <basics-title
          title="短信模板"
          :actions="[{
            type: 'button', // 按钮
            label: '批量新增短信模板',
            click: addModels,
            attr: {
              type: 'info',
              plain: true,
              size: 'mini',
              icon: 'el-icon-plus'
            }
          },{
            type: 'button', // 按钮
            label: '新增短信模板',
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
          :actions="SMSTabList"
          :active-index="activeIndex"
          :handle-select="activeIndexChange"
        />
      </div>
      <div class="home-content">
        <basics-search
          ref="searchs"
          :loading="loadings._ums_api_sms_api_messagePlatForm_selectSmsMessageTemplateList"
          :searchs="searchs"
          @submitSearch="submitSearch"
        />
        <basics-table
          ref="table"
          :table="table"
          :loading="loadings._ums_api_sms_api_messagePlatForm_selectSmsMessageTemplateList"
          :list="list"
          :get-list="getList"
          :columns="columns"
          :total="total"
          :list-query="listQuery"
          :action-function="actionFunction"
          @sort-change="sortChange"
        >
          <template slot="templateId" slot-scope="scope">
            <div class="table-blue-title">{{ scope.row.templateId }}</div>
            <div>{{ scope.row.ctime | timeFormat }}</div>
          </template>
          <template slot="signature" slot-scope="scope">
            <div class="table-blue-title">【{{ scope.row.signature }}】</div>
          </template>
          <template slot="messageContent" slot-scope="scope">
            <el-tooltip v-if="scope.row.messageContent" effect="dark" :content="scope.row.messageContent" placement="top">
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
          <template slot="numberWords" slot-scope="scope">
            <div>{{ scope.row.numberWords }}/{{ scope.row.apartSize }}</div>
          </template>
        </basics-table>
      </div>
      <el-dialog
        width="650px"
        :title="['edit','add'].includes(actionType) ? `${ actionType === 'add' ? '新增模板' : '编辑' }` : ''"
        :visible.sync="dialog"
      >
        <basics-form
          v-if="['edit','add'].includes(actionType)"
          ref="dialogRef"
          :key="dialog"
          :forms="forms"
          :loading="loadings._ums_api_sms_api_messagePlatForm_addOrUpdateSmsMessageTemplate"
          class="form-item"
          :actions="formActions(cancelForm)"
          @submitForm="onFormSubmit"
          @changeForm="changeNewForm"
        >
          <template v-if="!(form.form.supplierName === '5' && form.form.messageType === '1' && form.form.domesticForeign === '1')" slot="Tips" slot-scope="form">
            <p style="color: rgb(222,2,33)"> 注意：</p>
            <!-- 创蓝 -->
            <p v-if="form.form.supplierName === '4'">* 当前模板不支持emoji表情</p>
            <div v-if="form.form.supplierName === '4' && form.form.domesticForeign === '0'">
              <p>* 签名只能选择审核过的签名，内容首尾不能添加【】。</p>
              <p>* 内容合法，不能发送房产、发票、移民等国家法律法规严格禁止的内容</p>
              <p>* 链接地址请写在短信内容中，便于核实，部分安卓系统存在链接识别问题，需在链接前后添加空格</p>
              <p>* 变量用{s数字}代替，数字代表变量最大长度，视情况填写任意数值。例，亲爱的{s6} 先生/女士。则变量位置最多填入六位昵称，超过六位则无法发送。短信发送时根据顺序依次替换为变量内容</p>
              <p>计费规则</p>
              <p>{{ `* 短信字数${tip}=70个字，按照70个字一条短信计算。中文英文符号统一计算为一个字符。` }}</p>
              <p>* 短信字数>70个字，占用3个字符作为分条字符，按照67个字记为一条短信计算</p>
            </div>
            <div v-if="form.form.supplierName === '4' && form.form.domesticForeign === '1'">
              <p>* 国际短信WEB模块支持国内+国际短信发送。</p>
              <p>* 国际号码必须添加对应国家的区域号，例如中国号码86138****1234，86为中国区号。</p>
              <p>* 发送中国号码段时，内容合法，不能发送房产、发票、移民等国家法律法规严格禁止的内容。</p>
              <p>* 超链接地址请写在短信内容中，便于核实，部分安卓系统存在超链接识别问题，需在超链接前后添加空格。</p>
              <p>* 变量用{s数字}代替，数字代表变量最大长度，视情况填写任意数值。例，亲爱的{s6} 先生/女士。则变量位置最多填入六位昵称，超过六位则无法发送。短信发送时根据顺序依次替换为变量内容</p>
            </div>
            <!-- 腾讯云 -->
            <!-- 营销 -->
            <p v-if="form.form.supplierName === '7' && form.form.messageType === '1'">* 营销类短信，请在短信内容后面增加“回T退订”</p>
            <p v-if="form.form.supplierName === '7'">* 短信模板内容不能含有【】符号</p>
            <div v-if="form.form.supplierName === '7'">
              <p>* 禁止发送金融相关的所有内容（验证码、系统通知和营销短信），禁止发送房产、移民政治、色情暴力等违法短信</p>
              <p>* 不允许将链接设置为变量（包含短链接），例如www.1.com</p>
            </div>
            <div v-if="form.form.supplierName === '7' && form.form.domesticForeign === '0'">
              <p>计费规则</p>
              <p>* 短信字数含"签名+模版内容+变量内容”，短信70个字数含以内，按1条短信计费；超出70个字为长短信，占用3个字符作为分条字符，按照67个字数记为1条短信费用</p>
              <p>* 短信总长度（含签名和变量的实际取值）最长不超过500字，汉字、字母、数字、标点符号（不区分全角/半角）以及空格等都按1个字计</p>
            </div>
            <!-- 阿里云 -->
            <!-- 国内营销 -->
            <div v-if="form.form.supplierName === '6' && form.form.messageType === '1' && form.form.domesticForeign === '0'">
              <p>* 营销短信及群发助手不支持加变量</p>
              <p>* 营销短信建议在结尾加上空格或其他字符，便于区分营销内容</p>
            </div>
            <p v-if="form.form.supplierName === '6' && form.form.domesticForeign === '1'">* 不能向国际/港澳台地区发送推广类消息</p>
            <p v-if="form.form.supplierName === '6' && form.form.messageType === '2' && form.form.domesticForeign === '0'">{{ `* 验证码模板只支持验证码作为变量；变量替换值${tip}=6位数字或字母` }}</p>
            <!-- 国内非营销 -->
            <div v-if="form.form.supplierName === '6' && form.form.domesticForeign === '0'">
              <p>* 不能发送营销/贷款/借款/中奖/抽奖类短信,不支持金融理财&房产通知类短信(验证码除外)</p>
              <p>计费规则</p>
              <p>* 短信字数含"签名+模版内容+变量内容”，短信70个字数含以内，按1条短信计费；超出70个字为长短信，按照67个字数记为1条短信费用</p>
              <p>* 汉字、字母、数字、符号（不区分全角和半角），都按照一个字计算</p>
            </div>
            <!-- 金山云 -->
            <!-- 金山云国内营销 -->
            <p v-if="form.form.supplierName === '5'">* 营销类短信，请在短信内容后面增加“回TD退订”字样</p>
            <!-- 金山云国内外 -->
            <p v-if="form.form.supplierName === '5'">* 短信模版内容不能含有【】[]符号</p>
            <!-- 金山云国内营销 -->
            <p v-if="form.form.supplierName === '5'">* 营销短信不允许有变量</p>
            <p v-if="form.form.supplierName === '5'">* 禁止发送金融相关的所有内容（验证码、系统通知和营销短信），禁止发送房产、移民政治、色情暴力等违法短信</p>
            <!-- 金山云国内计费 -->
            <div v-if="form.form.supplierName === '5' && form.form.domesticForeign === '0'">
              <p>计费规则</p>
              <p>* 短信总长度（含签名和变量的实际取值）最长不超过450字，汉字、字母、数字、标点符号（不区分全角/半角）以及空格等都按1个字计</p>
              <p>* 短信长度（签名+正文）不超过70字时，按照1条短信计费</p>
              <p>* 超过70字即为长短信时，占用3个字符作为分条字符，按67字/条分隔成多条计费</p>
            </div>
            <!-- 通用国外 -->
            <div v-if="form.form.domesticForeign === '1'">
              <p>纯英文短信计费规则</p>
              <p>* 个别特殊字符按2个字计算</p>
              <p>* 当短信长度不超过160字时，按照1条短信计费。超过160字时为长短信，按153字/条分隔成多条计费</p>
              <p>非纯英文短信计费规则</p>
              <p>* 短信字数含"签名+模版内容+变量内容”，短信70个字数含以内，按1条短信计费；超出70个字为长短信，占用3个字符作为分条字符，按照67个字数记为1条短信费用</p>
              <p>* 短信总长度（含签名和变量的实际取值）最长不超过500字，汉字、字母、数字、标点符号（不区分全角/半角）以及空格等都按1个字计</p>
            </div>
            <p>更多规则，请前往第三方供应商后台查看</p>
          </template>
        </basics-form>
        <template v-if="!['edit','add'].includes(actionType)">
          <span slot="title" style="font-size: 20px"> <i style="color: rgb(255,163,45)" class="el-icon-warning" />
            {{ actionType === 'audit' ? '审核' : actionType === 'test' ? '启动短信模版测试' : actionType === 'again' ? '继续测试' : '确定删除' }}
          </span>
          <p v-if="['audit','delete'].includes(actionType)" style="font-size: 16px; padding-left: 25px"> {{ actionType === 'audit' ? '请前往第三方供应商后台，通过供应商审核后再进行状态变更！' : '删除后该数据将被移除！' }}  </p>
          <p v-if="['test'].includes(actionType)" style="font-size: 14px; padding-left: 25px; margin-top: 0"> 短信正文:</p>
          <p v-if="['test'].includes(actionType)" style="font-size: 14px; padding-left: 25px; margin-top: 0"> {{ actionObj.messageContent }} </p>
          <p v-if="['again'].includes(actionType)" style="font-size: 14px; padding-left: 25px; margin-top: 0"> 测试短信已发送，是否继续测试 </p>
          <el-form v-if="['test'].includes(actionType)" ref="formTest" label-width="120px" :inline="true" :model="formInline">
            <el-form-item
              style="width: 100%"
              prop="mobile"
              label="测试手机号"
              :rules="validateTaskMobile"
            >
              <el-input v-model="formInline.mobile" style="width: 400px" size="small" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              style="width: 100%"
              prop="area"
              label="区号"
              :rules="[{ required: true, message: '请输入区号', trigger: 'blur' }]"
            >
              <el-input v-model="formInline.area" style="width: 400px" size="small" placeholder="请输入" />
            </el-form-item>
            <el-form-item
              style="width: 100%"
              prop="templateParam"
              label="变量参数"
              :rules="[{ required: true, message: '请输入变量参数', trigger: 'blur' }]"
            >
              <el-input v-model="formInline.templateParam" style="width: 400px" size="small" placeholder="请输入" />
            </el-form-item>
            <p style="margin: 0 0 10px 92px; color: rgb(225,30,53);">注意：如模版中包含多个变量，中间用英文“,”隔开</p>
            <el-form-item style="margin: 0 0 0 200px">
              <el-button size="small" @click="dialog = false">取消</el-button>
              <el-button size="small" type="primary" @click="test">发起测试</el-button>
            </el-form-item>
          </el-form>
          <el-checkbox v-if="actionType === 'audit'" v-model="auditStatus" :loading="auditStatusLoading" style="padding-left: 25px" label="1" @change="auditStatusChange">审核通过</el-checkbox>
          <span v-if="!['test'].includes(actionType)" slot="footer" class="dialog-footer">
            <el-button v-if="['delete'].includes(actionType)" size="small" @click="dialog = false">取 消</el-button>
            <el-button size="small" type="primary" @click="enable">{{ ['delete'].includes(actionType) ? '确 定' : ['again'].includes(actionType) ? '继续测试' : '关 闭' }}</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>

import { SMSTabList } from '../config'
import { searchs } from './search'
import BasicsTitle from '@/components/BasicsTitle'
import BasicsSearch from '@/components/BasicsSearch'
import BasicsMenuTaps from '@/components/BasicsMenuTaps'
import BasicsForm from '@/components/BasicsForm'
import BasicsTable from '@/components/BasicsTable'
import { mapGetters } from 'vuex'
import { selectSmsMessageTemplateList, addOrUpdateSmsMessageTemplate, testTemplte, selectAliTxyunTemplate } from '@/api/sms-middle-station/sms-template'
import columns, { actions } from './columns'
import forms, { formActions } from './form'
import moment from 'moment'
const { listSupplierNameType } = window.baseData

var _ = require('lodash');

const init_pagaination = {
  page: 1,
  limit: 20
}

export default {
  name: 'BlackList',
  components: { BasicsTitle, BasicsSearch, BasicsMenuTaps, BasicsForm, BasicsTable },
  filters: {
    timeFormat(e) {
      return (e !== '0' && e) ? moment(+e).format('YYYY-MM-DD HH:mm:ss') : '-'
    }
  },
  data() {
    const checkMobile = (rule, value, callback) => {
      const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      if (!reg.test(value)) {
        return callback(new Error('请输入正确的手机号'))
      } else {
        return callback()
      }
    }
    return {
      validateTaskMobile: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { required: true, message: '请输入正确的手机号', validator: checkMobile, trigger: 'blur' }
      ],
      formInline: {
        mobile: '',
        templateParam: '',
        area: '+86'
      },
      SMSTabList,
      activeIndex: '0',
      forms,
      formActions,
      dialog: false,
      table: {
        stripe: false,
        border: false
      },
      columns,
      searchs,
      total: 0,
      list: [],
      searchQuery: {
        domesticForeign: '',
        messageType: '',
        signature: '',
        templateId: '',
        messageContent: '',
        remark: "",
        supplierName: '',
        sortType: undefined
      },
      listQuery: { ...init_pagaination },
      actionFunction: actions({
        tableAction: this.tableAction
      }),
      actionObj: null,
      auditStatus: '0',
      auditStatusLoading: false,
      actionType: '',
      isNotice: false,
      isEdit: false
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    tip() { return '<' }
  },
  mounted() {
    this.getSignatureOptions()
    this.$nextTick(() => {
      this.getList()
    })
  },
  methods: {
    getSignatureOptions() {
      const newSearchQuery = {
        pageNum: 1,
        pageSize: 9999 }
      selectSmsMessageTemplateList(newSearchQuery).then(res => {
        if (res?.code === 0) {
          const { payload: { list }} = res
          this.$refs.searchs.set({
            type: 'options',
            data: { signature: list?.reduce((pre, cur) => {
              return pre.find((i) => i.signature === cur.signature)
                ? pre : [...pre, cur]
            }, [])
            .map((item) => {
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
          this.$refs.searchs.set({
            type: 'options',
            data: { templateId: list?.reduce((pre, cur) => {
              return pre.find((i) => i.templateId === cur.templateId)
                ? pre : [...pre, cur]
            }, [])
            .map((item) => {
              return {
                label: item.templateId,
                value: item.templateId,
              } || []
            }) }
          })
          this.$refs.searchs.set({
            type: 'defaultVal',
            data: { templateId: '' }
          })
        }
      })
    },
    activeIndexChange(id) {
      const { searchQuery } = this
      this.activeIndex = id
      const newSearchQuery = { ...searchQuery }
      if (id === '0') {
        newSearchQuery['domesticForeign'] = undefined
        newSearchQuery['messageType'] = undefined
      } else {
        const idArr = id.split('-')
        newSearchQuery['domesticForeign'] = idArr[0]
        newSearchQuery['messageType'] = idArr[1]
      }
      this.searchQuery = { ...newSearchQuery }
      this.initParamsAndGetList()
    },
    cancelForm() {
      this.dialog = !this.dialog
    },
    // 新增短信模板
    addModel() {
      this.actionType = 'add'
      this.dialog = true
    },
    // 批量创建模板
    addModels() {
      this.$router.push({ path: '/sms-middle-station/configure/sms-template/sms-templates' })
    },
    onFormSubmit(values) {
      const newData = { businessType: this.activeIndex, ...(this.actionType === 'edit' ? { id: this.actionObj?.id } : {}), ...values }
      newData.reply = (['6'].includes(values.supplierName) && values.domesticForeign === '0' && values.messageType === '1') ? undefined : values.reply
      addOrUpdateSmsMessageTemplate(newData).then(res => {
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
    changeNewForm(value, oldval) {
      // 切换短信类型 和 供应商类型
      if (value.domesticForeign !== oldval.domesticForeign) {
        if (value.domesticForeign === '0') {
          this.$refs.dialogRef.set({
            type: 'options',
            data: { supplierName: listSupplierNameType }
          })
        }
        if (value.domesticForeign === '1') {
          this.$refs.dialogRef.set({
            type: 'options',
            data: { supplierName: listSupplierNameType.filter(v => v.value === '7') }
          })
        }
      }
      const flag = ((value.domesticForeign !== oldval.domesticForeign) ||
        (value.messageType !== oldval.messageType) ||
        (value.supplierName !== oldval.supplierName))
      if (flag &&
        (value.messageType === '1' && (value.supplierName === '4' || value.supplierName === '6'))
      ) {
        this.$refs.dialogRef.set({
          type: 'attr',
          data: { reply: { disabled: false }}
        })
        this.$refs.dialogRef.set({
          type: 'visible',
          data: { reply: true }
        })
        if (value.supplierName === '6') {
          this.$refs.dialogRef.set({
            type: 'defaultVal',
            data: { reply: '回T退订' }
          })
          this.$refs.dialogRef.set({
            type: 'attr',
            data: { reply: { disabled: true }}
          })
        }
        if (value.supplierName === '4' && value.domesticForeign === '1') {
          this.$refs.dialogRef.set({
            type: 'visible',
            data: { reply: false }
          })
        }
      }
      if (flag &&
        !(value.messageType === '1' && (value.supplierName === '4' || value.supplierName === '6'))
      ) {
        this.$refs.dialogRef.set({
          type: 'visible',
          data: { reply: false }
        })
        this.$refs.dialogRef.set({
          type: 'defaultVal',
          data: { reply: '' }
        })
      }
      if (flag) {
        // console.log(this.isEdit, flag, JSON.stringify(this.$refs.dialogRef.form));
        this.$refs.dialogRef.set({
          type: 'defaultVal',
          data: { messageContent: '' }
        })
        this.$refs.dialogRef.set({
          type: 'attr',
          data: { messageContent: { disabled: false }}
        })
        this.$refs.dialogRef.set({
          type: 'defaultVal',
          data: { supplierTemplateId: '' }
        })
        // 模板内容创蓝提示
        if (value.supplierName === '4') {
          this.$refs.dialogRef.set({
            type: 'noteConfig',
            data: { messageContent: { tips: '请前往第三方供应商后台，采取复制的方式，粘贴模版内容' }}
          })
        } else {
          this.$refs.dialogRef.set({
            type: 'noteConfig',
            data: { messageContent: { tips: '' }}
          })
        }
        // 当是 阿里云 腾讯云的时候 模板内容不支持修改  并且增加 模板ID
        if (value.supplierName && value.domesticForeign && value.messageType && value.supplierName && (value.supplierName === '6' || value.supplierName === '7')) {
          this.$refs.dialogRef.set({
            type: 'visible',
            data: { supplierTemplateId: true }
          })
          this.$refs.dialogRef.set({
            type: 'attr',
            data: { messageContent: { disabled: true }}
          })
          if (this.isEdit) {
            this.isEdit = false
            this.$refs.dialogRef.set({
              type: 'defaultVal',
              data: { supplierTemplateId: this.actionObj.supplierTemplateId }
            })
            this.$refs.dialogRef.set({
              type: 'defaultVal',
              data: { messageContent: this.actionObj.messageContent }
            })
          }
        } else if (value.supplierName && value.domesticForeign && value.messageType && value.supplierName && (value.supplierName === '4' || value.supplierName === '5')) {
          this.$refs.dialogRef.set({
            type: 'visible',
            data: { supplierTemplateId: false }
          })
          this.$refs.dialogRef.set({
            type: 'attr',
            data: { messageContent: { disabled: false }}
          })
          if (this.isEdit) {
            this.isEdit = false
            this.$refs.dialogRef.set({
              type: 'defaultVal',
              data: { messageContent: this.actionObj.messageContent }
            })
          }
        }
      }
      if (value.supplierTemplateId && (value.supplierTemplateId !== oldval.supplierTemplateId)) {
        this.getTemplate(value.supplierTemplateId, value.domesticForeign, value.supplierName, this)
      }
    },
    getTemplate: _.debounce((templateId, domesticForeign, supplierName, that) => {
      const newSearchQuery = { templateId, domesticForeign, supplierName }
      selectAliTxyunTemplate(newSearchQuery).then(res => {
        if (res?.code === 0) {
          const { payload: { messageContent, msg }} = res
          if (messageContent) {
            that.$refs.dialogRef.set({
              type: 'defaultVal',
              data: { messageContent: messageContent }
            })
          } else {
            that.$message({
              type: 'error',
              message: msg
            })
            that.$refs.dialogRef.set({
              type: 'defaultVal',
              data: { messageContent: '' }
            })
          }
        }
      })
    }, 500),
    sortChange({ order }) {
      const { searchQuery } = this
      const newSearchQuery = { ...searchQuery }
      if (order) {
        if (order === 'descending') {
          newSearchQuery.sortType = '1'
        } else {
          newSearchQuery.sortType = '0'
        }
      } else {
        newSearchQuery.sortType = undefined
      }
      this.searchQuery = { ...newSearchQuery }
      this.$nextTick(() => {
        this.getList()
      });
    },
    tableAction(dat, row, index, type) {
      this.actionObj = row
      this.auditStatus = !!+row.auditStatus
      this.actionType = type
      this.$nextTick(() => {
        if (type === 'edit') {
          this.dialog = true
          this.isEdit = true
          this.$nextTick(() => {
            this.$refs.dialogRef.recoveryForm({ ...this.actionObj })
          });
        } else if (type === 'log') {
          this.$router.push({ path: '/sms-middle-station/configure/sms-template/sms-operation-log', query: {
            actionObj: row
          }})
        } else if (['delete', 'audit', 'test'].includes(type)) {
          this.formInline = {
            mobile: '',
            templateParam: '',
            area: '+86'
          }
          this.dialog = true
        }
      });
    },
    test() {
      this.$refs['formTest'].validate((valid, data) => {
        if (valid) {
          testTemplte({
            ...this.formInline,
            messageContent: this.actionObj.messageContent,
            messageType: this.actionObj.messageType,
            signature: this.actionObj.signature,
            supplierName: this.actionObj.supplierName,
            templateId: this.actionObj.templateId
          }).then(res => {
            if (res?.code === 0) {
              this.actionType = 'again'
            }
          })
        } else {
          return false;
        }
      });
    },
    auditStatusChange(e) {
      this.auditStatusLoading = true
      const { auditStatus } = this
      const newData = { id: this.actionObj?.id, auditStatus: +auditStatus + '', }
      addOrUpdateSmsMessageTemplate(newData).then(res => {
        if (res?.code === 0) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.auditStatusLoading = false
          this.$nextTick(() => {
            this.getList()
          })
        }
      })
    },
    enable() {
      if (['again'].includes(this.actionType)) {
        this.actionType = 'test'
        return
      }
      if (['audit', 'test'].includes(this.actionType)) {
        this.dialog = false
        return
      }
      const newData = { id: this.actionObj?.id, delete: "1", }
      addOrUpdateSmsMessageTemplate(newData).then(res => {
        if (res?.code === 0) {
          this.dialog = false
          this.$message({
            type: 'success',
            message: '删除成功'
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
      this.searchQuery = { ...newSearchQuery }
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
      selectSmsMessageTemplateList(newSearchQuery).then(res => {
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
