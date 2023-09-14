/**
 * @author: huzhifu
 * @description: 表单配置
 * @date: 2020/5/12
 */

export default [
  {
    prop: 'name',
    label: '菜单/功能名称',
    type: 'input',
    attr: {
      placeholder: '请输入菜单/功能名称'
    },
    rules: [
      { required: true, message: '菜单名称不能为空', trigger: 'blur' },
      { max: 15, message: '长度不能超过15个字符', trigger: 'blur' }
    ]
  },
  {
    prop: 'parentId',
    label: '父菜单',
    type: 'cascader',
    attr: {
      placeholder: '请选择',
      clearable: true,
      options: [],
      props: {
        checkStrictly: true,
        label: 'name',
        value: 'id'
      }
    }
  },
  {
    prop: 'key',
    label: '页面唯一key',
    type: 'input',
    attr: {
      placeholder: '请输入页面唯一key'
    },
    rules: [
      { required: true, message: '页面唯一key不能为空' }
    ]
  },
  {
    prop: 'dataUrl',
    label: '请求路径',
    type: 'textarea',
    attr: {
      placeholder: '请输入请求路径',
      autosize: { minRows: 4 }
    },
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
