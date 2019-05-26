/*
 * @Author: voldikss
 * @Date: 2019-05-26 12:36:17
 * @Last Modified by: voldikss
 * @Last Modified time: 2019-05-26 12:36:17
 */

(function () {
  let xhr = new XMLHttpRequest()
  xhr.responseType = 'text'
  xhr.open('POST', 'http://127.0.0.1:8888')
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log("send words to coc-browser successfully")
      console.log(xhr.responseText)
    } else {
      console.log("failed to send to coc-browser")
    }
  }
  let text = document.body.innerText.match(/\w+/g)
  text = [...new Set(text)]
  text = text.join('\n')
  xhr.send(text)
})()
