import request from '@/utils/request'

export function orderCateListApi(data) {
  return request({
    url: '/work/classify/tree',
    method: 'post',
    data
  })
}

export function orderCateAddApi(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/work/classify/add',
    method: 'post',
    data
  })
}

export function orderCateUpdateApi(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/work/classify/update',
    method: 'post',
    data
  })
}

export function orderCateDeleteApi(data) {
  return request({
    url: '/work/classify/delete',
    method: 'post',
    data
  })
}

// 获取技能组成员树
export function groupUserTreeApi() {
  return request({
    url: '/work/user/tree',
    method: 'post'
  })
}
