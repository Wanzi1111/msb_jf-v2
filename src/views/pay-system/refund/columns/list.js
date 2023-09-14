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
    width: 110,
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
    align: 'left',
    width: 120
  },
  {
    prop: 'orderId',
    label: '业务订单号',
    align: 'left',
    width: 110
  },
  {
    prop: 'refundSeqId',
    label: '中台退款流水号',
    align: 'left',
    width: 120
  },
  {
    prop: 'uniqueRefundNo',
    label: '三方退款流水号',
    align: 'left',
    width: 120
  },
  {
    prop: 'provider',
    label: '退款渠道',
    align: 'left',
    slot: 'provider'
  },
  {
    prop: 'payProduct',
    label: '退款产品',
    align: 'left',
  },
  {
    prop: 'refundTime',
    label: '退款时间',
    align: 'left',
  },
  {
    prop: 'refundAmount',
    label: '退款金额(¥/$)',
    align: 'left',
    width: 110
  },
  {
    prop: 'currency',
    label: '币种',
    align: 'left',
    slot: 'currency'
  },
  {
    prop: 'refundStatus',
    label: '退款状态',
    align: 'left',
  },
  {
    prop: 'userId',
    label: '用户ID',
    align: 'left',
  },
  {
    prop: 'pyerAcctId',
    label: '退款账号或卡号',
    align: 'left',
    width: 120
  },
  {
    prop: 'action',
    label: '操作',
    align: 'left',
    fixed: 'right',
    slot: 'action'
  },
]

