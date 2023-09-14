/*
 * @Author: ZhangYeLei
 * @Date: 2022-03-28 10:53:40
 * @LastEditTime: 2022-04-19 15:01:59
 * @LastEditors: ZhangYeLei
 */
import router from './router'
import store from './store'

router.beforeEach(async(to, from, next) => {
  const pushCenterPath = '/push-center'
  const pushTypeListPath = ['/push-center/push-record', '/push-center/sence-list']

  if (to.path.includes(pushCenterPath)) {
    await store.dispatch('pushCenter/getDinc')
  }
  if (pushTypeListPath.includes(to.path)) {
    await store.dispatch('pushCenter/updateTypeList')
  }
  next()
})
