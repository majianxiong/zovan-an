<template>
  <div id="myweal">
    <c_headbar :content="content"></c_headbar>
    <div class="pic">
      <img src="~assets/image/usercenter/bag.png" alt="">
      <p>即将上线&nbsp;尽请期待</p>
    </div>
  </div>
</template>
<script>
  import c_headbar from 'src/components/service/headbar'
  export default {
    name:"MyWeal",
    data (){
      return {
        content:{
          firval:0,
          secval:0,
          thrval:0,
          firtip:"可用(个)",
          sectip:"已用(个)",
          thrtip:"已过期(个)"
        }

      }
    },
    components:{
      c_headbar
    },
    methods:{

    },
    created(){

    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import '~src/assets/scss/function';
  #myweal{
    width:100%;
    height:100%;
    &>.pic{
      box-sizing:border-box;
      position:absolute;
      top:rem-calc(70px);
      left:0;
      bottom:0;
      right:0;
      text-align:center;
      color:#999;
      background-color:#f6f6f6;
      img{
        margin-top:rem-calc(63px);
        height:rem-calc(107px);
        width:rem-calc(135px);
        margin-bottom:rem-calc(20px);
      }
    }
  }
</style>