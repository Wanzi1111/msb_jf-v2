import { login, logout, getInfo, ssoLogin } from '@/api/login/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { setCookies } from '@/utils/cookies'
import { resetRouter } from '@/router'
import { Message } from 'element-ui';
import store from '@/store';

const getDefaultState = () => {
  return {
    token: getToken(),
    userId: '',
    name: '',
    avatar: '',
    keys: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_USERID: (state, userId) => {
    state.userId = userId
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_KEYS: (state, keys) => {
    state.keys = keys
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { mobile, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ ...userInfo, userName: mobile.trim(), password, platform: 'BASE_MP' }).then(response => {
        const { data: { token, name, id }, status } = response
        if (status !== 0) {
          Message({
            type: 'error',
            message: '登录失败'
          })
          reject('denglufail')
        } else {
          // 存储cookie 24小时登陆失效
          setCookies('msb-admin-middle-end', token, 1)
          commit('SET_TOKEN', token)
          commit('SET_NAME', name)
          commit('SET_USERID', id)
          // commit('SET_KEYS', keys)
          setToken(token)
          resolve()
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, keys, id } = data

        commit('SET_NAME', name)
        commit('SET_USERID', id)
        commit('SET_KEYS', keys)
        resolve(keys)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      /*logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })*/
      try {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        store.commit('permission/UP_NEWROUTER', { newRouter: [] })
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  },

  ssoLogin({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      try {
        ssoLogin(params)
          .then(({ token }) => {
            setCookies('msb-admin-middle-end', token, 1)
            setToken(token)
            commit('SET_TOKEN', token)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      } catch (error) {
        reject(error)
      }
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

