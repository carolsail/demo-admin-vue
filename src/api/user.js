import Base from './Base'
import request from '@/utils/request'

class User extends Base {

  async login(params) {
    const url = `${this.baseUrl()}/get`
    const data = { account: params.username, password: params.password }
    return request.post(url, data)
  }

  async getInfo() {
    const url = `${this.baseUrl()}/current`
    return request.get(url)
  }

  async logout() {
    const url = `${this.baseUrl()}/logout`
    return request.get(url)
  }
}

const api = new User({ controllerName: 'token' })

export default api
