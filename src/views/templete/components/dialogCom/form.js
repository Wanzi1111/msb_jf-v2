export default [
  {
    prop: 'domesticForeign',
    label: '场景名称',
    type: 'input', // 选择器,
    rules: [
      { required: true, message: '请输入场景名称！' }
    ],
  },
  {
    prop: 'messageType',
    label: '业务线',
    type: 'select', // 选择器,
    rules: [
      // 校验
      { required: true, message: '请选择业务线！' }
    ],
    attr: {
      clearable: true
    },
    options: []
  },
  {
    prop: 'supplierName',
    label: '科目',
    type: 'select',
    defaultVal: '',
    rules: [
      // 校验
      { required: true, message: '请选择业务线！' }
    ],
    attr: {
      clearable: true
    },
    options: []
  },
  {
    prop: 'remark',
    label: '模板内容',
    type: 'textarea',
    defaultVal: '',
    attr: {
      placeholder: '请输入'
    }
  }
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
