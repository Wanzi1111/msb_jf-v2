import request from '@/utils/request'

/**
 * GET 资源管理列表
 * @param params
 * @returns {AxiosPromise}
 */
export function getTreeList(params) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/uc/api/res/tree',
    method: 'GET',
    params
  })
}

/**
 * POST 修改资源
 * @param params
 * @returns {AxiosPromise}
 */
export function save(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/uc/api/res/save',
    method: 'POST',
    data
  })
}

// 删除资源
export function delResource(data) {
  return request({
    url: '/ums/api/uc/api/res/delete',
    method: 'POST',
    data
  })
}
