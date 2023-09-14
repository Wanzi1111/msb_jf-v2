/*
 * @Author: ZhangYeLei
 * @Date: 2022-03-07 11:45:54
 * @LastEditTime: 2022-03-28 16:50:22
 * @LastEditors: ZhangYeLei
 */
import store from '@/store';

const { dinc = {}} = store.state.pushCenter

export const tabList = [
  {
    label: '全部',
    value: 0,
  },
  ...dinc.listMessageType
]

export const actions = ({ handleActions }) => ([{
  type: 'button', // 按钮
  label: '新增push模板',
  click: () => handleActions('add'),
  attr: {
    type: 'info',
    plain: true,
    size: 'mini',
    icon: 'el-icon-plus'
  }
}])
