const path = require('path');
const resolve = dir => path.join(__dirname, dir);
const klawSync = require("klaw-sync");
const rimraf = require('rimraf');
const cordovaConfig = require('cordova-config');
const VueAutomaticImportPlugin = require('vue-automatic-import-loader/lib/plugin');
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';
const host = getLocalIP(); //获取本机IP
const port = 7777;
const indexPath = isProduction ? 'index.html' : `http://${host}:${port}`;

//dev时删除dist目录防止dev模式wifi同步不必要的文件
isDevelopment && rimraf(resolve('./dist'), err => {
  if (err) throw err
});

module.exports = {
  pages: pages(),
  publicPath: isProduction ? './' : './',
  filenameHashing: isProduction /** 开发环境关闭文件哈希值 */,
  devServer: {
    // 环境配置
    host,
    port,
    hot: true, //false防止开发模式白屏(使用路由缓存时)
    open: false, //编译完成后打开浏览器
    // proxy: {
    //   /** 解决本地测试跨域问题 */
    //   '/api': {
    //     target: 'https://api.ipify.org/',
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // },
    writeToDisk: file => {
      return /config.xml$/.test(file);
    }
  },


  transpileDependencies: ['vuetify', 'axios-apicloud-adapter', 'vue-screen', 'vue-tippy', 'lottie-player-vue', 'vue-awesome-swiper'], //指定需要编译的依赖

  chainWebpack(config) {

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end();

    config.optimization.splitChunks(undefined);

    config.plugin("copy").tap(args => {
      args[0][0].ignore.push(
        process.env.NODE_ENV === "development" ? "vue.min.js" : "vue.js"
      );
      return args;
    });
  },

  configureWebpack: {
    output: {
      library: "pageComponent",
      libraryTarget: "window",
      libraryExport: "default"
    },
    optimization: {
      runtimeChunk: {
        name: "runtime"
      }
    },
    externals: {
      vue: "Vue"
    },
    plugins: [
      //组件自动按需导入
      new VueAutomaticImportPlugin({
        match(originalTag, { kebabTag, camelTag, path, component }) {
          if (kebabTag.startsWith('via-')) {
            return [
              camelTag,
              `import ${camelTag} from '@/components/${camelTag}/index.vue';`
            ]
          }

          if (kebabTag.startsWith('van-')) {
            const componentName = kebabTag.slice(4);
            return [
              camelTag,
              `
                import ${camelTag} from 'vant/lib/${componentName}';
                import 'vant/lib/${componentName}/style';
              `
            ]
          }
          /**
           * originalTag - the tag as it was originally used in the template
           * kebabTag    - the tag normalised to kebab-case
           * camelTag    - the tag normalised to PascalCase
           * path        - a relative path to the current .vue file
           * component   - a parsed representation of the current component
           */
          // console.log('originalTag:', originalTag);
          // console.log('kebabTag:', kebabTag);
          // console.log('camelTag:', camelTag);
          // console.log('path:', path);
          // console.log('component:', component);
        }
      }),
      {
        apply: (compiler) => {
          compiler.hooks.done.tap('done', compilation => {  // 编译完成后做点什么 
            const configXml = new cordovaConfig('./dist/config.xml'); //根据环境改变config.xml
            configXml.setElement('content', '', {
              src: indexPath
            });
            configXml.setPreference('debug', isDevelopment);
            configXml.writeSync();
            // console.log('build done');
          });
        }
      }
    ]
  },

  // css: {
  //   loaderOptions: {
  //     // sass: {
  //     //   prependData: `@import "~@/assets/css/vuetify-custom.scss"`
  //     // },
  //     // scss: {
  //     //   prependData: `@import "~@/assets/css/vuetify-custom.scss";`
  //     // },

  //     // less: {
  //     //   modifyVars: {
  //     //   },
  //     //   hack: `true; @import "";`,
  //     // },
  //   },
  // },
};

/**
 * @desc 获取本地ip地址
 */
function getLocalIP() {
  const interfaces = require('os').networkInterfaces();
  for (let devName in interfaces) {
    const iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}

/**
 * @desc 获取多页面数组
 */
function pages() {

  const tempArr = klawSync("./src/pages", {
    nodir: true,
    traverseAll: true,
    filter(file) {
      return path.extname(file.path) === ".vue";
    }
  });

  // console.log(tempArr);

  const pagesIndex = resolve('src/pages').length;

  let filename, pageName;
  return tempArr.reduce((obj, { path }) => {
    if (process.platform !== "win32") {
      filename = path
        .substring(pagesIndex + 1)
        .replace(/\.vue$/, ".html")
        .replace(/\//g, "_");
    } else {
      filename = path
        .substring(pagesIndex + 1)
        .replace(/\.vue$/, ".html")
        .replace(/\\/g, "_");
    }

    pageName = filename.substring(0, filename.lastIndexOf("."));

    obj[pageName] = {
      entry: path,
      template: "./public/template.html",
      filename,
      chunks: [pageName, "runtime"],
      name: pageName,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }

    return obj;
  }, {});
}