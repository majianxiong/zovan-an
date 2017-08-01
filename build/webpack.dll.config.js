const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    vendor: ['vue-router','axios','vue/dist/vue.esm.js']
  },
  output: {
    path: path.join(__dirname, '../static/dll/'),
    filename: '[name].dll.js',
    library: '[name]_library'       // vendor.dll.js中暴露出的全局变量名
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../static/dll/', '[name]-manifest.json'),
      name: '[name]_library'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      }
    })
  ]
};
