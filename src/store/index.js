import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // 存放数据，和data类似
    token: ''
  },
  getters: { // 相当于计算属性
  },
  mutations: { // 修改State和getters的数据
    updateToken (state, newToken) {
      state.token = newToken
    }
  },
  actions: { // 发起异步请求
  },
  modules: { // 模块拆分
  }
})
