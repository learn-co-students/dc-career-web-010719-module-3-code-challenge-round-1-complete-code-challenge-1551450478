class BaseAPI {
  constructor() {
    this.base = 'https://randopic.herokuapp.com'
  }

  async request(endpoint, opts) {
    const url = `${this.base}/${endpoint}`
    return fetch(url, opts).then(res => res.json())
  }

  send(endpoint, obj, method = "POST") {
    const url = ('id' in obj) ? `${endpoint}/${obj.id}` : endpoint

    const opts = {
      method: method,
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(obj)
    }

    return this.request(url, opts)
  }

  post(endpoint, obj) {
    return this.send(endpoint, obj, "POST")
  }

  patch(endpoint, obj) {
    return this.send(endpoint, obj, "PATCH")
  }

  delete(endpoint, obj) {
    const url = `${endpoint}/${obj.id}`
    return this.request(url, {method: "DELETE"})
  }
}

class ImageAPI extends BaseAPI {
  constructor() {
    super()
    this.endpoint = 'images'
  }

  find(id) {
    return this.request(`${this.endpoint}/${id}`)
  }
}