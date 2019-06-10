const os = require('os')

window.addEventListener('load', () => {
  console.log(os.cpus())
})
