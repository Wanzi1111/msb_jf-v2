/*
 * @Author: ZhangYeLei
 * @Date: 2022-03-08 11:05:37
 * @LastEditTime: 2022-03-29 11:38:53
 * @LastEditors: ZhangYeLei
 */
import store from '@/store';

const { dinc = {}} = store.state.pushCenter

export const tabList = [
  // {
  //   label: '全部',
  //   value: 'null',
  //   key: 'null'
  // },
  ...dinc.listBusinessType
]

export const actions = ({ handleActions }) => ([{
  type: 'button', // 按钮
  label: '新增科目',
  click: () => handleActions('add'),
  attr: {
    type: 'info',
    plain: true,
    size: 'mini',
    icon: 'el-icon-plus'
  }
}])
