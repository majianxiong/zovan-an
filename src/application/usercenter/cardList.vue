<template>
  <div id="cardlist">
    <ul class="cardlist">
      <li v-for="(item, i) in cardlist" :key="i">
        <p class="card">
          <img src="~assets/image/usercenter/error.png" alt="">
          <span class="cardname">{{item.bankName}}</span>
          <span class="cardtype">{{item.bankType}}</span>
        </p>
        <p class="cardnum">{{item.bankCardNo|hide(0,15)}}</p>
      </li>
    </ul>
    <div class="go-add" @click="goAdd">
      <p>
        <b>+</b>
        <span>添加银行卡</span>
      </p>
    </div>
  </div>
</template>
<script>
  import store from 'src/widget/plugin/store.js'
  import {BankCardListApi} from 'src/api/index.js'
  import cookie from 'src/widget/plugin/cookie'
  let token = cookie.get('http_usertoken')
  let userId = cookie.get('http_userID')
  export default {
    name: "CardList",
    data () {
      return {
        cardlist: []
      }
    },
    methods:{
      getList (){
        let url = BankCardListApi+"/"+userId
        let instance =this.axios.create({
              headers: {'token': token}
            });
          instance.get(url).then(res=>{
          this.cardlist = res.data.data
        }).then(err=>{
        })
      },
      goAdd(){
        let userType = store.get("userInfo").userType
        if(userType==1){
          this.$router.push("cardnum")
        }else{
          this.$vux.toast.show({
            text: "请先进行签约",
            type: 'text',
            width: '80%'
          });
        }
      }
    },
    beforeMount(){
      this.getList()
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss'>
  @import '~src/assets/scss/function';
  #cardlist{
    width:100%;
    background:#f6f6f6;
    overflow:hidden;
    min-height:100%;
    .cardlist{
      margin:rem-calc(15px) rem-calc(15px) 0;
      &>li{
        height:rem-calc(80px);
        margin-bottom:rem-calc(15px);
        padding:rem-calc(15px);
        list-style:none;
        border-radius:6px;
        position:relative;
        background-image:url(~assets/image/usercenter/bankbg.png);
        background-position:left top;
        background-size:100%;
        &>.card{
          color:#fff;
          overflow:hidden;
          &>img{
            width:rem-calc(46px);
            height:rem-calc(46px);
            border-radius:rem-calc(46px);
            float:left;
            margin-right:rem-calc(9px);
          }
          &>span{
            display:block;
          }
          &>.cardname{
            font-size:16px;
            margin-top:rem-calc(5px);
            margin-bottom:rem-calc(8px);
          }
          &>.cardtype{
            font-size:13px;
          }
        }
        &>.cardnum{
          position:absolute;
          bottom:rem-calc(15px);
          right:rem-calc(15px);
          color:#fff;
          font-size:rem-calc(22px);
        }
      }
    }
    &>.go-add{
      width:92%;
      border-radius:5px;
      background:#fff;
      margin:rem-calc(30px) auto;
      height:rem-calc(44px);
      color:#666;
      font-size:rem-calc(16px);
      p{
        width:rem-calc(120px);
        overflow:hidden;
        margin:0 auto;
        &>b{
          float:left;
          font-weight:100;
          font-size:rem-calc(28px);
          line-height:rem-calc(44px);
          margin-right:rem-calc(7px);
        }
        &>span{
          line-height:rem-calc(44px);
          color:#333;
        }
      }
    }

  }
</style>
