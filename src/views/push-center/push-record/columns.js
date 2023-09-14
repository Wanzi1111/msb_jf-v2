/*
 * @Author: ZhangYeLei
 * @Date: 2022-03-30 18:24:28
 * @LastEditTime: 2022-05-17 15:35:21
 * @LastEditors: ZhangYeLei
 */
import moment from 'moment';
import { statusTypeMap } from './config';

export default [
  {
    prop: 'messageTypeName',
    label: '消息类型',
    align: 'center',
    minWidth: 120
  },
  {
    prop: 'applyName',
    label: '推送应用',
    align: 'center',
    minWidth: 120
  },
  {
    prop: 'twoType',
    label: '分类',
    align: 'center',
    minWidth: 200,
    render: (_, __, row) => `${row.oneType} / ${row.twoType}`
  },
  {
    prop: 'uid',
    label: '发送对象',
    align: 'center',
    minWidth: 160
  },
  {
    prop: 'messageContent',
    label: '模板内容',
    align: 'center',
    minWidth: 200,
    showOverflowTooltip: true
  },
  {
    prop: 'deviceType',
    label: '设备类型',
    align: 'center',
    minWidth: 120
  },
  {
    prop: 'msgId',
    label: '消息id',
    align: 'center',
    minWidth: 160
  },
  {
    prop: 'audienceNumber',
    label: '目标平台数量',
    align: 'center',
    minWidth: 160
  },
  {
    prop: 'receivedNumber',
    label: '目标送达数量',
    align: 'center',
    minWidth: 160
  },
  {
    prop: 'sendTime',
    label: '发送时间',
    align: 'center',
    minWidth: 160,
    render: (_, data) => data ? moment(+data).format('YYYY-MM-DD HH:mm:ss') : '--'
  },
  {
    prop: 'sendStatusName',
    label: '推送状态',
    align: 'center',
    action: true,
    name: 'status',
    minWidth: 120
  },
  {
    prop: 'clickNumber',
    label: 'PV',
    align: 'center',
    minWidth: 80
  },
  {
    action: true,
    name: 'action',
    width: 100,
    label: '操作',
    align: 'center',
    fixed: 'right'
  }
]

export const tableActions = ({ handleTableAction }) => {
  return {
    status: (_, row) => {
      return [{
        type: 'tag',
        label: row.sendStatusName,
        attr: {
          type: statusTypeMap[~~row.sendStatus],
        }
      }]
    },
    action: () => {
      return [
        {
          type: 'button', // 按钮
          label: '详情',
          click: (_, row) => handleTableAction('detail', row),
          attr: {
            icon: 'el-icon-view',
            size: 'mini',
            // plain: true
          },
        }
      ]
    }
  }
}
