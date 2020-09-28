

# vue-APICloud-cli

基于vuecli的多页面APICloud脚手架, ui库使用 vant(已配置全自动按需导入), css 框架使用 tailwindcss(下一代css框架), 请求使用axios的方式(添加了apicloud适配器支持, 完善了aes+rsa接口加密功能)

<!-- PROJECT SHIELDS -->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />

<p align="center">
  <a href="https://github.com/Viarotel/vue-APICloud-cli">
    <img src="https://img02.sogoucdn.com/app/a/100520146/6a83cc72db890e6c2ed6c749912badaa" alt="viarotel" height="80">
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
- [贡献者](#贡献者)
  - [如何参与开源项目](#如何参与开源项目)
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
├── /dist
├── /node_modules
├── /public/
│  ├── /js/
│  │  ├── vue.js
│  │  └── vue.min.js
│  ├── /config.xml
│  ├── /template.html
├── /src/
│  ├── /assets/
│  ├── /components/
│  ├── /config/
│  ├── /icons/
│  ├── /pages/
│  ├── /plugins/
│  ├── /request/
│  ├── /utils/
├── .gitignore
├── babel.config.js
├── jsconfig.json
├── LICENSE
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── vue.config.js
└── yarn.lock

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
[license-url]: https://github.com/viarotel/vue-APICloud-cli/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/shaojintian
