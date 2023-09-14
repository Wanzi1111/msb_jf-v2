<!--
 * @Author: ZhangYeLei
 * @Date: 2022-03-08 11:05:37
 * @LastEditTime: 2022-03-30 18:22:14
 * @LastEditors: ZhangYeLei
-->
<template>
  <div>
    <el-dialog
      :title="`${type === 'addPushSubject' ? '新增' : '编辑'}科目`"
      :visible.sync="visiable"
      width="520px"
      @close="onDialogClose"
    >
      <basics-form
        ref="formRef"
        class="form"
        :forms="forms"
        :loading="loadings._ums_api_sms_api_messagePlatForm_addOrUpdateSmsScenarioConfiguration"
        :actions="formActions"
        @submitForm="onFormSubmit"
        @changeForm="onFormChange"
      />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { addOrUpdatePushScenarioType } from '@/api/push-center/index'
import forms, { formActions } from './form';

export default {
  name: 'DialogAddPushSubject',
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
      formActions: formActions()
    }
  },
  computed: {
    ...mapGetters(['loadings']),
  },
  mounted() {
    this.$nextTick(() => {
      if (this.type === 'editPushSubject') {
        this.handleEdit()
      }
    })
  },
  methods: {
    handleEdit() {
      this.$refs.formRef.recoveryForm(this.dialogData)
    },
    onDialogClose(ifRefreshList) {
      this.$emit('handleDialogVis', '', '', ifRefreshList)
    },
    onFormSubmit(values) {
      const { dialogData } = this
      values.businessType = dialogData.businessType
      if (this.type === 'editPushSubject') {
        values.parentId = dialogData.parentId
        values.id = dialogData.id
      } else {
        values.parentId = 0
      }
      addOrUpdatePushScenarioType({ ...values })
        .then(() => {
          this.$message.success(`${this.type === 'editPushSubject' ? '编辑' : '新增'}科目成功～`)
          this.onDialogClose(true)
        })
    },
    onFormChange(newValues, oldValues) {},
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
