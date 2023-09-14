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

/**
 * POST 新增短信模板
 * @param params
 * @returns {AxiosPromise}
 */
export function addOrUpdateSmsMessageTemplate(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/sms/api/messagePlatForm/addOrUpdateSmsMessageTemplate',
    method: 'POST',
    data
  })
}

/**
 * POST 检测手机号
 * @param params
 * @returns {AxiosPromise}
 */
export function testTemplte(params) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/sms/api/v1/messageMobile/testTemplte',
    method: 'POST',
    params
  })
}

/**
 * POST 获取阿里和腾讯模板内容
 * @param params
 * @returns {AxiosPromise}
 */
export function selectAliTxyunTemplate(params) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/sms/api/messagePlatForm/selectAliTxyunTemplate',
    method: 'POST',
    params
  })
}

/**
 * POST 下载模板
 * @param params
 * @returns {AxiosPromise}
 */
export function getTemplate() {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    responseType: 'blob',
    url: '/ums/api/sms/api/messagePlatForm/getTemplate',
    method: 'GET',
    timeout: 60 * 1000
  })
}

/**
 * POST 导入模板
 * @param params
 * @returns {AxiosPromise}
 */
export function importTemplate({ file, onUploadProgress }) {
  const data = new FormData()
  data.append('file', file)
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/sms/api/messagePlatForm/importTemplate',
    method: 'POST',
    data,
    onUploadProgress: onUploadProgress,
    timeout: 60 * 1000
  })
}
