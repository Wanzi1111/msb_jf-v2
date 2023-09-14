/**
 * 工单系统
 */

import Layout from '@/layout'

const paySystemRouter = {
  path: '/pay-system',
  component: Layout,
  redirect: '/pay-system/flow',
  name: 'PaySystem',
  meta: { title: '支付系统', icon: 'money' },
  index: 20,
  children: [
    /* 支付流水 - 支付列表 */
    {
      path: 'flow',
      name: 'PaySystemFlow',
      component: () => import('@/views/pay-system/flow/index'),
      meta: { title: '支付流水', icon: '' }
    },
    /* 支付流水 - 支付详情 */
    {
      path: 'flow/details',
      name: 'PaySystemFlowDetails',
      component: () => import('@/views/pay-system/flow/details'),
      meta: { title: '支付详情', activeMenu: '/pay-system/flow' },
      hidden: true
    },
    /* 退款流水 - 退款列表 */
    {
      path: 'list',
      name: 'PaySystemRefund',
      component: () => import('@/views/pay-system/refund/index'),
      meta: { title: '退款流水', icon: '' }
    },
    /* 退款流水 - 退款详情 */
    {
      path: 'user/details',
      name: 'PaySystemRefundDetails',
      component: () => import('@/views/pay-system/refund/details'),
      meta: { title: '退款详情', activeMenu: '/pay-system/user' },
      hidden: true
    },
    /* 出款流水 - 出款列表 */
    {
      path: 'output',
      name: 'PaySystemOutput',
      component: () => import('@/views/pay-system/output/index'),
      meta: { title: '出款流水', icon: '' }
    },
    /* 出款流水 - 出款详情 */
    {
      path: 'output/details',
      name: 'PaySystemOutputDetails',
      component: () => import('@/views/pay-system/output/details'),
      meta: { title: '出款详情', activeMenu: '/pay-system/output' },
      hidden: true
    },
    /* 支付配置 */
    {
      path: 'config',
      name: 'PaySystemConfig',
      component: () => import('@/views/pay-system/config/index'),
      meta: { title: '支付配置', icon: '' }
    }
  ]
}

export default paySystemRouter
