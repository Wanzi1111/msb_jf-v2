/*
 * @Author: ZhangYeLei
 * @Date: 2022-01-26 16:00:06
 * @LastEditTime: 2022-04-19 14:42:16
 * @LastEditors: ZhangYeLei
 */
const loading = {}
const apiFile = require.context('@/api', true, /\.js$/)
apiFile.keys().reduce((modules, modulePath) => {
  for (const key in apiFile(modulePath)) {
    const str1 = apiFile(modulePath)[key].toString().split(`url: '`)[1]
    if (str1) {
      const str = str1.split(`',`)[0]
      const strArr = str.replace(/\//g, '_')
      loading[strArr] = false
    }
  }
}, {})

const state = {
  loadings: loading
}
const mutations = {
  SET_LOAD: (state, { key, status }) => {
    console.log('loading~~~】', key, status);
    state.loadings[key] = status;
  }
}

const actions = {
  // 待填充啦
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
