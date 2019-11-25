const path = require('path')
const webpack = require('webpack')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

const smp = new SpeedMeasurePlugin({
  outputFormat: 'human',
})
const resolve = dir => {
  return path.join(__dirname, dir)
}

// 自动配置多页参数
const glob = require('glob')
const pages = {}

// 配置选项
glob.sync('./src/pages/**/main.ts').forEach(path => {
  const chunk = path.split('./src/pages/')[1].split('/main.ts')[0]
  pages[chunk] = {
    entry: path,
    template: 'public/index.html',
    chunks: ['chunk-vendors', 'chunk-common', chunk]
  }
})

const externals = {
  'vue': 'Vue',
  'vue-router': 'VueRouter',
  'vuex': 'Vuex',
  'axios': 'axios',
  'element-ui': 'ELEMENT',
}

// 是否使用gzip
const productionGzip = true
// 需要gzip压缩的文件后缀
const productionGzipExtensions = ['js', 'css']

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  // 构建多页
  pages,
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: true,
  css: {
    requireModuleExtension: false, // 启用 CSS modules
    extract: true, // 是否使用css分离插件
    sourceMap: false, // 开启 CSS source maps?
    loaderOptions: {} // css预设器配置项
  },
  devServer: {
    hot: true,
    port: 9531,
    https: false,
    hotOnly: false,
    overlay: {
      warnings: true,
      errors: true
    }
    // 设置代理
    // proxy: 'https://www.easy-mock.com'
  },
  configureWebpack: process.env.NODE_ENV !== 'development' ? () => smp.wrap({
    plugins: [
      new BundleAnalyzerPlugin(),
      // 提取公用库
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require('./public/vendor/vendor-manifest.json')
      }),
      // 将 dll 注入到 生成的 html 模板中
      new AddAssetHtmlPlugin({
        // dll文件位置
        filepath: path.resolve(__dirname, './public/vendor/*.js'),
        // dll 引用路径
        publicPath: './vendor',
        // dll最终输出的目录
        outputPath: './vendor'
      })
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          // echarts: {
          //   name: 'chunk-echarts',
          //   test: /[\\/]node_modules[\\/]echarts[\\/]/,
          //   chunks: 'all',
          //   priority: 10,
          //   reuseExistingChunk: true,
          //   enforce: true,
          // },
          demo: {
            name: 'chunk-demo',
            test: /[\\/]src[\\/]pages[\\/]demo[\\/]/,
            chunks: 'all',
            priority: 20,
            reuseExistingChunk: true,
            enforce: true,
          },
          page: {
            name: 'chunk-page',
            test: /[\\/]src[\\/]/,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            priority: 5,
            reuseExistingChunk: true,
            enforce: true,
          }
        }
      }
    }
  }) : {},
  chainWebpack: config => {
    // 配置路径别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('config', resolve('src/config'))
      .set('utils', resolve('src/assets'))

    config.plugins.delete('named-chunks')

    // svg loader
    const svgRule = config.module.rule('svg') // 找到svg-loader
    svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
    svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
    svgRule // 添加svg新的loader处理
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    // 修改images loader 添加svg处理
    const imagesRule = config.module.rule('images')
    imagesRule.exclude.add(resolve('src/icons'))
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
    // 生成环境
    if (process.env.NODE_ENV !== 'development') {
      // 忽略打包的文件
      config.externals(externals)
      // 图片压缩
      config.module
        .rule('images')
        .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
        .use('img-loader')
        .loader('img-loader').options({
          plugins: [
            require('imagemin-jpegtran')(),
            require('imagemin-pngquant')({
              quality: [0.75, 0.85]
            })
          ]
        })
      // 启用GZip压缩
      productionGzip && new CompressionWebpackPlugin({
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 8192,
        minRatio: 0.8
      })
    }
  }
}