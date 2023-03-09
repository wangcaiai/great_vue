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
