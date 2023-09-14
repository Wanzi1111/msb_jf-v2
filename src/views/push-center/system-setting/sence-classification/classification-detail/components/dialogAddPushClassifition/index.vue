<!--
 * @Author: ZhangYeLei
 * @Date: 2022-03-08 14:33:54
 * @LastEditTime: 2022-04-01 10:09:26
 * @LastEditors: ZhangYeLei
-->
<template>
  <div>
    <el-dialog
      :title="`${type === 'addPushSubject' ? '新增' : '编辑'}分类`"
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
  name: 'DialogAddPushClassifition',
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
      this.handleEcho()
    })
  },
  methods: {
    onDialogClose(ifRefreshList) {
      this.$emit('handleDialogVis', '', '', ifRefreshList)
    },
    onFormSubmit(values) {
      const { businessType, id: parentId } = this.$route.query
      const params = { businessType, parentId, typeName: values.typeName }
      if (this.type === 'editPushClassifition') {
        const { dialogData: { id }} = this
        params.id = id
      }
      addOrUpdatePushScenarioType(params)
        .then(() => {
          this.$message.success(`${this.type === 'editPushClassifition' ? '编辑' : '新增'}分类成功～`)
          this.onDialogClose(true)
        })
    },
    handleEcho() {
      const { title } = this.$route.query
      const obj = { oneTypeName: title }
      if (this.type === 'editPushClassifition') {
        obj.typeName = this.dialogData.typeName
      }
      this.$refs.formRef.set({
        type: 'defaultVal',
        data: obj
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
