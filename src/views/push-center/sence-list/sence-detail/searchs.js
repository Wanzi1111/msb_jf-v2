/*
 * @Author: ZhangYeLei
 * @Date: 2022-03-30 18:24:28
 * @LastEditTime: 2022-04-21 11:46:29
 * @LastEditors: ZhangYeLei
 */
import moment from 'moment';

export default [
  {
    prop: 'templateId',
    label: '中台模板id',
    type: 'input', // 选择器,
    layer: 'middle',
    defaultVal: '',
    attr: {
      size: 'small',
      placeholder: '请输入',
      clearable: true
    },
    // options: [...listSupplierNameType]
  },
  // {
  //   prop: 'type',
  //   label: '设备类型',
  //   type: 'select',
  //   layer: 'middle',
  //   attr: {
  //     placeholder: '请选择设备类型',
  //     clearable: true
  //   }
  // },
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
