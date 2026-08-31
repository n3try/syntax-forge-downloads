const status = document.querySelector('#action-status')
const openButton = document.querySelector('#open-app-button')
const downloadButton = document.querySelector('#download-button')

let launchTimer

openButton.addEventListener('click', () => {
  window.clearTimeout(launchTimer)
  status.textContent = 'Asking Windows to open Syntaxi…'
  status.classList.add('active')
  launchTimer = window.setTimeout(() => {
    status.textContent = 'If nothing opened, install the latest version first, then try again.'
  }, 1800)
})

window.addEventListener('blur', () => {
  if (!launchTimer) return
  window.clearTimeout(launchTimer)
  launchTimer = undefined
  status.textContent = 'Launch request sent to Windows.'
})

downloadButton.addEventListener('click', () => {
  status.textContent = 'Your Web Setup download is starting…'
  status.classList.add('active')
})
