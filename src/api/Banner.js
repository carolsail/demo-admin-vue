import Base from './Base'
import request from '@/utils/request'

class Banner extends Base {
  async export(params) {
    const url = `${this.baseUrl()}/export`
    return request.get(url, { params })
  }
}

const api = new Banner({ controllerName: 'banner' })

export default api
