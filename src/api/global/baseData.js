import request from '@/utils/request'

/**
 * GET 通话状态字典
 * @param params
 * @returns {AxiosPromise}
 */
export function getChannelAndCallStatus() {
  return request({
    url: '/ums/api/out/in/platForm/getChannelAndCallStatus',
    method: 'GET'
  })
}

/**
 * GET 供应商 黑名单字典
 * @param params
 * @returns {AxiosPromise}
 */
export function getBusinessTypeSupplierNameList() {
  return request({
    url: '/ums/api/out/in/platForm/getBusinessTypeSupplierNameList',
    method: 'GET'
  })
}

/**
 * GET 供应商 运营商字典
 * @param params
 * @returns {AxiosPromise}
 */
export function selectDinc() {
  return request({
    url: '/ums/api/sms/api/messagePlatForm/selectDinc',
    method: 'GET'
  })
}

// 勿扰库所以枚举数据
export function getBlacklistsOptions() {
  return request({
    url: '/ums/api/ig/v1/blacklists/option',
    method: 'GET'
  })
}
