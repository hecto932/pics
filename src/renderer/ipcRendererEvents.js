'use strict'

const { ipcRenderer } = require('electron')

function setIpc () {
  ipcRenderer.on('pong', (event, arg) => {
    console.log('pong received', arg)
  })
}

function openDirectory() {
  ipcRenderer.send('open-directory', new Date())
}

module.exports = {
  setIpc,
  openDirectory
}