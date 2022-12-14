const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    // 代理跨域
    proxy: {
      '/api': {
        target: "http://gmall-h5-api.atguigu.cn"
      }
    },
  },
  publicPath: './',
  // 去除打包后的map文件,提高打包速度和减小体积
  productionSourceMap: false,
})
