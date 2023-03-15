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
    component: () => import('@/views/layout'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home')
      },
      {
        path: '/user-info',
        component: () => import('@/views/user/userInfo.vue')
      },
      {
        path: '/user-avatar',
        component: () => import('@/views/user/userAvatar.vue')
      },
      {
        path: '/user-Pwd',
        component: () => import('@/views/user/userPwd.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
const whiteList = ['/login', '/reg']

// 全局前置路由守卫
router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (token) {
    // 登录了
    if (!store.state.userInfo.username) {
      store.dispatch('getUserInfoActios')
    }
    next()
  } else {
    // 未登录
    // 如果去白名单页面则放行
    if (whiteList.includes(to.path)) {
      next()
    } else {
      // 如果其他页面请强制拦截并跳转到登录页面
      next('/login')
    }
  }
})

export default router
