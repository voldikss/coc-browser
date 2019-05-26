# coc-browser

Web browser source for [coc.nvim](https://github.com/neoclide/coc.nvim) that completes words from your browser

![](https://user-images.githubusercontent.com/20282795/58379943-f61ae080-7fdc-11e9-98f7-575214fd1a48.gif)

## Installation

- #### Install the Chrome extension

    Chrome extension [browser-source-provider]() is used to to grab words from web page and send to local http server


- #### Install [coc.nvim](https://github.com/neoclide/coc.nvim)

- #### Install this source by command

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
        "default": "BRO"
    },
    "coc.browser.capacity": {
        "type": "number",
        "default": 5,
        "description": "temp file count to storage the words, 1~10"
    },
    "coc.browser.priority": {
        "type": "number",
        "default": 50
    }
    ```

## Usage

Then every time you open a web page or refersh the page, you get browser completion candidates in your (Neo)Vim

## Note

- The chrome extension is in pending review currently, so it hasn't been published in the web store yet. 
    But if you want, you may install it in developer mode

- This app only works on Google Chrome for now, to support other browsers, we need several simple extensions for them. Currently I have no chance to do that, but pull request is always welcomed

- I developed this on Chrome and Linux(Ubuntu), but it should also works on Mac OS and Windows with Google Chrome browser. If not, be free to submit an issue

## References

Inspired by [webcomplete.vim](https://github.com/thalesmello/webcomplete.vim)

## License

MIT
