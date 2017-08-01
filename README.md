# baoa hybrid app 

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test

# AJAX mock
npm run mock

mock json file path /mock/db.json


#Director explain
mock ————————————————————————————-ajax 数据mock
  |
  db.json——————————————————————————mock数据
|
src
  |
  application——————————————————————项目文件夹
    |
    Gallery.vue————————————————————页面清单文件
    |
    api————————————————————————————ajax 请求枚举
    |
    assets—————————————————————————资源文件夹
      |
      sass————————————————————————-sass文件夹
      |
      img——————————————————————————图片文件夹
    |  
    components————————————————————-组件文件夹
      |
      base—————————————————————————基础组件
      |
      service——————————————————————业务组件
    |
    router————————————————————————-路由文件夹
    |
    store——————————————————————————store model文件夹
    |
    widget————————————————————————-工具文件夹
      |
     filter————————————————————————vue filter
      |
     plugin————————————————————————vue plugin
      |
     directive————————————————————-vue directive
      |
     ...———————————————————————————其他工具

static————————————————————————-静态资源文件夹
|
test———————————————————————————测试文件夹子



# /node_modules/json-server/lib/server/default.js
# json server post request
# Read-only
# if (opts.readOnly) {
#  arr.push(function (req, res, next) {
#    // if (req.method === 'GET') {
#    //  next(); // Continue
#    // } else {
#    //   res.sendStatus(403); // Forbidden
#    // }
#    req.method = 'GET';
#    next();
#  });
# }







For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
