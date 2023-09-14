const { listSupplierNameType } = window.baseData

const searchs = [
  {
    prop: 'signature',
    label: '短信签名',
    type: 'select', // 选择器,
    defaultVal: '',
    layer: 'middle',
    attr: {
      size: 'small',
      placeholder: '全部',
      clearable: true,
      filterable: true,
      'default-first-option': true
    },
    options: []
  },
  {
    prop: 'templateId',
    label: '中台模板ID',
    type: 'select', // 选择器,
    defaultVal: '',
    layer: 'middle',
    attr: {
      size: 'small',
      placeholder: '全部',
      clearable: true,
      filterable: true,
      'default-first-option': true
    },
    options: []
  },
  {
    prop: 'messageContent',
    label: '短信内容',
    type: 'input',
    layer: 'middle',
    attr: {
      size: 'small',
      placeholder: '请输入',
      clearable: true
    }
  },
  {
    prop: 'remark',
    label: '备注',
    type: 'input',
    layer: 'middle',
    attr: {
      size: 'small',
      placeholder: '请输入',
      clearable: true
    }
  },
  {
    prop: 'supplierName',
    label: '供应商',
    type: 'select', // 选择器,
    defaultVal: '',
    layer: 'middle',
    attr: {
      size: 'small',
      placeholder: '全部',
      clearable: true,
      filterable: true,
      'default-first-option': true
    },
    options: [...listSupplierNameType]
  },
]

export {
  searchs
}
