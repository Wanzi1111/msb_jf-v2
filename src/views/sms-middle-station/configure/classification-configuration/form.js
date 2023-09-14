// const textLength = (rule, value, callback, a, b, c) => {
//   if (value.length > 20) {
//     return callback(new Error('字数限制20字符'))
//   }
//   return callback()
// }
export default [
  {
    prop: 'oneTypeName',
    label: '科目',
    type: 'select',
    defaultVal: '',
    rules: [ // 校验
      { required: true, message: '请选择！' }
    ],
    attr: {
      filterable: true,
      disabled: false,
      placeholder: '请选择',
    },
    options: []
  },
  {
    prop: 'twoTypeName',
    label: '分类名称',
    type: 'textarea',
    attr: {
      maxlength: 20,
      placeholder: '请输入',
      autosize: { minRows: 2 },
      [`show-word-limit`]: true
    },
    defaultVal: '',
    rules: [ // 校验
      { required: true, message: '请输入分类名称！' }
      // { required: true, message: '字数限制20字符', validator: textLength, trigger: 'change' }
    ]
  }
]

export const oneTypeNameForm = [
  {
    prop: 'oneTypeName',
    label: '科目',
    type: 'textarea',
    attr: {
      maxlength: 20,
      placeholder: '请输入',
      autosize: { minRows: 2 },
      [`show-word-limit`]: true
    },
    defaultVal: '',
    rules: [ // 校验
      { required: true, message: '请输入' }
      // { required: true, message: '字数限制20字符', validator: textLength, trigger: 'change' }
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
