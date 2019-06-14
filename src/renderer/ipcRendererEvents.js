'use strict'

const { ipcRenderer } = require('electron')

function setIpc () {
  ipcRenderer.on('pong', (event, arg) => {
    console.log('pong received', arg)
  })
}

function sendIpc() {
  ipcRenderer.send('ping', new Date())
}

module.exports = {
  setIpc,
  sendIpc
}