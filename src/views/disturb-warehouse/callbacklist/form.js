const { typeList } = window.baseData
export default [
  {
    prop: 'type',
    label: '业务类型',
    type: 'select',
    defaultVal: '',
    placeholder: '请选择业务类型',
    showAllLevels: false,
    rules: [ // 校验
      { required: true, message: '请选择业务类型！' }
    ],
    attr: {
      filterable: true,
      clearable: true
    },
    options: typeList
  },
  {
    prop: 'ctype',
    label: '业务子类型',
    type: 'select',
    defaultVal: '',
    placeholder: '请选择业务子类型',
    showAllLevels: false,
    rules: [ // 校验
      { required: true, message: '请选择业务子类型！' }
    ],
    attr: {
      filterable: true,
      clearable: true
    },
    options: []
  },
  {
    prop: 'origin',
    label: '数据来源',
    type: 'select', // 选择器,
    defaultVal: '',
    attr: {
      filterable: true,
      clearable: true
    },
    rules: [
      // 校验
      { required: true, message: '请选择数据来源！' }
    ],
    options: []
  },
  {
    prop: 'supplier',
    label: '供应商',
    type: 'select', // 选择器,
    defaultVal: '',
    rules: [
      // 校验
      { required: true, message: '请选择供应商！' }
    ],
    options: []
  },
  {
    prop: 'errorCode',
    label: '状态代码',
    type: 'input',
    rules: [
      // 校验
      { required: true, message: '请输入状态代码！' }
    ],
  },
  {
    prop: 'errorMsg',
    label: '状态注释',
    type: 'textarea',
    defaultVal: '',
    placeholder: '请输入',
    rules: [ // 校验
      { required: true, message: '请输入状态注释！' }
    ]
  },
  {
    prop: 'ignorePeriod',
    label: '解除时间',
    type: 'radio',
    defaultVal: 0,
    placeholder: '请输入',
    rules: [ // 校验
      { required: true, message: '请选择解除时间！' }
    ],
    options: [
      {
        value: 30,
        label: '一个月'
      },
      {
        value: 90,
        label: '三个月'
      },
      {
        value: 0,
        label: '永久'
      },
    ]
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
