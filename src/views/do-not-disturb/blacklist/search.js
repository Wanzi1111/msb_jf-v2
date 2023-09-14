const { allChildLIst } = window.baseData

const searchs = [
  {
    prop: 'listType',
    label: '选择类型',
    type: 'select', // 选择器,
    defaultVal: '',
    attr: {
      // multiple: true,
      size: 'small',
      // collapseTags: true,
      placeholder: '请选择类型',
      clearable: true
    },
    options: allChildLIst
  },
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
