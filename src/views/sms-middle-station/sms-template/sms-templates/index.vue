<template>
  <div class="app-container">
    <div class="home-top">
      <basics-title
        title="批量创建模板"
      />
    </div>
    <div class="home-content">
      <div class="home-content-alt">
        <p>注意：</p>
        <p>如批量上传营销短信，创蓝供应商需要手动选择退订消息；</p>
        <p>阿里云供应商无需手动配置退订消息，系统将默认选中“退订回T”；</p>
        <p>腾讯云和金山云供应商需要在模版内容中手动添加“回TD退订”等字样；</p>
      </div>
      <div>
        <el-button
          type="primary"
          size="middle"
          :loading="loadings._ums_api_sms_api_messagePlatForm_getTemplate" @click="download"
        >下载模板</el-button>
        <el-button type="primary" size="middle" @click="dialog = true">导入模板</el-button>
        <el-button size="middle" @click="Cancel">取消</el-button>
      </div>
    </div>
    <el-dialog
      width="650px"
      :title="'短信模板上传'"
      :visible.sync="dialog"
    >
      <upload
        v-if="dialog"
        ref="upload"
        :upload-api="importTemplate"
        :reason="''"
        tip="支持扩展名：.csv,.xlsx 且不超过1M"
        :media-rules="{
          size: 1,
          type: '.csv,.xlsx',
        }"
      />
      <span slot="footer">
        <el-button size="small" type="primary" @click="enable">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import BasicsTitle from '@/components/BasicsTitle'
import { mapGetters } from 'vuex'
import Upload from './components/Upload'
import { getTemplate, importTemplate } from '@/api/sms-middle-station/sms-template'

export default {
  name: 'SMSTemplates',
  components: { BasicsTitle, Upload },
  data() {
    return {
      dialog: false
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  methods: {
    importTemplate({ file, onUploadProgress }) {
      importTemplate({ file, onUploadProgress }).then(res => {
        if (res.code === 0) {
          this.$message({
            type: 'success',
            message: '上传成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: res.errors
          })
        }
      })
    },
    enable() {
      this.dialog = false
    },
    Cancel() {
      this.$router.back()
    },
    download() {
      getTemplate()
    }
  }
}
</script>
<style lang="scss" scoped>
.home-content {
  height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .home-content-alt {
    width: 100%;
    color: rgb(222,2,33);
  }
}
.home-top, .home-content {
  /deep/ .el-tabs__item {
    font-size: 16px;
  }
  border-radius: 10px;
}
</style>

