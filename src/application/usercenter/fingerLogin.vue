<template>
  <div id="fingerlogin">
    <div class="finger">
      <p>指纹密码仅对本机有效</p>
    </div>
    <group class="fingerbtn">
      <x-switch title="指纹解锁" v-model="isFinger" @on-change="showPlugin"></x-switch>
    </group>
    <div v-transfer-dom id="fingerAlert">
      <alert v-model="show" @on-show="onShow" @on-hide="onHide" title="保啊的Touch ID" content="通过Home键验证已有手机指纹" button-text="取消"></alert>
    </div>
  </div>
  
</template>
<script>
  import { XSwitch, Group, Alert, TransferDomDirective as TransferDom} from 'vux'
  export default {
    name: "FingerLogin",
    directives: {
      TransferDom
    },
    components: {
      XSwitch, Group, Alert
    },
    data () {
      return {
        isFinger: false,
        show: false
      }
    },
    methods:{
     showPlugin () {
      if(this.isFinger){
        this.show = true;
        }
     },
      onShow () {
      },
      onHide () {
      }
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss'>
  @import '~src/assets/scss/function';
  #fingerlogin{
    width:100%;
    height:100%;
    background:#f6f6f6;
    &>.finger{
      height:rem-calc(185px);
      background:url(~assets/image/usercenter/zhiwen.png) no-repeat center rem-calc(30px);
      text-align:center;
      background-color:#fff;
      &>p{
        padding-top:rem-calc(140px);
        font-size:14px;
        color:#999;
      }
    }
    &>.fingerbtn{
      &>.weui-cells{
        height:rem-calc(50px);
        line-height:rem-calc(50px);
        background:#fff;
        padding:0 rem-calc(15px);
        margin-top:rem-calc(10px);
        &>.weui-cell{
          padding:0;
          font-size:14px;
          .weui-switch{
            -webkit-appearance:none;
          }
        }
      }
      .weui-cells::before,.weui-cells::after{
        border:none;
      }
    }
  }
  #fingerAlert .vux-alert>.vux-x-dialog>.weui-dialog{
    width:rem-calc(270px);
    height:rem-calc(160px);
    overflow:hidden;
    &>.weui-dialog__hd{
      padding-top:rem-calc(58px);
      height:rem-calc(18px);
      background:url(~assets/image/usercenter/yuan.png) no-repeat center rem-calc(17px);
      &>.weui-dialog__title{
        font-weight:600;
        font-size:16px;
      }
    }
    &>.weui-dialog__bd{
      font-size:13px;
      margin-top:2px;
      padding-top:0;
      padding-bottom:0;
      margin-bottom:-2px;
    }
    &>.weui-dialog__ft{
      color:#007aff;
      font-size:16px;
      font-weight:600;
    }
  }

</style>