'use strict'

const { ipcRenderer } = require('electron')
const { clearImages, loadImages, addImagesEvents, selectFirstImage } = require('./images-iu')

function setIpc () {
  ipcRenderer.on('load-images', (event, images) => {
    console.log(images)
    clearImages()
    loadImages(images)
    addImagesEvents()
    selectFirstImage()
  })
}

function openDirectory() {
  ipcRenderer.send('open-directory', new Date())
}

module.exports = {
  setIpc,
  openDirectory
}