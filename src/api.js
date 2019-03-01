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

  id(image_or_id) {
    if (typeof image_or_id === 'object' && 'id' in image_or_id)
      return image_or_id.id
    else
      return image_or_id
  }

  find(id) {
    return this.request(`${this.endpoint}/${id}`)
  }

  like(image) {
    const id = this.id(image)
    const likeAPI = new LikeAPI()
    return likeAPI.likeImage(id)
  }

  comment(image, content) {
    const id = this.id(image)
    const commentAPI = new CommentAPI()
    return commentAPI.commentImage(id, content)
  }
}

class LikeAPI extends BaseAPI {
  constructor() {
    super()
    this.endpoint = 'likes'
  }

  likeImage(imageId) {
    return this.post(this.endpoint, {image_id: imageId})
  }
}

class CommentAPI extends BaseAPI {
  constructor() {
    super()
    this.endpoint = 'comments'
  }

  commentImage(imageId, content) {
    return this.post(this.endpoint, {
      image_id: imageId,
      content: content
    })
  }
}