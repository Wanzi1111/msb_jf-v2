const init_pagination = {
  page: 1,
  limit: 20
}

const businessTabList = [
  {
    label: '美术宝',
    value: '0'
  },
]

const tabList = [
  {
    label: '全部',
    value: 'all',
    key: 'total',
    type: 'primary'
  },
  {
    label: '处理中',
    value: '0',
    key: 'untreated',
    type: 'info'
  },
  {
    label: '发送成功',
    value: '1',
    key: 'pass',
    type: 'success'
  },
  {
    label: '发送失败',
    value: '2',
    key: 'noPass',
    type: 'danger'
  }
]
export {
  init_pagination,
  businessTabList,
  tabList
}
