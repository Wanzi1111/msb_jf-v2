const { listSupplierNameType } = window.baseData

export default [
  {
    prop: 'supplierName',
    label: '供应商',
    align: 'left',
    render: (h, dat, row, index) => listSupplierNameType.find(i => i.value === dat)?.label || '-'
  },
  {
    prop: 'errNumber',
    label: '错误次数',
    align: 'left'
  },
  {
    prop: 'impactNum',
    label: '影响人数',
    align: 'left'
  },
  {
    action: true,
    name: 'action',
    width: 120,
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
          label: '错误明细',
          click: (dat, row, index) => tableAction(dat, row, index),
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
