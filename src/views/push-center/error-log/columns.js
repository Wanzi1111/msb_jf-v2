/*
 * @Author: ZhangYeLei
 * @Date: 2022-03-30 18:24:28
 * @LastEditTime: 2022-04-20 15:51:49
 * @LastEditors: ZhangYeLei
 */
export default [
  {
    prop: 'supplierName',
    label: '供应商',
    align: 'center',
    minWidth: 120
  },
  {
    prop: 'errNumber',
    label: '错误次数',
    align: 'center',
    minWidth: 80
  },
  {
    prop: 'androidErrorNumber',
    label: 'Android错误次数',
    align: 'center',
    minWidth: 120
  },
  {
    prop: 'iosErrorNumber',
    label: 'Ios错误次数',
    align: 'center',
    minWidth: 80
  },
  {
    prop: 'impactNumber',
    label: '影响设备量',
    align: 'center',
    minWidth: 80
  },
  {
    prop: 'impactAndroidNumber',
    label: '影响Android设备量',
    align: 'center',
    minWidth: 140
  },
  {
    prop: 'impactIosNumber',
    label: '影响Ios设备量',
    align: 'center',
    minWidth: 120
  },
  {
    action: true,
    name: 'action',
    width: 110,
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
          type: 'button', // 按钮
          label: '错误明细',
          click: (_, row) => handleTableAction('detail', row),
          attr: {
            icon: 'el-icon-view',
            size: 'mini',
          },
        }
      ]
    }
  }
}
