/**
 * 勿扰设置
 */

import Layout from '@/layout'

const callRouter = {
  path: '/do-not-disturb',
  component: Layout,
  redirect: '/do-not-disturb/blacklist',
  alwaysShow: true,
  name: 'DoNotDisturb',
  meta: { title: '勿扰设置旧', icon: 'disturb' },
  index: 40,
  children: [
    {
      path: 'blacklist',
      name: 'BlackList',
      component: () => import('@/views/do-not-disturb/blacklist/index'),
      meta: { title: '黑名单', icon: '' }
    },
    {
      path: 'whitelist',
      name: 'WhiteList',
      component: () => import('@/views/do-not-disturb/whitelist/index'),
      meta: { title: '白名单', icon: '' }
    },
  ]
}

export default callRouter

