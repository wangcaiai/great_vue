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

export const updataUserInfoAPI = ({ id, username, nickname, email, user_pic }) => {
  return request({
    url: '/my/userinfo',
    method: 'PUT',
    data: {
      id,
      username,
      nickname,
      email,
      user_pic
    }
  })
}

export const updataUserAvatarApi = (avatar) => {
  return request({
    url: '/my/update/avatar',
    method: 'PATCH',
    data: {
      avatar
    }
  })
}

export const updataPwdAPI = ({ old_pwd, new_pwd, re_pwd }) => {
  return request({
    url: '/my/updatepwd',
    method: 'PATCH',
    data: {
      old_pwd,
      new_pwd,
      re_pwd
    }
  })
}

export const getArtCateListAPI = () => {
  return request({
    url: '/my/cate/list'
  })
}

export const AddArtCateAPI = ({ cate_name, cate_alias }) => {
  return request({
    url: '/my/cate/add',
    method: 'POST',
    data: {
      cate_name,
      cate_alias
    }
  })
}

export const UpdataCateAPI = ({ id, cate_name, cate_alias }) => {
  return request({
    url: '/my/cate/info',
    method: 'PUT',
    data: {
      id,
      cate_name,
      cate_alias
    }
  })
}

export const delArtCateAPI = (id) => {
  return request({
    url: '/my/cate/del',
    method: 'delete',
    params: {
      id
    }
  })
}

export const pubArticleAPI = (fd) => {
  return request({
    url: '/my/article/add',
    method: 'POST',
    data: fd
  })
}

export const getArtListAPI = ({ pagenum, pagesize, cate_id, state }) => {
  return request({
    url: '/my/article/list',
    params: {
      pagenum,
      pagesize,
      cate_id,
      state
    }
  })
}

export const getArtDetailAPI = (id) => {
  return request({
    url: '/my/article/info',
    params: {
      id
    }
  })
}

export const delArticleAPI = (id) => {
  return request({
    url: '/my/article/info',
    method: 'DELETE',
    params: {
      id
    }
  })
}
