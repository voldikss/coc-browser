/* global chrome */
chrome.storage.sync.get(['port'], (items) => {
  const port = getPort(items)
  const xhr = new XMLHttpRequest()
  xhr.responseType = 'text'
  xhr.open('POST', `http://127.0.0.1:${port}`)
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // console.log("send words to coc-browser successfully")
      // console.log(xhr.responseText)
    } else {
      // console.log("failed to send to coc-browser")
    }
  }
  let text = document.body.innerText.match(/\w+/g)
  text = [...new Set(text)]
  text = text.join('\n')
  xhr.send(text)
})

function getPort(items) {
  let port
  if (Object.keys(items).length === 0) {
    port = 8888
  } else {
    port = parseInt(items.port)
  }
  return port
}
