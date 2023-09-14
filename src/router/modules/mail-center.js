/**
 * 工单系统
 */

import Layout from '@/layout'

const mailCenter = {
  path: '/mail-center',
  component: Layout,
  redirect: '/mail-center',
  name: 'MailCenter',
  meta: { title: '邮件服务', icon: 'email' },
  index: 50,
  children: [
    /* 邮件服务 */
    {
      path: 'flow',
      name: 'MailRecord',
      component: () => import('@/views/mail-center/record/index'),
      meta: { title: '邮件记录', icon: '' }
    },
  ]
}

export default mailCenter
