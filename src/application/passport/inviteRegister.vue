<template>
  <div id="register" ref="bgimg">
    <div class="register">
      <form class="sign-form">
        <div class="sign-phone">
          <input v-validate data-vv-rules="required|mobile" data-vv-name='手机号' :maxLength='11' type='tel'  v-model.trim='phone' name='输入手机号' placeholder="请输入手机号">
        </div>
        <div class="message">
          <div class="sign-mess">
            <input type="tel" placeholder="输入验证码" v-model="msgcode" v-validate :maxLength='6' data-vv-rules="required" data-vv-value-path="innerValue" name='输入验证码'>
          </div>
          <div class="sendmess">
            <span v-if="showdown" v-tap="{methods:showCountDown}">获取验证码</span>
            <span v-if="!showdown">
              <countdown slot="value" v-model="timers" @on-finish="finish" class="down"></countdown>
              秒后重发
            </span>
          </div>
        </div>
        
        <div class="sign-pas">
          <input v-validate data-vv-rules="required|password" data-vv-name='输入密码' :maxLength='20'  type='password'  v-model='pas1' name='输入密码' placeholder="密码6-20位且包含数字和字母">
        </div>
        <div class="sign-pas">
          <input v-validate data-vv-rules="required|password" data-vv-name='输入确认密码' :maxLength='20'  type='password'  v-model='pas2' name='输入确认密码' placeholder="请再次输入密码">
        </div>
        <p>点击注册即表示同意<router-link to="useragree">《保啊用户注册协议》</router-link></p>
        
      </form>
      <div class="goregister" v-tap="{methods:gonext}">
        <img src="~assets/image/passport/regis.png" alt="">
      </div>
    </div>
    <div v-transfer-dom id="resig-alert">
      <confirm v-model="show" @on-cancel="onCancel" @on-confirm="onConfirm" :content="content" title=" "></confirm>
    </div>
  </div>
