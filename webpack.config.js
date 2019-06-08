const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const WebpackNotifierPlugin = require('webpack-notifier')
const path = require('path')

module.exports = (env = {}) => {
  const config = {
    mode: env.NODE_ENV || 'development',
    useSourceMap: !env.NODE_ENV
  }
  return {
    mode: config.mode,
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
              options: { sourceMap: config.useSourceMap }
            }
          ]
        },
        {
          test: /\.js/,
          exclude: /node_modules/,
          use: [{ loader: 'babel-loader' }]
        },
        {
          test: /\.vue$/,
          use: [{ loader: 'vue-loader' }]
        },
        {
          test: /\.pug$/,
          oneOf: [
            {
              resourceQuery: /^\?vue/,
              use: ['pug-plain-loader']
            },
            {
              use: ['raw-loader', 'pug-plain-loader']
            }
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: 'public/style.css' }),
      new VueLoaderPlugin(),
      new WebpackNotifierPlugin()
    ],
    resolve: {
      modules: [`${__dirname}/src`, 'node_modules'],
      extensions: ['.js'],
      alias: {
        vue$: 'vue/dist/vue.common.js'
      }
    }
  }
}
