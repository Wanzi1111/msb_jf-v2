/**
 * push中台
 */

import Layout from '@/layout'

export default {
  path: '/push-center',
  component: Layout,
  redirect: '/push-center/sence-list',
  alwaysShow: true,
  name: 'PushCenter',
  meta: { title: 'push中台', icon: 'wechat' },
  index: 5,
  children: [
    {
      path: 'sence-list',
      name: 'PushSenceList',
      component: () => import('@/views/push-center/sence-list'),
      // component: () => import('@/views/push-center/system-setting/push-templete/add-push-temp/index'),
      meta: { title: 'PUSH场景' },
    },
    {
      path: 'sence-detail',
      name: 'PushSenceDetail',
      component: () => import('@/views/push-center/sence-list/sence-detail/index'),
      meta: { title: '场景发送明细', },
      activeMenu: '/push-center/sence-list',
      hidden: true
    },
    {
      path: 'sence-log',
      name: 'PushSenceLog',
      component: () => import('@/views/push-center/sence-list/sence-log/index'),
      meta: { title: '场景操作日志', },
      activeMenu: '/push-center/sence-log',
      hidden: true
    },
    {
      path: 'push-record',
      name: 'PushRecord',
      component: () => import('@/views/push-center/push-record/index'),
      meta: { title: 'PUSH记录', }
    },
    {
      path: 'system-setting',
      name: 'PushSystemSetting',
      redirect: '/push-center/system-setting/push-templete',
      component: () => import('@/views/push-center/system-setting/index'),
      meta: { title: '系统配置', },
      children: [
        {
          path: 'push-templete',
          name: 'PushTemplete',
          component: () => import('@/views/push-center/system-setting/push-templete/index'),
          meta: { title: 'push模版', }
        },
        {
          path: 'push-temp-log',
          name: 'PushTempLog',
          component: () => import('@/views/push-center/system-setting/push-templete/push-temp-log/index'),
          meta: { title: 'push模版操作日志', },
          hidden: true
        },
        {
          path: 'add-push-temp',
          name: 'AddPushTemp',
          component: () => import('@/views/push-center/system-setting/push-templete/add-push-temp/index'),
          meta: { title: '新增push模板', },
          hidden: true
        },
        {
          path: 'app-manage',
          name: 'PushAppManage',
          component: () => import('@/views/push-center/system-setting/app-manage/index'),
          meta: { title: '应用管理', }
        },
        {
          path: 'sence-classification',
          name: 'PushSenceClassification',
          component: () => import('@/views/push-center/system-setting/sence-classification/index'),
          meta: { title: '场景分类', }
        },
        {
          path: 'classification-detail',
          name: 'PushSenceClassificationDetail',
          component: () => import('@/views/push-center/system-setting/sence-classification/classification-detail/index'),
          meta: { title: '分类', },
          hidden: true
        },
      ]
    },
    {
      path: 'error-log',
      name: 'PushErrorLog',
      component: () => import('@/views/push-center/error-log/index'),
      meta: { title: '错误日志', }
    },
    {
      path: 'error-log-detail',
      name: 'PushErrorLogDetail',
      component: () => import('@/views/push-center/error-log/log-detail/index'),
      meta: { title: '错误日志详情', },
      hidden: true
    }
  ]
}

