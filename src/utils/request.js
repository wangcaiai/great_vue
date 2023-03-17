import router from '@/router'
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
export const baseURL = 'http://big-event-vue-api-t.itheima.net'
const myAxios = axios.create({
  baseURL
})
// 定义请求拦截器
myAxios.interceptors.request.use((config) => {
  // 在请求前会触发一次
  if (store.state.token) {
    config.headers.Authorization = store.state.token
  }
  return config
}, function (error) {
  return Promise.reject(error)
}
)

// 定义响应拦截器
myAxios.interceptors.response.use((response) => {
  return response
},
(error) => {
  if (error.response.status === 401) {
    // token过期
    // 清楚vuex数据，跳转登录
    store.commit('updateToken', '')
    store.commit('updataUserInfo', {})
    router.push('/login')
    Message.error('用户身份已过期，请重新登录')
  }
  return Promise.reject(error)
}
)
export default myAxios
