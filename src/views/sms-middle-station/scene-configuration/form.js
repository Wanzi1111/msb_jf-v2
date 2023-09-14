const { listBusinessType, listDepartment } = window.baseData

export default [
  {
    prop: 'scenarioName',
    label: '场景名称',
    type: 'input',
    defaultVal: '',
    attr: {
      placeholder: '请输入',
      disabled: false,
    },
    rules: [ // 校验
      { required: true, message: '请输入场景名称！' }
    ]
  },
  {
    prop: 'scenarioId',
    label: '场景ID',
    type: 'input',
    noShow: false,
    defaultVal: '',
    attr: {
      placeholder: '请输入',
      disabled: true,
    }
  },
  {
    prop: 'businessType',
    label: '业务线',
    type: 'select',
    defaultVal: '',
    placeholder: '请选择',
    rules: [ // 校验
      { required: true, message: '请选择业务线！' }
    ],
    attr: {
      filterable: true,
      disabled: false,
    },
    options: [...listBusinessType]
  },
  {
    prop: 'oneId',
    label: '科目',
    type: 'select',
    defaultVal: '',
    placeholder: '请选择',
    rules: [ // 校验
      { required: true, message: '请选择' }
    ],
    attr: {
      filterable: true,
      disabled: false,
    },
    options: []
  },
  {
    prop: 'twoId',
    label: '分类',
    type: 'select',
    defaultVal: '',
    placeholder: '请选择',
    rules: [ // 校验
      { required: true, message: '请选择' }
    ],
    attr: {
      filterable: true,
      disabled: false,
    },
    options: []
  },
  {
    prop: 'department',
    label: '归属部门',
    type: 'select',
    defaultVal: '',
    placeholder: '请选择',
    rules: [ // 校验
      { required: true, message: '请选择归属部门！' }
    ],
    attr: {
      filterable: true
    },
    options: [...listDepartment]
  },
  {
    prop: 'leader',
    label: '负责人',
    type: 'input',
    defaultVal: '',
    attr: {
      placeholder: '请输入'
    },
    rules: [ // 校验
      { required: true, message: '请输入负责人！' }
    ]
  },
  // {
  //   prop: 'supplierName',
  //   label: '供应商',
  //   type: 'select',
  //   defaultVal: '',
  //   placeholder: '请选择',
  //   rules: [ // 校验
  //     { required: true, message: '请选择供应商！' }
  //   ],
  //   attr: {
  //     filterable: true
  //   },
  //   options: [...listSupplierNameType]
  // },
  {
    prop: 'templateId',
    label: '中台模版ID',
    type: 'input',
    defaultVal: '',
    attr: {
      placeholder: '请输入'
    },
    rules: [ // 校验
      { required: true, message: '请输入中台模版ID！' }
    ]
  },
  {
    prop: 'messageContent',
    label: '模版内容',
    type: 'textarea',
    attr: {
      autosize: { minRows: 4 },
      disabled: true,
    },
    defaultVal: '',
  },
  {
    prop: 'ctime',
    label: '创建时间',
    type: 'input',
    noShow: true,
    defaultVal: '',
    attr: {
      placeholder: '请输入',
      disabled: true,
    }
  },
  {
    prop: 'utime',
    label: '更新时间',
    type: 'input',
    noShow: true,
    defaultVal: '',
    attr: {
      placeholder: '请输入',
      disabled: true,
    }
  },
]

export const formCheck = [
  {
    prop: 'intervalTime',
    label: '发送频次最短发送间隔时间',
    type: 'select',
    defaultVal: '',
    placeholder: '请选择',
    rules: [ // 校验
      { required: true, message: '请选择' }
    ],
    attr: {
      filterable: true
    },
    options: [
      {
        label: '0分钟',
        value: '0'
      },
      {
        label: '1分钟',
        value: '1'
      },
      {
        label: '3分钟',
        value: '3'
      },
      {
        label: '5分钟',
        value: '5'
      }
    ]
  },
  {
    prop: 'numberDay',
    label: '单日上限不超过',
    type: 'select',
    defaultVal: '',
    placeholder: '请选择',
    rules: [ // 校验
      { required: true, message: '请选择' }
    ],
    attr: {
      filterable: true
    },
    options: [
      {
        label: '1次',
        value: '1'
      },
      {
        label: '2次',
        value: '2'
      },
      {
        label: '10次',
        value: '10'
      },
      {
        label: '20次',
        value: '20'
      },
      {
        label: '30次',
        value: '30'
      },
      {
        label: '50次',
        value: '50'
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
