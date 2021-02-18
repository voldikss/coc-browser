chrome.storage.sync.get(['port'], (items) => {
  let port = 8888
  if (Object.keys(items).length != 0) {
    port = parseInt(items.port)
  }

  const xhr = new XMLHttpRequest()
  xhr.responseType = 'text'
  xhr.open('POST', `http://127.0.0.1:${port}`)
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // console.log('send words to coc-browser successfully')
      // console.log(xhr.responseText)
    } else {
      // console.log("failed to send to coc-browser")
    }
  }
  let text = document.body.innerText.match(/[0-9a-zA-Z_]{5,20}/g)
  if (text) {
    text = [...new Set(text)].join('\n')
    xhr.send(text)
  }
})
