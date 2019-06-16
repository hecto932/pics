const { setIpc, openDirectory } = require('./ipcRendererEvents')
const { searchImagesEvents, selectEvent } = require('./images-iu')

window.addEventListener('load', () => {
  setIpc()
  searchImagesEvents()
  selectEvent()
  buttonEvent('open-directory', openDirectory)
})

function buttonEvent (id, func) {
  const openDirectory = document.getElementById(id)
  openDirectory.addEventListener('click', func)
}