const searchs = [
  {
    prop: 'mobile',
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
    label: '创建日期',
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
          value: 'cname'
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
    defaultVal: 'cname',
    hide: true,
    visible: false
  }
]

export {
  searchs
}
