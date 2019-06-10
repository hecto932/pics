'use strict'

const debug = require('debug')('electron-app:index')
const path = require('path')
const { app, BrowserWindow } = require('electron')

// Adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')()

// Prevent window being garbage collected
let mainWindow

function onClosed () {
  // Dereference the window
  // For multiple windows store them in an array
  mainWindow = null
}

function createMainWindow () {
  const win = new BrowserWindow({
    width: 600,
    height: 400
  })

  win.loadURL(`file:///${path.join(__dirname, 'renderer', 'index.html')}`)
  win.on('closed', onClosed)

  return win
}

app.on('window-all-closed', () => {
  debug(`window-all-closed...`)
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  debug(`activate`)
  if (!mainWindow) {
    mainWindow = createMainWindow()
  }
})

app.on('ready', () => {
  debug(`App is ready...`)
  mainWindow = createMainWindow()
})
