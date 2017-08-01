<template>
  <div id="changephone">
    <div class="change-head">
      <span>{{context.info}}</span>
      <span>{{context.account}}</span>
    </div>
    <div class="change-detail">
      <div class="first">
        <span>{{context.firstinfo}}</span>
        <input v-validate data-vv-rules="required|mobile" data-vv-value-path="innerValue" data-vv-name='手机号' placeholder='请输入手机号' :maxLength='11' type='tel' v-model.trim='value1' name='输入手机号'>
      </div>
      <div class="second">
        <span>{{context.secondinfo}}</span>
        <input type="tel" :placeholder="context.seconddef" v-model.trim='value2' :maxLength='6'>
        <c_countdown :time="time" :content="content" :color="color"  :get-msg-code="getMsgCode" :cansendmsg="cansendmsg"></c_countdown>
      </div>
    </div>
    <c_btn :config="config" @go-next="goNext"></c_btn>
    <div v-transfer-dom id="c-phone">
      <alert v-model="show" @on-show="onShow" @on-hide="onHide" title="更换成功" :content="'请使用'+value1+'重新登陆'" button-text="确定"></alert>
    </div>
  </div>
</template>
<script>
  import { Alert, TransferDomDirective as TransferDom } from 'vux'
  import c_countdown from 'src/components/base/countdown'
  import c_btn from 'src/components/base/nextbtn'
  import store from 'src/widget/plugin/store.js'
  import {getMsgCodeApi, changeLogMobApi} from 'src/api/index.js'
  import cookie from 'src/widget/plugin/cookie'
  let token = cookie.get('http_usertoken')
  let userId = cookie.get('http_userID')
  export default {
    name: "ChangePhone",
    directives: {
      TransferDom
    },
    components: {
      Alert, c_countdown, c_btn
    },
    data () {
      return {
        config:{
          val:"下一步"
        },
        value1: "",
        value2:"",
        context: {
          info: "请输入您要换绑的手机号",
          account: "",
          firstinfo: "手机号",
          firstdef: "请输入换绑手机号码",
          secondinfo: "验证码",
          seconddef: "请输入验证码",
          secondtxt: "获取验证码",
          btntxt: "下一步"
        },
        show: false,
        time:60,
        content:"秒后重发",
        color:"#06c49c",
        cansendmsg:false
      }
    },
    methods: {
      showPlugin () {
        this.show = true;
      },
      onShow (){

      },
      onHide (){
        store.remove("userInfo");
        store.remove("goCashCard");
        this.jsbridge.callLogout()
        this.jsbridge.callLogin()
      },
      goNext(){
        let originalLoginName = store.get("userInfo").loginName;
        let loginName = this.value1;
        this.$validator.validateAll().then(success => {
          if (! success) {
            const msg = this.errors.all()[0];
            this.$vux.toast.show({
              text: msg,
              type: 'text',
              width: '80%'
            });
            return
          }else{
            this.$store.dispatch('toggleLoadingStatus', true)
            let instance = this.axios.create({
              headers: {'token': token}
            });
            instance.post(changeLogMobApi,{
              loginName,
              originalLoginName,
              smsCode: this.value2
            }).then(res=>{
              this.$store.dispatch('toggleLoadingStatus', false)
              if(res.data.status=="SUCCESS"){
                this.showPlugin()
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
          }
        }).catch(err=>{

        })
      },
      getMsgCode(){//获取验证码，初步验证手机号
        let originalLoginName = store.get("userInfo").loginName;
        let loginName = this.value1;
        this.$validator.validateAll().then(success => {
          if (! success) {
            const msg = this.errors.all()[0];
            this.$vux.toast.show({
              text: msg,
              type: 'text',
              width: '80%'
            });
            return
          }else{
            let instance = this.axios.create({
              headers: {'token': token}
            });
            instance.post(getMsgCodeApi,{
              mobile: loginName,
              smsType: "2"
            }).then(res=>{
              this.$vux.toast.show({ 
                text: res.data.message,
                type: 'text',
                width: '80%'
              });
            }).then(err=>{

            })
          }
        }).catch((err)=>{
         console.log(err)
        });
          return this.cansendmsg
      }
    },
    watch:{
      value1(){
        this.$validator.validateAll().then(success => {
          if(success){
            console.log(1)
            this.cansendmsg = true;
          }else{
            this.cansendmsg = false;
          }
        }).catch(err=>{

        })
      }
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss'>
  @import '~src/assets/scss/function';
  #changephone{
    width:100%;
    height:100%;
    background:#f6f6f6;
    &>.change-head{
      line-height:rem-calc(40px);
      padding-left:rem-calc(15px);
      color:#999;
      font-size:13px;
    }
    &>.change-detail{
      height:ren-calc(90px);
      padding-left:rem-calc(15px);
      background:#fff;
      margin-bottom:rem-calc(35px);
      &>.first,&>.second{
        line-height:rem-calc(45px);
        position:relative;
        font-size:14px;
        &>input{
          width:45%;
          height:rem-calc(30px);
          border:none;
          outline:none;
          margin-left:rem-calc(15px);
          font-size:14px;
        }
      }
      &>.first::after{
        @include borderbottom
        color:#eee;
      }
      .second .icon-bg,.fonts{
        float:right;
        margin-right:rem-calc(15px);
      }
      .fonts{
        font-size:16px;
        color:#00bd96;
        &>span{
          padding-left:rem-calc(12px);
          font-size:14px;
          position:relative;
        }
        &>span::before{
          content: " ";
          position: absolute;
          left: 0;
          top: 0;
          width: 1px;
          height: 100%;
          border-left: 1px solid #eee;
          color: #eee;
          -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
          -webkit-transform: scaleX(0.5);
          transform: scaleX(0.5);
        }
      }
    }
  }
  #c-phone .vux-alert>.vux-x-dialog>.weui-dialog{
    width:rem-calc(280px);
    height:rem-calc(145px);
    overflow:hidden;
    &>.weui-dialog__hd{
      padding-top:rem-calc(27px);
      height:rem-calc(18px);
      &>.weui-dialog__title{
        font-size:18px;
      }
    }
    &>.weui-dialog__bd{
      font-size:14px;
      margin-top:rem-calc(8px);
      padding-top:0;
      padding-bottom:2px;
      color:#999;
    }
  }
</style>
