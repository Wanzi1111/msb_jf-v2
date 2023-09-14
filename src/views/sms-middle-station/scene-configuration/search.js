const { listDepartment, listSupplierNameType } = window.baseData
import moment from 'moment'

const searchs = [
  {
    prop: 'twoType',
    label: '分类',
    type: 'cascader', // 选择器,
    defaultVal: [],
    layer: 'middle',
    attr: {
      size: 'small',
      placeholder: '全部',
      clearable: true,
      'collapse-tags': true,
    },
    props: {},
    options: []
  },
  {
    prop: 'SMSType',
    label: '短信类型',
    type: 'cascader', // 级联选择器,
    defaultVal: '',
    layer: 'middle',
    attr: {
      size: 'small',
      placeholder: '全部',
      clearable: true
    },
    options: [
      {
        value: '0',
        label: '国内',
        children: [
          {
            value: '0-0',
            label: '通知短信',
          },
          {
            value: '0-1',
            label: '营销推广短信',
          },
          {
            value: '0-2',
            label: '验证码',
          }
        ]
      },
      {
        value: '1',
        label: '国际',
        children: [
          {
            value: '1-0',
            label: '通知短信',
          },
          {
            value: '1-1',
            label: '营销推广短信',
          },
          {
            value: '1-2',
            label: '验证码',
          }
        ]
      },
    ]
  },
  {
    prop: 'supplierName',
    label: '供应商',
    type: 'select', // 选择器,
    defaultVal: '',
    layer: 'middle',
    attr: {
      size: 'small',
      placeholder: '全部',
      clearable: true
    },
    options: [...listSupplierNameType]
  },
  {
    prop: 'sceneInfoInputSelect',
    label: '场景查询',
    type: 'inputSelect', // 选择器,
    layer: 'middle',
    inputSelect: {
      prop: 'sceneInfoInputSelectProp',
      attr: {
        size: 'small',
      },
      options: [
        {
          label: '场景名称',
          value: 'scenarioName'
        },
        {
          label: '场景ID',
          value: 'scenarioId'
        },
        {
          label: '中台模板ID',
          value: 'templateId'
        }
      ]
    },
    attr: {
      size: 'small',
      placeholder: '请输入'
    }
  },
  {
    prop: 'sceneInfoInputSelectProp',
    defaultVal: 'scenarioName',
    layer: 'middle',
    hide: true,
    visible: false
  },
  {
    prop: 'departmentInfoInputSelect',
    label: '部门查询',
    type: 'inputSelect', // 选择器,
    layer: 'middle',
    inputSelect: {
      prop: 'departmentInfoInputSelectProp',
      attr: {
        size: 'small',
      },
      options: [...listDepartment]
    },
    attr: {
      size: 'small',
      placeholder: '请输入负责人'
    }
  },
  {
    prop: 'departmentInfoInputSelectProp',
    defaultVal: listDepartment?.[0].value,
    layer: 'middle',
    hide: true,
    visible: false
  },
  {
    prop: 'sendTimeList',
    label: '查询时间',
    type: 'daterange',
    defaultVal: [moment().subtract(7, 'days').startOf('day'), moment().endOf('day')],
    layer: 'middle',
    attr: {
      size: 'small',
      // clearable: true,
      placeholder: '选择时间范围',
    }
  },
  {
    prop: 'enableStatus',
    label: '',
    layer: 'middle',
    type: 'checkbox', // 选择器,
    defaultVal: ['0'],
    options: [
      { label: '只查看启用', value: '0' }
    ]
  }
]

export {
  searchs
}
