<template>
  <div class='sign-confirm'>
    <div v-transfer-dom id="confirm">
      <confirm v-model="showC" @on-cancel="onCancel" @on-confirm="onConfirm" :title="title" :content="content" confirm-text="去签约认证" cancel-text="暂不 就看看">
      </confirm>
    </div>
  </div>
</template>
<script>
  import { Confirm , TransferDomDirective as TransferDom} from 'vux'
  export default {
    name:"signConfirm",
    directives: {
      TransferDom
    },
    data(){
      return{
        showplu:false,
        title:'实名认证提醒',
        content:'<img src="/static/pic/renzheng.png"/>亲，您还未实名认证哦，未实名认证的用户不能进行如下操作:<p>1.邀请好友；<br/>2.制作保单计划书；<br/>3.代客户投保。</p>'
      }
    },
    components:{
      Confirm
    },
    props:["showConf","tofalse","gonext"],
    methods:{
      onConfirm(){
        this.$emit("gonext")
      },
      onCancel(){
        this.$emit("tofalse")
      }
    },
    computed:{
      showC(){
        return this.showConf
      }
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss'>
  @import '~assets/scss/function';
  #confirm{
    &>div>.vux-x-dialog{
      overflow:visible;
      &>.weui-dialog{
        width: rem-calc(300px);
        height: rem-calc(305px);
        border-radius:rem-calc(10px);
        overflow:visible;
        &>.weui-dialog__hd{
          padding:rem-calc(90px) 0 rem-calc(15px) 0;
          color:#333;
          font-size:rem-calc(17px);
        }
        &>.weui-dialog__bd{
          line-height:rem-calc(21px);
          color:#999;
          font-size:rem-calc(15px);
          text-align:left;
          & img{
            position:absolute;
            top:rem-calc(-66px);
            margin-left:rem-calc(-75px);
            left:50%;
            width:rem-calc(150px);
            height:rem-calc(134px);
          }
          & p{
            text-align:left;
            padding-top:rem-calc(5px);
            line-height:rem-calc(25px);
          }
        }
        &>.weui-dialog__ft{
          position:absolute;
          bottom:0;
          width:100%;
          height:rem-calc(50px);
          &>a{
            font-size:rem-calc(16px);
            color:#00bd96;
          }
          &>a:nth-child(1){
            border-bottom-left-radius:rem-calc(10px);
          }
          &>a:nth-child(2){
            border-bottom-right-radius:rem-calc(10px);
          }
        }
      }
    }
  }
</style>