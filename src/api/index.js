// 封装具体接口方法
import request from '@/utils/request'

export const regsisterAPI = () => {
  return request({
    url: '/api/reg',
    method: 'post',
    data: {
      username: '123',
      password: '123',
      repassword: '123'
    }
  })
}
