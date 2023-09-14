/**
 * 呼叫中台
 */

import Layout from '@/layout'

const callRouter = {
  path: '/call-center',
  component: Layout,
  redirect: '/call-center/record',
  alwaysShow: true,
  name: 'CallCenter',
  meta: { title: '呼叫中台', icon: 'chart' },
  index: 30,
  children: [
    {
      path: 'record',
      name: 'OutboundCallRecord',
      component: () => import('@/views/call-center/record/index'),
      meta: { title: '外呼记录', icon: '' }
    },
    {
      path: 'channel',
      name: 'BusinessChannel',
      component: () => import('@/views/call-center/channel/index'),
      meta: { title: '业务渠道', icon: '' }
    }
  ]
}

export default callRouter
