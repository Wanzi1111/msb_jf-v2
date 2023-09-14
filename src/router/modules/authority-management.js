/**
 * 权限管理
 */

import Layout from '@/layout'

const callRouter = {
  path: '/authority-management',
  component: Layout,
  redirect: '/authority-management/person-list',
  alwaysShow: true,
  name: 'AuthorityManagement',
  meta: { title: '权限管理', icon: 'user' },
  index: 60,
  children: [
    {
      path: 'person-list',
      name: 'PersonList',
      component: () => import('@/views/authority-management/person-list/index'),
      meta: { title: '用户列表', icon: '' }
    },
    {
      path: 'role-management',
      name: 'RoleManagement',
      component: () => import('@/views/authority-management/role-management/index'),
      meta: { title: '角色管理', icon: '' }
    },
    {
      path: 'resource-management',
      name: 'ResourceManagement',
      component: () => import('@/views/authority-management/resource-management/index'),
      meta: { title: '资源管理', icon: '' }
    }
  ]
}

export default callRouter

