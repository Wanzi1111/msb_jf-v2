import request from '@/utils/request'

/**
 * POST 获取一级分类列表
 * @param params
 * @returns {AxiosPromise}
 */
export function selectSmsOneTypeList(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/sms/api/messagePlatForm/selectSmsOneTypeList',
    method: 'POST',
    data
  })
}

/**
 * POST 新增一级分类
 * @param params
 * @returns {AxiosPromise}
 */
export function addOrUpdateSmsOneType(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/sms/api/messagePlatForm/addOrUpdateSmsOneType',
    method: 'POST',
    data
  })
}

/**
 * POST 获取二级分类列表
 * @param params
 * @returns {AxiosPromise}
 */
export function selectSmsTwoTypeList(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/sms/api/messagePlatForm/selectSmsTwoTypeList',
    method: 'POST',
    data
  })
}

/**
 * POST 新增二级分类
 * @param params
 * @returns {AxiosPromise}
 */
export function addOrUpdateSmsTwoType(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/sms/api/messagePlatForm/addOrUpdateSmsTwoType',
    method: 'POST',
    data
  })
}

