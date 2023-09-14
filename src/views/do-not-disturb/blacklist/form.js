const checkMobile = (rule, value, callback) => {
  const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  const values = value.split('\n')
  let flag = true
  values?.forEach((v) => {
    if (!reg.test(v)) {
      flag = false
      return callback(new Error('请输入正确的手机号'))
    }
  })
  if (flag) {
    return callback()
  }
}
export default [
  {
    prop: 'businessChildType',
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
    options: []
  },
  {
    prop: 'listType',
    label: '勿扰类型',
    type: 'select', // 选择器,
    defaultVal: '',
    attr: {
      filterable: true,
      clearable: true
    },
    rules: [
      // 校验
      { required: true, message: '请选择业务线！' }
    ],
    options: []
  },
  {
    prop: '+86',
    label: '区号',
    type: 'select', // 选择器,
    defaultVal: '+86',
    attr: {
      filterable: true
    },
    rules: [
      // 校验
      { required: true, message: '请选择区号！' }
    ],
    options: [{ value: '+86', label: '+86' }]
  },
  {
    prop: 'disturbMobile',
    label: '手动录入',
    type: 'textarea',
    defaultVal: '',
    placeholder: '请输入（多个一行一个）',
    rules: [ // 校验
      { required: true, message: '请输入手机号！' },
      { required: true, message: '请输入正确的手机号', validator: checkMobile, trigger: 'blur' }
    ]
  },
  {
    prop: 'takeEffectType',
    label: '生效时间',
    type: 'radio', // 选择器,
    defaultVal: '1',
    rules: [
      // 校验
      { required: true, message: '请选择生效时间！' }
    ],
    options: [{ value: '1', label: '有效期' }, { value: '0', label: '永久' }]
  },
  {
    prop: 'daterange',
    label: '时间范围',
    type: 'daterange',
    noShow: false,
    rules: [
      // 校验
      { required: true, message: '请选时间范围！' }
    ],
    attr: {
      clearable: true
    }
  },
  {
    prop: 'remark',
    label: '操作原因',
    type: 'input',
    defaultVal: '',
    placeholder: '请输入',
    rules: [ // 校验
      { required: true, message: '请输入操作原因！' }
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

// {
//   "id":"",
//   "isRelease": "1", // 解除

//   "businessChildType": "2", // 父类型
//   "businessClassification": "3", // 子类型

//   "disturbMobile": "17777777777,18888888888,19999999999", // 手机号码

//   "listType": "4001", //  勿扰类型

//   "takeEffectType": "1" // 0 永久  1  有效期
//   "enjoinTime": "1626796800000",
//   "releaseTime": "1626796800000",

//   "remark": "一知黑名单", // 原因备注

// }
