// import moment from 'moment'
/**
 * @author: Liwei
 * @description:
 * @date: 2020/1/2
 */
export default [
  {
    prop: 'bizName',
    label: '业务方',
    align: 'left',
    fixed: 'left'
  },
  {
    prop: 'sceneName',
    label: '业务场景',
    align: 'center'
  },
  {
    prop: 'sceneCode',
    label: '业务方场景编号',
    width: 140,
    align: 'center'
  },
  {
    name: 'type',
    prop: 'orderId',
    width: 110,
    label: '业务订单号',
    align: 'center'
  },
  {
    name: 'type',
    prop: 'paySeqId',
    width: 120,
    label: '中台支付流水号',
    align: 'center'
  },
  {
    name: 'type',
    prop: 'uniqueOrderNo',
    width: 120,
    label: '三方支付流水号',
    align: 'center'
  },
  {
    name: 'type',
    prop: 'tradeOrderId',
    width: 120,
    label: '商户订单号',
    align: 'center'
  },
  {
    name: 'type',
    prop: 'bankOrderNo',
    width: 120,
    label: '银行订单号',
    align: 'center'
  },
  {
    name: 'type',
    prop: 'provider',
    label: '支付渠道',
    align: 'left',
    slot: 'provider',
  },
  {
    name: 'type',
    prop: 'payProduct',
    label: '支付产品',
    align: 'center'
  },
  {
    name: 'type',
    prop: 'payTime',
    label: '支付时间',
    align: 'center'
  },
  {
    name: 'type',
    prop: 'payAmount',
    width: 120,
    label: '支付金额(¥/$)',
    align: 'left',
  },
  {
    name: 'type',
    prop: 'currency',
    label: '币种',
    align: 'left',
    slot: 'currency'
  },
  {
    name: 'type',
    prop: 'payStatus',
    label: '支付状态',
    width: 90,
    align: 'left',
    slot: 'payStatus'
  },
  {
    name: 'type',
    prop: 'userId',
    label: '用户ID',
    align: 'center'
  },
  {
    name: 'type',
    prop: 'pyerAcctId',
    width: 200,
    label: '支付账号或卡号',
    align: 'center'
  },
  {
    action: true,
    name: 'action',
    prop: 'action',
    label: '操作',
    align: 'left',
    fixed: 'right'
  }
]
export const actions = ({ handleDetails }) => {
  return {
    type: (dat, row, index) => {},
    action: [
      {
        type: 'button',
        label: '查看详情',
        click: handleDetails,
        attr: {
          size: 'mini',
          type: 'text'
        }
      }
    ]
  }
}
