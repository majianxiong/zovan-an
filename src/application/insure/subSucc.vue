<template>
  <div id="subsucc">
    <div class="sub">提交成功</div>
    <div class="font">
      <p>请关注下面公众号，或在</p>
      微信中搜索公众号保啊，了解投保进度
    </div>
    <div class="code">
      <img src="~assets/image/insure/code.png" alt="">
    </div>
    <p>扫一扫关注</p>
    <c_btn :config="config" @go-next="goNext"></c_btn>
  </div>
</template>
<script>
  import c_btn from 'src/components/base/nextbtn'
  export default {
    data(){
      return{
        config:{
          val:"确认"
        }
      }
    },
    components:{
      c_btn
    },
    methods:{
      goNext(){
        this.$router.push('/')
      }
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss'>
  @import '~src/assets/scss/function';
  #subsucc{
    &>.sub{
      height:rem-calc(16px);
      background:url(~assets/image/insure/subsucc.png) no-repeat center rem-calc(50px);
      padding-top:rem-calc(134px);
      font-size:rem-calc(16px);
      text-align:center;
      color:#00bd96;
      font-weight:500;
      background-size:rem-calc(69px);
    }
    &>.font{
      margin-top:rem-calc(20px);
      text-align:center;
      height: rem-calc(36px);
      font-size: rem-calc(14px);
      line-height: 1.6;
      color: #666666
    }
    &>.code{
      margin-top:rem-calc(45px);
      height:rem-calc(155px);
      background:url(~assets/image/paypage/kuang.png) no-repeat center top;
      background-size:rem-calc(165px);
      text-align:center;
      padding:rem-calc(5px);
      &>img{
        height:100%;

      }
    }
    &>p{
      text-align:center;
      margin-top:rem-calc(12px);
      color:#666;
      font-size: rem-calc(14px);
      margin-bottom:rem-calc(30px);
    }
  }
</style>