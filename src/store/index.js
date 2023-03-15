import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { getUserInfoAPI } from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // 存放数据，和data类似
    token: '',
    userInfo: {}
  },
  getters: { // 相当于计算属性
    username (state) {
      return state.userInfo.username
    },
    nickname: state => state.userInfo.nickname,
    user_pic: state => state.userInfo.user_pic
  },
  mutations: { // 修改State和getters的数据
    updateToken (state, newToken) {
      state.token = newToken
    },
    updataUserInfo (state, newUserInfo) {
      state.userInfo = newUserInfo
    }
  },
  actions: { // 发起异步请求
    async getUserInfoActios (store) {
      const res = await getUserInfoAPI()
      store.commit('updataUserInfo', res.data.data)
    }
  },
  modules: { // 模块拆分
  },
  plugins: [
    createPersistedState()
  ] // 插件
})
