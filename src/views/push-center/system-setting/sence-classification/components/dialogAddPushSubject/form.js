/*
 * @Author: ZhangYeLei
 * @Date: 2022-03-08 11:05:37
 * @LastEditTime: 2022-03-30 15:50:40
 * @LastEditors: ZhangYeLei
 */
export default [
  {
    prop: 'typeName',
    label: '科目名称',
    type: 'input', // 选择器,
    rules: [
      { required: true, message: '请输入科目名称！' }
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
