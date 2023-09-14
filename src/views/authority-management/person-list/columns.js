export default [
  {
    prop: 'id',
    label: 'ID',
    align: 'left',
    width: 80
  },
  {
    prop: 'name',
    label: '账号名',
    align: 'left'
  },
  {
    prop: 'phone',
    slot: 'phone',
    label: '电话号码',
    align: 'left'
  },
  {
    prop: 'position',
    label: '职位',
    align: 'left'
  },
  {
    prop: 'addTime',
    slot: 'addTime',
    label: '创建时间',
    align: 'left',
    width: 200
  },
  {
    action: true,
    name: 'action',
    width: 240,
    prop: 'action',
    label: '操作',
    align: 'center',
    fixed: 'right'
  }
]

export const actions = ({ tableAction }) => {
  return {
    action: (dat, row, index) => {
      return [
        {
          type: 'button',
          label: '分配角色',
          click: (dat, row, index) => tableAction(dat, row, index, 'edit'),
          attr: {
            size: 'mini',
            icon: 'el-icon-s-operation',
            type: 'default'
          }
        },
        {
          type: 'button',
          label: '重置密码',
          click: (dat, row, index) => tableAction(dat, row, index, 'password'),
          attr: {
            size: 'mini',
            icon: 'el-icon-s-operation',
            type: 'default'
          }
        },
      ]
    }
  }
}
