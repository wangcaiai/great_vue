// 封装具体接口方法
import request from '@/utils/request'

export const regsisterAPI = ({ username, password, repassword }) => {
  return request({
    url: '/api/reg',
    method: 'POST',
    data: {
      username,
      password,
      repassword
    }
  })
}

export const loginAPI = ({ username, password }) => {
  return request({
    url: '/api/login',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}

export const getUserInfoAPI = () => {
  return request({
    url: '/my/userinfo'
  })
}

export const getMenusListAPI = () => {
  return request({
    url: '/my/menus'
  })
}
