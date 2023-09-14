/*
 * @Author: ZhangYeLei
 * @Date: 2022-03-28 14:50:51
 * @LastEditTime: 2022-05-17 14:56:28
 * @LastEditors: ZhangYeLei
 */

import request from '@/utils/request'

// 获取 场景分类列表
export function selectPushScenarioTypeList(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/sms/api/push/selectPushScenarioTypeList',
    method: 'POST',
    data
  })
}

// 获取 字典列表
export function selectDinc() {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/sms/api/push/selectDinc',
    method: 'get',
  })
}

// 获取 push模板
export function selectPushMessageTemplateList(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/sms/api/push/selectPushMessageTemplateList',
    method: 'post',
    data
  })
}

// 新增/更新 push模板
export function addOrUpdatePushMessageTemplate(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/sms/api/push/v2/addOrUpdatePushMessageTemplate',
    method: 'post',
    data
  })
}

// 新增/更新 场景配置
export function addOrUpdatePushScenarioConfiguration(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/sms/api/push/addOrUpdatePushScenarioConfiguration',
    method: 'post',
    data
  })
}

// 查询 场景配置
export function selectPushScenarioConfigurationList(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/sms/api/push/selectPushScenarioConfigurationList',
    method: 'post',
    data,
    timeout: 30 * 1000
  })
}

// 查询 场景模板表
export function selectPushScenarioTemplateList(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/sms/api/push/selectPushScenarioTemplateList',
    method: 'post',
    data,
    timeout: 30 * 1000
  })
}

// 新增/更新 场景分类
export function addOrUpdatePushScenarioType(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/sms/api/push/addOrUpdatePushScenarioType',
    method: 'post',
    data
  })
}

// 查询 操作记录
export function selectOperation(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/sms/api/push/selectOperation',
    method: 'post',
    data
  })
}

// 查询 push记录
export function selectPushRecordList(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/sms/api/push/selectPushRecordList',
    method: 'post',
    data,
    timeout: 60 * 1000
  })
}

// 查询 错误日志
export function selectPushErrLogParamList(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/sms/api/push/selectPushErrLogParamList',
    method: 'post',
    data
  })
}

// 导出 push纪录
export function downLoadPushRecord(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/sms/api/push/downLoadPushRecord',
    method: 'post',
    data,
    responseType: 'blob'
  })
}

// 导出 错误日志
export function downloadPushErrLogList(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/sms/api/push/downloadPushErrLogList',
    method: 'post',
    data,
    responseType: 'blob'
  })
}

// 导出 场景列表
export function downLoadPushScenarioConfigurationList(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/sms/api/push/downLoadPushScenarioConfigurationList',
    method: 'post',
    data,
    responseType: 'blob'
  })
}

// 查询 场景发送明细
export function selectPushScenarioSendStatisticsList(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/sms/api/push/selectPushScenarioSendStatisticsList',
    method: 'post',
    data,
  })
}

// 查询 应用配置信息
export function selectPushApplyConfigList(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/sms/api/push/selectPushApplyConfigList',
    method: 'post',
    data,
  })
}

// 设置 设置通知条数
export function addOrUpdatePushApplyConfig(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/sms/api/push/addOrUpdatePushApplyConfig',
    method: 'post',
    data,
  })
}
