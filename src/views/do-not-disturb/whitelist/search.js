const searchs = [
  {
    prop: 'disturbMobile',
    label: '勿扰号码',
    type: 'input',
    attr: {
      size: 'small',
      placeholder: '请输入号码',
      clearable: true
    }
  },
  {
    prop: 'daterange',
    label: '时间范围',
    type: 'daterange',
    attr: {
      size: 'small',
      clearable: true
    }
  },
  {
    prop: 'userInfoInputSelect',
    label: '操作人',
    type: 'inputSelect', // 选择器,
    inputSelect: {
      prop: 'userInfoInputSelectProp',
      attr: {
        size: 'small',
      },
      options: [
        {
          label: '姓名',
          value: 'entryUser'
        },
        {
          label: '手机号',
          value: 'entryMobile'
        }
      ]
    },
    attr: {
      size: 'small',
      placeholder: '请输入操作人姓名或手机号'
    }
  },
  {
    prop: 'userInfoInputSelectProp',
    defaultVal: 'entryUser',
    hide: true,
    visible: false
  }
]

export {
  searchs
}
