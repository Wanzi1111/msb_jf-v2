import moment from 'moment'
export default [
  {
    prop: 'utime',
    label: '日期',
    align: 'left',
    width: 160,
    render: (h, dat, row, index) => moment(+dat).format("YYYY/MM/DD HH:mm:ss")
  },
  {
    prop: 'operateName',
    label: '操作人',
    align: 'left',
  },
  {
    prop: 'operation',
    slot: 'operation',
    label: '变更内容',
    align: 'left'
  }
]

