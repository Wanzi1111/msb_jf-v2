/*
 * @Author: ZhangYeLei
 * @Date: 2022-03-07 11:45:54
 * @LastEditTime: 2022-04-11 14:48:34
 * @LastEditors: ZhangYeLei
 */

import moment from 'moment';
import store from '@/store';

const { dinc = {}} = store.state.pushCenter

export const defaultValObj = {
  time: [moment().subtract(7, 'days').startOf('day'), moment().endOf('day')]
}

export default [
  {
    prop: 'templateId',
    label: '模板ID',
    type: 'input',
    attr: {
      placeholder: '请输入模板ID',
      clearable: true
    }
  },
  {
    prop: 'supplierId',
    label: '供应商',
    type: 'select', // 选择器,
    defaultVal: '',
    attr: {
      size: 'small',
      placeholder: '全部',
      clearable: true
    },
    options: [...dinc.listSupplierNameType]
  },
  {
    prop: 'applyId',
    label: '推送应用',
    type: 'select',
    attr: {
      placeholder: '全部',
      clearable: true
    },
    options: [...dinc.listApply]
  },
  {
    prop: 'templateTitle',
    label: '标题',
    type: 'input',
    attr: {
      placeholder: '请输入标题',
      clearable: true
    }
  },
  {
    prop: 'time',
    label: '查询时间',
    type: 'daterange',
    defaultVal: defaultValObj.time,
    layer: 'middle',
    attr: {
      size: 'small',
      // clearable: true,
      placeholder: '选择时间范围',
    }
  },
]
