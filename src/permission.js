/*
 * @Descripttion:
 * @version:
 * @Author: gaoleifang
 * @Date: 2020-08-22 18:07:02
 * @LastEditors: gaoleifang
 * @LastEditTime: 2020-08-22 18:12:34
 */
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'
import { getToken } from '@/utils/auth' // get token from cookie
import router from './router'
import store from './store'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // sso登录操作必须调整到/login页面处理
  if (to.query.auth_code) {
    if (to.path !== '/login') {
      let path = `/login?auth_code=${to.query.auth_code}`
      // 保留重定向
      if (to.query.redirect) {
        path += `&redirect=${to.query.redirect}`
      }
      // 登录之前先登出清除缓存
      await store.dispatch('user/logout')
      next({ path })
      NProgress.done()
      return
    }
  }

  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoles = !!store.getters.newRouter?.length
      if (hasRoles) {
        next()
      } else {
        try {
          await store.dispatch('user/getInfo')
          const newRouter = await store.dispatch('permission/generateRoutes')
          router.addRoutes(newRouter)
          if (JSON.stringify(window.baseData) === '{}' || to.path === '/call-center/record' || to.path === '/call-center/channel') {
          // 全局字典获取
            await store.dispatch('global/handleBaseData')
          }
          next({ ...to, replace: true })
        } catch (error) {
        // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      /* 暂时跳过登录验证 */
      // next()
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
