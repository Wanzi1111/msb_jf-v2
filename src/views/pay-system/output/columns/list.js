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
    prop: 'uniqueOrderNo',
    label: '出款流水号（三方）',
    align: 'left',
    width: 120
  },
  {
    prop: 'provider',
    label: '出款渠道',
    align: 'left',
    slot: 'provider'
  },
  {
    prop: 'payProduct',
    label: '出款产品',
    align: 'left',
  },
  {
    prop: 'payoutType',
    label: '出款类型',
    align: 'left',
  },
  {
    prop: 'payoutTime',
    label: '出款时间',
    align: 'left',
  },
  {
    prop: 'payoutAmount',
    label: '出款金额(¥/$)',
    align: 'left',
    width: 110
  },
  {
    prop: 'payoutStatus',
    label: '出款状态',
    align: 'left',
  },
  {
    prop: 'openId',
    label: '用户openID',
    align: 'left',
  },
  {
    prop: 'userName',
    label: '用户名',
    align: 'left',
  },
  {
    prop: 'acctId',
    label: '用户账号',
    align: 'left',
  },
  {
    prop: 'bankName',
    label: '开户行名称',
    align: 'left',
    width: 120
  },
  {
    prop: 'bankNo',
    label: '开户行行号',
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

