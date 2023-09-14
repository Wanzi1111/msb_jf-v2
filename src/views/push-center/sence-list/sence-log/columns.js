/*
 * @Author: ZhangYeLei
 * @Date: 2022-03-04 15:06:39
 * @LastEditTime: 2022-03-29 18:48:20
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
