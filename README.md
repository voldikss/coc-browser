# coc-browser

Browser words completion source for [coc.nvim](https://github.com/neoclide/coc.nvim)

![](https://user-images.githubusercontent.com/20282795/58379943-f61ae080-7fdc-11e9-98f7-575214fd1a48.gif)

## Installation

- **Install the [browser extension](https://github.com/voldikss/browser-source-provider)**

  Browser extension is used to grab words from web page and send them to the local server

- **Install [coc.nvim](https://github.com/neoclide/coc.nvim)**

- **Install coc-browser**

  ```
  :CocInstall coc-browser
  ```

## Config

```jsonc
"coc.browser.enable": {
    "type": "boolean",
    "default": true,
    "description": "whether to enable coc-browser"
},
"coc.browser.shortcut": {
    "type": "string",
    "default": "web"
},
"coc.browser.capacity": {
    "type": "number",
    "default": 5,
    "description": "temp file count to storage the words, 1~10"
},
"coc.browser.priority": {
    "type": "number",
    "default": 5
}
```

## License

MIT

## Donation

- Paypal

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://paypal.me/voldikss)

- Wechat

<div>
  <img src="https://user-images.githubusercontent.com/20282795/64410950-b3c66c80-d0be-11e9-8500-973382366324.jpg" width=150>
</div>
