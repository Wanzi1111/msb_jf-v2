// const { listBusinessType } = window.baseData

export default [
  // {
  //   prop: 'scenarioId',
  //   slot: 'scenarioId',
  //   label: '场景信息',
  //   align: 'left',
  //   width: 150
  // },
  // {
  //   prop: 'businessName',
  //   label: '业务线',
  //   align: 'left',
  //   width: 150,
  //   render: (h, dat, row, index) => listBusinessType.find(i => i.value === dat)?.label || '-'
  // },
  // {
  //   prop: 'oneType',
  //   label: '一级分类',
  //   align: 'left',
  //   width: 150
  // },
  // {
  //   prop: 'twoType',
  //   label: '二级分类',
  //   align: 'left',
  //   width: 150,
  //   render: (h, dat, row, index) => dat || '-'
  // },
  {
    prop: 'SMSType',
    slot: 'SMSType',
    label: '短信类型',
    align: 'left',
    width: 180,
    fixed: 'left'
  },
  {
    prop: 'uid',
    slot: 'uid',
    label: '发送对象',
    align: 'left',
    width: 280,
    fixed: 'left'
  },
  {
    prop: 'messageContent',
    slot: 'messageContent',
    label: '短信内容',
    align: 'left',
    width: 400
  },
  {
    prop: 'numberWords',
    slot: 'numberWords',
    label: '字数/拆分条数',
    align: 'left',
    width: 120
  },
  {
    prop: 'sendTime',
    slot: 'sendTime',
    label: '发送时间',
    align: 'left',
    width: 160
  },
  {
    action: true,
    prop: 'messageStatus',
    label: '短信状态',
    name: 'tag',
    align: 'center',
    minWidth: 300
  },
  {
    action: true,
    name: 'action',
    width: 120,
    prop: 'action',
    label: '操作',
    align: 'center',
    fixed: 'right'
  }
]

export const actions = ({ tableAction }) => {
  return {
    tag: (dat, row, index) => {
      const type = ['primary', 'primary', 'success', 'danger', 'warning', 'warning', 'warning']
      return [
        {
          type: 'tooltip',
          label: row.messageStatus,
          tooltip: row.sendStatus === '3' ? row.sendCode : '',
          attr: {
            type: type[+row.sendStatus]
          }
        },
        {
          type: 'tips',
          label: row.failReason,
          class: 'el-icon-warning-outline'
        }
      ]
    },
    action: (dat, row, index) => {
      return [
        {
          type: 'button',
          label: '短信详情',
          click: (dat, row, index) => tableAction(dat, row, index),
          attr: {
            size: 'mini',
            icon: 'el-icon-s-operation',
            type: 'default'
          }
        },
      ]
    }
  }
}
