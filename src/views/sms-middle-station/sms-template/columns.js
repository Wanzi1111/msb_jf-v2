export default [
  {
    prop: 'templateId',
    slot: 'templateId',
    label: '模板ID',
    align: 'left',
    width: 160,
  },
  {
    prop: 'signature',
    slot: 'signature',
    label: '签名',
    align: 'left',
    width: 160,
  },
  {
    prop: 'messageContent',
    slot: 'messageContent',
    label: '模版内容',
    align: 'left',
    width: 600,
  },
  {
    prop: 'numberWords',
    slot: 'numberWords',
    sortable: 'custom',
    label: '字数/拆分条数',
    align: 'left',
    width: 150
  },
  {
    action: true,
    name: 'tag',
    prop: 'auditStatus',
    label: '审核状态',
    width: 200,
    align: 'center'
  },
  {
    prop: 'remark',
    label: '备注',
    align: 'left'
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
  return {
    tag: (dat, row, index) => {
      const type = ['danger', 'success']
      const isEnableList = ['未审核', '已审核']
      return [
        {
          type: 'tag',
          label: isEnableList[+row.auditStatus],
          attr: {
            type: type[+row.auditStatus]
          }
        }
      ]
    },
    action: (dat, row, index) => {
      const action = [
        {
          label: '审核',
          attr: {
            command: 'audit',
          }
        },
        {
          label: '测试',
          attr: {
            command: 'test',
          }
        },
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
          label: '操作日志',
          attr: {
            command: 'log',
          }
        }
      ]
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
