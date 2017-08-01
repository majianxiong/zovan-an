// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './assets/scss/global.scss'
import cookie from './widget/plugin/cookie'
import Vue from 'vue'
import App from './App'
import router from './router'
import conf from './config'
import store from './store'
import vueTap from 'v-tap'
Vue.use(vueTap)
import { ToastPlugin, ConfirmPlugin, AlertPlugin, LoadingPlugin, WechatPlugin } from 'vux'
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(AlertPlugin)
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
import jsBridge from './widget/plugin/jsbridge'
Vue.use(jsBridge)
import uaDetector from './widget/plugin/ua'
Vue.use(uaDetector)
import titleSetter from './widget/plugin/setTitle'
Vue.use(titleSetter)
import log from './widget/plugin/log'
Vue.use(log)
import './widget/filter'
import './widget/plugin/http'
import './widget/directive'
//交互体验提升
import './widget/plugin/ue'


import VeeValidate from 'vee-validate'
import messagesCN from './widget/validate/zh_CN'
import {wechatSignApi} from './api'
const isApp = cookie.get('http_ostype')
const veeConfig  =  {
  errorBagName: 'errors', // change if property conflicts.
  delay: 0.5,
  locale: 'cn',
  messages: null,
  strict: true,
  dictionary: {
    cn: {
      messages: messagesCN
    }
  }
}
Vue.use(VeeValidate, veeConfig)
import * as VeeValidateExtends from './widget/validate/extends'

// import * as VeeValidateExtends from './widget/validate/extends'

Vue.config.productionTip = false
// Vue.config.silent = true
// Vue.config.devtools = true
/* eslint-disable no-new */

export const rootNode = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

window.za_app = {
  depend: {Vue, router},
  rootNode,
  compnent: {},
  module: {}
}


