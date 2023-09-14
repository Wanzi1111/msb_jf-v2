import request from '@/utils/request'
/* 查询支付配置接口 */
export function payConfigListApi(data = {}) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/payment/payConfig',
    method: 'post',
    data
  })
}
/* 更新支付配置接口 */
export function putPayConfigApi(data = {}) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/payment/savePayPrd',
    method: 'post',
    data
  })
}
/* 查询支付产品的日交易总数 */
export function prdTradeCountApi(payProductCode) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: `/payment/prdTradeCount/${payProductCode}`,
    method: 'post',
  })
}
/* 开启通道接口 */
export function openChannelApi(data = {}) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/payment/updatePayPrd',
    method: 'post',
    data
  })
}

