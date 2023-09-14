/*
 * @Author: ZhangYeLei
 * @Date: 2021-09-27 14:54:06
 * @LastEditTime: 2022-03-28 17:04:36
 * @LastEditors: ZhangYeLei
 */
import { getChannelAndCallStatus, getBusinessTypeSupplierNameList, selectDinc, getBlacklistsOptions } from '@/api/global/baseData'

const state = {
  baseData: {}
}

const mutations = {
  UP_BASEDATA: (state, { baseData }) => {
    state['baseData'] = baseData
  }
}

const actions = {
  handleBaseData({ commit }) {
    let newBaseData = {}
    let mapObjData = {}
    let winNewBaseData = {}
    return Promise.all([getChannelAndCallStatus(), getBusinessTypeSupplierNameList(), selectDinc(), getBlacklistsOptions()]).then(res => {
      res.forEach((v) => {
        if (v?.payload) {
          for (const item in v.payload) {
            if (Array.isArray(v.payload[item])) { // 如果当前项是数组就改变item名
              Object.keys(v.payload)?.forEach(vv => {
                v.payload[vv] = v.payload[vv].map(vvv => {
                  return {
                    ...vvv,
                    value: vvv.channelId || vvv.code,
                    key: vvv.channelId || vvv.code,
                    label: vvv.channelName || vvv.desc
                  }
                })
              })
            } else {
              if (v.payload[item].key) {
                const keyObj = v.payload[item].key || {}
                const newData = { [item + 'List']: [] }
                for (const jtem in keyObj) {
                  newData[item + 'List'].push({
                    value: jtem,
                    key: jtem,
                    label: keyObj[jtem]
                  })
                }
                mapObjData = { ...mapObjData, ...newData }
              }
            }
          }
          newBaseData = { ...newBaseData, ...v?.payload, ...mapObjData }
          for (const item in newBaseData) { // 循环判断只放入处理好的数组枚举数据
            if (Array.isArray(newBaseData[item])) {
              winNewBaseData = {
                ...winNewBaseData,
                [item]: newBaseData[item]
              }
            }
          }
        }
      })
      window.baseData = winNewBaseData
      commit('UP_BASEDATA', { baseData: newBaseData })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

