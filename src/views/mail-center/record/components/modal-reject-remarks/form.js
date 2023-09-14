const { baseData: { review_activity_reject }} = window

export default [
  {
    prop: 'rejectRadio',
    label: '驳回选项',
    type: 'radio', // 多文本
    options: review_activity_reject
  },
  {
    prop: 'textarea',
    label: '驳回理由',
    type: 'textarea', // 多文本
    defaultVal: '',
    visible: false,
    attr: {
      placeholder: '请输入驳回理由'
    }
  }
]

export const formActions = {
  submit: {
    hide: false // 是否显示 默认false
  },
  reset: {
    hide: false
  },
  back: {
    hide: true
  }
}
