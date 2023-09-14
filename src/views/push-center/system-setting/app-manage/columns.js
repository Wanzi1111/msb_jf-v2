/*
 * @Author: ZhangYeLei
 * @Date: 2022-03-08 11:05:37
 * @LastEditTime: 2022-05-17 14:52:09
 * @LastEditors: ZhangYeLei
 */
import moment from 'moment';

export default [
  {
    prop: 'applyName',
    label: '应用',
    align: 'center',
    minWidth: 120
  },
  {
    prop: 'supplierName',
    label: '运营商',
    align: 'center',
    minWidth: 120
  },
  {
    prop: 'noticeNumber',
    label: '保留最近通知条数',
    align: 'center',
    minWidth: 120
  },
  {
    prop: 'updateDate',
    label: '创建时间',
    align: 'center',
    minWidth: 120
    // render: (_, data) => data ? moment(+data).format('YYYY-MM-DD HH:mm:ss') : '--'
  },
  {
    action: true,
    name: 'action',
    width: 100,
    label: '操作',
    align: 'center',
    fixed: 'right'
  }
]

export const tableActions = ({ handleTableAction }) => {
  return {
    action: (dat, row) => [{
      type: 'button',
      label: '设置通知条数',
      attr: {
        type: 'text'
      },
      click: () => handleTableAction('set', row)
    }]
  }
}
