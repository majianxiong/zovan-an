import Vue from 'vue'
import router from 'src/router'
import cookie from 'src/widget/plugin/cookie'
// import storage from '../../widget/store'
import { loginApi, logoutApi, signupApi, extensionCodeApi, getUserInfoApi, getMsg } from 'src/api'
import * as types from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
// const cookieLogged = cookie.get('login')
// console.log(cookieLogged)


let showError = (errorResponse) => {
  let toastConf = {
    type: 'text',
    width: '80%',
    isShowMask: true,
    text: '网络异常，稍后再试'
    //  time: 150000
  }
  Vue.$vux.toast.show(toastConf)
}

const state = {
  name: null,
  certiNo: null,
  createdDate: null,
  mobile: null,
  email: null,
  address: null,
  agentCode: null,
  uid: null,
  openId: null,
  accountType: null,
  logged: false,
  loginVfcode: false,
  signupVfcode: false,
  extensionCode: null,
  inviteChannel: null,
  unreadNum:null,
}

// if (!cookieLogged) {
  // state.logged = false
// } else {
//   state.logged = true
// }

// getters
const getters = {
  logged: state => state.logged
}

// actions
const actions = {
  login ({ commit, state }, config) {
    // console.log(loginApi.get(params))
    // console.log(conf)
    let conf = config || {}
    Vue.axios.post(loginApi, conf.params).then((response) => {
      let toastConf = {
       type: 'text',
       width: '80%',
       isShowMask: true,
      //  time: 15000
      }
      // console.log(response)
      if(response.data && !response.data.success){
        if(state.loginVfcode){
          if(conf.refreshVfCode) conf.refreshVfCode()
        }
        if(response.data.errorCode == '1000206'){
          //需要提交电子验证码
          commit(types.LOGIN_VFCODE,{show:true})
          if(conf && conf.cb) conf.cb()
        }
        toastConf.text = response.data.errorMsg
        // console.log(response.data)
        Vue.$vux.toast.show(toastConf)
        // console.log(Vue.$vux)
        // console.log(toastConf)
        return
      }
      commit(types.LOGIN)
      // commit(types.ACCOUNT_INFO, {accountType: 1})
      commit(types.ACCOUNT_INFO, {
        accountType:response.data.value.userType,
        name:response.data.value.userName,
        certiNo:response.data.value.certiNo,
        mobile:response.data.value.loginName,
        createdDate:response.data.value.registerDate.substring(0,10),
        agentCode: response.data.value.agentCode,
        email: response.data.value.email,
        address: response.data.value.address,
        gender: response.data.value.gender || 'M',
        // openId: response.data.value.openId,
        // uid: response.data.value.id,
        //extensionCode
        //inviteChannel
      })
      // cookie.set('login', response.data.cookie, 7)
      // console.log(router)
      const redirect = router.history.current.query.redirect
      if (redirect) {
        router.replace(redirect)
      } else {
        router.replace('/')
      }
      // console.log(response.data)
    })
    .catch((errorResponse) => {
      // console.log(errorResponse)
      showError(errorResponse)
      // Handle error...
    })
    .finally(() => {
      // LoadingState.$emit('toggle', false);
    })
  },
  getUser({commit,state},config){
    //alert('getUser')
    Vue.axios.get(getUserInfoApi).then((response) => {
        //alert('getUserok')
        let toastConf = {
         type: 'text',
         width: '80%',
         isShowMask: true,
        //  time: 15000
        }
        // console.log(response)
        if(response.data && !response.data.success){
          toastConf.text = response.data.errorMsg
          // console.log(response.data)
          if(!!toastConf.text) Vue.$vux.toast.show(toastConf)
          //if(conf && conf.cb) conf.cb()
          Vue.$vux.loading.hide()
          // console.log(Vue.$vux)
          // console.log(toastConf)
          return
        }

        if(response.data.success && response.data.value == null){
            commit(types.LOGOUT)
            router.replace('/login')
            return
        }

        commit(types.ACCOUNT_INFO, {
          accountType:response.data.value.userType,
          name:response.data.value.userName,
          certiNo:response.data.value.certiNo || '',
          mobile:response.data.value.mobile,
          createdDate:response.data.value.registerDate.substring(0,10),
          agentCode: response.data.value.agentCode || '',
          email: response.data.value.email,
          address: response.data.value.address,
          gender: response.data.value.gender || 'M',
        })
      }).catch((errorResponse) => {
          // console.log(errorResponse)
      })
      .finally(() => {

      })
  },
  autologin ({ commit, state }, config) {
    // console.log(loginApi.get(params))
    // console.log(conf)
    let conf = config || {}
    if(state.logged) {
      // if(conf && conf.cb) conf.cb()
      return
    }
    // if(cookie.get('ZATECH1000100') == undefined){
    //   if(conf && conf.cb) conf.cb()
    //   return
    // }
    if(router.history.current.name == 'login') {
      router.replace('/')
    }
    Vue.$vux.loading.show({
      text: '自动登录中'
    })
    Vue.axios.get(getUserInfoApi).then((response) => {
      let toastConf = {
       type: 'text',
       width: '80%',
       isShowMask: true,
      //  time: 15000
      }
      // console.log(response)
      if(response.data && !response.data.success){
        toastConf.text = response.data.errorMsg
        // console.log(response.data)
        if(!!toastConf.text) Vue.$vux.toast.show(toastConf)
        if(conf && conf.cb) conf.cb()
        Vue.$vux.loading.hide()
        // console.log(Vue.$vux)
        // console.log(toastConf)
        return
      }
      commit(types.LOGIN)
      // commit(types.ACCOUNT_INFO, {accountType: 1})

      commit(types.ACCOUNT_INFO, {
        accountType:response.data.value.userType,
        name:response.data.value.userName,
        certiNo:response.data.value.certiNo || '',
        mobile:response.data.value.mobile,
        createdDate:response.data.value.registerDate.substring(0,10),
        agentCode: response.data.value.agentCode || '',
        email: response.data.value.email,
        address: response.data.value.address,
        gender: response.data.value.gender || 'M',
        // openId: response.data.value.openId,
        // uid: response.data.value.id,
        //extensionCode
        //inviteChannel
      })
      if(conf && conf.cb) conf.cb()
      Vue.$vux.loading.hide()
      // router.replace('/')
      // cookie.set('login', response.data.cookie, 7)
      // const redirect = router.history.current.query.redirect
      // console.log(router)
      // if (redirect) {
      //   router.replace(redirect)
      // } else
      // console.log(response.data)
    })
    .catch((errorResponse) => {
      // console.log(errorResponse)
      // showError(errorResponse)
      Vue.$vux.loading.hide()
      router.replace('/login')
      // let toastConf = {
      //   type: 'text',
      //   width: '80%',
      //   isShowMask: true,
      //   text: '自动登录失败'
      //   //  time: 150000
      // }
      // Vue.$vux.toast.show(toastConf)
      if(conf && conf.cb) conf.cb()
      // Handle error...
    })
    .finally(() => {
      // LoadingState.$emit('toggle', false);
    })
  },
  banUser({ commit, state }, config){
    commit(types.LOGOUT)
  },
  logout ({ commit, state }, config) {
    let conf = config || {}
    Vue.axios.post(logoutApi, {}).then((response) => {
      let toastConf = {
       type: 'text',
       width: '80%',
       isShowMask: true,
      //  time: 15000
      }
      if(response.data && !response.data.success){
        toastConf.text = response.data.errorMsg
        // console.log(Vue.$vux)
        // console.log(toastConf)
        Vue.$vux.toast.show(toastConf)
        return
      }
      commit(types.ACCOUNT_INFO, {
        accountType:null,
        name:null,
        certiNo:null,
        mobile:null,
        createdDate:null,
        agentCode: null,
        email: null,
        address: null,
        gender: null,
        // openId: response.data.value.openId,
        // uid: response.data.value.id,
      })
      commit(types.SIGNUP_VFCODE,{show:false})
      commit(types.LOGIN_VFCODE,{show:false})
      commit(types.INVITATION_INFO, {
        extensionCode:null,
        inviteChannel:null
      })
      commit(types.LOGOUT)
      if(conf && conf.cb) conf.cb()
      const redirect = router.history.current.query.redirect
      if (redirect) {
        router.replace(redirect)
      } else {
        router.replace('/login')
      }
      // console.log(response.data)
      // cookie.delete('login')
    })
    .catch((errorResponse) => {
      // Handle error...
      // console.log(errorResponse)
      showError(errorResponse)
    })
    .finally(() => {
      // LoadingState.$emit('toggle', false);
    })
  },
  signup ({ commit, state }, config) {
    let conf = config || {}
    Vue.axios.post(signupApi, conf.params).then((response) => {
      let toastConf = {
       type: 'text',
       width: '80%',
       isShowMask: true,
      //  time: 15000
      }
      if(response.data && !response.data.success){
        if(state.signupVfcode){
          if(conf.refreshVfCode) conf.refreshVfCode()
        }
        if(response.data.errorCode == '1000206'){
          //需要提交电子验证码
          commit(types.SIGNUP_VFCODE,{show:true})
          // if(conf && conf.cb) conf.cb()
        }
        if(response.data.errorCode == '1000207'){
          //重复注册 清空注册信息
          if(conf && conf.cb) conf.cb()
        }
        toastConf.text = response.data.errorMsg
        // console.log(Vue.$vux)
        Vue.$vux.toast.show(toastConf)
        return
      }
      commit(types.LOGIN)
      commit(types.ACCOUNT_INFO, {
        accountType:response.data.value.userType,
        name:response.data.value.userName,
        certiNo:response.data.value.certiNo,
        mobile:response.data.value.loginName,
        createdDate:response.data.value.registerDate.substring(0,10),
        agentCode: response.data.value.agentCode,
        email: response.data.value.email,
        address: response.data.value.address,
        gender: response.data.value.gender || 'M',
        // openId: response.data.value.openId,
        // uid: response.data.value.id,
        //extensionCode
        //inviteChannel
      })
      //注册成功 清除表单信息
      if(conf && conf.cb) conf.cb()
      toastConf.text = '注册成功'
      // console.log(Vue.$vux)
      Vue.$vux.toast.show(toastConf)
      const redirect = router.history.current.query.redirect
      if (redirect) {
        setTimeout(function(){
          router.replace(redirect)
        },1000)
      } else {
        setTimeout(function(){
          //注册成功 清除表单信息
          // if(conf && conf.cb) conf.cb()
          router.replace('/?')
        },1000)
      }
      // commit(types.LOGINOUT)
      // console.log(response.data)
      // cookie.delete('login')
    })
    .catch((errorResponse) => {
      // Handle error...
      showError(errorResponse)
    })
    .finally(() => {
      // LoadingState.$emit('toggle', false);
    })
  },
  convertProductShareUrl ({ commit, state },config) {
    // console.log(invitationApi)
    let url
    let conf = config
    let finalCode = router.history.current.query.extensionCode
    if(!!finalCode){
      url = document.domain+'/share/product.html?productId=' +conf.productId + '&extensionCode=' + finalCode + '&path=' +conf.path+ '&productCode=' + conf.productCode+ '&inviteChannel='
      if(conf.cb) conf.cb(url)
    }
    else if(!state.extensionCode){
      Vue.axios.post(invitationApi, {}).then((response) => {
        let toastConf = {
         type: 'text',
         width: '80%',
         isShowMask: true,
        //  time: 15000
        }
        if (response.data && !response.data.success){
          toastConf.text = response.data.errorMsg
          // console.log(Vue.$vux)
          Vue.$vux.toast.show(toastConf)
          return
        }

        commit(types.INVITATION_INFO, {
          extensionCode:response.data.value,
          // inviteChannel:response.data.value.inviteChannel
        })
        // alert('response:'+response.data.value)
        // alert('state extensionCode:'+state.extensionCode)
        // alert('router query:'+router.history.current.query.extensionCode)
        finalCode = state.extensionCode
        // alert('router or state extensionCode:'+finalCode)
        url = document.domain+'/share/product.html?productId=' +conf.productId+ '&extensionCode=' + finalCode + '&path=' +conf.path+ '&productCode=' + conf.productCode+ '&inviteChannel='
        // alert('url:'+url)
        if(conf.cb) conf.cb(url)
        // return url
        // router.push({
        //   path:'/signup',
        //   query:{
        //     extensionCode:state.extensionCode,
        //     // inviteChannel:state.inviteChannel
        //   }
        // })

        //wxshare config code
      })
      .catch((errorResponse) => {
      // Handle error...
      // console.log(errorResponse)
        showError(errorResponse)
      })
      .finally(() => {
        // LoadingState.$emit('toggle', false);
      })
    }
    else{
      finalCode = state.extensionCode
      url = document.domain+'/share/product.html?productId=' +conf.productId+ '&extensionCode=' + finalCode + '&path=' +conf.path+ '&productCode=' + conf.productCode+ '&inviteChannel='
      // alert(url)
      if(conf.cb) conf.cb(url)
    }
  },
  readMsgNum({ commit, state },config){
    Vue.axios.get(getMsg)
     .then((response) => {
       let msgnum = 0
       if(response.data.status){
         //alert('result='+response.data.result)
        msgnum = response.data.result

       }else{
          msgnum = 0

       }
      //  console.log('msgnum='+msgnum)
       commit(types.READMSGNUM, {
         result:100,
       })
     },(response)=>{

     })
  },
  convertInvitationUrl ({ commit, state },config) {
    // console.log(invitationApi)
    let url
    let conf = config
    if(!state.extensionCode){
      Vue.axios.post(invitationApi, {}).then((response) => {
        let toastConf = {
         type: 'text',
         width: '80%',
         isShowMask: true,
        //  time: 15000
        }
        if (response.data && !response.data.success){
          toastConf.text = response.data.errorMsg
          // console.log(Vue.$vux)
          Vue.$vux.toast.show(toastConf)
          return
        }

        commit(types.INVITATION_INFO, {
          extensionCode:response.data.value,
          // inviteChannel:response.data.value.inviteChannel
        })
        // alert(state.extensionCode)
        url = document.domain+'/share/register.html?extensionCode='+state.extensionCode+'&inviteChannel='
        // alert(url)
        if(conf.cb) conf.cb(url)
        // return url
        // router.push({
        //   path:'/signup',
        //   query:{
        //     extensionCode:state.extensionCode,
        //     // inviteChannel:state.inviteChannel
        //   }
        // })

        //wxshare config code
      })
      .catch((errorResponse) => {
      // Handle error...
      // console.log(errorResponse)
        showError(errorResponse)
      })
      .finally(() => {
        // LoadingState.$emit('toggle', false);
      })
    }
    else{
      url = document.domain+'/share/register.html?extensionCode='+state.extensionCode+'&inviteChannel='
      // alert(url)
      if(conf.cb) conf.cb(url)
    }
  },
}

