import request from '@/utils/request'
import Qs from 'qs';

/* 处理时效list */
export function dealTimeListApi(data) {
  return request({
    url: '/work/period/pageList',
    method: 'post',
    data
  })
}

/* 新增和更新处理时效 */
export function dealTimeAddAndUpdateApi(data, url) {
  return request({
    url,
    method: 'post',
    data
  })
}

/* 删除处理时效 */
export function dealTimeDeleteApi(data) {
  return request({
    url: '/work/period/delete',
    method: 'post',
    data
  })
}

/* 开启/关闭处理时效 */
export function dealTimeSwitchApi(data) {
  return request({
    url: '/work/period/turn',
    method: 'post',
    data
  })
}

