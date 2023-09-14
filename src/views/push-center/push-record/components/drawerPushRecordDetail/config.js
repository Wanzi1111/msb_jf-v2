import moment from 'moment';

export const push_message = [
  {
    label: 'uid',
    value: '',
    key: 'uid',
  },
  {
    label: '供应商',
    value: '',
    key: 'supplierName',
  },

  {
    label: '消息id',
    value: '',
    key: 'msgId',
  },
  {
    label: '中台模板ID',
    value: '',
    key: 'templateId',
  },
  {
    label: '设备类型',
    value: '',
    key: 'deviceType',
  },
  {
    label: '场景ID',
    value: '',
    key: 'scenarioId',
  },
  {
    label: '业务请求ID',
    value: '',
    key: 'templateId',
  },
  {
    label: '场景名称',
    value: '',
    key: 'scenarioName',
  },
  {
    label: '推送应用',
    value: '',
    key: 'applyName',
  },
  {
    label: '消息标题',
    value: '',
    key: 'templateTitle',
  },
  {
    label: '推送通道',
    value: '',
    key: 'pushChannels',
    span: 2,
  },
  {
    label: '消息内容',
    value: '',
    key: 'messageContent',
    span: 2,
  },
  {
    label: '点击消息打开',
    slot: true,
    name: 'openUrl',
    value: '',
    key: 'openUrl',
    span: 2,
  },
  {
    label: '消息提醒类型',
    value: '',
    key: 'messageType',
    slot: true,
    name: 'messageType',
    span: 2,
  },
]

export const send_info = [
  {
    label: '业务请求时间',
    value: '',
    key: 'requestTime',
    render: (value) => value && moment(+value).format("YYYY-MM-DD HH:mm:ss")
  },
  {
    label: '中台发送时间',
    value: '',
    key: 'sendTime',
    render: (value) => value && moment(+value).format("YYYY-MM-DD HH:mm:ss")
  },
  {
    label: '供应商推送时间',
    value: '',
    key: 'supplierSendTime',
    render: (value) => value && moment(+value).format("YYYY-MM-DD HH:mm:ss")
  },
  {
    label: '返回结果时间',
    value: '',
    key: 'backTime',
    render: (value) => value && moment(+value).format("YYYY-MM-DD HH:mm:ss")
  },
  {
    label: '推送状态',
    value: '',
    key: 'sendStatusName',
    slot: true,
    name: 'status'
  },
  {
    label: '发送设备信息',
    value: '',
    key: 'pushRecordList',
    slot: true,
    name: 'pushRecordList'
  },
]

export const pushRecordList_columns = [
  {
    prop: 'deviceType',
    label: '发送平台',
    align: 'center',
    minWidth: 80
  },
  {
    prop: 'audienceNumber',
    label: '目标数量',
    align: 'center',
    minWidth: 80
  },
  {
    prop: 'sendNumber',
    label: '发送数量',
    align: 'center',
    minWidth: 80
  },

  {
    prop: 'receivedNumber',
    label: '送达数量',
    align: 'center',
    minWidth: 80
  },
  {
    prop: 'clickNumber',
    label: '点击数量',
    align: 'center',
    minWidth: 80
  },
  {
    prop: 'clickRate',
    label: '点击率',
    align: 'center',
    minWidth: 80
  },
]
