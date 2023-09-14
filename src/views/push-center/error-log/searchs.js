/*
 * @Author: ZhangYeLei
 * @Date: 2022-03-30 18:24:28
 * @LastEditTime: 2022-04-15 14:36:22
 * @LastEditors: ZhangYeLei
 */
import moment from 'moment';
import store from '@/store';

const { dinc = {}} = store.state.pushCenter

export default [
  {
    prop: 'businessType',
    label: '业务线',
    type: 'select',
    layer: 'middle',
    options: dinc.listBusinessType,
    attr: {
      placeholder: '请选择业务线',
      clearable: true
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
    hide: true,
    visible: false
  },
  {
    prop: 'applyId',
    label: '推送应用',
    layer: 'middle',
    type: 'select',
    attr: {
      placeholder: '全部',
      clearable: true
    },
    options: [...dinc.listApply]
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
]
