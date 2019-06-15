'use strict';

const debug = require('debug')('electron-app:index');
const fs = require('fs');
const path = require('path');
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const isImage = require('is-image');
const filesize = require('filesize')

// Adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// Prevent window being garbage collected
let mainWindow;

function onClosed() {
  // Dereference the window
  // For multiple windows store them in an array
  mainWindow = null;
}

function createMainWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      nodeIntegration: true // Use node.js API on browserWindow
    }
  });

  win.loadURL(`file:///${path.join(__dirname, 'renderer', 'index.html')}`);
  win.on('closed', onClosed);

  return win;
}

app.on('window-all-closed', () => {
  debug(`window-all-closed...`);
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  debug(`activate`);
  if (!mainWindow) {
    mainWindow = createMainWindow();
  }
});

app.on('ready', () => {
  debug(`App is ready...`);
  mainWindow = createMainWindow();
});

ipcMain.on('open-directory', event => {
  dialog.showOpenDialog(
    mainWindow,
    {
      title: 'Select new location',
      buttonLabel: 'open location',
      properties: ['openDirectory']
    },
    dir => {
      let images = [];
      if (dir && dir.length) {
        fs.readdir(dir[0], (err, files) => {
          if (err) throw err
          images = files
            .filter(img => isImage(img))
            .map(img => ({
              filename: img,
              src: `file://${path.join(dir[0], img)}`,
              size: filesize(fs.statSync(path.join(dir[0], img)).size)
            }));
          console.log(images);
          event.sender.send('load-images', images)
        });
      }
    }
  );
});
