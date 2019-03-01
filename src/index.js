/* core app */

class App {
  static card() {
    return document.querySelector('#image_card')
  }

  static img() {
    return document.querySelector('img#image')
  }

  static name() {
    return document.querySelector('#name')
  }

  static likes() {
    return document.querySelector('#likes')
  }

  static likeBtn() {
    return document.querySelector('#like_button')
  }

  static form() {
    return document.querySelector('form#comment_form')
  }

  static comments() {
    return document.querySelector('#comments')
  }
}

App.api = new ImageAPI()
App.commentAPI = new CommentAPI()
App.image

/* events */

function handleLike(e) {
  likeImage(App.image)
}

function handleSubmit(e) {
  e.preventDefault()
  const content = App.form().querySelector('input[name="comment"]').value
  addComment(App.image, content)
  App.form().reset()
}

function handleDelete(comment) {
  removeComment(comment)
  findCommentElement(comment).remove()
}

document.addEventListener('DOMContentLoaded', () => {
  App.likeBtn().addEventListener('click', handleLike)
  App.form().addEventListener('submit', handleSubmit)

  const imageId = 2122 //Enter the id from the fetched image here
  loadImage(imageId)
})

/* api/data */

function loadImage(id) {
  App.api.find(id)
    .then(image => {
      App.image = image
      renderImage(image)
    })
}

function likeImage(image) {
  App.api.like(image)
  incrementLikes()
}

function addComment(image, content) {
  App.api.comment(image, content)
    .then(renderComment)
}

function removeComment(comment) {
  App.commentAPI.remove(comment)
}

/* dom */

function renderImage(image) {
  App.card().dataset.id = image.id
  App.img().dataset.id = image.id
  App.img().src = image.url

  App.likes().innerText = `${image.like_count} Like(s)`
  App.name().innerText = image.name

  renderComments(image.comments)
}

function renderComments(comments) {
  comments.forEach(renderComment)
}

function renderComment(comment) {
  const li = document.createElement('li')
  li.classList.add('comment')
  li.innerText = comment.content
  li.dataset.id = comment.id

  const deleteBtn = document.createElement('button')
  deleteBtn.innerText = 'x'
  deleteBtn.addEventListener('click', e => handleDelete(comment))
  li.appendChild(deleteBtn)

  App.comments().appendChild(li)
}

function findCommentElement(comment) {
  return document.querySelector(`.comment[data-id="${comment.id}"]`)
}

function incrementLikes() {
  const likes = parseInt(App.likes().innerText)
  App.likes().innerText = `${likes+1} Like(s)`
}