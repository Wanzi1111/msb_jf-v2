const { ctypeList } = window.baseData
import { Message } from 'element-ui'

const searchs = [
  {
    prop: 'ctype',
    label: '业务类型',
    type: 'select', // 选择器,
    defaultVal: '',
    attr: {
      size: 'small',
      placeholder: '请选择类型',
      clearable: true
    },
    options: ctypeList
  },
  {
    prop: 'category',
    label: '分类',
    type: 'select', // 选择器,
    defaultVal: '',
    attr: {
      size: 'small',
      placeholder: '请选择类型',
      clearable: true,
    },
    options: []
  },
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
          value: 'cmobile'
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
  },
  {
    prop: 'origin',
    label: '数据来源',
    type: 'select', // 选择器,
    defaultVal: '',
    attr: {
      size: 'small',
      placeholder: '请选择类型',
      clearable: true
    },
    options: []
  },
]

export {
  searchs
}
