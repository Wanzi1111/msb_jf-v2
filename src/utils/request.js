import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import QS from 'qs'
import { getCookies } from '@/utils/cookies'
import { createBlob } from '@/utils/index'
const validToken = 0;
// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    'common-qs': true // qs在序列化数据的时候有不同的方式，这里表示是否为默认模式
  }
})

// request interceptor
service.interceptors.request.use(
  config => {
    const url = config.url
    store.commit('loading/SET_LOAD', {
      key: url.replace(/\//g, '_'),
      status: true
    })
    // do something before request is sent
    if (config.method === 'post' && config.headers['common-qs'] &&
      config.headers.post['Content-Type'].indexOf('x-www-form-urlencoded') > -1) {
      config.data = QS.stringify(config.data)
    }

    if (!url.includes('/platform/user/login')) {
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    if (!getCookies('msb-admin-middle-end') && !(response.config.url === "/sso/api/v1/token/get")) {
      store.dispatch('user/resetToken').then(() => {
        location.reload()
      })
    } else if (
      response.headers['content-type']?.split(';')[0] === 'application/vnd.ms-excel' ||
      response.request['responseType'] === 'blob'
    ) {
      const filename =
      decodeURI(response.headers['content-disposition']?.split("filename=")[1] ||
      'download.xlsx');
      createBlob(filename, response.data, () => {
        Message({
          type: 'success',
          message: '导出成功'
        })
      })
      const url = response.config.url
      store.commit('loading/SET_LOAD', {
        key: url.replace(/\//g, '_'),
        status: false
      })
      return response.data;
    } else {
      const url = response.config.url
      const isSignature = url.indexOf('/getSignature') >= 0
      const isAli = url.indexOf('aliyuncs.com') >= 0
      store.commit('loading/SET_LOAD', {
        key: url.replace(/\//g, '_'),
        status: false
      })
      const res = response.data
      /*
      * 目前对接的服务，状态码为200的时候，
      * 响应中的status为0代表业务接口请求成功返回正常数据，为1代表业务接口请求失败
      * 当新服务不符合这个规则时记得在这里做判断
      * */
      if (res.code === 0 || res.status === 0 || res.code === 10118 || res.code === 10125 || res.code === 10126) {
        return res
      } else if (isSignature || isAli) {
        return res
      // sso登录
      } else if (url === '/sso/api/v1/token/get' && res.result === 'success') {
        return res
      } else {
        Message({
          message: res.msg || res.errors || res.info || 'Error',
          type: 'error',
          duration: 3 * 1000
        })
      }

      return Promise.reject(new Error(res.msg || res.message || res.info || 'Error'))
    }
  },
  /*
  * 当http状态码为非200时会走error逻辑，比如请求一个不存在的接口时返回404。在登录等权限验证的请求里，返回的状态码可能是401也可能是200
  * 这是由后端决定的，所以写拦截器代码时要视情况来决定是写在error里还是response里
  * */
  error => {
    const { response } = error;
    if (response) {
      const url = error.response.config.url
      store.commit('loading/SET_LOAD', {
        key: url.replace(/\//g, '_'),
        status: false
      })
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    } else {
      console.log(error, 'errorObj')
      if (!window.navigator.onLine) {
        Message({
          message: '网络未连接，请检查您的网络',
          type: 'error',
          duration: 5 * 1000
        })
        const { response, config } = error;
        console.log(config, 'config===')
        const url = error.config.url
        store.commit('loading/SET_LOAD', {
          key: url.replace(/\//g, '_'),
          status: false
        })
      } else {
        return Promise.reject(error)
      }
    }
  }
)

export default service
