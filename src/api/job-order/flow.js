import request from '@/utils/request'
import Qs from 'qs';

/* 流转配置list */
export function orderFlowListApi(data) {
  return request({
    url: '/work/condition/user',
    method: 'post',
    data
  })
}

/* 添加配置 */
export function orderFlowAddAndUpdateApi(data, url) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url,
    method: 'post',
    data
  })
}

/* 更改配置 */
export function orderFlowUpdateApi(data) {
  return request({
    url: '/work/condition/update',
    method: 'post',
    data
  })
}

/* 更改配置状态 */
export function orderFlowDeleteApi(data) {
  return request({
    url: '/work/condition/delete',
    method: 'post',
    data
  })
}

/* 获取工单技能组 */
export function orderFnListApi() {
  return request({
    url: '/work/group/user',
    method: 'post',
  })
}

