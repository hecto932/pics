'use strict'

const { ipcRenderer } = require('electron')

function selectFirstImage () {
  const image = document.querySelector('li.list-group-item:not(.hidden)')
  changeImage(image)
}

function clearImages () {
  const oldImages = document.querySelectorAll('li.list-group-item')
  for (let i = 0; i < oldImages.length; i++) {
    oldImages[i].parentNode.removeChild(oldImages[i])
  }
}

function loadImages (images) {
  const imagesList = document.querySelector('ul.list-group')
  for (let i = 0; i < images.length; ++i) {
    let node = `
      <li class="list-group-item">
        <img
          class="media-object pull-left"
          src="${images[i].src}"
          height="32"
        />
        <div class="media-body">
          <strong>${images[i].filename}</strong>
          <p>${images[i].size}</p>
        </div>
      </li>
    `
    imagesList.insertAdjacentHTML('beforeend', node)
  }
}

function addImagesEvents () {
  const thumbs = document.querySelectorAll('li.list-group-item')

  for (let i = 0; i < thumbs.length; ++i) {
    thumbs[i].addEventListener('click', function () {
      changeImage(this)
    })
  }
}

function changeImage (node) {
  if (node) {
    const selected = document.querySelector('li.selected')
    if (selected) {
      selected.classList.remove('selected')
    }
    node.classList.add('selected')
    document.getElementById('image-displayed').src = node.querySelector('img').src
  } else {
    document.getElementById('image-displayed').src = ''
  }
}

function setIpc () {
  ipcRenderer.on('load-images', (event, images) => {
    clearImages()
    loadImages(images)
    addImagesEvents()
    selectFirstImage()
    console.log(images)
  })
}

function openDirectory() {
  ipcRenderer.send('open-directory', new Date())
}

module.exports = {
  setIpc,
  openDirectory
}