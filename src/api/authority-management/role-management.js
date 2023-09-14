import request from '@/utils/request'

/**
 * GET 角色列表
 * @param params
 * @returns {AxiosPromise}
 */
export function getRoleList(params) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/uc/api/role/list',
    method: 'GET',
    params
  })
}

/**
 * GET 角色详情
 * @param params
 * @returns {AxiosPromise}
 */
export function getRoleDetail(params) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/uc/api/role/detail',
    method: 'GET',
    params
  })
}

/**
 * POST 修改角色
 * @param params
 * @returns {AxiosPromise}
 */
export function saveRole(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/uc/api/role/save',
    method: 'POST',
    data
  })
}

// 删除角色前确认
export function delRoleConfirm(data) {
  return request({
    url: '/ums/api/uc/api/role/confirm/delete',
    method: 'POST',
    data
  })
}

// 删除角色
export function delRole(data) {
  return request({
    url: '/ums/api/uc/api/role/delete',
    method: 'POST',
    data
  })
}
