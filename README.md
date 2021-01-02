# coc-browser

![publish](https://github.com/voldikss/coc-browser/workflows/publish/badge.svg)
[![npm version](https://badge.fury.io/js/coc-browser.svg)](https://badge.fury.io/js/coc-browser)

Browser words completion source for [coc.nvim](https://github.com/neoclide/coc.nvim)

![](https://user-images.githubusercontent.com/20282795/58379943-f61ae080-7fdc-11e9-98f7-575214fd1a48.gif)

## Installation

- **Install the [browser extension](https://github.com/voldikss/browser-source-provider)**

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

  port used to communication with browser extension, this
  won't take effect for now, because the update for the chrome extension was
  denied due to google chrome's security policy.

- `browser.filterLength`:
  default: `[5, 20]`

  Array of 2 numbers. Candidates whose length is not in the range (closed
  interval) will be removed.

## Command

- `:CocCommand browser.clearCache`: Clear completion source cache

## License

MIT
