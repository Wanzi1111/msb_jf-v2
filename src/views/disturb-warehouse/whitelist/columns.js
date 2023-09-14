export default [
  {
    prop: 'areaCode',
    label: '区号',
    align: 'left',
    width: 80
  },
  {
    prop: 'disturbMobile',
    slot: 'disturbMobile',
    label: '勿扰号码',
    align: 'left'
  },
  {
    prop: 'ctimeFormat',
    label: '加入时间',
    align: 'left',
    width: 200
  },
  {
    prop: 'endTimeFormat',
    label: '解除时间',
    align: 'left',
    width: 200,
    render: (h, dat) => {
      return `${dat === '0' ? '永久' : dat}`
    },
  },
  {
    prop: 'cname',
    slot: 'cname',
    label: '操作人',
    align: 'left',
  },
  {
    prop: 'remark',
    label: '原因备注',
    align: 'left',
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
          label: '解除',
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
