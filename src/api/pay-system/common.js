import request from '@/utils/request'
/* 查询业务方接口 */
export function payBusinessApi(data = {}) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/payment/biz',
    method: 'post',
    data
  })
}
/* 查询支付场景接口 */
export function paySceneApi(data = {}) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/payment/scene',
    method: 'post',
    data
  })
}
/* 查询支付渠道接口 */
export function payPrividerApi(data = {}) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/payment/provider',
    method: 'post',
    data
  })
}
/* 查询支付产品接口 */
export function payProductApi(data = {}) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/payment/payProduct',
    method: 'post',
    data
  })
}
/* 查询出款产品接口 */
export function payoutProductApi() {
  return request({
    url: '/payment/payoutProduct',
    method: 'get',
  })
}
/* 查询支付状态接口 */
export function payStatusApi(data = {}) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/payment/payStatus',
    method: 'post',
    data
  })
}
/* 查询退款状态接口 */
export function refundStatusApi(data = {}) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/payment/refundStatus',
    method: 'post',
    data
  })
}
/* 退款流水接口 */
export function refundListApi(data = {}) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/payment/refundList',
    method: 'post',
    data
  })
}
