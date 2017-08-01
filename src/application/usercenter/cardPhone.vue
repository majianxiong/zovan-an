<template>
  <div id="cardphone">
    <div class="change-head">
      <span>{{cardtype}}</span>
      <span>{{cardnum | hide(4,16)}}</span>
    </div>
    <div class="change-detail">
      <div class="first">
        <span class="shuoming">姓名</span>
        <span class="detail">{{usename | hide(1,2)}}</span>
      </div>
      <div class="second">
        <span class="shuoming">身份证</span>
        <span class="detail">{{idnum| hide(4,15)}}</span>
      </div>
    </div>
    <div class="third">
      <span>手机号</span>
      <input v-validate data-vv-rules="required|mobile" data-vv-name='手机号' :maxLength='11' type='tel'  v-model.trim='phone' name='手机号' placeholder="请输入手机号">
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
    name: "CardPhone",
    data () {
      return {
        config:{
          path: "cardidentify",
          val: "下一步",
        },
        cardtype: "工商银行借记卡",
        cardnum: "",
        usename: "",
        idnum: "",
        phone: ""
      }
    },
    components: {
      c_btn
    },
    methods:{
      getData(){
        if(store.get("userInfo")){
          this.usename = store.get("userInfo").accountInfo.realName;
          this.idnum = store.get("userInfo").accountInfo.idNo;
          this.cardnum = store.get("userInfo").addCard.bankCardId;
        }
      },
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
            let userInfo = store.get('userInfo')
            userInfo.addCard.mobile = this.phone
            userInfo.addCard.name = this.usename,
            userInfo.addCard.idno = this.idnum
            store.set('userInfo',userInfo)
            this.$router.push({path:"cardidentify"})
          }
        }).catch((err)=>{
         console.log(err)
        });
      }
    },
    beforeMount(){
      this.getData()
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
  @import '~src/assets/scss/function';
  #cardphone{
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
      &>.first,&>.second{
        line-height:rem-calc(45px);
        position:relative;
        font-size:rem-calc(14px);
        overflow:hidden;
        &>.shuoming{
          width:rem-calc(45px);
          display:inline-block;
          float:left;
        }
        &>.detail{
          overflow:hidden;
          height:rem-calc(30px);
          border:none;
          outline:none;
          margin-left:rem-calc(15px);
          font-size:rem-calc(14px);
        }
      }
      &>.first::after{
        @include borderbottom
        color:#eee;
      }
    }
    &>.third{
      line-height:rem-calc(45px);
      position:relative;
      font-size:rem-calc(14px);
      background:#fff;
      padding-left:rem-calc(15px);
      margin-top:rem-calc(10px);
      margin-bottom:rem-calc(30px);
      &>input{
        width:65%;
        height:rem-calc(30px);
        border:none;
        outline:none;
        margin-left:rem-calc(15px);
        font-size:rem-calc(14px);
      }
    }
  }
</style>