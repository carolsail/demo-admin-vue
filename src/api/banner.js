import request from '@/utils/request'

export function list(params) {
  return request({
    url: '/banner/index',
    method: 'get',
    params
  })
}
