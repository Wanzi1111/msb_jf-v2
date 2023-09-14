/*
 * @Author: ZhangYeLei
 * @Date: 2022-03-28 11:32:13
 * @LastEditTime: 2022-04-19 15:03:22
 * @LastEditors: ZhangYeLei
 */

import { selectDinc, selectPushScenarioTypeList } from '@/api/push-center/index';
import { resolve } from '@sentry/utils';

const state = {
  dinc: {}, // push字典
  dincMap: {}, // push字典映射
  typeList: [] // 一级科目列表
}

const mutations = {
  UP_DINC: (state, dincData) => {
    state.dinc = { ...dincData }
  },
  UP_DINCMAP: (state, dincDataMp) => {
    state.dincMap = { ...dincDataMp }
  },
  UP_TYPELIST: (state, typeListData) => {
    state.typeList = [...typeListData]
  },
}

const actions = {
  getDinc({ commit }, payload) {
    return new Promise(async(resolve) => {
      if (state.dinc && JSON.stringify(state.dinc) !== '{}') {
        resolve()
        return
      }
      const dincRes = await selectDinc()
      const dincMap = {}
      Object.keys(dincRes.payload).forEach(v => {
        const itemMap = {}
        dincRes.payload[v].forEach(val => {
          val.label = val.desc
          val.value = val.code || val.id
          itemMap[val.code || val.id] = val.desc
        })
        dincMap[`${v}_map`] = itemMap
      })
      commit('UP_DINC', dincRes.payload)
      commit('UP_DINCMAP', dincMap)
      resolve()
    })
  },
  // 对一级科目、二级分类操作之后缓存要更新
  updateTypeList({ commit }) {
    return new Promise(async(resolve) => {
      const res = await selectPushScenarioTypeList({ pageNum: 1, pageSize: 9999, parentId: 0 })
      res.payload.list.forEach(v => {
        v.label = v.typeName
        v.value = v.id
        v.leaf = false
      })
      commit('UP_TYPELIST', res.payload.list)
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

