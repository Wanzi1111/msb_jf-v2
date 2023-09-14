const { allCallStatusList } = window.baseData

const searchs = [
  {
    prop: 'channelId',
    label: '业务渠道',
    type: 'select', // 选择器,
    layer: 'middle',
    attr: {
      size: 'small',
      placeholder: '全部',
      clearable: true
    },
    options: []
  },
  {
    prop: 'userInfo',
    label: 'ID查询',
    type: 'inputSelect', // 选择器,
    layer: 'middle',
    inputSelect: {
      prop: 'userInfoInputSelectProp',
      attr: {
        size: 'small',
      },
      options: [
        {
          label: 'UID',
          value: '1'
        },
        {
          label: '业务请求ID',
          value: '2'
        }
      ]
    },
    attr: {
      size: 'small',
      placeholder: '请输入'
    }
  },
  {
    prop: 'userInfoInputSelectProp',
    defaultVal: '1',
    hide: true,
    visible: false
  },
  {
    prop: 'timeInfo',
    label: '时间范围',
    type: 'datePickerSelect', //时间选择器
    layer: 'middle',
    inputSelect: {
      prop: 'timeType',
      attr: {
        size: 'small',
      },
      options: [
        {
          label: '创建时间',
          value: '0'
        },
        {
          label: '开始时间',
          value: '1'
        },
        {
          label: '接通时间',
          value: '2'
        },
        {
          label: '结束时间',
          value: '3'
        }
      ]
    },
    attr: {
      size: 'small',
      placeholder: '选择时间范围'
    }
  },
  {
    prop: 'timeType',
    defaultVal: '0',
    hide: true,
    visible: false
  },
  {
    prop: 'intentionCode',
    label: '用户意向',
    type: 'select',
    layer: 'middle',
    attr: {
      size: 'small',
      placeholder: '全部',
      clearable: true
    },
    options: []
  },
  {
    prop: 'callStatus',
    label: '通话状态',
    type: 'select',
    layer: 'middle',
    attr: {
      size: 'small',
      placeholder: '全部',
      clearable: true
    },
    options: allCallStatusList
  },
  {
    prop: 'serviceSubjectId',
    label: '服务主体',
    type: 'inputSelect', // 选择器,
    layer: 'middle',
    inputSelect: {
      prop: 'serviceSubjectType',
      attr: {
        size: 'small',
      },
      options: [
        {
          label: '销售',
          value: '1'
        },
        {
          label: '班主任',
          value: '2'
        },
        {
          label: '客服',
          value: '3'
        }
      ]
    },
    attr: {
      size: 'small',
      placeholder: '请输入ID'
    }
  },
  {
    prop: 'serviceSubjectType',
    defaultVal: '2',
    hide: true,
    visible: false
  },
]

export {
  searchs
}
