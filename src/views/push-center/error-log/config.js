/*
 * @Author: ZhangYeLei
 * @Date: 2022-03-30 18:24:28
 * @LastEditTime: 2022-04-15 14:38:14
 * @LastEditors: ZhangYeLei
 */
import store from '@/store';

export const tabList = [
  {
    label: '全部',
    value: '0',
    key: '0'
  },
  ...store.state.pushCenter.dinc?.listSupplierNameType
]
