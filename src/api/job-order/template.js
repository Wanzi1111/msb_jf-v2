import request from '@/utils/request'

// 工单字段列表
export function orderTemplateFieldApi(data) {
  return request({
    url: '/work/template/order/field',
    method: 'post',
    data
  })
}

// 模板详情
export function orderTemplateInfoApi(data) {
  return request({
    url: '/work/template/templateInfo',
    method: 'post',
    data
  })
}

// 模板列表

export function orderTemplateListApi(data) {
  return request({
    url: '/work/template/templateList',
    method: 'post',
    data
  })
}

// 增加和更新工单模板
// '/work/template/updateTemplate' /work/template/insertTemplate
export function addAndUpdateOrderTemplateApi(data, url) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url,
    method: 'post',
    data
  });
}

// 删除模板/work/template/deleteTemplate
export function deleteOrderTemplateApi(data) {
  return request({
    url: '/work/template/deleteTemplate',
    method: 'post',
    data
  });
}
