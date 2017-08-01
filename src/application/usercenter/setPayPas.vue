<template>
  <div id="setpaypas">
    <template v-if="first">
      <div class="pashead">设置6位数字支付密码</div>
      <div class="pasbox">
        <c_pay :inputlen="6" key=1 @submit="setValue1" :val="pas1"></c_pay>
      </div>
      <c_btn :config="config" key=1 @go-next="goNext"></c_btn>
    </template>
    <template v-if="!first">
      <div class="pashead">请再次输入密码</div>
      <div class="pasbox">
        <c_pay :inputlen="6" key=2 @submit="setValue2" :val="pas2"></c_pay>
      </div>
      <c_btn :config="config" key=2 @go-next="compire"></c_btn>
    </template>
    <alert v-model="show" @on-show="onShow" @on-hide="onHide" :content="msg" button-text="确定"></alert>
  </div>
</template>
<script>
  import c_btn from 'src/components/base/nextbtn'
  import c_pay from 'src/components/base/paypas'
  import { Alert, TransferDomDirective as TransferDom } from 'vux'
  import {changePayPas} from 'src/api/index'
  import store from 'src/widget/plugin/store.js'
  import cookie from 'src/widget/plugin/cookie'
  let userId = cookie.get('http_userID')
  let token = cookie.get('http_usertoken')
  export default {
    name: "SetSayPas",
    data () {
      return {
        first:true,
        show:false,
        success:false,
        pas1:'',
        pas2:'',
        msg:'',
        config:{
          val:"确定",
        }
      }
    },
    components: {
      c_btn,c_pay,Alert
    },
    methods:{
      goNext(){
        if(this.pas1.length == 6) {
          this.first = false
        }
      },
      setValue1(val) {
        this.pas1 = val
      },
      setValue2(val) {
        this.pas2 = val
      },
      onShow () {

      },
      onHide () {
        if(!this.success){
          this.first = true;
          this.pas1 = "";
          this.pas2 = "";
        }else{
          this.$router.push("usercenter")
        }
      },
      compire () {
        if(this.pas1.length != 6 || this.pas2.length != 6) return
        // 前后输入一致
        if(this.pas1 == this.pas2) {
          let instance =this.axios.create({
            headers: {'token': token}
          });
          instance.post(changePayPas, {password:this.pas2, userId:userId}).then(res => {
            //alert(JSON.stringify(res))
            if(res.data.status == 'SUCCESS') {
              this.msg = '您的支付密码设置成功'
              this.success = true
              this.show = true
              let userInfo = store.get("userInfo");
              userInfo.accountInfo.isUsePayPsw = 1;
              store.set("userInfo",userInfo)
            }else {
              this.msg = res.data.message
              this.success = false
              this.show = true
            }
          }).catch((err) => {
            this.msg = "系统异常"
            this.success = false
            this.show = true
          })

        } else {
          this.msg = '支付密码不一致，请重新输入'
          this.success = false
          this.show = true
        }
      }
    },
    activated(){
      this.first = true
      this.pas1 = ""
      this.pas2 = ""
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss'>
  @import '~src/assets/scss/function';
  #setpaypas{
    width:100%;
    height:100%;
    background:#f6f6f6;
    overflow:hidden;
    &>.pashead{
      line-height:rem-calc(52px);
      padding-left:rem-calc(15px);
      font-size:16px;
    }
    &>.pasbox{
      width:rem-calc(345px);
      height:rem-calc(50px);
      background:#fff;
      margin:0 auto rem-calc(35px);
      position:relative;
    }
  }
</style>
