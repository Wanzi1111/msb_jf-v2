<template>
  <div v-loading="loadings._ums_api_sms_api_push_v2_addOrUpdatePushMessageTemplate" class="app-container">
    <basics-form
      ref="formRef"
      class="form"
      :forms="forms"
      :loading="
        loadings._ums_api_sms_api_messagePlatForm_addOrUpdateSmsScenarioConfiguration
      "
      :actions="formActions"
      @submitForm="onFormSubmit"
      @changeForm="onFormChange"
    >
      <template slot="emoji">
        <el-popover
          trigger="hover"
        >
          <div>
            <span v-for="v in emojis" :key="v" style="margin: 0 5px; cursor: pointer;" @click="handleInsetEmoji(v)">{{ v }}</span>
          </div>
          <el-button slot="reference" type="text" style="margin: -20px 0 0 100px">插入表情符</el-button>
        </el-popover>
      </template>
      <template slot="click_open_divider">
        <el-divider content-position="left">点击消息打开</el-divider>
      </template>
      <template slot="message_type_divider">
        <el-divider content-position="left">消息提醒类型</el-divider>
      </template>
    </basics-form>

    <div class="preview-box">
      <preview v-if="previewConfig" :config="previewConfig" />
      <custom-preview v-if="customPreviewConfig" :config="customPreviewConfig" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import moment from 'moment';
import _ from 'lodash';
import BasicsForm from '@/components/BasicsForm';
import { addOrUpdatePushMessageTemplate } from '@/api/push-center/index';
import forms, { formActions } from "./form";
import Preview from './components/preview';
import CustomPreview from './components/customPreview';

