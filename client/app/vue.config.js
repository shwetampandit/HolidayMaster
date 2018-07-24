module.exports = {
  devServer: {
    proxy: {
      '/server': {
        target: 'http://localhost:3030/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/server': ''
        }
      }
    }
  }
}
