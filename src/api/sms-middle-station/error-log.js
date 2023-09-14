import request from '@/utils/request'

/**
 * POST 获取错误列表
 * @param params
 * @returns {AxiosPromise}
 */
export function selectSmsErrLogParamList(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/sms/api/messagePlatForm/selectSmsErrLogParamList',
    method: 'POST',
    data
  })
}

/**
 * POST 导出
 * @param params
 * @returns {AxiosPromise}
 */
export function downloadSmsErrLogParamList(params) {
  return request({
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    responseType: 'blob',
    url: '/ums/api/sms/api/messagePlatForm/downloadSmsErrLogParamList',
    method: 'GET',
    params,
    timeout: 60 * 1000
  })
}
