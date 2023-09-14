const { listDepartment } = window.baseData

export default [
  {
    prop: 'scenarioId',
    slot: 'scenarioId',
    label: '场景ID/名称',
    align: 'left',
    width: 150,
    fixed: 'left'
  },
  {
    prop: 'oneType',
    label: '科目',
    align: 'left',
    width: 100,
    fixed: 'left'
  },
  {
    prop: 'twoType',
    label: '分类',
    align: 'left',
    render: (h, dat, row, index) => dat || '-',
    width: 150,
    fixed: 'left'
  },
  {
    prop: 'templateId',
    slot: 'templateId',
    label: '模版ID',
    align: 'left'
  },
  {
    prop: 'messageContent',
    slot: 'messageContent',
    label: '模版内容',
    align: 'left',
    width: 320
  },
  {
    action: true,
    prop: 'enableStatus',
    label: '状态',
    name: 'tag',
    align: 'center',
    width: 150
  },
  {
    prop: 'arriveLever',
    slot: 'arriveLever',
    sortable: 'custom',
    headerSlot: 'arriveLeverHeader',
    label: '请求到达率',
    align: 'left',
    width: 150
  },
  {
    prop: 'sendLever',
    slot: 'sendLever',
    sortable: 'custom',
    headerSlot: 'sendLeverHeader',
    label: '发送到达率',
    align: 'left',
    width: 150
  },
  {
    prop: 'businessNumber',
    slot: 'businessNumber',
    headerSlot: 'businessNumberHeader',
    label: '业务请求量',
    align: 'left',
    width: 120
  },
  {
    prop: 'allErrNumber',
    slot: 'allErrNumber',
    headerSlot: 'allErrNumberHeader',
    label: '过滤量',
    align: 'left',
    width: 120
  },
  {
    prop: 'errNumber',
    label: '异常过滤',
    align: 'left',
    width: 120
  },
  {
    prop: 'frequencyNumber',
    label: '频次过滤',
    align: 'left',
    width: 120
  },
  {
    prop: 'disturbNumber',
    label: '勿扰过滤',
    align: 'left',
    width: 120
  },
  {
    prop: 'sendNumber',
    label: '发送量',
    sortable: 'custom',
    align: 'left',
    width: 120
  },
  {
    prop: 'sucessNumber',
    label: '成功量',
    sortable: 'custom',
    align: 'left',
    width: 120
  },
  {
    prop: 'failNumber',
    label: '失败量',
    sortable: 'custom',
    align: 'left',
    width: 120
  },
  {
    prop: 'allLengthNumber',
    slot: 'allLengthNumber',
    sortable: 'custom',
    headerSlot: 'allLengthNumberHeader',
    label: '计费条数',
    align: 'left',
    width: 140
  },
  {
    action: true,
    name: 'action',
    width: 100,
    prop: 'action',
    label: '操作',
    align: 'center',
    fixed: 'right'
  }
]

export const actions = ({ tableAction }) => {
  const type = ['success', 'danger']
  const isEnableList = ['启用中', '已停用']
  return {
    tag: (dat, row, index) => {
      return [
        {
          type: 'tag',
          label: isEnableList[+row.enableStatus],
          attr: {
            type: type[+row.enableStatus]
          }
        }
      ]
    },
    action: (dat, row, index) => {
      let action = [
        {
          label: +row.enableStatus ? "启用" : "停用",
          attr: {
            command: 'disable',
          }
        },
        {
          label: '频次设置',
          attr: {
            command: 'check',
          }
        },
        {
          label: '编辑',
          attr: {
            command: 'edit',
          }
        }
      ]
      if (+row.enableStatus) {
        action.push({
          label: '删除',
          attr: {
            command: 'delete',
          }
        })
      }
      action = [...action, {
        label: '发送明细',
        attr: {
          command: 'push',
        }
      }, {
        label: '操作日志',
        attr: {
          command: 'log',
        }
      }]
      return [
        {
          type: 'button', // 按钮
          attr: {
            icon: 'el-icon-more',
            size: 'mini'
          },
          click: () => {},
          dropdown: true, // 设置了dropdown，组件本身的事件失效
          dropdownConfig: {
            attr: {
              trigger: 'click'
            },
            command: (type, dat, row, index) => tableAction(dat, row, index, type),
            item: action
          }
        }
      ]
    }

  }
}
