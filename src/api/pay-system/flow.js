import request from '@/utils/request'
/* 查询支付列表接口 */
export function payListApi(data = {}) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/payment/payList',
    method: 'post',
    data
  })
}
/* 查询支付统计接口 */
export function payStatisticApi(data = {}) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/payment/payStatistic',
    method: 'post',
    data
  })
}
/* 查询支付详情接口 */
export function payDetailsApi(data = {}, id) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: `/payment/payDetail/${id}`,
    method: 'post',
    data
  })
}
