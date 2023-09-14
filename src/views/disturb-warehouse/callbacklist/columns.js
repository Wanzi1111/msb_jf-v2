export default [
  {
    prop: 'type',
    slot: 'type',
    label: '业务类型',
    align: 'left'
  },
  {
    prop: 'ctype',
    slot: 'ctype',
    label: '业务子类型',
    align: 'left',
  },
  {
    prop: 'origin',
    slot: 'origin',
    label: '数据来源',
    align: 'left',
  },
  {
    prop: 'supplier',
    slot: 'supplier',
    label: '供应商',
    align: 'left',
  },
  {
    prop: 'errorCode',
    label: '状态代码',
    align: 'left',
  },
  {
    prop: 'errorMsg',
    label: '状态代码注释',
    align: 'left',
  },
  {
    prop: 'ignorePeriod',
    label: '解除时间',
    align: 'left',
    render: (h, dat) => {
      const timeType = {
        30: '一个月',
        90: '三个月',
        0: '永久',
      }
      return `${timeType[dat]}`
    },
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
      let action = []
      action = [
        {
          label: '删除',
          attr: {
            command: 'delete',
          }
        },
        {
          label: '修改',
          attr: {
            command: 'emit',
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
