const { listBusinessType } = window.baseData
import moment from 'moment'

const searchs = [
  {
    prop: 'businessType',
    label: '业务线',
    type: 'select', // 选择器,
    defaultVal: '',
    layer: 'middle',
    attr: {
      size: 'small',
      placeholder: '全部',
      clearable: true
    },
    options: [...listBusinessType]
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
    prop: 'signature',
    label: '短信签名',
    type: 'select', // 选择器,
    defaultVal: '',
    layer: 'middle',
    attr: {
      size: 'small',
      placeholder: '全部',
      clearable: true,
      filterable: true,
      'default-first-option': true
    },
    options: []
  },
  {
    prop: 'daterange',
    label: '时间范围',
    type: 'daterange',
    defaultVal: [moment().startOf('day'), moment().endOf('day')],
    layer: 'middle',
    attr: {
      size: 'small',
      clearable: true,
      placeholder: '选择时间范围',
    }
  }
]

export {
  searchs
}
