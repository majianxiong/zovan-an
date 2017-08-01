<template>
  <div id="cardnum">
    <div class="change-head">
      <span>为了您的账户安全，请绑定本人银行卡</span>
    </div>
    <div class="change-detail">
      <div class="first">
        <span>卡号</span>
        <input v-validate data-vv-rules="required|bankcard" data-vv-name='银行卡号' :maxLength='19' type='tel'  v-model.trim='cardnum' name='银行卡号' placeholder="请输入本人有效银行卡号">
      </div>
    </div>
    <c_btn :config="config" @go-next="goNext"></c_btn>
  </div>
</template>
<script>
  import c_btn from 'src/components/base/nextbtn'
  import store from 'src/widget/plugin/store.js'
  import cookie from 'src/widget/plugin/cookie'
  let token = cookie.get('http_usertoken')
  let userId = cookie.get('http_userID')
  export default {
    name: "CardNum",
    data () {
      return {
        config:{
          val: "下一步",
          path: "cardphone"
        },
        cardnum: ""
      }
    },
    components: {
      c_btn
    },
    methods:{
      goNext(){
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
            var userInfo = store.get("userInfo");
            userInfo.addCard ={
              bankCardId: this.cardnum
            }
            store.set("userInfo",userInfo)
            this.$router.push({path:"cardphone"})
          }
        }).catch((err)=>{
         console.log(err)
        });
      }
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss'>
  @import '~src/assets/scss/function';
  #cardnum{
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
      &>.first{
        line-height:rem-calc(45px);
        position:relative;
        font-size:rem-calc(14px);
        &>input{
          width:55%;
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
