const { supplierNameList } = window.baseData

const searchs = [
  {
    prop: 'channelId',
    label: '渠道ID',
    type: 'input',
    attr: {
      size: 'small',
      placeholder: '请输入渠道ID'
    }
  },
  {
    prop: 'channelName',
    label: '渠道名称',
    type: 'input',
    attr: {
      size: 'small',
      placeholder: '请输入渠道名称'
    }
  },
  {
    prop: 'supplierName',
    label: '供应商',
    type: 'select', // 选择器,
    attr: {
      size: 'small',
      placeholder: '全部',
      clearable: true
    },
    options: supplierNameList
  },
  {
    prop: 'isEnable',
    label: '',
    type: 'checkbox', // 选择器,
    defaultVal: ['0'],
    options: [
      { label: '只查看启用', value: '0' }
    ]
  }
]

export {
  searchs
}
