/*
 * @Author: ZhangYeLei
 * @Date: 2022-03-02 16:19:27
 * @LastEditTime: 2022-03-28 11:34:30
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

export const actions = ({ handleActions }) => ([{
  type: 'button', // 按钮
  label: '新增push场景',
  click: () => handleActions('add'),
  attr: {
    type: 'info',
    plain: true,
    size: 'mini',
    icon: 'el-icon-plus'
  }
}])