// mutations
const mutations = {
  [types.LOGIN] (state) {
    state.logged = true
  },
  [types.LOGOUT] (state) {
    state.logged = false
  },
  [types.LOGIN_AUTO] (state) {
    state.logged = true
  },
  [types.LOGIN_VFCODE] (state, payload) {
    state.loginVfcode = payload.show
  },
  [types.SIGNUP_VFCODE] (state, payload) {
    state.signupVfcode = payload.show
  },
  [types.ACCOUNT_INFO] (state, payload) {
    //alert('payload.name='+payload.name)
    if(payload && payload.accountType) state.accountType = payload.accountType
    if(payload && payload.name) state.name = payload.name
    if(payload && payload.certiNo){
      state.certiNo = payload.certiNo
    }else{
      state.certiNo = ''
    }
    if(payload && payload.mobile) state.mobile = payload.mobile
    if(payload && payload.email) state.email = payload.email
    if(payload && payload.address){
      state.address = payload.address
    }else{
      state.address = ''
    }
    if(payload && payload.createdDate) state.createdDate = payload.createdDate
    if(payload && payload.agentCode){
      state.agentCode = payload.agentCode
    }else{
      state.agentCode = ''
    }
    if(payload && payload.openId) state.openId = payload.openId
    if(payload && payload.uid) state.uid = payload.uid
    if(payload && payload.gender) state.gender = payload.gender
  },
  [types.INVITATION_INFO] (state, payload) {
    if(payload && payload.extensionCode) state.extensionCode = payload.extensionCode
    if(payload && payload.inviteChannel) state.inviteChannel = payload.inviteChannel
  },
  [types.READMSGNUM] (state, payload) {
    //alert('payload.result='+payload.result)
    if(payload && payload.result) state.unreadNum = payload.result
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
