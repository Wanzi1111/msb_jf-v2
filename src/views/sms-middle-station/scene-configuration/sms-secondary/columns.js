import moment from 'moment'
export default [
  {
    prop: 'resDate',
    label: '日期',
    align: 'left',
    render: (h, dat, row, index) => moment(dat).format("YYYY-MM-DD")
  },
  {
    prop: 'arriveLever',
    slot: 'arriveLever',
    sortable: 'custom',
    headerSlot: 'arriveLeverHeader',
    label: '请求到达率',
    align: 'left',
    width: 150
  },
  {
    prop: 'sendLever',
    slot: 'sendLever',
    sortable: 'custom',
    headerSlot: 'sendLeverHeader',
    label: '发送到达率',
    align: 'left',
    width: 150
  },
  {
    prop: 'businessNumber',
    slot: 'businessNumber',
    headerSlot: 'businessNumberHeader',
    label: '业务请求量',
    align: 'left',
    width: 120
  },
  {
    prop: 'allErrNumber',
    slot: 'allErrNumber',
    headerSlot: 'allErrNumberHeader',
    label: '过滤量',
    align: 'left',
    width: 120
  },
  {
    prop: 'errNumber',
    label: '异常过滤',
    align: 'left'
  },
  {
    prop: 'frequencyNumber',
    label: '频次过滤',
    align: 'left'
  },
  {
    prop: 'disturbNumber',
    label: '勿扰过滤',
    align: 'left'
  },
  {
    prop: 'sendNumber',
    label: '发送量',
    sortable: 'custom',
    align: 'left'
  },
  {
    prop: 'sucessNumber',
    label: '成功量',
    sortable: 'custom',
    align: 'left'
  },
  {
    prop: 'failNumber',
    label: '失败量',
    sortable: 'custom',
    align: 'left'
  },
  {
    prop: 'allLengthNumber',
    slot: 'allLengthNumber',
    sortable: 'custom',
    headerSlot: 'allLengthNumberHeader',
    label: '计费条数',
    align: 'left',
    width: 140
  },
]

