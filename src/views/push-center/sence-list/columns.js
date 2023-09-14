export default [
  {
    prop: 'id',
    label: '场景ID/名称',
    align: 'center',
    minWidth: 180,
    render: (_, __, row) => `${row.scenarioId} / ${row.scenarioName}`
  },
  {
    prop: 'oneType',
    label: '科目',
    align: 'center'
  },
  {
    prop: 'twoType',
    label: '分类',
    align: 'center',
    minWidth: 100
  },
  {
    prop: 'templateId',
    label: '模板ID',
    align: 'center',
    minWidth: 100
  },
  {
    prop: 'messageContent',
    label: '模板内容',
    align: 'center',
    minWidth: 200,
    showOverflowTooltip: true
  },
  {
    prop: 'delete',
    label: '状态',
    action: true,
    name: 'status',
    align: 'center',
    minWidth: 80,
  },
  {
    prop: 'sendLever',
    label: '请求到达率',
    align: 'center',
    slotHeader: {
      type: 'info',
      text: '成功量/计划触发量'
    },
    minWidth: 120
  },
  {
    prop: 'clickLever',
    label: '点击率',
    align: 'center',
    slotHeader: {
      type: 'info',
      text: 'UV/成功量'
    },
    minWidth: 80
  },
  {
    prop: 'businessNumber',
    label: '业务请求量',
    align: 'center',
    slotHeader: {
      type: 'info',
      text: '业务请求发送消息数量'
    },
    minWidth: 120
  },
  {
    prop: 'audienceNumber',
    label: '受众目标量',
    align: 'center',
    slotHeader: {
      type: 'info',
      text: '触达的用户数量'
    },
    minWidth: 120
  },
  {
    prop: 'sucessNumber',
    label: '成功量',
    align: 'center',
    slotHeader: {
      type: 'info',
      text: '如用户多个设备登陆，其中一个设备送达则为成功'
    },
    minWidth: 80
  },
  {
    prop: 'failNumber',
    label: '失败量',
    align: 'center',
    slotHeader: {
      type: 'info',
      text: '到达离线时间仍未送达'
    },
    minWidth: 80
  },
  {
    prop: 'uvNumber',
    label: 'UV',
    align: 'center',
    slotHeader: {
      type: 'info',
      text: '点击消息的用户数'
    },
    minWidth: 80
  },
  {
    prop: 'pvNumber',
    label: 'PV',
    align: 'center',
    slotHeader: {
      type: 'info',
      text: '用户点击消息的次数'
    },
    minWidth: 80
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
  const type = ['success', 'danger']
  const labelList = ['启用中', '已停用']
  return {
    status: (dat, row, index) => {
      return [
        {
          type: 'tag',
          label: labelList[+row.enableStatus],
          attr: {
            type: type[+row.enableStatus]
          }
        }
      ]
    },
    action: (dat, row) => {
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
        {
          label: '发送明细',
          attr: {
            command: 'detail',
          }
        },
        {
          label: '操作日志',
          attr: {
            command: 'log',
          }
        },
      ]
      if (!row.enableStatus) {
        actions.splice(0, 0, {
          label: '停用',
          attr: {
            command: 'stop',
          }
        })
      } else {
        actions.splice(0, 0, {
          label: '启用',
          attr: {
            command: 'enable',
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
