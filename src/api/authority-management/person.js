import request from '@/utils/request'

/**
 * POST 人员列表
 * @param params
 * @returns {AxiosPromise}
 */
export function getUserList(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/uc/api/platform/user/list',
    method: 'POST',
    data
  })
}

/**
 * POST 新增用户
 * @param params
 * @returns {AxiosPromise}
 */
export function addUser(params) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/uc/api/platform/user/add',
    method: 'POST',
    params
  })
}

/**
 * 用户分配角色
 * @param params
 * @returns {AxiosPromise}
 */
export function allotRole(params) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/uc/api/role/alloc',
    method: 'post',
    data: params
  })
}

/**
 * POST 获取用户名
 * @param params
 * @returns {AxiosPromise}
 */
export function getUserName(params) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/uc/api/platform/user/info',
    method: 'GET',
    params
  })
}

/**
 * POST 修改密码
 * @param params
 * @returns {AxiosPromise}
 */
export function resetPassword(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/uc/api/platform/password/reset',
    method: 'POST',
    data
  })
}

/**
 * POST 验证密码
 * @param params
 * @returns {AxiosPromise}
 */
export function checkPassword(params) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/uc/api/platform/password/check',
    method: 'POST',
    params
  })
}
