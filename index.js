'use strict'

const { app, BrowserWindow } = require('electron')

// console.dir(app)

app.on('before-quit', () => {
  console.log('Saliendo...')
})

app.on('ready', () => {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Hola mundo!',
    center: true,
    maximizable: false,
    show: false
  })

  win.once('ready-to-show', () => {
    win.show()
  })

  win.on('move', () => {
    const position = win.getPosition()
    console.log(`La posicion es ${position}`)
  })

  win.loadURL('https://devdocs.io/')

  win.on('close', () => {
    win = null
    app.quit()
  })
})
