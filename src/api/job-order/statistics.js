import request from '@/utils/request'

export function workStatGroupApi(data) {
  return request({
    url: '/work/stat/group',
    method: 'POST',
    data
  })
}

/* 工单多维度数量统计 */
export function statisticsOverviewApi(data) {
  return request({
    url: '/work/stat/overview',
    method: 'post',
    data
  })
}

/* 工单状态统计 */
export function statisticsStatusApi(data) {
  return request({
    url: '/work/stat/process/status',
    method: 'post',
    data
  })
}

/* 工单处理时长统计 */
export function statisticsTimeApi(data) {
  return request({
    url: '/work/stat/handle/period',
    method: 'post',
    data
  })
}

/* 工单受理状态统计 */
export function acceptanceStatisticsStatusApi(data) {
  return request({
    url: '/work/stat//accepted/status',
    method: 'post',
    data
  })
}

