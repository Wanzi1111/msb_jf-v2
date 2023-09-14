import request from '@/utils/request'

/**
 * POST 获取短信记录列表
 * @param params
 * @returns {AxiosPromise}
 */
export function selectSmsRecordList(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/sms/api/messagePlatForm/selectSmsRecordList',
    method: 'POST',
    data
  })
}

/**
 * POST 导出短信记录
 * @param params
 * @returns {AxiosPromise}
 */
export function downLoadSmsRecord(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    responseType: 'blob',
    url: '/ums/api/sms/api/messagePlatForm/downLoadSmsRecord',
    method: 'POST',
    data,
    timeout: 60 * 1000
  })
}
