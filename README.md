# vue

## 安装

```bash
 关于node版本管理(开发环境为node8.0.0)

 # 安装n管理node版本
 $ npm install -g n

 # 安装8.0.0版本的node
 $ n 8.0.0

 # 切换版本
 $ n use 8.0.0 some.js
```

``` bash

# 拉取代码
$ git clone https://coding.net/u/bukexue/p/bang-clent/git

# 网络不好,设置镜像
$ npm config set registry https://registry.npm.taobao.org 

# 安装依赖
$ npm install

# 开启开发热重载环境, 访问8080端口
$ npm run dev

# 生产环境, 编译代码
$ npm run build

```

## 目录说明

- build             # webpack配置
  - webpack.base.conf.js 主要改动这个文件
- config            # 配置文件
  - dev.env.example
  - dev.env.js

## vs code 配置

### 插件

* Vetur: Vue语法支持
* Auto Close Tag: 自动闭合标签
* Auto Rename Tag: 自动重命名标签
* Beautify: 美化代码
* Debugger for chrome: debug工具
* ESLint: 代码格式检查工具, 配置之后按ctrl+s可自动规范化格式不正确的代码
* Git History: git记录
* Git Lens — git blame annotations, code lens, and more: 在代码中显示修改记录
* npm Intellisense: ...
* One Dark Pro: Atom主题
* Output colorizer: 在控制台输出彩色字体?
* vscode-icons: 好看的文件图标

### 配置

```json
 "window.zoomLevel": 0,
    "editor.tabSize": 4,
    "editor.fontSize": 14,
    "files.autoSave": "afterDelay",
    "files.associations": {
        "*.vue": "vue"
    },
    "eslint.autoFixOnSave": true,
    "eslint.options": {
        "extensions": [
            ".vue",
            ".js"
        ],
        "plugins": ["html"]
    },
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "html",
        { 
           "language": "vue", 
           "autoFix": true 
        },
        "vue",
        "vue-html"
    ],
    "search.exclude": {
        "**／node_modules": true,
        "**/bower_components": true,
        "**/dist": true
    },
    "emmet.syntaxProfiles": {
        "javascript": "jsx",
        "vue": "html",
        "vue-html": "html"
    },
    "extensions.autoUpdate": true,
    "editor.renderWhitespace": "all",
    "editor.cursorBlinking": "smooth",
    "workbench.iconTheme": "vscode-icons",
    "workbench.activityBar.visible": true,
    "[plaintext]": {
    },   
    "editor.wrappingIndent": "same",
    "editor.renderIndentGuides": false,
    "workbench.sideBar.location": "left",
    "workbench.statusBar.visible": true,
    "vsicons.dontShowNewVersionMessage": true,
    "git.enableSmartCommit": true,
    "python.pythonPath": "python3",
    "python.linting.flake8Enabled": true,
    "python.formatting.provider": "yapf",
    "files.insertFinalNewline": true,
    "workbench.colorTheme": "One Dark Pro Vivid"
```
