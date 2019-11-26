# vue-typescript-multi-pages
typescript + vue 多页面应用配置和构建优化

## 项目目录结构：
```shell
├── public                     // 静态打包文件
├── scripts                    // 自动创建脚本
├── src                        // 源代码
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件
│   ├── config                 // 配置相关
│   ├── utils                  // 全局公用方法
│   ├── icons                  // 全局svg组件
│   │── pages                  // 业务模块根目录modules
│   │	  ├── demo               // 页面
│           ├── app.vue        // 入口页面
│           └── main.ts        // 入口初始化
│   │		└── index              // 页面
├── .gitignore                 // git 忽略项
├── package.json               // 安装依赖包
├── vue.config.js              // 项目配置
├── README.md                // 文档说明
```

## 功能点：
- [x] 各环境配置
- [ ] 自动脚本新建页面和组件
- [x] 打包构建优化（dllPlugin）

## 构建配置和优化
### 1.各环境配置
根目录下新建`.env.name`，例如：
`.env.test`文件
```js
# just a flag
NODE_ENV = "test"

VUE_APP_TITLE = 'test'

# base url
BASE_URL = "http://xxx.com"
```
根据不同环境配置不同接口地址和NODE_ENV，方便后续根据打包环境配置处理

### 2.构建优化
### 1.webpack dllplugin提取公共库，提升打包速度
1.1 全局安装`webpack`、 `webpack-cli`
```shell
webpack -v
```

1.2 生成 dll，在`package.json`文件新增
```js
"scripts": {
  ...
  "dll": "webpack -p --progress --config ./webpack.dll.conf.js"
}
```
执行生成 dll
```shell
 yarn run dll
```

1.3 根目录新建`webpack.dll.confl.js`文件，安装`CleanWebpackPlugin`插件
```js
const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// dll文件存放的目录
const dllPath = 'public/vendor'

module.exports = {
  entry: {
    // 需要提取的库文件
    vendor: [
      'vue',
      'vue-router',
      'vuex',
      'axios',
      'element-ui'
    ]
  },
  output: {
    path: path.join(__dirname, dllPath),
    filename: '[name].dll.js',
    // vendor.dll.js中暴露出的全局变量名，保持与 webpack.DllPlugin 中名称一致
    library: '[name]_[hash]'
  },
  plugins: [
    // 清除之前的dll文件
    new CleanWebpackPlugin(),
    // 设置环境变量
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'production'
      }
    }),
    new webpack.DllPlugin({
      path: path.join(__dirname, dllPath, '[name]-manifest.json'),
      // 保持与 output.library 中名称一致
      name: '[name]_[hash]',
      context: process.cwd()
    })
  ]
}
```
1.4 忽略已编译文件

为减少 webpack 对公共库的编译时间，在`vue.config.js`添加

```js
const webpack = require('webpack')

module.exports = {
  ...
  configureWebpack: {
    plugins: [
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require('./public/vendor/vendor-manifest.json')
      })
    ]
  }
}
```
1.5 自动引入生成的 dll 文件

安装 `add-asset-html-webpack-plugin` ，自动引入生成文件
```js
module.exports = {
  ...
  configureWebpack: {
    plugins: [
      ...
      // 将 dll 注入到 生成的 html 模板中
      new AddAssetHtmlPlugin({
        filepath: path.resolve(__dirname, './public/vendor/*.js'),
        // dll 引用路径
        publicPath: './vendor',
        // dll最终输出的目录
        outputPath: './vendor'
      })
    ]
  }
}
```

还有 `GZip压缩` 、 `speed-measure-webpack-plugin` 具体详细看 `vue.config.js`