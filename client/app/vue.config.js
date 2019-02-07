const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

module.exports = {
  chainWebpack: (config) => {
    config.plugins.delete('prefetch')
  },
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      // mutate config for production...
      [
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 5000,
          minRatio: 0.8
        })
      ]
    } else {
      // mutate for development...
    }
  },
  devServer: {
    proxy: {
      '/server': {
        target: 'http://10.2.11.17/RoshanpDevelopment',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/server': ''
        }
      }
    }
  },
  productionSourceMap:false,
}
