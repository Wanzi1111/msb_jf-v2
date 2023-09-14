export default [
  {
    prop: 'channelName',
    slot: 'channelName',
    label: '渠道信息',
    align: 'left',
    minWidth: 150
  },
  {
    prop: 'requestId',
    slot: 'requestId',
    label: '请求信息',
    align: 'left',
    minWidth: 160
  },
  {
    prop: 'userId',
    slot: 'userId',
    label: '呼叫对象',
    align: 'left',
    minWidth: 150
  },
  {
    prop: 'serviceSubjectType',
    label: '服务主体',
    align: 'left',
    minWidth: 150
  },
  {
    prop: 'ctime',
    label: '呼叫/接通时长(单位:秒)',
    align: 'left',
    minWidth: 200,
    render: (_, text, record) => {
      return !['0', '1'].includes(record.recordStatus) ? `${record.callDuration || '--'} / ${record.onTime || '--'}` : '--'
    }
  },
  {
    action: true,
    prop: 'userEvaluation',
    label: '用户意向',
    name: 'useTag',
    align: 'center',
    minWidth: 120
  },
  {
    action: true,
    prop: 'recordStatus',
    label: '通话状态',
    name: 'tag',
    align: 'center',
    minWidth: 160,
  },
  {
    prop: 'time',
    slot: 'time',
    label: '开始/接通/结束时间',
    width: 200,
    align: 'left',
  },
  {
    action: true,
    name: 'action',
    width: 160,
    prop: 'action',
    label: '操作',
    align: 'center',
    fixed: 'right'
    // disabled: true
  }
]

export const actions = ({ tableAction }) => {
  return {
    useTag: (dat, row, index) => {
      return [
        {
          type: 'tag',
          label: row.userEvaluation || '暂无',
          attr: {
            type: 'warning'
          }
        }
      ]
    },
    tag: (dat, row, index) => {
      const type = ['warning', 'primary', 'success', 'danger', 'primary']
      return [
        {
          type: 'tag',
          label: row.callStatus,
          attr: {
            type: type[+row.recordStatus]
          }
        }
      ]
    },
    action: (dat, row, index) => {
      return [
        {
          type: 'button',
          label: '通话详情',
          click: (dat, row, index) => tableAction(dat, row, index),
          attr: {
            disabled: !!['0', '1'].includes(row.recordStatus),
            size: 'mini',
            icon: 'el-icon-s-operation',
            type: 'default'
          }
        },
      ]
    }
  }
}