rootNode.axios.defaults.timeout = 6000
rootNode.axios.interceptors.request.use(
  config => {
    rootNode.$store.dispatch('toggleLoadingStatus', true)
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// 添加响应拦截器
rootNode.axios.interceptors.response.use(function (response) {
  // 对响应数据做些事
  // console.log(response)
  let status = response.status
  if(status < 200 && status >= 300){
    rootNode.$vux.toast.show({
       text: '系统异常',
       type: 'text',
       width: '80%'
    })
  }
  rootNode.$store.dispatch('toggleLoadingStatus', false)
  return response
}, function (error) {
  // 请求错误时做些事
  // console.log(error)
  // console.log(error)
  // Error: Request failed with status code 400
  // let status = error.status
  rootNode.$store.dispatch('toggleLoadingStatus', false)
  if(!!~(error.toString().indexOf('timeout'))){
    rootNode.$vux.toast.show({
     text: '请求超时,请稍后再试',
     type: 'text',
     width: '80%'
    //  time: 15000
    })
    return Promise.reject(error)
  }

  if(!!~(error.toString().indexOf('Network Error'))){
    rootNode.$vux.toast.show({
       text: '网络异常，请检查网络设置',
       type: 'text',
       width: '80%'
    })
    return Promise.reject(error)
  }


  if(!!~(error.toString().indexOf('Request failed with status code'))){
    let status =  error.toString().slice(-3)
    // console.log(status)

    if(status < 200 && status >= 300){
      rootNode.$vux.toast.show({
         text: '系统异常',
         type: 'text',
         width: '80%'
      })
      return Promise.reject(error)
    }
  }

  // rootNode.$vux.toast.show({
  //    text: '系统异常',
  //    type: 'text',
  //    width: '80%'
  // })
  // rootNode.$store.dispatch('toggleLoadingStatus', false)
  // return Promise.reject(error)
})
// http request 拦截器
// let CancelToken = rootNode.axios.CancelToken
// rootNode.source = CancelToken.source()
// rootNode.cancelToken = rootNode.source.token

router.afterEach(route => {
  if (document.querySelectorAll('.full-page')) {
    // console.log('text')
    document.querySelectorAll('.full-page')[0].scrollTop = 0
  }

  let title = router.app._route.meta && router.app._route.meta.header && router.app._route.meta.header.title
  let type = (router.app._route.meta && router.app._route.meta.header && router.app._route.meta.header.type) || 'normal'
  let leftMenu = router.app._route.meta && router.app._route.meta.header && router.app._route.meta.header.leftMenu
  let rightMenu = router.app._route.meta && router.app._route.meta.header && router.app._route.meta.header.rightMenu
  title && rootNode.setTitle(title, type, leftMenu, rightMenu)
  // window.scrollTo(0, 0) // 当hash mode 滚动到顶部
})

// source.cancel('取消请求')
// console.log(source)
router.beforeEach((to, from, next) => {
  // alert(to.name)
  // 取消axois请求
  rootNode.$store.dispatch('toggleLoadingStatus', false)
  // 登陆判断
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (process.env.NODE_ENV !== 'development'){
      // 判断是否app端
      if (cookie.get('http_ostype')) {
        if (!cookie.get('token')) {
          // alert('show login')
          jsBridge.callLogin()
          next()
        } else {
          // alert('has login')
        }
      } else {
        // alert('not app')
        // 非App访问, 拦截逻辑
      }
    }
    next()
  } else {
    next() // 确保一定要调用 next()
  }
})

if (Vue.uaDetector && Vue.uaDetector.inWechat) {
  // alert(window.location.href)
  rootNode.axios.post(wechatSignApi,{
    url: window.location.href.split('#')[0].replace('/?','?')
  }).then((res)=> {
    let value = res.data.data
    if(!!value){
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: value.appId, // 必填，公众号的唯一标识
        timestamp: value.timestamp, // 必填，生成签名的时间戳
        nonceStr: value.nonceStr, // 必填，生成签名的随机串
        signature: value.signature,// 必填，签名，见附录1
        jsApiList: ['chooseImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
      wx.ready(()=> {
        wx.hideOptionMenu()
      })
    }
  })
  .catch((errorResponse) => {
    // alert(errorResponse)
    let toastConf = {
     type: 'text',
     width: '80%',
     isShowMask: true,
     text: '授权失败，稍后再试',
    //  time: 150000
    }
    Vue.$vux.toast.show(toastConf)
  })
}


// router.beforeEach((to, from, next) => {
//   if (Vue.uaDetector && Vue.uaDetector.inWechat){
//     let wx = WechatPlugin.$wechat
//     wx.ready(function(){
//       wx.hideOptionMenu();
//     })
//   }
// })
//
// if (Vue.uaDetector && Vue.uaDetector.inWechat){
//   let wx = WechatPlugin.$wechat
//   wx.ready(function(){
//     wx.hideOptionMenu();
//   })
//   // if (to.matched.some(record => record.meta.share)) {
//     Vue.http.post(wechatconfigApi,{url:window.location.href.split('#')[0]}).then((response) => {
//       let value = response.data.value
//       wx.config({
//           debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//           appId: value.appId, // 必填，公众号的唯一标识
//           timestamp: value.timestamp, // 必填，生成签名的时间戳
//           nonceStr: value.nonceStr, // 必填，生成签名的随机串
//           signature: value.signature,// 必填，签名，见附录1
//           jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
//       })
//       // alert(wx.config)
//       wx.error(function(res) {
//       //  alert('wx.error'+res.errMsg);
//       })
//     })
//     .catch((errorResponse) => {
//       // alert(errorResponse)
//       let toastConf = {
//        type: 'text',
//        width: '80%',
//        isShowMask: true,
//        text: '授权失败，稍后再试',
//       //  time: 150000
//       }
//       Vue.$vux.toast.show(toastConf)
//       // Handle error...
//       // console.log('API responded with:', errorResponse.status);
//     })
//     .finally(() => {
//       // LoadingState.$emit('toggle', false);
//     })
//   // }
// }
//底部菜单方法
if (isApp){
  window.goIndex=function(){
    router.push('/')
  }
  window.goHome=function(){
    router.push('usercenter')
  }
}
