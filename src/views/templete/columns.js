export default [
  {
    prop: 'id',
    label: 'ID',
    align: 'center',
    width: 80
  },
  {
    prop: 'name',
    label: '账号名',
    align: 'center'
  },
  {
    action: true,
    name: 'action',
    width: 160,
    prop: 'action',
    label: '操作',
    align: 'center',
    fixed: 'right'
  }
]

export const tableActions = ({ handleTableAction }) => {
  return {
    action: () => {
      return [
        {
          type: 'button',
          label: '编辑',
          click: (_, row) => handleTableAction('edit', row),
          attr: {
            size: 'mini',
            icon: 'el-icon-edit',
            type: 'default'
          }
        },
      ]
    }
  }
}
