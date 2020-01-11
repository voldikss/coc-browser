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
},
"coc.browser.minLength": {
  "type": "number",
  "default": 4,
  "description": "Dismiss these words whose length is smaller than this option's value"
},
"coc.browser.maxLength": {
  "type": "number",
  "default": 20,
  "description": "Dismiss these words whose length is larger than this option's value"
}
```

## License

MIT
