import request from '@/utils/request'

/**
 * POST 黑/白名单列表
 * @param params
 * @returns {AxiosPromise}
 */
export function ObNotDisturbListList(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/out/in/platForm/ObNotDisturbListList',
    method: 'POST',
    data
  })
}

/**
 * POST 新增或修改 黑/白名单
 * @param params
 * @returns {AxiosPromise}
 */
export function addOrUpdateObNotDisturb(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/out/in/platForm/addOrUpdateObNotDisturb',
    method: 'POST',
    data
  })
}

// 勿扰库
// 黑名单列表
export function getBlacklists(params) {
  return request({
    url: '/ums/api/ig/v1/blacklists',
    method: 'get',
    params
  })
}
// 添加黑名单
export function setBlacklists(data) {
  return request({
    url: '/ums/api/ig/v1/blacklists',
    method: 'post',
    data: data
  })
}
// 解除黑名单
export function deleteBlack(params) {
  return request({
    url: `/ums/api/ig/v1/blacklists/${params.id}`,
    method: 'DELETE',
  })
}
// 更新黑名单
export function emitBlack(params) {
  return request({
    url: `/ums/api/ig/v1/blacklists/${params.id}`,
    method: 'PUT',
    params: params
  })
}

// 白名单列表
export function getWhitelists(params) {
  return request({
    url: '/ums/api/ig/v1/whitelists',
    method: 'get',
    params
  })
}
// 添加白名单
export function setWhitelists(data) {
  return request({
    url: '/ums/api/ig/v1/whitelists',
    method: 'post',
    data: data
  })
}
// 解除白名单
export function deleteWhite(params) {
  return request({
    url: `/ums/api/ig/v1/whitelists/${params.id}`,
    method: 'DELETE',
  })
}
// 回调数据列表
export function getSuppliercodes(params) {
  return request({
    url: '/ums/api/ig/v1/suppliercodes',
    method: 'get',
    params
  })
}
// 添加回调数据
export function setSuppliercodes(data) {
  return request({
    url: '/ums/api/ig/v1/suppliercodes',
    method: 'post',
    data: data
  })
}
// 更新回调数据
export function emitSuppliercodes(params) {
  return request({
    url: `/ums/api/ig/v1/suppliercodes/${params.id}`,
    method: 'PUT',
    params: params
  })
}
// 解除回调数据
export function deleteSuppliercodes(params) {
  return request({
    url: `/ums/api/ig/v1/suppliercodes/${params.id}`,
    method: 'DELETE',
  })
}
