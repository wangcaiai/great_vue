import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/reg',
    component: () => import('@/views/register')
  },
  {
    path: '/',
    component: () => import('@/views/layout')
  }
]

const router = new VueRouter({
  routes
})

// 全局前置路由守卫
router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (token && !store.state.userInfo.username) {
    store.dispatch('getUserInfoActios')
  }
  next()
})

export default router
