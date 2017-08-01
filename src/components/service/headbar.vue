
<!--********************************************************************
 * Author        : liuliqi
 * Email         : liuliqi@zhongan.io
 * Create Date   : 2017-06-16 10:02
 * Filename      : headbar.vue
 * Description   : 三栏头部
 * Arguments     :
content：{
     firval     : 第一个数字；secval： 第二个数字 thrval： 第三个数字
     firtip     ：第一个提示  sectip 第二个提示   thrtip ： 第三个提示
}
********************************************************************-->
<template>
  <div id="headbar">
    <div class="bor">
      <div>{{content.firval}}</div>
      <p>{{content.firtip}}</p>
    </div>
    <div class="bor">
      <div>{{content.secval}}</div>
      <p>{{content.sectip}}</p>
    </div>
    <div>
      <div>{{content.thrval}}</div>
      <p>{{content.thrtip}}</p>
    </div>
  </div>
</template>
<script>
  export default {
    name:"HeadBar",
    props:["content"]
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import '~src/assets/scss/function';
  #headbar{
    width:100%;
    overflow:hidden;
    background:#fff;
    &>div{
      width:33.3%;
      height:rem-calc(70px);
      position:relative;
      float:left;
      text-align:center;
      &>div{
        margin-top:rem-calc(15px);
        color: #00bd96;
        font-size: rem-calc(18px);
        margin-bottom:rem-calc(8px);
      }
      &>p{
        color:#999;
      }
    }
    &>.bor:after{
      content: " ";
      position: absolute;
      right: 0;
      top: 50%;
      width: 1px;
      height: rem-calc(36px);
      border-right: 1px solid #eee;
      color: #eee;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleX(0.5);
      transform: scaleX(0.5);
      margin-top:rem-calc(-18px);
    }
  }
</style>