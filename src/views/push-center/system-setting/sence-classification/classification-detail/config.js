export const actions = ({ handleActions }) => ([{
  type: 'button', // 按钮
  label: '新增分类',
  click: () => handleActions('add'),
  attr: {
    type: 'info',
    plain: true,
    size: 'mini',
    icon: 'el-icon-plus'
  }
}])
