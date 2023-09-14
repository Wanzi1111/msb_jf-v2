<template>
  <div>
    <el-dialog
      title="title"
      :visible.sync="visiable"
      width="520px"
      @close="onDialogClose"
    >
      <basics-form
        ref="formRef"
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
// import { downloadBatchTransferTemplete } from '@/api/express/manage'
import forms, { formActions } from './form';

export default {
  name: 'DialogAddPushSence',
  props: {
    handleDialogVis: {
      type: Function,
      default: () => {}
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
    console.log('【11】', 11);
  },
  methods: {
    onDialogClose(ifRefreshList) {
      this.$emit('handleDialogVis', '', '', ifRefreshList)
    },
    onFormSubmit(values) {},
    onFormChange(newValues, oldValues) {},
  }
}
</script>
