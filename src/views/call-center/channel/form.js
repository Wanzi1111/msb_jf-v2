const { businessNameLIst, supplierNameList } = window.baseData

export default [
  {
    prop: 'channelName',
    label: '渠道名称',
    type: 'input',
    defaultVal: '',
    placeholder: '请输入渠道名称',
    rules: [ // 校验
      { required: true, message: '请输入渠道名称！' }
    ]
  },
  {
    prop: 'businessType',
    label: '业务线',
    type: 'select', // 选择器,
    defaultVal: '',
    attr: {
      filterable: true,
      multiple: true,
      disabled: false,
      'collapse-tags': true
    },
    rules: [
      // 校验
      { required: true, message: '请选择业务线！' }
    ],
    options: businessNameLIst
  },
  {
    prop: 'supplierName',
    label: '供应商',
    type: 'select', // 选择器,
    defaultVal: '',
    attr: {
      filterable: true
    },
    rules: [
      // 校验
      { required: true, message: '请选择供应商！' }
    ],
    options: supplierNameList
  },
  {
    prop: 'templateId',
    label: '模板参数',
    type: 'input',
    defaultVal: '',
    placeholder: '请输入已配置的模板参数',
    rules: [ // 校验
      { required: true, message: '请输入已配置的模板参数！' }
    ]
  },
]

export const formActions = (cancel) => {
  return {
    submit: {
      hide: false // 是否显示 默认false
    },
    reset: {
      hide: true
    },
    back: {
      hide: true
    },
    cancel: {
      click: () => cancel(),
      type: 'button',
      label: '取消'
    }
  }
}
