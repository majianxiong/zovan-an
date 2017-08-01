<template>
  <div id="apppaypage">
    <c_orderTime></c_orderTime>
    <div class="chospay">
      <div class="wxcode" v-if="true">
        <div class="saoyisao">
          <img src="~assets/image/paypage/wxicon.png" alt="">
          微信扫一扫&nbsp;付款
        </div>
        <div class="code">
          <img src="" alt="">
        </div>
      </div>
      <router-link to="bankpay" class="chosbank" tag="div">
        <div class="infos">
          <p>银联支付</p>
          <span>无需开通网银，不支持信用卡</span>
        </div>
      </router-link>
      <div class="choswx" v-if="false">
        <div class="infos">
          <p>微信支付</p>
          <span class="wxspan">超过微信支付额度</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import c_orderTime from 'src/components/service/orderTime'
  export default {
    name: "AppPayPage",
    data () {
      return {
      }
    },
    components:{
      c_orderTime
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss'>
  @import '~src/assets/scss/function';
  #apppaypage{
    width:100%;
    height:100%;
    background:#f6f6f6;
    &>.chospay{
      margin-top:rem-calc(15px);
      &>.wxcode{
        margin:0 rem-calc(15px) rem-calc(10px);
        background:#fff;
        text-align:center;
        border-radius:6px;
        height:rem-calc(285px);
        &>.saoyisao{
          padding-top:rem-calc(28px);
          margin:0 auto rem-calc(14px);
          height:rem-calc(18px);
          width:rem-calc(142px);
          &>img{
            float:left;
          }
        }
        &>.code{
          width:164px;
          height:164px;
          background:url(~assets/image/paypage/kuang.png);
          margin:0 auto;
          padding:15px;
          &>img{
            width:100%;
            height:100%;
          }
        }
      }
      &>.chosbank,&>.choswx{
        margin:0 rem-calc(15px) rem-calc(10px);
        height:rem-calc(65px);
        background:url(~assets/image/paypage/yinlian.png) no-repeat rem-calc(15px) center;
        background-color:#fff;
        border-radius:5px;
        padding:0 rem-calc(15px);
        position:relative;
        &>.infos{
          margin-left:rem-calc(55px);
          padding-top:rem-calc(15px);
          &>p{
            font-size:15px;
            margin-bottom:7px;
          }
          &>span{
            font-size:12px;
            color:#999;
          }
        }
      }
      &>.chosbank::after,&>.choswx::after{
        content: " ";
        display: inline-block;
        height: 8px;
        width: 8px;
        border-width: 1px 1px 0 0;
        border-color: #eee;
        border-style: solid;
        transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        position: relative;
        position: absolute;
        top: 50%;
        margin-top: -4px;
        right: 15px;
      }
      &>.chosbank::after{
        border-color:#666;
      }
      &>.choswx{
        background:url(~assets/image/paypage/wx.png) no-repeat rem-calc(15px) center;
        background-color:#fff;
        color:#cdcdcd;
        &>.infos .wxspan{
          color:#cdcdcd;
        }
      }
    }
  }
</style>