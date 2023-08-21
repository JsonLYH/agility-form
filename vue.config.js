const path = require('path');
module.exports = {
  productionSourceMap: false,
  lintOnSave: true,
  parallel: false,
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html',
    },
  },
  outputDir: 'dist/agility-form',
  publicPath: '/',
  // 开发服务器相关配置
  devServer: {
    open: true, // 自动打开浏览器
    port: 8080, // 端口
    // 浏览器刷新的同时，显示eslint的警告和错误
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue'],
      alias: {
        '@': path.resolve(__dirname, 'examples'),
      },
    },
  },
};
