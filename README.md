

# vue-APICloud-cli

基于vuecli的多页面APICloud脚手架, ui库使用 vant(已配置全自动按需导入), css 框架使用 tailwindcss(下一代css框架), 请求使用axios的方式(添加了apicloud适配器支持, 完善了aes+rsa接口加密功能)

<!-- PROJECT SHIELDS -->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
<!-- [![LinkedIn][linkedin-shield]][linkedin-url] -->

<!-- PROJECT LOGO -->
<br />

<p align="center">
  <a href="https://github.com/Viarotel/vue-APICloud-cli">
    <img src="src/assets/img/logo.png" alt="viarotel" height="80">
  </a>
  <h3 align="center">vue-APICloud-cli</h3>
  <p align="center">
    基于vue的多页面APICloud脚手架
    <br />
    <a href="https://github.com/Viarotel/vue-APICloud-cli"><strong>探索本项目的文档 »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Viarotel/vue-APICloud-cli">查看Demo</a>
    ·
    <a href="https://github.com/Viarotel/vue-APICloud-cli/issues">报告Bug</a>
    ·
    <a href="https://github.com/Viarotel/vue-APICloud-cli/issues">提出新特性</a>
  </p>

## 目录

- [上手指南](#上手指南)
  - [获取本项目](#获取本项目)
  - [运行本项目](#运行本项目)
  - [wifi同步](#wifi同步)
  - [通过vscode插件进行wifi同步](#通过vscode插件进行wifi同步)
  - [打包构建](#打包构建)
- [文件目录说明](#文件目录说明)
- [使用到的框架](#使用到的框架)
- [版本控制](#版本控制)
- [作者](#作者)
- [鸣谢](#鸣谢)

### 上手指南

###### **获取本项目**

1. clone 本项目 或 直接下载main包

```sh
git clone https://github.com/viarotel/vue-APICloud-cli.git
```

###### 运行本项目

1. 安装依赖
2. 运行项目

```sh
npm install //or yarn
npm run dev //or yarn dev
```

###### wifi同步

1. 打开调试端口
2. 查看日志
3. 输入同一局域网下的电脑ip地址和调试端口同步到手机

```sh
npm run wifi-start //or yarn wifi-start 打开调试端口
npm run wifi-log //or yarn wifi-log 打开日志
npm run wifi-sync //or yarn wifi-sync 同步到手机 需要重新打开一个窗口
```

###### 通过vscode插件进行wifi同步

1. vscode 中安装 APIClouid 拓展
2. 在vscode设置中将APIClouid 拓展 的Subdirectories选项设置为 "/dist"
3. 运行本项目 并打开当前项目中任意页面 鼠标右键 启动wifi服务 相当于 npm run wifi-start
4. 鼠标右键 wifi增量同步即可同步 相当于 npm run wifi-sync
5. 在输出中查看日志

###### 打包构建

1. 使用命令打包项目
2. 将dist中的文件通过svn或手动压缩为widget.zip上传到APICloud的服务器中
3. 通过apicloud控制台进行云打包

### 文件目录说明

```
filetree
├── /dist //打包生成的静态资源文件，用于生产部署。
├── /node_modules //存放npm命令下载的开发环境和生产环境的依赖包。
├── /public/ //存放在该文件夹的东西不会被打包影响，而是会原封不动的输出到dist文件夹中
│  ├── /js/ //由于是多页面应用所以采用外联的方式引入vue 
│  │  ├── vue.js   //开发模式使用
│  │  └── vue.min.js //正式环境使用
│  ├── /config.xml //apicloud的配置文件
│  ├── /template.html // 通过ejs渲染的模板文件
├── /src/
│  ├── /assets/ //存放项目中需要用到的资源文件，css、js、images等。
│  ├── /components/ //存放vue开发中一些公共组件
│  ├── /config/ //全局配置文件
│  ├── /icons/ //svg 图标文件
│  ├── /pages/ //存在vue页面组件的文件夹。
│  ├── /plugins/ //项目用到的插件集合
│  ├── /request/ //接口配置
│  ├── /utils/ //存放vue开发过程中一些公共的js方法。
├── .gitignore //git忽略文件配置
├── babel.config.js //对js文件进行编译转换增强的配置文件
├── jsconfig.json /JavaScript语言服务的配置文件 代码提示 文件索引提示等
├── LICENSE //开源许可说明
├── package.json  //包管理配置文件
├── postcss.config.js //对css文件进行编译转换增强的配置文件
├── README.md
├── tailwind.config.js //tailwindcss的配置文件
├── vue.config.js //vuecli配置文件
└── yarn.lock //yarn锁定依赖版本 防止环境不一致导致项目无法运行的问题

```

### 使用到的框架

- [Vue-CLI](https://cli.vuejs.org)
- [Vant](https://vant-contrib.gitee.io/vant)
- [tailwindcss](https://www.tailwindcss.cn/)
- [axios](http://www.axios-js.com/)

### 关键字

- vue
- apicloud
- vant
- tailwindcss
- axios

### 版本控制

该项目使用Git进行版本管理。

### 作者

viarotel@qq.com

qq:523469508 wx: luyao-ing

 *您也可以在贡献者名单中参看所有参与该项目的开发者。*

### 版权说明

该项目签署了MIT 授权许可，详情请参阅 [LICENSE.txt](https://github.com/viarotel/vue-APICloud-cli/blob/master/LICENSE.txt)

### 鸣谢


- 感谢[grapewheel/avvw](https://github.com/grapewheel/avvw) 带给我灵感
- 感谢[axios-apicloud-adapter](https://github.com/F-loat/axios-apicloud-adapter)提供的axios适配器

<!-- links -->

[your-project-path]:viarotel/vue-APICloud-cli
[contributors-shield]: https://img.shields.io/github/contributors/viarotel/vue-APICloud-cli.svg?style=flat-square
[contributors-url]: https://github.com/viarotel/vue-APICloud-cli/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/viarotel/vue-APICloud-cli.svg?style=flat-square
[forks-url]: https://github.com/viarotel/vue-APICloud-cli/network/members
[stars-shield]: https://img.shields.io/github/stars/viarotel/vue-APICloud-cli.svg?style=flat-square
[stars-url]: https://github.com/viarotel/vue-APICloud-cli/stargazers
[issues-shield]: https://img.shields.io/github/issues/viarotel/vue-APICloud-cli.svg?style=flat-square
[issues-url]: https://img.shields.io/github/issues/viarotel/vue-APICloud-cli.svg
[license-shield]: https://img.shields.io/github/license/viarotel/vue-APICloud-cli.svg?style=flat-square
[license-url]: https://github.com/viarotel/vue-APICloud-cli/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/viarotel