</template>
<script>
  import { Countdown,Confirm , TransferDomDirective as TransferDom } from 'vux'
  import { registerApi ,getMsgCodeApi, isExistApi,wechatSignApi} from "src/api"
  let height=""
  export default {
    name:"Register",
    directives: {
      TransferDom
    },
    data(){
      return {
        phone:"",
        msgcode:"",
        pas1:"",
        pas2:"",
        content:"该手机号码已注册<br/>是否需要重新下载保啊",
        show:false,
        timers:60,
        showdown:true,
        canshow:true
      }
    },
    components:{
      Countdown, Confirm 
    },
    created(){
      let CancelToken = this.axios.CancelToken
      let source = CancelToken.source()
      if(this.uaDetector && this.uaDetector.inWechat) {
        this.axios.post(wechatSignApi,{
          url:window.location.href.split('#')[0].replace('/?','?')
        },{cancelToken:source.token}).then((res)=> {
          let value = res.data.data
          // let wx = this.$wechat
          if(!!value){
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: value.appId, // 必填，公众号的唯一标识
              timestamp: value.timestamp, // 必填，生成签名的时间戳
              nonceStr: value.nonceStr, // 必填，生成签名的随机串
              signature: value.signature,// 必填，签名，见附录1
              jsApiList: ["showMenuItems","hideMenuItems",'chooseImage','onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            })
            wx.ready(()=> {
              // wx.hideOptionMenu();
              // alert('ready')
              wx.showOptionMenu()
              wx.onMenuShareAppMessage({
                title: '没保单就用保啊，超高推广奖励，一起来赚钱吧！', // 分享标题
                desc: '我正在使用保啊，强烈推荐您加入。超高推广奖励，更多团队玩法，任性赚钱！！', // 分享描述
                link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: 'http://pkufi-perftest.zhongan.io/static/pic/balogo.png', // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () { 
                    // 用户确认分享后执行的回调函数
                  let toastConf = {
                  type: 'text',
                  width: '80%',
                  isShowMask: true,
                  text: '分享成功',
                  //  time: 150000
                  }
                  this.$vux.toast.show(toastConf)
                },
                cancel: function () { 
                    // 用户取消分享后执行的回调函数
                  let toastConf = {
                  type: 'text',
                  width: '80%',
                  isShowMask: true,
                  text: '分享失败',
                  //  time: 150000
                  }
                  this.$vux.toast.show(toastConf)
                }
              });
              wx.onMenuShareTimeline({
                title: '没保单就用保啊，超高推广奖励，一起来赚钱吧！', // 分享标题
                link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: 'http://pkufi-perftest.zhongan.io/static/pic/balogo.png', // 分享图标
                success: function () { 
                    // 用户确认分享后执行的回调函数
                  let toastConf = {
                  type: 'text',
                  width: '80%',
                  isShowMask: true,
                  text: '分享成功',
                  //  time: 150000
                  }
                  this.$vux.toast.show(toastConf)
                },
                cancel: function () { 
                    // 用户取消分享后执行的回调函数
                  let toastConf = {
                  type: 'text',
                  width: '80%',
                  isShowMask: true,
                  text: '分享失败',
                  //  time: 150000
                  }
                  this.$vux.toast.show(toastConf)
                }
              });
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
          this.$vux.toast.show(toastConf)
        })
      }
    },
    mounted(){
      let height = document.body.clientHeight;
      this.$refs.bgimg.style.height = height + "px";
    },
    methods:{
      gonext(){
        let inviter = this.$route.query.inviter?this.$route.query.inviter:"";
        this.$validator.validateAll().then(success => {
          if (!success) {
            const msg = this.errors.all()[0];
            this.$vux.toast.show({
              text: msg,
              type: 'text',
              width: '80%'
            });
            return
          }else{
            if(this.pas1 === this.pas2){
              this.axios.post(registerApi,{
                "inviter": inviter,
                "loginName": this.phone,
                "password": this.pas2,
                "smsCode": this.msgcode
              }).then(res=>{
                if(res.data.code==10001){
                   this.show = true;
                }else if(res.data.status=="SUCCESS"){
                  this.$vux.toast.show({
                    text: "注册成功，3秒后进入下载页",
                    type: 'text',
                    width: '80%'
                  });
                  setTimeout(()=>{
                    this.$router.push("godownload")
                  },3000)
                }else{
                  this.$vux.toast.show({
                    text: res.data.message,
                    type: 'text',
                    width: '80%'
                  });
                }
              }).catch(err=>{
                this.$vux.toast.show({
                  text: "网络异常",
                  type: 'text',
                  width: '80%'
                });
              })
            }else{
              this.$vux.toast.show({
                text:"两次密码输入不一致",
                type: 'text',
                width: '80%'
              });
            }
          }
        })
      },
      showCountDown(){
        this.timers = 60;
        if(!(/^1[34578]\d{9}$/.test(this.phone))){ 
          this.$vux.toast.show({
            text: "请输入正确的手机号",
            type: 'text',
            width: '80%'
          });  
          return
        }else{
          let url = isExistApi + this.phone;
          this.axios.get(url)
          .then(res=>{
            if(res.data.status!=="SUCCESS"){
              this.$vux.toast.show({
                text: "系统异常",
                type: 'text',
                width: '80%'
              });
              return
            }
            if(!res.data.data){
              this.showdown = false;
              this.axios.post(getMsgCodeApi,{
                "mobile": this.phone,
                "smsType": 1
              }).then(res=>{
                if(res.data.status=="SUCCESS"){
                  this.$vux.toast.show({
                    text: res.data.message,
                    type: 'text',
                    width: '80%'
                  });
                }else{
                  this.$vux.toast.show({
                    text: res.data.message,
                    type: 'text',
                    width: '80%'
                  });
                }
              }).catch(err=>{
                this.$vux.toast.show({
                  text: "网络异常",
                  type: 'text',
                  width: '80%'
                });
              })
            }else{
              this.show = true;
            }
          }).catch(err=>{
            this.$vux.toast.show({
              text: "网络异常",
              type: 'text',
              width: '80%'
            });
          })
          
        } 
      },
      finish(){
        this.showdown = true;
      },
      onConfirm(){
        this.$router.push("godownload")
      },
      onCancel(){

      }
    },
    beforeDestroy(){
      wx.hideOptionMenu()
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss'>
  @import '~src/assets/scss/function';
  #register{
    width:100%;
    min-height:100%;
    background:url(~assets/image/passport/bg.jpg) no-repeat left top;
    background-size:100% 100%;
    position:relative;
    display:flex;
    & input{
      border:none;
      outline:none;
      width:100%;
      background:#fff;
      font-size:rem-calc(16px);
      height:rem-calc(40px);
    }
    & input:focus{color:#999;-webkit-appearance:none}
    &>.register{
      margin:0 rem-calc(15px);
      align-self:flex-end;
      background:url(~assets/image/passport/register.png) no-repeat left top;
      background-size:100% 100%;
      .sign-form{
        margin:rem-calc(55px) rem-calc(35px) 0;
        &>div{
          padding-left:rem-calc(38px);
          height:rem-calc(40px);
          border-radius:rem-calc(7px);
          margin-bottom:rem-calc(10px);
        }
        &>.sign-phone{
          background:url(~assets/image/passport/phone-icon.png) no-repeat rem-calc(15px) center;
          background-color:#fff;
          background-size:rem-calc(11px 16px);
        }
        &>.message{
          border:none;
          padding:0;
          &>div{
            height:rem-calc(40px);
            border-radius:rem-calc(7px);
          }
          &>.sign-mess{
            box-sizing:border-box;
            width:60%;
            padding-left:rem-calc(38px);
            background:url(~assets/image/passport/resig-icon.png) no-repeat rem-calc(13px) center;
            background-size:rem-calc(14px 14px);
            float:left;
            background-color:#fff;
          }
          &>.sendmess{
            float:right;
            background:#16a563;
            width:36%;
            line-height:rem-calc(40px);
            text-align:center;
            &>span{
              font-size:rem-calc(14px);
              color:#fff;
            }
          }
        }
        &>.sign-pas{
          background:url(~assets/image/passport/pas-icon.png) no-repeat rem-calc(14px) center;
          background-color:#fff;
          background-size:rem-calc(13px 19px);
          
        }
        &>p{
          color:#028e4d;
          font-size:rem-calc(12px);
          padding:0 rem-calc(10px) rem-calc(12px) rem-calc(10px);
          a{
            color:#fff778;
          }
        }
      }
      .goregister{
        height:rem-calc(50px);
        background:url(~assets/image/passport/regis-btn.png) no-repeat left center;
        margin:0 rem-calc(35px);
        background-size:100% 100%;
        margin-bottom:rem-calc(10px);
        text-align:center;
        vertical-align: middle;
        line-height: rem-calc(45px);
        &>img{
          width:rem-calc(40px);
          height:rem-calc(20px);
          vertical-align: middle;
        }
      }
    }
  }
  #resig-alert{
    &>div>.vux-x-dialog{
      &>.weui-dialog{
        width: rem-calc(280px);
        height: rem-calc(148px);
        border-radius:rem-calc(10px);
        &>.weui-dialog__bd{
          color:#333;
          font-size:rem-calc(16px);
          line-height:1.6;
        }
        &>.weui-dialog__ft{
          position:absolute;
          bottom:0;
          width:100%;
          &>a{
            font-size:rem-calc(16px);
            color:#00bd96;
          }
        }
      }
    }
  }
</style>