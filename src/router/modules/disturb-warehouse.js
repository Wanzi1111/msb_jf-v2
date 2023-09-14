/**
 * 勿扰库
 */

import Layout from '@/layout'

const callRouter = {
  path: '/disturb-warehouse',
  component: Layout,
  redirect: '/disturb-warehouse/blacklist',
  alwaysShow: true,
  name: 'DisturbWarehouse',
  meta: { title: '勿扰库', icon: 'disturb' },
  index: 45,
  children: [
    {
      path: 'blacklist',
      name: 'newBlackListWarehouse',
      component: () => import('@/views/disturb-warehouse/blacklist/index'),
      meta: { title: '黑名单', icon: '' }
    },
    {
      path: 'whitelist',
      name: 'newWhiteListWarehouse',
      component: () => import('@/views/disturb-warehouse/whitelist/index'),
      meta: { title: '白名单', icon: '' }
    },
    {
      path: 'callbacklist',
      name: 'Callbacklist',
      component: () => import('@/views/disturb-warehouse/callbacklist/index'),
      meta: { title: '回调列表', activeMenu: '/disturb-warehouse/blacklist' },
      hidden: true
    },
  ]
}

export default callRouter

