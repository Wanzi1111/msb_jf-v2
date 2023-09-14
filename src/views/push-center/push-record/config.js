/*
 * @Author: ZhangYeLei
 * @Date: 2022-03-30 18:24:28
 * @LastEditTime: 2022-04-19 16:32:02
 * @LastEditors: ZhangYeLei
 */
import store from '@/store';

export const tabList = [
  // {
  //   label: '全部',
  //   value: 'null',
  //   key: 'null'
  // },
  ...store.state.pushCenter.dinc?.listBusinessType
]

export const statusList = [
  {
    label: '全部',
    value: '-1',
  },
  {
    label: '待处理',
    value: '0'
  },
  {
    label: '推送成功',
    value: '1'
  },
  {
    label: '处理中',
    value: '2'
  },
  {
    label: '推送失败',
    value: '3'
  },
]

export const statusMap = statusList.map(v => ({ [v.value]: v.label }))
export const statusTypeMap = ['info', 'success', '', 'danger']
