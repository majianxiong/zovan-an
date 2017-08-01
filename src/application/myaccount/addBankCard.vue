<template>
  <div id="addCardPage">
    <img src="~assets/image/usercenter/addcart.png" alt="">
    <router-link to="/cardnum" class="go-add" tag="div">
      <p>
        <b>+</b>
        <span>添加银行卡</span>
      </p>
    </router-link>
  </div>
</template>
<script>
  export default {
    name: "AddBankCard",
    data () {
      return {
      }
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss'>
  @import '~src/assets/scss/function';
  #addCardPage{
    width:100%;
    height:100%;
    background:#f6f6f6;
    text-align:center;
    &>img{
      margin-top:rem-calc(50px);
      margin-bottom:rem-calc(35px);
    }
    &>.go-add{
      width:rem-calc(345px);
      border-radius:5px;
      background:#fff;
      margin:0 auto;
      height:rem-calc(44px);
      color:#666;
      font-size:rem-calc(16px);
      p{
        width:rem-calc(105px);
        overflow:hidden;
        margin:0 auto;
        &>b{
          float:left;
          font-weight:100;
          font-size:rem-calc(30px);
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
