/**
 * @author: huzhifu
 * @description: 表单配置
 * @date: 2020/5/12
 */

import { TabList } from '../config'

export default [
  {
    prop: 'roleName',
    label: '角色名称',
    type: 'input',
    attr: {
      placeholder: '请输入'
    },
    rules: [
      { required: true, message: '角色名称不能为空', trigger: 'blur' }
    ]
  },
  {
    prop: 'platform',
    label: '系统权限',
    type: 'select',
    defaultVal: '',
    placeholder: '请选择',
    showAllLevels: false,
    rules: [ // 校验
      { required: true, message: '请选系统权限' }
    ],
    attr: {
      filterable: true,
      clearable: true
    },
    options: [...TabList]
  },
  {
    prop: 'resIds',
    label: '选择权限',
    type: 'cascader',
    attr: {
      placeholder: '请选择',
      clearable: true,
      options: [],
      'collapse-tags': true,
      props: {
        multiple: true,
        checkStrictly: true,
        label: 'name',
        value: 'id'
      }
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
