

module.exports = {
  outputDir:'../views',
  devServer: {
    port:  7005,
    proxy: {
      //假数据
      '/': {
        target: `http://localhost:7350`,
        changeOrigin: true,     // target是域名的话，需要这个参数，
        secure: false,          // 设置支持https协议的代理
        ws:false
      }
    }
  },
  productionSourceMap: false,
  filenameHashing: false,
  css: {
    modules: false,
    extract: false,
    sourceMap: false,
    loaderOptions: {
      sass: {
        // 向全局sass样式传入共享的全局变量
        data: '@import "./src/scss/variables.scss";'
      }
    }
  }
}