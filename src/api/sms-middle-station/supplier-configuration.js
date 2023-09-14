import request from '@/utils/request'

/**
 * POST 获取短信模板列表
 * @param params
 * @returns {AxiosPromise}
 */
export function selectSmsMessageTemplateList(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/sms/api/messagePlatForm/selectSmsMessageTemplateList',
    method: 'POST',
    data
  })
}
