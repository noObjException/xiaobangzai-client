# 小帮仔客户端

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

- build　　　　　　　　　　　　　　　　　　　　　　# webpack配置
  - webpack.base.conf.js　　　　　　　　　　　　# 主要改动这个文件
- config　　　　　　　　　　　　　　　　　　　　　# 配置文件
  - dev.env.example　　　　　　　　　　　　　　　# 开发配置示例
  - dev.env.js　　　　　　　　　　　　　　　　　　# 开发环境配置文
  - prod.env.js　　　　　　　　　　　　　　　　　　# 生产环境配置文件
- dist　　　　　　　　　　　　　　　　　　　　　　# 编译后的生产代码
- src
  - assets　　　　　　　　　　　　　　　　　　　　# 图片等资源
  - components　　　　　　　　　　　　　　　　　　# 自定义的组件
  - libs　　　　　　　　　　　　　　　　　　　　　　# 工具库
    - fetch.js　　　　　　　　　　　　　　　　　＃ 用于发送api请求
    - utils.js　　　　　　　　　　　　　　　　　　# 工具函数
  - mixins　　　　　　　　　　　　　　　　　　　　# mixin是可复用部分, 类似于trait
    - expressMission.js　　　　　　　　　　　　# 取快递任务的支付, 接单等业务逻辑
  - plugins　　　　　　　　　　　　　　　　　　　# 放js插件
  - router　　　　　　　　　　　　　　　　　　　　# 路由文件
  - styles
    - commons.less　　　　　　　　　　　　　# 放一些公共的,基础的样式
    - theme.less　　　　　　　　　　　　　　# vux ui库可定制的样式
  - stores　　　　　　　　　　　　　　　　　　# vuex状态管理, 类似session的作用, 不能保持, 刷新就没有了
  - views　　　　　　　　　　　　　　　　　　　# 页面文件
  - App.vue　　　　　　　　　　　　　　　　　　# 根组件
  - main.js　　　　　　　　　　　　　　　　　　# 入口文件

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
