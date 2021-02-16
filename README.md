# coc-browser

![publish](https://github.com/voldikss/coc-browser/workflows/publish/badge.svg)
[![npm version](https://badge.fury.io/js/coc-browser.svg)](https://badge.fury.io/js/coc-browser)

Browser words completion source for [coc.nvim](https://github.com/neoclide/coc.nvim)

![](https://user-images.githubusercontent.com/20282795/103974806-88212e00-51ad-11eb-9b22-61f230c2ab9e.gif)

## Installation

- **Install the [browser extension](https://chrome.google.com/webstore/detail/browser-source-provider/lkaldcfmhailjfcbapicgkdkkamanlml?utm_source=chrome-ntp-icon)**

  Browser extension is used to grab words from web page and send them to the local server

- **Install [coc.nvim](https://github.com/neoclide/coc.nvim)**

- **Install coc-browser**

  ```vim
  :CocInstall coc-browser
  ```

## Config

- `browser.shortcut`:
  default: `"web"`

- `browser.priority`:
  default: `5`

- `browser.patterns`: default: `{"*": []}`

  Javascript style regex patterns that defines the cursor position to enable autocomplete, empty array `[]` means to enable for whole buffer.

  For example, in order to enable completion only if the cursor is in the
  comment region in javascript file, set this option as follows

  ```jsonc
  "browser.patterns": {
    "javascript": [
      "^\\s*\\/\\/",
      "^\\s*\\/\\*",
      "^\\s*\\*"
    ]
  }
  ```

  The `*` in the default value `{"*": []}` means to enable autocomplete for all
  filetypes.

- `browser.port`:
  default: `8888`

  Port used to transfer words from browser extension to local server

## Command

- `:CocCommand browser.clearCache`: Clear completion source cache

## License

MIT
