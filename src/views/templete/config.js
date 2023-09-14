export const tabList = [
  {
    label: '一对一',
    value: '0'
  },
  {
    label: '小熊美术',
    value: '1'
  },
]

export const actions = ({ handleActions }) => ([{
  type: 'button', // 按钮
  label: '新增',
  click: handleActions,
  attr: {
    type: 'info',
    plain: true,
    size: 'mini',
    icon: 'el-icon-plus'
  }
}])
