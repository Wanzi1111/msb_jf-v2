const { typeList } = window.baseData
import { Message } from 'element-ui'

const searchs = [
  {
    prop: 'type',
    label: '业务类型',
    type: 'select', // 选择器,
    defaultVal: '',
    attr: {
      size: 'small',
      placeholder: '请选择类型',
      clearable: true
    },
    options: typeList
  },
  {
    prop: 'ctype',
    label: '业务子类型',
    type: 'select', // 选择器,
    defaultVal: '',
    attr: {
      size: 'small',
      placeholder: '请选择业务子类型',
      clearable: true
    },
    options: []
  },
  {
    prop: 'errorCode',
    label: '状态代码',
    type: 'input', // 选择器,
    defaultVal: '',
    attr: {
      size: 'small',
      placeholder: '请输入状态代码',
      clearable: true
    },
  },
  {
    prop: 'supplier',
    label: '供应商',
    type: 'select', // 选择器,
    defaultVal: '',
    attr: {
      size: 'small',
      placeholder: '请选择供应商',
      clearable: true
    },
    options: []
  },
]

export {
  searchs
}
