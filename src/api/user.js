import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/token/get',
    method: 'post',
    data: {
      account: data.username, 
      password: data.password
    }
  })
}

export function getInfo() {
  return request({
    url: '/token/current',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/token/logout',
    method: 'get'
  })
}
