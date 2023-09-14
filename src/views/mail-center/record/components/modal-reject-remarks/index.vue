<template>
  <el-dialog :title="modalData.title" :visible="true" width="720px" @close="handleModalVis">
    <mail-template :temp-data="modalData" />
  </el-dialog>
</template>

<script>

import { mapGetters } from 'vuex'
import forms, { formActions } from './form'
import MailTemplate from './mail-template.vue'

export default {
  name: 'ModalRejectRemarks',
  components: { MailTemplate },
  props: {
    modalData: {
      type: Object,
      default: () => ({})
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      forms,
      formActions
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  methods: {
    onFormChange(newVal, oldVal) {
      if (newVal.rejectRadio !== oldVal.rejectRadio) {
        if (newVal.rejectRadio === '其他') {
          this.$refs.formRef.set({
            type: 'visible',
            data: {
              textarea: true
            }
          })
        } else {
          this.$refs.formRef.set({
            type: 'visible',
            data: {
              textarea: false
            }
          })
        }
      }
    },
    handleModalVis(vis, refresh) {
      this.$emit('handleModalVis', vis, refresh || false)
    },
    onFormSubmit(values) {
      const audit_comment = values.rejectRadio === '其他' ? values.textarea : values.rejectRadio
      const { data: { id }} = this
      if (!audit_comment) {
        this.$message.error('请选择或填写审核备注！')
        return
      }

      // checkAudit({ id, status: 2, audit_comment }).then(res => {
      //   if (res?.code === 0) {
      //     this.$message.success('驳回成功～')
      //     this.handleModalVis(false, true)
      //   }
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.mial-title {
  font-size: 16px;
}
</style>
