import store from '@/store'
import router, { Routes } from '@/router'

const state = {
  newRouter: []
}

const mutations = {
  UP_NEWROUTER: (state, { newRouter }) => {
    state['newRouter'] = newRouter
  }
}

const actions = {
  generateRoutes({ commit }) {
    return new Promise(resolve => {
      const keys = store.getters && store.getters.keys
      // eslint-disable-next-line no-inner-declarations
      function filterItem(children) {
        let index = 0
        while (index < children.length) {
          const i = keys.indexOf(children[index].name)
          if (i === -1 && children[index].name !== '*') {
            children.splice(index, 1)
            index--
          }
          index++
        }
        for (let index = 0; index < children.length; index++) {
          if (children[index].children) {
            filterItem(children[index].children)
          }
        }
      }
      const newRouter = [...Routes]
      filterItem(newRouter)
      const { options: { routes }} = router
      commit('UP_NEWROUTER', { newRouter: routes.concat(newRouter) })
      resolve(newRouter)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

