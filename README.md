# coc-browser

Web browser completion source for [coc.nvim](https://github.com/neoclide/coc.nvim)

![](https://user-images.githubusercontent.com/20282795/58379943-f61ae080-7fdc-11e9-98f7-575214fd1a48.gif)

## Installation

- **Make sure your 8888 port is open**

  That port is used to communicate with browser

- **Install the [browser extension](https://github.com/voldikss/browser-source-provider)**

  Browser extension grabs words from web page and send them to local server

- **Install [coc.nvim](https://github.com/neoclide/coc.nvim)**

- **Install this source using**

  ```
  :CocInstall coc-browser
  ```

## Why

It funny and useful, sincerely.

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

## Usage

Then every time you open a web page or refersh the page, you get browser completion candidates in your (Neo)Vim

## References

- [coc.nvim](https://github.com/neoclide/coc.nvim)

## License

MIT

## Donation

- Paypal

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://paypal.me/voldikss)

- Wechat
  <div>
  	<img src="https://user-images.githubusercontent.com/20282795/62786670-a933aa00-baf5-11e9-9941-6d2551758faa.jpg" width=400>
  </div>
