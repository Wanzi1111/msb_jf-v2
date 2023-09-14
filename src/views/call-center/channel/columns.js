export default [
  {
    prop: 'channel',
    slot: 'channel',
    label: '渠道ID/名称',
    align: 'left',
    width: 150
  },
  {
    prop: 'supplier',
    slot: 'supplier',
    label: '供应商/模板ID',
    align: 'left'
  },
  {
    prop: 'time',
    slot: 'time',
    label: '创建/更新时间',
    align: 'left',
    width: 200,
  },
  {
    action: true,
    prop: 'statusName',
    label: '状态',
    name: 'tag',
    align: 'center',
    width: 200
  },
  {
    action: true,
    name: 'action',
    width: 200,
    prop: 'action',
    label: '操作',
    align: 'center',
    fixed: 'right'
  }
]

export const actions = ({ tableAction }) => {
  return {
    tag: (dat, row, index) => {
      const type = ['success', 'danger', 'info']
      const isEnableList = ['启用中', '已停用']
      const isNormalList = ['正常', '异常', '待测']
      return [
        {
          type: 'tag',
          label: isEnableList[+row.isEnable],
          attr: {
            type: type[+row.isEnable]
          }
        },
        {
          type: 'tag',
          label: isNormalList[row.isNormal],
          attr: {
            type: type[row.isNormal]
          }
        }
      ]
    },
    action: (dat, row, index) => {
      let action = []
      action = [
        {
          label: +row.isEnable ? '启用' : '停用',
          attr: {
            command: 'enable',
          }
        },
        {
          label: '测试',
          attr: {
            command: 'test',
          }
        }
      ]
      if (+row.isEnable) {
        action.push({
          label: '修改',
          attr: {
            command: 'updata',
          // icon: 'el-icon-delete'
          }
        })
      }
      action.push({
        label: '配置',
        attr: {
          command: 'edit',
        }
      })
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
