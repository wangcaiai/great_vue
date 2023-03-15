import store from '@/store'
import axios from 'axios'

const myAxios = axios.create({
  baseURL: 'http://big-event-vue-api-t.itheima.net'
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
export default myAxios
