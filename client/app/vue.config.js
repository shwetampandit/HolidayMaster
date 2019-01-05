const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

module.exports = {
  chainWebpack: (config) => {
    config.plugins.delete('prefetch')
  },
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 5000,
        minRatio: 0.8
      })
    ]
  },
  devServer: {
    proxy: {
      '/server': {
        target: 'https://host:port/projectName',
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
