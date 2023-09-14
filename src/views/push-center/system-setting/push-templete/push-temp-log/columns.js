/*
 * @Author: ZhangYeLei
 * @Date: 2022-03-30 18:24:28
 * @LastEditTime: 2022-04-15 18:44:53
 * @LastEditors: ZhangYeLei
 */
import moment from 'moment';

export default [
  {
    prop: 'utime',
    label: '日期',
    align: 'center',
    minWidth: 120,
    render: (_, data) => data ? moment(+data).format('YYYY-MM-DD HH:mm:ss') : '--'
  },
  {
    prop: 'operateName',
    label: '操作人',
    align: 'center',
    minWidth: 120,
  },
  {
    prop: 'operationContent',
    label: '变更记录',
    align: 'center',
    showOverflowTooltip: true,
    minWidth: 300
  }
]
