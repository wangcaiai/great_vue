import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/elementUI'
import '@/assets/global.less'
import VueQuillEditor from 'vue-quill-editor'
import dayjs from 'dayjs'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
Vue.prototype.$formatDate = (dateObj) => {
  return dayjs(dateObj).format('YYYY-MM-DD hh:mm:ss')
}
Vue.use(VueQuillEditor)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
