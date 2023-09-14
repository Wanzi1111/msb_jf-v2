/*
 * @Author: ZhangYeLei
 * @Date: 2022-03-07 11:45:54
 * @LastEditTime: 2022-04-15 18:15:55
 * @LastEditors: ZhangYeLei
 */

import store from '@/store';

export default [
  {
    prop: 'od',
    label: '模板ID/名称',
    align: 'center',
    minWidth: 120,
    render: (_, __, row) => `${row.templateId} / ${row.templateName}`
  },
  {
    prop: 'applyId',
    label: '推送应用',
    align: 'center',
    render: (_, data) => store.state.pushCenter.dincMap.listApply_map[data]
  },
  {
    prop: 'templateTitle',
    label: '标题',
    align: 'center',
    minWidth: 120
  },
  {
    prop: 'messageContent',
    label: '模板内容',
    align: 'center',
    showOverflowTooltip: true,
    minWidth: 200
  },
  {
    prop: 'templateTitle',
    label: '审核状态',
    action: true,
    name: 'auditStatus',
    align: 'center',
    width: 100
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
    auditStatus: (_, row) => {
      return [{
        type: 'tag',
        label: row.auditStatus ? '已审核' : '未审核',
        attr: {
          type: row.auditStatus ? 'success' : 'info',
        }
      }]
    },
    action: (_, row) => {
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
        // {
        //   label: '发送明细',
        //   attr: {
        //     command: 'detail',
        //   }
        // },
        {
          label: '操作日志',
          attr: {
            command: 'log',
          }
        },
      ]
      if (row.auditStatus) {
        actions.splice(0, 0, {
          label: '审核驳回',
          attr: {
            command: 'adjustReject',
          }
        })
      } else {
        actions.splice(0, 0, {
          label: '审核通过',
          attr: {
            command: 'adjustAdopt',
          }
        })
      }
      return [
        {
          type: 'button', // 按钮
          attr: {
            icon: 'el-icon-more',
            size: 'mini',
            plain: true
          },
          click: () => {},
          dropdown: true,
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
