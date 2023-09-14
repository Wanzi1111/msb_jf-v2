import request from '@/utils/request'

/**
 * POST 外呼记录列表
 * @param params
 * @returns {AxiosPromise}
 */
export function obQualityInspectionRecordList(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/out/in/platForm/obQualityInspectionRecordList',
    method: 'POST',
    data
  })
}

/**
 * POST 用户意向map
 * @param params
 * @returns {AxiosPromise}
 */
export function selectObdictionary(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/out/in/platForm/selectObdictionary',
    method: 'POST',
    data
  })
}
