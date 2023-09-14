export default [
  {
    prop: 'twoTypeName',
    label: '分类选项',
    align: 'left'
  },
  {
    prop: 'ctime',
    slot: 'ctime',
    label: '创建时间',
    align: 'left'
  },
  {
    action: true,
    name: 'action',
    width: 100,
    prop: 'action',
    label: '操作',
    align: 'center',
    fixed: 'right'
  }
]

export const actions = ({ tableAction }) => {
  return {
    action: (dat, row, index) => {
      const action = [
        {
          label: '编辑',
          attr: {
            command: 'edit',
          }
        },
        {
          label: '删除',
          attr: {
            command: 'delete',
          }
        }
      ]
      return [
        {
          type: 'button', // 按钮
          attr: {
            icon: 'el-icon-more',
            size: 'mini'
          },
          click: () => {},
          dropdown: true, // 设置了dropdown，组件本身的事件失效
          dropdownConfig: {
            attr: {
              trigger: 'click'
            },
            command: (type, dat, row, index) => tableAction(dat, row, index, type),
            item: action
          }
        }
      ]
    }

  }
}
