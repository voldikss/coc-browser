function savePort() {
  let port = document.getElementById('port').value
  chrome.storage.sync.set({ port: port }, () => {
    window.close()
  })
}

function restorePort() {
  chrome.storage.sync.get(['port'], items => {
    let port
    if (Object.keys(items).length === 0) {
      port = 8888
    } else {
      port = parseInt(items.port)
    }
    document.getElementById('port').value = port
  })
}

document.addEventListener('DOMContentLoaded', restorePort)
document.getElementById('save').addEventListener('click', savePort)
