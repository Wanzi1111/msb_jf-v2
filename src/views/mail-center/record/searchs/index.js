const { baseData: { review_activity_names }} = window

export default [
  {
    prop: 'recipient',
    label: '邮箱查询',
    type: 'input', // 选择器,
    attr: {
      size: 'small',
      placeholder: '请输入'
    }
  },
  {
    prop: 'sceneCode',
    label: '所属场景',
    type: 'select', // 选择器,
    // options: review_activity_names,
    defaultVal: '',
    attr: {
      size: 'small',
      placeholder: '请选择活动名称'
    }
  },
  {
    prop: 'auditTime',
    label: '发送时间',
    type: 'dateTimePicker', // 日期时间选择器,
    layer: 'large',
    attr: {
      size: 'small',
      type: 'daterange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      defaultTime: ['00:00:00', '23:59:59']
    }
  }
]
