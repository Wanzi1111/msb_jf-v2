/*
 * @Author: ZhangYeLei
 * @Date: 2022-03-08 14:29:22
 * @LastEditTime: 2022-03-30 18:21:45
 * @LastEditors: ZhangYeLei
 */
import moment from 'moment';

export default [
  {
    prop: 'typeName',
    label: '科目',
    align: 'center',
    minWidth: 120
  },
  {
    prop: 'ctime',
    label: '创建时间',
    align: 'center',
    render: (_, data) => data ? moment(+data).format('YYYY-MM-DD HH:mm:ss') : '--'
  },
  {
    action: true,
    name: 'action',
    width: 80,
    label: '操作',
    align: 'center',
    fixed: 'right'
  }
]

export const tableActions = ({ handleTableAction }) => {
  return {
    action: () => {
      const actions = [
        {
          label: '编辑',
          attr: {
            command: 'edit',
          }
        },
        {
          label: '删除',
          attr: {
            command: 'delete',
          }
        },
      ]
      return [
        {
          type: 'button', // 按钮
          attr: {
            icon: 'el-icon-more',
            size: 'mini',
            plain: true
          },
          click: () => {},
          dropdown: true, // 设置了dropdown，组件本身的事件失效
          dropdownConfig: {
            attr: {
              trigger: 'hover'
            },
            command: (type, _, row) => handleTableAction(type, row),
            item: actions
          }
        }
      ]
    }
  }
}
