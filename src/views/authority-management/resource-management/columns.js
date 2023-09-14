export default [
  {
    prop: 'name',
    label: '菜单/功能名称',
    align: 'left'
  },
  {
    prop: 'key',
    label: '页面唯一key',
    align: 'left'
  },
  {
    prop: 'dataUrl',
    label: '请求接口',
    align: 'left'
  },
  {
    prop: 'updateTime',
    label: '更新时间',
    align: 'left',
    width: 200
  },
  {
    action: true,
    name: 'action',
    width: 170,
    prop: 'action',
    label: '操作',
    align: 'center',
    fixed: 'right'
  }
]

export const actions = ({ tableAction }) => {
  return {
    action: () => {
      return [
        {
          type: 'button',
          label: '编辑',
          click: (_, row) => tableAction('edit', row),
          attr: {
            size: 'mini',
            icon: 'el-icon-s-operation',
            type: 'default'
          }
        },
        {
          type: 'button',
          label: '删除',
          click: (_, row) => tableAction('del', row),
          attr: {
            size: 'mini',
            icon: 'el-icon-delete',
            type: 'danger'
          }
        },
      ]
    }
  }
}
