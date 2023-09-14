import moment from 'moment';
import store from '@/store';
import { selectPushScenarioTypeList } from '@/api/push-center/index';

const { typeList = [], dinc = {}} = store.state.pushCenter

export default [
  {
    prop: 'type',
    label: '场景分类',
    type: 'cascader', // 选择器,
    layer: 'middle',
    attr: {
      size: 'small',
      placeholder: '请选择场景分类',
      clearable: true,
      'collapse-tags': true,
    },
    options: [],
    props: {
      lazy: true,
      multiple: true,
      lazyLoad(node, resolve) {
        if (node?.level !== 1) {
          resolve()
          return
        }
        if (node.data) {
          selectPushScenarioTypeList({
            parentId: node.data.value,
            pageNum: 1,
            pageSize: 9999
          }).then(res => {
            if (res?.code === 0) {
              const { payload: { list }} = res
              const nodes = list?.map((item) => {
                return {
                  label: item.typeName,
                  value: item.id,
                  leaf: true
                } || []
              })
              resolve(nodes)
            }
          })
        }
      }
    }
  },
  {
    prop: 'messageType',
    label: '消息类型',
    type: 'select',
    layer: 'middle',
    attr: {
      placeholder: '请选择消息类型',
      clearable: true
    },
    options: dinc.listMessageType
  },
  {
    prop: 'applyId',
    label: '推送应用',
    type: 'select',
    layer: 'middle',
    attr: {
      placeholder: '全部',
      clearable: true
    },
    options: [...dinc.listApply]
  },
  {
    prop: 'supplierId',
    label: '供应商',
    type: 'select', // 选择器,
    layer: 'middle',
    attr: {
      size: 'small',
      placeholder: '全部',
      clearable: true
    },
    options: dinc.listSupplierNameType
  },
  // {
  //   prop: 'type',
  //   label: '设备类型',
  //   type: 'select',
  //   attr: {
  //     placeholder: '请选择设备类型',
  //     clearable: true
  //   }
  // },
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
        },
        {
          label: '消息ID',
          value: 'msgId'
        },
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
    hide: true,
    visible: false
  },
  {
    prop: 'leader',
    label: '部门查询',
    type: 'inputSelect', // 选择器,
    layer: 'middle',
    inputSelect: {
      prop: 'leaderSelectProp',
      attr: {
        size: 'small',
      },
      options: dinc.listDepartment
    },
    attr: {
      size: 'small',
      placeholder: '请输入负责人'
    }
  },
  {
    prop: 'leaderSelectProp',
    defaultVal: dinc?.listDepartment?.[0].value,
    layer: 'middle',
    hide: true,
    visible: false
  },
  {
    prop: 'time',
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
    prop: 'sendCode',
    label: '错误码',
    type: 'input', // 选择器,
    layer: 'middle',
    attr: {
      clearable: true,
      placeholder: '请输入错误码',
    }
  }
]
