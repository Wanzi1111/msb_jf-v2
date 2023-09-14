import request from '@/utils/request'

/**
 * POST 业务渠道列表
 * @param params
 * @returns {AxiosPromise}
 */
export function listObBusinessChannels(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/out/in/platForm/listObBusinessChannels',
    method: 'POST',
    data
  })
}

/**
 * POST 添加/修改渠道信息
 * @param params
 * @returns {AxiosPromise}
 */
export function addOrUpdateObBusinessChannel(params) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/out/in/platForm/addOrUpdateObBusinessChannel',
    method: 'POST',
    params
  })
}

/**
 * POST 测试
 * @param params
 * @returns {AxiosPromise}
 */
export function testChannelIsOk(params) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/out/in/platForm/testChannelIsOk',
    method: 'POST',
    params
  })
}

/**
 * POST 获取渠道配置项 list
 * @param params
 * @returns {AxiosPromise}
 */
export function listObdictionary(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/out/in/platForm/listObdictionary',
    method: 'POST',
    data
  })
}

/**
 * POST 修改渠道配置项 list
 * @param params
 * @returns {AxiosPromise}
 */
export function addObdictionary(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/out/in/platForm/addObdictionary',
    method: 'POST',
    data
  })
}
