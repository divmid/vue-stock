import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function getUserList() {
  return request({
    url: '/user/',
    method: 'get',
  })
}
export function getUserDetail(id) {
  return request({
    url: '/user/'+String(id)+'/',
    method: 'get',
  })
}


export function addUser(data) {
    return request({
      url: '/user/',
      method: 'post',
      data
    })
}

export function putUser(id, data) {
    return request({
      url: '/user/'+String(id)+'/',
      method: 'put',
      data
    })
}

export function deleteUser(id) {
    return request({
      url: '/user/'+ String(id)+'/',
      method: 'delete',
    })
}

export function changePassword(data) {
  return request({
    url: 'user/password',
    method: 'post',
    data
  })
}