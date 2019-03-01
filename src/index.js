class App {
  static img() {
    return document.querySelector('img#image')
  }

  static name() {
    return document.querySelector('#name')
  }

  static likes() {
    return document.querySelector('#likes')
  }

  static form() {
    return document.querySelector('form#comment_form')
  }

  static comments() {
    return document.querySelector('#comments')
  }
}

App.imageAPI = new ImageAPI()
App.image

document.addEventListener('DOMContentLoaded', () => {
  let imageId = 2122 //Enter the id from the fetched image here
  document.querySelector('#like_button').addEventListener('click', handleLike)
  loadImage(imageId)
})

/* api/data */

function loadImage(id) {
  App.imageAPI.find(id)
    .then(image => {
      App.image = image
      renderImage(image)
    })
}

function likeImage(image) {
  App.imageAPI.like(image)
  incrementLikes()
}

/* dom */

function renderImage(image) {
  App.img().src = image.url
  App.likes().innerText = `${image.like_count} Like(s)`
  App.name().innerText = image.name
  renderComments(image.comments)
}

function renderComments(comments) {
  const container = App.comments()
  comments.forEach(c => renderComment(c, container))
}

function renderComment(comment, parent) {
  const li = document.createElement('li')
  li.innerText = comment.content
  parent.appendChild(li)
}

function incrementLikes() {
  const likes = parseInt(App.likes().innerText)
  App.likes().innerText = `${likes+1} Like(s)`
}

/* events */

function handleLike(e) {
  likeImage(image)
}