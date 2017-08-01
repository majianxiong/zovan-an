<template>
  <div id="changepas">
    <div class="change-head">
      <span>{{context.info}}</span>
      <span>{{context.account}}</span>
    </div>
    <div class="change-detail">
      <div class="first">
        <span>{{context.firstinfo}}</span>
        <customInput ref='fields' v-validate data-vv-rules="required|password" data-vv-value-path="innerValue" data-vv-name='输入密码' placeholder='请输入原密码' :maxLength='20' type='password' v-model.trim='oldpas' name='password' class="secondinp"/>
      </div>
      <div class="second">
        <span>{{context.secondinfo}}</span>
        <customInput ref='fields' v-validate data-vv-rules="required|password" data-vv-value-path="innerValue" data-vv-name='输入密码' placeholder='请输入密码(6-20个字符)' :maxLength='20' type='password' :btnarea='{type:"pwdEye"}' v-model.trim='newpas' name='password' class="secondinp"/>
      </div>
    </div>
    <div class="btn" @click="handleClick">
       {{context.btntxt}}
    </div>
    <div v-transfer-dom id="c-pas">
      <alert v-model="show" @on-show="onShow" @on-hide="onHide" :title="title" :content="content" button-text="确定"></alert>
    </div>
  </div>
</template>
<script>
  import { Alert, TransferDomDirective as TransferDom } from 'vux'
  import customInput from 'src/components/base/customInput';
  import {changeLogPas} from 'src/api/index.js'
  import store from 'src/widget/plugin/store.js'
  import cookie from 'src/widget/plugin/cookie'
  let token = cookie.get('http_usertoken')
  let userId = cookie.get('http_userID')
  let loginName = cookie.get('http_phoneNo')

  export default {
    name: "ChangePas",
    directives: {
      TransferDom
    },
    components: {
      Alert
    },
    data () {
      return {
        context: {
          info: "当前账号",
          account: "",
          firstinfo: "原登陆密码",
          secondinfo: "新登陆密码",
          btntxt: "确认"
        },
        show: false,
        oldpas: "",
        newpas: "",
        content:"请使用新设置的密码登陆",
        title:"修改成功"
      }
    },
    methods: {
      showPlugin () {

      },
      onShow (){

      },
      onHide (){
        store.remove("userInfo");
        store.remove("goCashCard");
        this.jsbridge.callLogout()
        this.jsbridge.callLogin()
      },
      handleClick (){
      //  this.items[2].exist = true;
        // Validate All returns a promise and provides the validation result.
        //  this.validateChild();
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
            var that = this
            let instance = this.axios.create({
              headers: {'token': token}
            });
            instance.post(changeLogPas,{
              "loginName": loginName ,
              "oldPassword": this.oldpas,
              "password": this.newpas
            }).then(res=>{
              this.$store.dispatch('toggleLoadingStatus', false)
              let toastConf = {
                  text: res.data.message,
                  type: 'text',
                  width: '80%',
                  isShowMask: true,
                  //  time: 15000
                }
              if(res.data.status=="SUCCESS"){
                this.show = true
              }else{
                this.$vux.toast.show(toastConf)
              }
            }).catch(err=>{
              this.$vux.toast.show({
                text: "系统异常",
                type: 'text',
                width: '80%'
              });
            })
          }
        }).catch((err)=>{
         console.log(err)
        });
      }
    },
    beforeMount (){
      this.context.account = loginName
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss'>
  @import '~src/assets/scss/function';
  #changepas{
    width:100%;
    height:100%;
    background:#f6f6f6;
    &>.change-head{
      line-height:rem-calc(35px);
      padding-left:rem-calc(15px);
      color:#999;
      font-size:rem-calc(13px);
    }
    &>.change-detail{
      height:ren-calc(90px);
      padding-left:4%;
      background:#fff;
      &>.first{
        position:relative;
      }
      &>.first,&>.second{
        line-height:rem-calc(45px);
        font-size:rem-calc(14px);
        overflow:hidden;
        &>span{
          float:left;
          width:25%;
        }
        & input{
          height:rem-calc(45px);
        }
        &>.secondinp{
          width:74%;
          height:rem-calc(45px);
          font-size:12px;
          line-height:rem-calc(45px);
          & input{
            margin:0;
            padding:0;
            font-size:rem-calc(13px);
          }
          &>.btn-area{
            position:absolute;
            right:0;
          }
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
    }
    &>.btn{
      line-height:rem-calc(45px);
      width:rem-calc(345px);
      background-image: -webkit-linear-gradient( 0deg, rgb(108,217,182) 0%, rgb(54,210,159) 45%, rgb(0,203,135) 100%);
      border-radius: rem-calc(3px);
      margin:rem-calc(35px) auto;
      text-align:center;
      color:#fff;
      font-size:rem-calc(18px);
    }
  }
  #c-pas .vux-alert>.vux-x-dialog>.weui-dialog{
    width:rem-calc(280px);
    &>.weui-dialog__hd{
      padding-top:rem-calc(27px);
      height:rem-calc(18px);
      &>.weui-dialog__title{
        font-size:rem-calc(18px);
      }
    }
    &>.weui-dialog__bd{
      font-size:rem-calc(14px);
      margin-top:rem-calc(8px);
      padding-top:0;
      padding-bottom:rem-calc(2px);
      color:#999;
    }
  }
</style>