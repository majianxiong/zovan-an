import Vue from 'vue'
const config = {
  baseUi: [
    {
      name: 'c_mask',
      path: require('src/components/base/mask')
    },
    {
      name: 'c_article',
      path: require('src/components/base/article')
    },
    {
      name: 'c_scroll',
      path: require('src/components/base/scroll')
    },
    {
      name: 'c_errMsg',
      path: require('src/components/base/errmsg')
    },
    {
      name: 'c_button',
      path: require('src/components/base/submitbtn')
    },
    {
      name: 'c_radio',
      path: require('src/components/base/cradio')
    },
    {
      name: 'c_selectBlock',
      path: require('src/components/base/selectblock')
    },
    {
      name: 'c_radioBlock',
      path: require('src/components/base/radioblock')
    },
    {
      name: 'c_gender',
      path: require('src/components/base/gender')
    },
    {
      name: 'c_selectBlock',
      path: require('src/components/base/selectblock')
    },
    {
      name: 'c_checker',
      path: require('src/components/base/checker')
    },
    {
      name: 'study',
      path: 'application/study/index',
      async: true // 'application/study/test'
    },
    {
      name: 'c_btngroup',
      path: require('src/components/base/btngroup')
    },
    {
      name: 'customInput',
      path: require('src/components/base/customInput')
    }
  ],
  serviceUi: [
    {
      name: 'c_staticlist',
      path: require('src/components/service/staticlist')
    },
    {
      name: 'c_buynav',
      path: require('src/components/service/buynav')
    },
    {
      name: 'c_footergroup',
      path: require('src/components/service/footergroup')
    },
    {// 字典查询
      name: 'c_dictionary',
      path: require('src/components/service/dictionary')
    },
    {// 职业选择
      name: 'c_selectpage',
      path: require('src/components/service/selectpage')
    }
  ]
}
let objKey = Object.keys(config)
objKey.map(function (ele, index, array) {
  config[ele].map(function (e, i, a) {
    if (e.async) {
      Vue.component(e.name, (resolve) => {
        require.ensure([], (require) => {
          let req = require.context("src/", true, /^\.\/.*\.vue$/)(`./${e.path}.vue`)
          // console.log(req)
          resolve(req)
          // resolve(require.context('src/xx/', false, /\.vue$/)(`./${name}`))
          // resolve(require.context('src/components/', false, /\.vue$/)(`./${name}`))
        })
      })
    } else {
      Vue.component(e.name, e.path)
    }
  })
})

export default config
