<!--
 * @Author: ZhangYeLei
 * @Date: 2022-03-03 16:35:12
 * @LastEditTime: 2022-04-20 14:38:51
 * @LastEditors: ZhangYeLei
-->
<template>
  <div>
    <el-dialog
      :title="`${type === 'addPushSence' ? '新增' : '编辑'}push模板`"
      :visible.sync="visiable"
      width="520px"
      @close="onDialogClose"
    >
      <div v-loading="loading">
        <basics-form
          ref="formRef"
          class="form"
          :forms="forms"
          :actions="formActions"
          @submitForm="onFormSubmit"
          @changeForm="onFormChange"
        />
      </div></el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import {
  addOrUpdatePushScenarioConfiguration,
  selectPushScenarioTypeList,
  selectPushMessageTemplateList
} from '@/api/push-center/index'
import forms, { formActions } from './form';

export default {
  name: 'DialogAddPushSence',
  props: {
    handleDialogVis: {
      type: Function,
      default: () => {}
    },
    dialogData: {
      type: Object,
      default: () => ({})
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visiable: true,
      forms,
      formActions: formActions(),
      twoTypeList: []
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    ...mapState((['pushCenter'])),
    loading() {
      const { loadings } = this
      return loadings._ums_api_sms_api_push_selectPushScenarioTypeList ||
        loadings._ums_api_sms_api_push_addOrUpdatePushScenarioConfiguration ||
        loadings._ums_api_sms_api_push_selectPushMessageTemplateList
    }
  },
  async mounted() {
    this.$nextTick(() => {
      if (this.type === 'editPushSence') {
        this.handleEditScene()
      }
    })
  },
  methods: {
    // 获取分类列表 一级parentId为0
    async getTypeList(id) {
      const res = await selectPushScenarioTypeList({ pageNum: 1, pageSize: 9999, parentId: id })
      res.payload?.list.forEach(v => {
        v.label = v.typeName
        v.value = v.id
      })
      return res.payload.list
    },
    // 编辑回显
    handleEditScene() {
      const { dialogData } = this
      console.log('【this.row】', this.dialogData);
      this.$refs.formRef.recoveryForm({
        ...dialogData,
        departmentId: dialogData.departmentId + '',
        oneTypeId: dialogData.oneTypeId + '',
        twoTypeId: dialogData.twoTypeId + '',
        businessType: dialogData.businessType + ''
      })
    },
    onDialogClose(ifRefreshList) {
      this.$emit('handleDialogVis', '', '', ifRefreshList)
    },
    onFormSubmit(values) {
      console.log('【newValues】', values);
      const { twoTypeList, pushCenter: { typeList }, dialogData: { id }} = this
      let payload = { ...values }
      if (this.type === 'editPushSence') {
        payload.id = id
      }
      payload = {
        ...payload,
        oneType: typeList.filter(v => v.id === payload.oneTypeId)?.[0].typeName,
        twoType: twoTypeList.filter(v => v.id === payload.twoTypeId)?.[0].typeName,
      }
      addOrUpdatePushScenarioConfiguration(payload)
        .then(() => {
          this.$message.success(`${this.type === 'addPushSence' ? '新增' : '编辑'}模板成功～`)
          this.onDialogClose(true)
        })
    },
    async onFormChange(newValues, oldValues) {
      // 业务线与科目联动
      if (newValues.businessType && newValues.businessType !== oldValues.businessType) {
        const oneTypeList = this.pushCenter.typeList.filter(v => v.businessType === ~~newValues.businessType && v.parentId === 0)
        if (!oneTypeList.length) {
          this.$message.warning('该业务线下暂无科目，请先配置场景分类～')
          return
        }
        this.$nextTick(() => {
          this.$refs.formRef.set({
            type: 'options',
            data: {
              oneTypeId: oneTypeList
            }
          })
          // this.$refs.formRef.set({
          //   type: 'defaultVal',
          //   data: {
          //     oneTypeId: '',
          //     twoTypeId: ''
          //   }
          // })
        })
      }
      // 科目与分类 联动
      if (newValues.oneTypeId && newValues.oneTypeId !== oldValues.oneTypeId) {
        // const parentId = this.pushCenter.typeList.filter(v => v.id === newValues.oneTypeId)[0]?.parentId
        const twoTypeList = await this.getTypeList(newValues.oneTypeId)
        if (!twoTypeList.length) {
          this.$message.warning('该科目下暂无分类，请先配置场景分类～')
          return
        }
        this.twoTypeList = twoTypeList
        this.$nextTick(() => {
          this.$refs.formRef.set({
            type: 'options',
            data: {
              twoTypeId: twoTypeList
            }
          })
          // this.$refs.formRef.set({
          //   type: 'defaultVal',
          //   data: {
          //     twoTypeId: ''
          //   }
          // })
        })
      }
      // 根据中台模板ID动态查询模板内容
      if (newValues.templateId && newValues.templateId !== oldValues.templateId) {
        selectPushMessageTemplateList({ pageNum: 1, pageSize: 1, businessType: 0, templateId: newValues.templateId })
          .then((res) => {
            this.$refs.formRef.set({
              type: 'defaultVal',
              data: {
                remark: res.payload?.list[0]?.messageContent
              }
            })
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  .form-item .el-form-item__label {
    width: 100px !important
  }
}
</style>
