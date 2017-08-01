<template>
  <div id="cardidentify">
    <div class="change-head">
      <span>请输入{{mobile}}收到的短信验证码</span>
    </div>
    <div class="change-detail">
      <div class="first">
        <span>验证码</span>
        <input type="tel" placeholder="请输入短信验证码" v-model="msgcode" v-validate :maxLength='6' data-vv-rules="required" data-vv-value-path="innerValue" name='输入验证码'>
        <c_countdown :time="time" :content="content" :color="color" :get-msg-code="getMsgCode" :cansendmsg="cansendmsg"></c_countdown>
      </div>
    </div>
    <c_btn :config="config" @go-next="goNext"></c_btn>
  </div>
</template>
<script>
  import c_btn from 'src/components/base/nextbtn'
  import c_countdown from 'src/components/base/countdown'
  import store from 'src/widget/plugin/store.js'
  import {addBankCardApi,getMsgCodeApi,messageCodeApi} from 'src/api/index.js'
  import cookie from 'src/widget/plugin/cookie'
  let token = cookie.get('http_usertoken')
  let userId = cookie.get('http_userID')
  let loginName = cookie.get('http_phoneNo')
  export default {
    name: "CardIdentify",
    data () {
      return {
        config:{
          val: "下一步"
        },
        time:60,
        content:"秒后重发",
        color:"#00bd96",
        mobile:"",
        cansendmsg:true,
        msgcode:""
      }
    },
    components: {
      c_btn, c_countdown
    },
    methods:{
      getMsgCode(){
        let loginName = store.get("userInfo").loginName
        let instance =this.axios.create({
              headers: {'token': token}
            });
        instance.post(getMsgCodeApi,{
          mobile: loginName,
          smsType: "5"
        }).then(res=>{
          this.$vux.toast.show({ 
            text: res.data.message,
            type: 'text',
            width: '80%'
          });
        }).then(err=>{

        })
      },
      goNext (){
        let userInfo = store.get("userInfo");
        let instance =this.axios.create({
              headers: {'token': token}
            });
        instance.post(messageCodeApi,{
          mobile:loginName,
          smsCode: this.msgcode,
          smsType: 5
        }).then(res=>{
          let toastConf = {
            text: res.data.message,
            type: 'text',
            width: '80%',
            isShowMask: true,
          }
          if(res.data.status=="SUCCESS"){
            instance({
              method:'put',
              url: addBankCardApi,
              params: {
                bcNo: userInfo.addCard.bankCardId,
                userId : userInfo.id,
                bankCode: "ICBC",
                mobile : userInfo.addCard.mobile,
                idNo : userInfo.addCard.idno,
                realName : userInfo.addCard.name
              }
            }).then(res1=>{
              let toastConf = {
                text: res1.data.message,
                type: 'text',
                width: '80%',
                isShowMask: true,
                //  time: 15000
              }
              this.$vux.toast.show(toastConf)
              if(res.data.status=="SUCCESS"){
                setTimeout(()=>{
                  this.$router.push("usercenter")
                },1500)
              }
            }).then(err=>{
              console.log(err)
            })
          }else{
            this.$vux.toast.show(toastConf)
          }
        })
        
      }
    },
    beforeMount(){
      this.mobile = store.get("userInfo").addCard.mobile;
    },
    activated(){
      this.mobile = store.get("userInfo").addCard.mobile
    }
    
  }
</script>
<style lang='scss' rel='stylesheet/scss'>
  @import '~src/assets/scss/function';
  #cardidentify{
    width:100%;
    height:100%;
    background:#f6f6f6;
    &>.change-head{
      line-height:rem-calc(40px);
      padding-left:rem-calc(15px);
      color:#999;
      font-size:rem-calc(13px);
    }
    &>.change-detail{
      height:ren-calc(90px);
      padding-left:rem-calc(15px);
      background:#fff;
      margin-bottom:rem-calc(35px);
      &>.first{
        line-height:rem-calc(45px);
        position:relative;
        font-size:rem-calc(14px);
        &>input{
          width:50%;
          height:rem-calc(30px);
          border:none;
          outline:none;
          margin-left:rem-calc(15px);
          font-size:rem-calc(14px);
        }
      }
    }
  }
</style>