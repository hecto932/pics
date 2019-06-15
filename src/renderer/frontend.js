const url = require('url')
const path = require('path')

const applyFilter = require('./filters')
const { setIpc, openDirectory } = require('./ipcRendererEvents')

window.addEventListener('load', () => {
  setIpc()
  searchImagesEvent()
  selectEvent()
  buttonEvent('open-directory', openDirectory)
})

function buttonEvent (id, func) {
  const openDirectory = document.getElementById(id)
  openDirectory.addEventListener('click', func)
}

function searchImagesEvent () {
  const searchBox = document.getElementById('search-box')
  searchBox.addEventListener('keyup', function () {
    const regex = new RegExp(this.value.toLowerCase(), 'gi')
    if (this.value.length > 0) {
      const thumbs = document.querySelectorAll('li.list-group-item img')
      for(let i=0; i < thumbs.length; ++i) {
        const fileUrl = url.parse(thumbs[i].src)
        const fileName = path.basename(fileUrl.pathname)
        if (fileName.match(regex)) {
          thumbs[i].parentNode.classList.remove('hidden')
        } else {
          thumbs[i].parentNode.classList.add('hidden')
        }
      }
      selectFirstImage()
    } else {
      showAllImages()
      selectFirstImage()
    }
  })
}

function showAllImages() {
  const thumbs = document.querySelectorAll('li.list-group-item img')
  for (let i = 0; i < thumbs.length; ++i) {
    thumbs[i].parentNode.classList.remove('hidden')
  }
}

function selectEvent () {
  const select = document.getElementById('filters')

  select.addEventListener('change', function () {
    applyFilter(this.value, document.getElementById('image-displayed'))
  })
}
