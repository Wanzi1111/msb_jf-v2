import request from '@/utils/request'

// 接入权限管理新登陆接口
export function login(params) {
  return request({
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
    url: '/ums/api/uc/api/platform/user/login',
    method: 'post',
    params
  })
}

// 修改密码
export async function modPwd(data) {
  return request('/ums/api/uc/api/user/pwd/mod', {
    method: 'POST',
    data,
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    },
  })
}

export function getInfo(token) {
  return request({
    url: '/ums/api/uc/api/platform/user/login/info',
    method: 'get',
    headers: {
      token
    }
  })
}

// 接入sso登陆
export function ssoLogin(params) {
  return request({
    url: '/sso/api/v1/token/get',
    method: 'get',
    params
  })
}

// export function logout() {
//   return request({
//     url: '/user/logout',
//     method: 'post'
//   })
// }
