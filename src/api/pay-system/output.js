import request from '@/utils/request'
/* 查询出款列表接口 */
export function payoutListApi(data = {}) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/payment/payoutList',
    method: 'post',
    data
  })
}
/* 查询出款统计接口 */
export function payoutStatisticApi(data = {}) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/payment/payoutStatistic',
    method: 'post',
    data
  })
}
/* 查询出款详情接口 */
export function payoutDetailsApi(id) {
  return request({
    url: `/payment/payoutDetail/${id}`,
    method: 'get',
  })
}
/* 查询出款状态枚举接口 */
export function payoutStatusListApi() {
  return request({
    url: '/payment/payoutStatus',
    method: 'get'
  })
}
