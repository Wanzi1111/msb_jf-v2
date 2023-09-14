/*
 * @Author: ZhangYeLei
 * @Date: 2022-02-15 16:22:15
 * @LastEditTime: 2022-05-19 11:11:14
 * @LastEditors: ZhangYeLei
 */
import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI, { Table } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css
import '@/styles/element-variables.scss'
import EleMateriel from '@msb/ele-materiel'
import '@msb/ele-materiel/lib/css/ele-materiel.css'

import App from './App'
import store from './store'
import router from './router'
window.baseData = {}

import '@/icons' // icon
import '@/permission' // permission control
import '@/components/component-automation'
import '@/globalConfig'

// import * as Sentry from '@sentry/vue'
// import { Integrations } from '@sentry/tracing'
// import { version, dsn } from '@/settings'

// if (process.env.VUE_APP_SENTRY_ENV === 'prod') {
//   Sentry.init({
//     Vue,
//     dsn,
//     release: `msb-admin-middle-end@${version}`,
//     environment: process.env.NODE_ENV,
//     integrations: [new Integrations.BrowserTracing()],
//     tracesSampleRate: 1.0
//   })
// }

// 解决 ElTable 自动宽度高度导致的「ResizeObserver loop limit exceeded」问题
const fixElTableErr = table => {
  const oldResizeListener = table.methods.resizeListener
  table.methods.resizeListener = function() {
    window.requestAnimationFrame(oldResizeListener.bind(this))
  }
}
// 一定要在Vue.use之前执行此函数
fixElTableErr(Table)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
// import { mockXHR } from '../mock'
// if (process.env.NODE_ENV === 'production') {
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, { locale, size: 'small', zIndex: 3000 })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.use(EleMateriel)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
