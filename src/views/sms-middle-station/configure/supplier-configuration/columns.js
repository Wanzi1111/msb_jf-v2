const { listSupplierNameType } = window.baseData

export default [
  {
    prop: 'supplierName',
    label: '供应商',
    align: 'left',
    render: (h, dat, row, index) => listSupplierNameType.find(i => i.value === dat).label
  },
  {
    prop: 'signature',
    label: '签名',
    align: 'left',
    render: (h, dat, row, index) => `【${dat}】`
  }
]
