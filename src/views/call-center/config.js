const { businessNameLIst } = window.baseData
const TabList = [...businessNameLIst]

const TypeTabList = [
  {
    label: '全部',
    value: 'null',
    key: 'null'
  },
  {
    label: '待处理',
    value: '0',
    key: '0'
  },
  {
    label: '处理中',
    value: '1',
    key: '1'
  },
  {
    label: '呼叫成功',
    value: '2',
    key: '2'
  },
  {
    label: '呼叫失败',
    value: '3',
    key: '3'
  },
  {
    label: '已过滤',
    value: '4',
    key: '4',
  }
]

export {
  TabList,
  TypeTabList
}
