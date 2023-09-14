import request from '@/utils/request'
/* 查询退款统计接口 */
export function refundStatisticApi(data = {}) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/payment/refundStatistic',
    method: 'post',
    data
  })
}
/* 查询退款详情接口 */
export function refundDetailsApi(data = {}, id) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: `/payment/refundDetail/${id}`,
    method: 'post',
    data
  })
}
