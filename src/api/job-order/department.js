import request from '@/utils/request'

// 获取技能组列表
export function groupListApi(data) {
  return request({
    url: '/work/group/user',
    method: 'POST',
    data
  })
}

// 添加技能组
export function groupAddApi(data) {
  return request({
    url: '/work/group/add',
    method: 'POST',
    data
  })
}

// 编辑技能组
export function groupUpdateApi(data) {
  return request({
    url: '/work/group/update',
    method: 'POST',
    data
  })
}

// 删除技能组
export function groupDeleteApi(data) {
  return request({
    url: '/work/group/delete',
    method: 'POST',
    data
  })
}

// 搜索技能组成员
export function userNameSearchApi(data) {
  return request({
    url: '/work/user/nameSearch',
    method: 'POST',
    data
  })
}

// 添加技能组成员
export function userAddApi(data) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },

    url: '/work/user/add',
    method: 'POST',
    data
  })
}

// 删除技能组成员
export function userDeleteApi(data) {
  return request({
    url: '/work/user/delect',
    method: 'POST',
    data
  })
}

// 技能组成员列表
export function userListApi(data) {
  return request({
    url: '/work/user/user',
    method: 'POST',
    data
  })
}

// 搜索用户下拉框
export function userSearchApi(data) {
  return request({

    url: '/work/user/search',
    method: 'POST',
    data
  })
}

// 同步成员列表
export function userSelectListApi(data) {
  return request({
    url: '/work/user/selectList',
    method: 'POST',
    data
  })
}

// 模糊检索用户下拉框
export function userDropdownApi(data) {
  return request({
    url: '/work/user/dropdown',
    method: 'POST',
    data
  })
}
