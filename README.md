# coc-browser

Web browser source for [coc.nvim](https://github.com/neoclide/coc.nvim) that completes words from your browser

![](https://user-images.githubusercontent.com/20282795/58379943-f61ae080-7fdc-11e9-98f7-575214fd1a48.gif)

## Installation

- #### Make sure your 8888 port is open, because we have to use it to communicate with browser.

- #### Install the Chrome extension

    [browser-source-provider](https://chrome.google.com/webstore/detail/browser-source-provider/lkaldcfmhailjfcbapicgkdkkamanlml) is used to to grab words from web page and send to local http server


- #### Install [coc.nvim](https://github.com/neoclide/coc.nvim)

- #### Install this source by command

    ```
    :CocInstall coc-browser
    ```

## Why

- Inspired by [webcomplete.vim](https://github.com/thalesmello/webcomplete.vim), I found it pretty newfangled and ported it to Coc extension.

- While playing with this extension, I found there might be a few use cases for this extension. For example, suppose you are coding after the tutorial on the web, this may help you code more quickly...

## Config

```jsonc
"coc.browser.enable": {
    "type": "boolean",
    "default": true,
    "description": "whether to enable coc-browser"
},
"coc.browser.shortcut": {
    "type": "string",
    "default": "BRO"
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

## Note

- This app only works on Google Chrome for now, to support other browsers, we need several simple extensions for them. Currently I have no chance to do that, but pull request is always welcomed

- I developed this on Chrome and Linux(Ubuntu), but it should also works on Mac OS and Windows with Google Chrome browser. If not, be free to open an issue

## References

- [coc.nvim](https://github.com/neoclide/coc.nvim)

- [webcomplete.vim](https://github.com/thalesmello/webcomplete.vim)

## License

MIT
