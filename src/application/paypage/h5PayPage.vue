<template>
  <div id="h5paypage">
    <c_orderTime></c_orderTime>
    <p>选择支付方式</p>
    <div class="chospay">
      <div class="choswx" @click="chosewx">
        <div class="infos">
          <p>微信支付</p>
          <span class="wxspan">推荐微信支付</span>
        </div>
        <img :src="chosenum===1?chosed:nochos" alt="">
      </div>
      <div class="chosbank" @click="chosebank">
        <div class="infos">
          <p>银联支付</p>
          <span>无需开通网银，不支持信用卡</span>
        </div>
        <img :src="chosenum===2?chosed:nochos" alt="">
      </div>
    </div>
    <c_btn :config="config" @go-next="goNext"></c_btn>
  </div>
</template>
<script>
  import c_orderTime from 'src/components/service/orderTime'
  import c_btn from 'src/components/base/nextbtn'
  export default {
    name: "H5PayPage",
    data () {
      return {
        chosed: require('src/assets/image/paypage/chosed.png'),
        nochos: require('src/assets/image/paypage/nochos.png'),
        chosenum: 1,
        href:"https://pay.swiftpass.cn/pay/jspay?token_id=9a0610bc519e782e6275e8c7dd94a445&showwxtitle=1",
        path:"bankpay",
        config: {
          val: "下一步",
        }
      }
    },
    components:{
      c_orderTime, c_btn
    },
    methods:{
      chosewx () {
        this.chosenum = 1
      },
      chosebank() {
        this.chosenum = 2
      },
      goNext(){
        if(this.chosenum==1){
          window.location.href = this.href
        }else{
          this.$router.push(this.path)
        }
      }
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss'>
  @import '~src/assets/scss/function';
  #h5paypage{
    width:100%;
    height:100%;
    background:#f6f6f6;
    &>p{
      line-height:rem-calc(40px);
      padding-left:rem-calc(15px);
      color:#999;
    }
    &>.chospay{
      padding-left:rem-calc(15px);
      background-color:#fff;
      margin-bottom:rem-calc(34px);
      &>.chosbank,&>.choswx{
        height:rem-calc(65px);
        background:url(~assets/image/paypage/yinlian.png) no-repeat left center;
        background-color:#fff;
        border-radius:5px;
        padding:0 rem-calc(15px);
        position:relative;
        &>img{
          position:absolute;
          top:50%;
          right:rem-calc(15px);
          margin-top:-9px;
        }
        &>.infos{
          margin-left:rem-calc(40px);
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
      &>.choswx{
        background:url(~assets/image/paypage/h5wx.png) no-repeat rem-calc(7px) center;
        background-color:#fff;
      }
      &>.choswx::after{
        @include borderbottom
      }
    }
  }
</style>