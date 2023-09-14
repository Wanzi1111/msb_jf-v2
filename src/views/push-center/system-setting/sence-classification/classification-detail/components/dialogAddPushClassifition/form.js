/*
 * @Author: ZhangYeLei
 * @Date: 2022-03-08 14:33:54
 * @LastEditTime: 2022-03-30 17:42:41
 * @LastEditors: ZhangYeLei
 */

export default [
  {
    prop: 'oneTypeName',
    label: '科目',
    type: 'input', // 选择器,
    rules: [
      { required: true }
    ],
    attr: {
      disabled: true,
      placeholder: '请输入'
    },
  },
  {
    prop: 'typeName',
    label: '分类名称',
    type: 'input', // 选择器,
    rules: [
      { required: true, message: '请输入分类名称！' }
    ],
    attr: {
      placeholder: '请输入'
    }
  },
]

export const formActions = () => {
  return {
    submit: {
      hide: false, // 是否显示 默认false
      label: '提交'
    },
    reset: {
      hide: true
    },
    back: {
      hide: true
    },
    cancel: {
      hide: true
    }
  }
}
