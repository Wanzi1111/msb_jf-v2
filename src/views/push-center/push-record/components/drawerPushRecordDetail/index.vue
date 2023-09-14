<!--
 * @Author: ZhangYeLei
 * @Date: 2022-03-30 18:24:28
 * @LastEditTime: 2022-05-30 14:23:01
 * @LastEditors: ZhangYeLei
-->
<template>
  <div>
    <el-drawer
      title="push详情"
      :visible.sync="vis"
      :size="700"
      @close="handleClose"
    >
      <div style="padding: 0 20px">
        <el-divider content-position="left">用户信息</el-divider>
        <basics-descriptions :column="2" :config="push_message">
          <template slot="openUrl" slot-scope="scope">
            <el-link style="margin-top: -2px" :href="scope.item.value.openUrl" target="_blank">{{ scope.item.value.openUrl }}</el-link>
          </template>
          <template slot="messageType" slot-scope="scope">
            <el-tag v-for="v in scope.item.value.remindType" :key="v" style="margin-right: 5px">
              {{ v }}
            </el-tag>
          </template>
        </basics-descriptions>
        <el-divider content-position="left">发送情况</el-divider>
        <basics-descriptions :column="1" :config="send_info">
          <template slot="status" slot-scope="scope">
            <el-tag :type="scope.item.tagType">{{ scope.item.value }}</el-tag>
          </template>
          <template slot="pushRecordList" slot-scope="scope">
            <basics-table
              :columns="pushRecordList_columns"
              :list="scope.item.value"
            />
          </template>
        </basics-descriptions>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { push_message, send_info, pushRecordList_columns } from './config';
import { statusTypeMap } from '../../config';

export default {
  name: 'DrawerPushRecordDetail',
  components: {},
  props: {
    rowData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      vis: true,
      push_message,
      send_info,
      pushRecordList_columns
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    ...mapState(['pushCenter'])
  },
  watch: {},
  mounted() {
    const { rowData, push_message, send_info, pushCenter: { dincMap: { listAndroidRemindType_map }}} = this;
    [push_message, send_info].forEach(val => {
      this[val] = val.map(v => {
        v.value = rowData[v.key]
        if (['openUrl', 'messageType'].includes(v.key)) {
          let messageConfig = JSON.parse(rowData['messageConfig'])
          messageConfig = {
            ...messageConfig,
            remindType: messageConfig?.remindType?.split(',').map(v => listAndroidRemindType_map[v]),
          }
          v.value = messageConfig
        } else if (v.key === 'sendStatusName') {
          v.tagType = statusTypeMap[+rowData['sendStatus']]
        } else if (v.key === 'pushRecordList') {
          v.value.forEach(val => {
            val.clickRate = (val.receivedNumber === 0 ? 0 : parseInt(val.clickNumber / val.receivedNumber)) + '%'
          })
        }
        return v
      })
    })
  },
  methods: {
    handleClose() {
      this.$emit('handleDialogVis', '',)
    },
  }
}
</script>

<style lang='scss' scoped>
</style>
