export default [
  {
    prop: 'domesticForeign',
    label: '短信区域',
    type: 'radio', // 选择器,
    defaultVal: '0',
    rules: [
      // 校验
      { required: true, message: '请选择短信区域！' }
    ],
    options: [{ value: '0', label: '国内' }, { value: '1', label: '国际' }]
  },
  {
    prop: 'messageType',
    label: '短信类型',
    type: 'radio', // 选择器,
    defaultVal: '0',
    rules: [
      // 校验
      { required: true, message: '请选择短信类型！' }
    ],
    options: [{ value: '0', label: '通知短信' }, { value: '1', label: '营销短信' }, { value: '2', label: '验证码短信' }]
  },
  {
    prop: 'supplierName',
    label: '供应商',
    type: 'select',
    defaultVal: '',
    placeholder: '请选择',
    showAllLevels: false,
    rules: [ // 校验
      { required: true, message: '请选择供应商！' }
    ],
    attr: {
      filterable: true,
      clearable: true
    },
    options: []
  },
  {
    prop: 'supplierTemplateId',
    label: '三方模版ID',
    type: 'input',
    visible: false,
    defaultVal: '',
    attr: {
      placeholder: '请输入'
    },
    rules: [ // 校验
      { required: true, message: '请输入三方模版ID！' }
    ]
  },
  {
    prop: 'signature',
    label: '模版签名',
    type: 'input',
    defaultVal: '',
    rules: [ // 校验
      { required: true, message: '请输入模版签名！' }
    ],
    attr: {
      placeholder: '请输入'
    }
  },
  {
    prop: 'messageContent',
    label: '模版内容',
    type: 'textarea',
    attr: {
      // maxlength: 70,
      placeholder: '请输入',
      autosize: { minRows: 4 },
      disabled: false
      // [`show-word-limit`]: true
    },
    note: true,
    noteConfig: {
      type: 'tips',
      tips: '',
      label: '字数',
      keys: [
        {
          key: 'signature',
          exCount: 2
        },
        {
          key: 'messageContent',
          exCount: 0
        },
        {
          key: 'reply',
          exCount: 0
        }
      ]
    },
    defaultVal: '',
    rules: [ // 校验
      { required: true, message: '请输入模版内容！' }
    ]
  },
  {
    prop: 'reply',
    label: '退订消息',
    type: 'select',
    defaultVal: '',
    placeholder: '请选择',
    showAllLevels: false,
    visible: false,
    rules: [ // 校验
      { required: true, message: '请选择退订消息！' }
    ],
    attr: {
      filterable: true,
      clearable: true,
      disabled: false
    },
    options: [
      {
        label: '退订回T',
        value: '退订回T'
      },
      {
        label: '退订回N',
        value: '退订回N'
      },
      {
        label: '退订回复TD',
        value: '退订回复TD'
      },
      {
        label: '退订回复T',
        value: '退订回复T'
      },
      {
        label: '退订回复N',
        value: '退订回复N'
      },
      {
        label: '退订回TD',
        value: '退订回TD'
      },
      {
        label: '回TD退订',
        value: '回TD退订'
      },
      {
        label: '回T退订',
        value: '回T退订'
      },
      {
        label: '回N退订',
        value: '回N退订'
      },
      {
        label: '退订回T',
        value: '退订回T'
      },
      {
        label: 'TD退订',
        value: 'TD退订'
      },
      {
        label: '褪订回T',
        value: '褪订回T'
      },
      {
        label: '退订T',
        value: '退订T'
      },
      {
        label: '退订TD',
        value: '退订TD'
      },
      {
        label: '退定回T',
        value: '退定回T'
      },
      {
        label: '拒D',
        value: '拒D'
      },
      {
        label: '拒d',
        value: '拒d'
      }
    ]
  },
  {
    prop: 'remark',
    label: '备注',
    type: 'input',
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