export default {
  name: "AddPushTemp",
  components: { BasicsForm, Preview, CustomPreview },
  props: {
    type: {
      type: String,
      default: ""
    },
    editData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      checkList: [],
      emojis: ["😄", "🎉", "🥳", "🤗", "👏", "🌟", "🔥", "✨", "💫", "⭐️", "💥", "☀️", "🌹", "🌻", "💪", "🤩", "😉"],
      vis: true,
      forms,
      formActions: formActions({ handleActions: this.handleActions }),
      previewConfig: null, // 营销、通知消息预览
      customPreviewConfig: null, // 自定义消息预览
    };
  },
  computed: {
    ...mapGetters(["loadings"]),
    ...mapState(["pushCenter"]),
  },
  watch: {},
  mounted() {
    this.$nextTick(() => {
      if (this.$route.query.id) {
        this.handleEdit()
      }
    })
  },
  methods: {
    // 消息类型不同，互斥的表单项很多，联动比较复杂；又有不少的表单项相同，拆成两个form也麻烦。真🐤儿烦
    onFormSubmit(values) {
      let newValues = { ...values }
      const id = this.$route.query.id
      const {
        deviceTypes, openUrl, isSilent, notificationBigImage, notificationBigText, notificationIcon, notificationIconType, notificationStypeType, offLineTime, openType, remindType, silentTime,
        messageType, appMessageType, textImage, textIcon, buttonImage, buttonImageUrl, threadId, threadIdList
      } = values
      // 参数组装
      newValues.messageConfig = {
        deviceTypes: deviceTypes.length ? deviceTypes.join(',') : '',
        remindType: remindType.length ? remindType.join(',') : '',
        openUrl,
        offLineTime,
        openType
      }
      // 通知消息 | 营销消息
      if (+messageType !== 3) {
        newValues.messageConfig = {
          ...newValues.messageConfig,
          isSilent,
          notificationStypeType,
          notificationBigImage,
          notificationBigText,
          notificationIcon,
          notificationIconType,
        }
        newValues = {
          ...newValues,
          threadId: threadId === '0' ? threadId : threadIdList,
        }
        if (silentTime?.length) {
          newValues.messageConfig.silentStartTime = moment(silentTime[0]).unix() - moment().startOf('day').unix()
          newValues.messageConfig.silentEndTime = moment(silentTime[1]).unix() - moment().startOf('day').unix()
        }
        // 去除外层无用参数
        newValues = _.omit(newValues, ['notificationBigImage', 'notificationBigText', 'notificationIcon', 'notificationIconType', 'notificationStypeType', 'threadIdList'])
      // 自定义消息
      } else {
        newValues.messageConfig = {
          ...newValues.messageConfig,
          messageType: appMessageType,
          notificationBigImage: textImage || '',
          notificationIcon: textIcon || '',
          buttonImage: buttonImage === '1' ? buttonImageUrl : '',
        }
        // 去除外层无用参数
        newValues = _.omit(newValues, ['appMessageType', 'textImage', 'textIcon', 'buttonImage', 'buttonImageUrl'])
      }

      if (id) {
        newValues.id = id
      }
      // 去除外层无用参数
      newValues = _.omit(newValues, ['deviceTypes', 'openUrl', 'isSilent', 'offLineTime', 'openType', 'remindType', 'silentTime'])
      // console.log('newValues', newValues);
      // return
      addOrUpdatePushMessageTemplate(newValues)
        .then(() => {
          this.$message.success(`${id ? '编辑' : '新增'}模板成功～`)
          this.$router.push({ path: '/push-center/system-setting/push-templete' })
        })
    },
    onFormChange(newValues, oldValues) {
      console.log('newValues', newValues, oldValues);
      // 通知栏样式 - 大文本 | 大图
      if (newValues.notificationStypeType && newValues.notificationStypeType !== oldValues.notificationStypeType) {
        let visibleObj = { notificationBigText: false, notificationBigImage: false }
        if (newValues.notificationStypeType === '1') {
          visibleObj = { notificationBigText: true, notificationBigImage: false }
        } else if (newValues.notificationStypeType === '2') {
          visibleObj = { notificationBigText: false, notificationBigImage: true }
        }
        this.$refs.formRef.set({
          type: 'visible',
          data: visibleObj
        })
      }
      // 通知图标 - notificationIcon
      if (newValues.notificationIconType && newValues.notificationIconType !== oldValues.notificationIconType) {
        this.$refs.formRef.set({
          type: 'visible',
          data: { notificationIcon: newValues.notificationIconType === '1' }
        })
      }
      // 点击消息打开 - url
      if (newValues.openType && newValues.openType !== oldValues.openType) {
        this.$refs.formRef.set({
          type: 'visible',
          data: { openUrl: ['1', '2'].includes(newValues.openType) }
        })
      }
      // 静默推送 - 静默时间
      if (newValues.isSilent && newValues.isSilent !== oldValues.isSilent) {
        this.$refs.formRef.set({
          type: 'visible',
          data: { silentTime: newValues.isSilent === '1' }
        })
      }
      // 目标平台 - 通知栏样式
      if (newValues.deviceTypes && newValues.deviceTypes !== oldValues.deviceTypes) {
        const disabledBigImg = newValues.deviceTypes.toString() === 'ios'
        this.$refs.formRef.set({
          type: 'options',
          data: { notificationStypeType:
            [
              { label: '默认', value: '0' },
              { label: '大段文本样式', value: '1' },
              { label: '大图片样式', value: '2', disabled: disabledBigImg }
            ]
          }
        })
        if (disabledBigImg && newValues.notificationStypeType === '2') {
          this.$refs.formRef.set({
            type: 'defaultVal',
            data: { notificationStypeType: '0' }
          })
        }
      }
      // 消息角标 - 自定义角标数量 联动
      if (newValues.badgeType && newValues.badgeType !== oldValues.badgeType) {
        this.$refs.formRef.set({
          type: 'visible',
          data: { badge: newValues.badgeType === '1' }
        })
      }
      // 通知栏分组
      if (newValues.threadId && newValues.threadId !== oldValues.threadId) {
        this.$refs.formRef.set({
          type: 'visible',
          data: { threadIdList: newValues.threadId === '1' }
        })
      }

      // 消息类型切换
      if (newValues.messageType && newValues.messageType !== oldValues.messageType) {
        if (+newValues.messageType === 3) {
          this.$refs.formRef.set({
            type: 'visible',
            data: {
              appMessageType: true,
              buttonImage: true,
              threadId: false,
              threadIdList: false,
              badgeType: false,
              badge: false,
              notificationStypeType: false,
              notificationBigText: false,
              notificationBigImage: false,
              notificationIconType: false,
              notificationIcon: false,
              isSilent: false,
              silentTime: false,
              offLineTime: false,
            }
          })
        } else {
          this.$refs.formRef.set({
            type: 'visible',
            data: {
              appMessageType: false,
              textImage: false,
              textIcon: false,
              buttonImage: false,
              buttonImageUrl: false,
              threadId: true,
              badgeType: true,
              isSilent: true,
              offLineTime: true,
              notificationStypeType: true,
              notificationIconType: true,
              // notificationBigText: true,
              // notificationBigImage: true,
            }
          })
        }
      }

      // - * - * - * - * - * - 消息类型为3的横幅消息  - * - * - * - * - * -
      if (+newValues.messageType === 3) {
        // 通知图标
        if (newValues.buttonImage && newValues.buttonImage !== oldValues.buttonImage) {
          this.$refs.formRef.set({
            type: 'visible',
            data: { buttonImageUrl: newValues.buttonImage === '1' }
          })
        }
        // 通知样式
        if (newValues.appMessageType && newValues.appMessageType !== oldValues.appMessageType) {
          this.$refs.formRef.set({
            type: 'visible',
            data: {
              textImage: newValues.appMessageType === 'textImage',
              textIcon: newValues.appMessageType === 'textIcon'
            }
          })
        }
      }
    },
    handleInsetEmoji(v) {
      const formRef = this.$refs.formRef
      const { messageContent } = formRef.form
      this.$refs.formRef.set({
        type: 'defaultVal',
        data: {
          messageContent: messageContent + v
        }
      })
    },
    handleEdit() {
      const editData = this.$route.query
      console.log('editData', editData);
      // 真鸡儿麻烦
      const {
        threadId,
        badgeType,
        messageType,
        messageConfig: {
          deviceTypes, openUrl, isSilent, notificationBigImage, notificationBigText, notificationIcon, notificationIconType, notificationStypeType, offLineTime, openType, remindType, silentStartTime, silentEndTime,
          messageType: appMessageType, buttonImage,
        }
      } = editData
      const formObj = {
        ...editData,
        deviceTypes: deviceTypes?.split(','),
        remindType: remindType?.split(',')?.map(v => ~~v),
        isSilent: +messageType === 3 ? '0' : isSilent + '',
        silentTime: +messageType === 3 ? [] : [moment.unix(moment().startOf('day').unix() + silentStartTime), moment.unix(moment().startOf('day').unix() + silentEndTime)],
        notificationIconType: notificationIconType + '',
        notificationStypeType: notificationStypeType + '',
        offLineTime: offLineTime + '',
        openType: openType + '',
        openUrl,
        notificationBigImage,
        notificationBigText,
        notificationIcon,
        appMessageType,
        buttonImage: buttonImage ? '1' : '0',
        buttonImageUrl: buttonImage || '',
        textImage: appMessageType === 'textImage' ? notificationBigImage : '',
        textIcon: appMessageType === 'textIcon' ? notificationIcon : '',
        threadId: +threadId === 0 ? '0' : '1',
        threadIdList: +threadId !== 0 ? +threadId : '',
        badgeType: badgeType + '',
      }

      this.$refs.formRef.recoveryForm(formObj)

      // 二级联动的表单项、第二级在formChange中不生效。。
      this.$nextTick(() => {
        this.$refs.formRef.set({
          type: 'visible',
          data: {
            textImage: appMessageType === 'textImage',
            textIcon: appMessageType === 'textIcon',
            buttonImageUrl: !!buttonImage
          }
        })
      })

      this.$nextTick(() => {
        this.handleActions('upPreview')
      })
    },
    handleActions(type) {
      if (type === 'upPreview') {
        const froms = this.$refs.formRef.getFormValues()
        const { notificationStypeType, templateTitle, messageContent, notificationIcon, notificationBigText, notificationBigImage,
          buttonImage, appMessageType, textImage, textIcon, buttonImageUrl
        } = froms
        const config = { templateTitle, messageContent }
        if (+froms.messageType !== 3) {
          if (notificationStypeType === '1') {
            config.notificationBigText = notificationBigText
          } else if (notificationStypeType === '2') {
            config.notificationBigImage = notificationBigImage
          }
          config.notificationIcon = notificationIcon
          this.previewConfig = config
          this.customPreviewConfig = null
        } else {
          if (+buttonImage === 1) config.buttonImageUrl = buttonImageUrl
          if (appMessageType === 'textImage') config.textImage = textImage
          if (appMessageType === 'textIcon') config.textIcon = textIcon
          this.customPreviewConfig = config
          this.previewConfig = null
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  position: relative;
  .preview-box {
    position: absolute;
    top: 200px;
    right: 60px;
    z-index: 1;
  }
  /deep/ .el-form-item__label {
      display: flex;
      width: 98px !important;
      margin-right: 10px;
      align-items: center;
      justify-content: flex-end;
      align-self: flex-start;
      line-height: 1.3;
      min-height: 36px;
      vertical-align: middle;
      flex-shrink: 0;
    }
  .ios-message-box {
    display: flex;
    justify-content: space-between;
  }
}
</style>
