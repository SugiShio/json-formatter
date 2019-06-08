const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')
const path = require('path')

module.exports = (env = {}) => {
  const config = {
    mode: env.NODE_ENV || 'development',
    useSourceMap: !env.NODE_ENV
  }
  return {
    mode: config.mode,
    // context: path.join(__dirname, 'wp-content/themes'),
    entry: './assets/app.js',
    output: {
      filename: 'public/index.js',
      path: path.join(__dirname, '')
    },
    devServer: {
      contentBase: path.join(__dirname, '')
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: process.env.NODE_ENV === 'development',
                reloadAll: true
              }
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: config.useSourceMap,
                importLoaders: 2
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: config.useSourceMap,
                plugins: [require('autoprefixer')({ grid: true })]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: config.useSourceMap
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: 'public/style.css' }),
      // new VueLoaderPlugin(),
      new WebpackNotifierPlugin()
    ],
    resolve: {
      // alias: {
      //   vue$: 'vue/dist/vue.common.js'
      // }
    }
  }
}
