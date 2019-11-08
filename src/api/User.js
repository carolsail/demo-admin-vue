import Base from './Base'
import request from '@/utils/request'

class User extends Base {
  async login(params) {
    const url = `${this.baseUrl()}/login`
    return request.post(url, params)
  }

  async getInfo() {
    const url = `${this.baseUrl()}/verify`
    return request.get(url)
  }

  async refreshToken() {
    const url = `${this.baseUrl()}/refresh`
    return request.get(url)
  }

  async changePassword(params) {
    const url = `${this.baseUrl()}/change/password`
    return request.post(url, params)
  }
}

const api = new User({ controllerName: 'user' })

export default api
