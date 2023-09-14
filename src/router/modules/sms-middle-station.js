/**
 * 短信中台
 */

import Layout from '@/layout'

const callRouter = {
  path: '/sms-middle-station',
  component: Layout,
  redirect: '/sms-middle-station/scene-configuration',
  alwaysShow: true,
  name: 'SMSMiddleStation',
  meta: { title: '短信中台', icon: 'example' },
  index: 10,
  children: [
    {
      path: 'scene-configuration',
      name: 'SceneConfiguration',
      component: () => import('@/views/sms-middle-station/scene-configuration'),
      meta: { title: '短信场景', icon: '', keepAlive: true },
      children: [
        {
          path: 'sms-secondary',
          name: 'SMSSecondary',
          component: () => import('@/views/sms-middle-station/scene-configuration/sms-secondary'),
          hidden: true,
          meta: { title: '发送明细', icon: '' }
        },
        {
          path: 'operation-log',
          name: 'OperationLog',
          component: () => import('@/views/sms-middle-station/scene-configuration/operation-log'),
          hidden: true,
          meta: { title: '操作日志', icon: '' }
        }
      ]
    },
    {
      path: 'sms-record',
      name: 'SMSRecord',
      component: () => import('@/views/sms-middle-station/sms-record'),
      meta: { title: '短信记录', icon: '' }
    },
    // {
    //   path: 'sms-statistics',
    //   name: 'SMSStatistics',
    //   alwaysShow: true,
    //   redirect: '/sms-middle-station/sms-statistics/error-log',
    //   component: () => import('@/views/sms-middle-station/sms-statistics'),
    //   meta: { title: '短信报表', icon: '' },
    //   children: [
    //   ]
    // },
    {
      path: 'configure',
      name: 'Configure',
      alwaysShow: true,
      component: () => import('@/views/sms-middle-station/configure'),
      redirect: '/sms-middle-station/configure/sms-template',
      meta: { title: '系统配置', icon: '' },
      children: [
        {
          path: 'sms-template',
          name: 'SMSTemplate',
          component: () => import('@/views/sms-middle-station/sms-template'),
          meta: { title: '短信模板', icon: '', keepAlive: true },
          children: [
            {
              path: 'sms-templates',
              name: 'SMSTemplates',
              component: () => import('@/views/sms-middle-station/sms-template/sms-templates'),
              hidden: true,
              meta: { title: '批量创建短信模板', icon: '' }
            },
            {
              path: 'sms-operation-log',
              name: 'SMSOperationLog',
              component: () => import('@/views/sms-middle-station/sms-template/sms-operation-log'),
              hidden: true,
              meta: { title: '操作日志', icon: '' }
            }
          ]
        },
        {
          path: 'classification-configuration',
          name: 'ClassificationConfiguration',
          component: () => import('@/views/sms-middle-station/configure/classification-configuration'),
          meta: { title: '场景分类', icon: '', keepAlive: true },
          children: [
            {
              path: 'secondary-classification',
              name: 'SecondaryClassification',
              component: () => import('@/views/sms-middle-station/configure/classification-configuration/secondary-classification'),
              hidden: true,
              meta: { title: '二级分类', icon: '' }
            }
          ]
        }
        // {
        //   path: 'supplier-configuration',
        //   name: 'SupplierConfiguration',
        //   component: () => import('@/views/sms-middle-station/configure/supplier-configuration'),
        //   meta: { title: '供应商配置', icon: '' }
        // }
      ]
    },
    {
      path: 'error-log',
      name: 'ErrorLog',
      component: () => import('@/views/sms-middle-station/sms-statistics/error-log'),
      meta: { title: '错误日志', icon: '', keepAlive: true },
      children: [
        {
          path: 'error-report',
          name: 'ErrorReport',
          component: () => import('@/views/sms-middle-station/sms-statistics/error-log/error-report'),
          hidden: true,
          meta: { title: '错误报告', icon: '' }
        }
      ]
    }
  ]
}

export default callRouter

