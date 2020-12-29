document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['port'], (items) => {
    let port = 8888
    if (Object.keys(items).length != 0) {
      port = parseInt(items.port)
    }
    document.getElementById('port').value = port
  })
})

document.getElementById('save').addEventListener('click', () => {
  const port = document.getElementById('port').value
  chrome.storage.sync.set({port: port}, () => {
    window.close()
  })
})
