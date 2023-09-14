const { listSupplierNameType, listBusinessType } = window.baseData

const TabList = [
  {
    label: '全部',
    value: 'null',
    key: 'null'
  }, ...listSupplierNameType]

const SMSTabList = [
  {
    label: '全部',
    value: '0',
    key: '0'
  },
  {
    label: '短信通知',
    value: '0-0',
    key: '0-0'
  },
  {
    label: '营销短信',
    value: '0-1',
    key: '0-1'
  },
  {
    label: '验证码短信',
    value: '0-2',
    key: '0-2'
  },
  {
    label: '国际短信',
    value: '1',
    key: '1',
    children: [
      {
        label: '短信通知',
        value: '1-0',
        key: '1-0',
      },
      {
        label: '营销短信',
        value: '1-1',
        key: '1-1',
      },
      {
        label: '验证码短信',
        value: '1-2',
        key: '1-2',
      }
    ]
  }
]

const BusinessTabList = [...listBusinessType]

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
    label: '发送成功',
    value: '2',
    key: '2'
  },
  {
    label: '发送失败',
    value: '3',
    key: '3'
  },
  {
    label: '勿扰过滤',
    value: '4',
    key: '4',
  },
  {
    label: '频次过滤',
    value: '5',
    key: '5',
  },
  {
    label: '异常过滤',
    value: '6',
    key: '6',
  }
]

export {
  TabList,
  SMSTabList,
  BusinessTabList,
  TypeTabList
}
