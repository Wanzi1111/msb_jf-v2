import request from '@/utils/request'

/**
 * POST 获取场景配置列表
 * @param params
 * @returns {AxiosPromise}
 */
export function selectSmsScenarioConfigurationList(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/sms/api/messagePlatForm/selectSmsScenarioConfigurationList',
    method: 'POST',
    data
  })
}

/**
 * POST 导出场景配置列表
 * @param params
 * @returns {AxiosPromise}
 */
export function downLoadSmsScenarioConfigurationList(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    responseType: 'blob',
    url: '/ums/api/sms/api/messagePlatForm/downLoadSmsScenarioConfigurationList',
    method: 'POST',
    data,
    timeout: 60 * 1000
  })
}

/**
 * POST 导出场景明细
 * @param params
 * @returns {AxiosPromise}
 */
export function downLoadDetailSmsScenarioList(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    responseType: 'blob',
    url: '/ums/api/sms/api/messagePlatForm/downLoadDetailSmsScenarioList',
    method: 'POST',
    data,
    timeout: 60 * 1000
  })
}

/**
 * POST 添加场景配置
 * @param params
 * @returns {AxiosPromise}
 */
export function addOrUpdateSmsScenarioConfiguration(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/sms/api/messagePlatForm/addOrUpdateSmsScenarioConfiguration',
    method: 'POST',
    data
  })
}

/**
 * POST 获取历史模板ID
 * @param params
 * @returns {AxiosPromise}
 */
export function selectSmsScenarioTemplateList(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/sms/api/messagePlatForm/selectSmsScenarioTemplateList',
    method: 'POST',
    data
  })
}

/**
 * POST 获取明细列表
 * @param params
 * @returns {AxiosPromise}
 */
export function selectDetailSmsScenarioList(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/sms/api/messagePlatForm/selectDetailSmsScenarioList',
    method: 'POST',
    data
  })
}

/**
 * POST 获取操作日志
 * @param params
 * @returns {AxiosPromise}
 */
export function selectOperation(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/sms/api/messagePlatForm/selectOperation',
    method: 'POST',
    data
  })
}
