import request from '@/utils/request'

/**
 * POST 邮件发送记录接口
 * @param params
 * @returns {AxiosPromise}
 */
export function selectMailRecordList(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/sms/api/v1/mail/selectMailRecordList',
    method: 'POST',
    data
  })
}

/**
 * POST 邮件场景列表接口
 * @param params
 * @returns {AxiosPromise}
 */
export function selectMailSceneList(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/sms/api/v1/mail/selectMailSceneList',
    method: 'POST',
    data
  })
}

