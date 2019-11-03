import request from '@/utils/request'

export default class Base {
  constructor({ prefix = undefined, version = undefined, controllerName }) {
    this.prefix = prefix || 'api'
    this.version = version || 'v1'
    this.controllerName = controllerName
  }

  baseUrl() {
    const url = `/${this.prefix}/${this.version}/${this.controllerName}`
    return url.toLowerCase()
  }

  async list({ page = 1, limit = 1, sort = 'id', order = 'desc', filter = {}, op = {}}) {
    const url = `${this.baseUrl()}/index`
    const params = {
      offset: (page - 1) * limit,
      limit,
      sort,
      order,
      filter,
      op
    }
    return request.get(url, { params })
  }

  async create(data) {
    const url = `${this.baseUrl()}/create`
    return request.post(url, { data })
  }

  async edit(data) {
    const url = `${this.baseUrl()}/edit`
    return request.post(url, { data })
  }

  async delete(ids) {
    const params = { ids: ids }
    const url = `${this.baseUrl()}/delete`
    return request.get(url, { params })
  }

  async info(id) {
    const url = `${this.baseUrl()}/info/` + id
    return request.get(url)
  }
}
