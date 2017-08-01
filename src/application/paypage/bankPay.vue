<template>
  <div id="bankpay">
    <c_orderTime :ordertime="ordertime" @show-plugin="showPlugin"></c_orderTime>
    <p>请输入银行卡信息</p>
    <ul class="bankinfo">
      <li>
        <span>持卡人</span>
        <input v-validate data-vv-rules="required|cnname" data-vv-name='持卡人姓名' :maxLength='19' type='text'  v-model.trim='userName' name='持卡人姓名' placeholder="持卡人姓名">
      </li>
      <li>
        <span>银行卡号</span>
        <input v-validate data-vv-rules="required|bankcard" data-vv-name='银行卡号' :maxLength='19' type='tel'  v-model.trim='cardNum' name='银行卡号' placeholder="只支持借记卡">
      </li>
      <li>
        <span>预留手机号</span>
        <input v-validate data-vv-rules="required|mobile" data-vv-name='手机号' :maxLength='11' type='tel'  v-model.trim='phoneNum' name='手机号' placeholder="银行预留手机号">
      </li>
      <li>
        <span>验证码</span>
        <input v-validate data-vv-rules="required" data-vv-name='验证码' :maxLength='6' :minLength='4' type='tel'  v-model.trim='smsCode' name='验证码'  placeholder="短信验证码">
        <c_countdown :time="time" :content="content" :color="color"></c_countdown>
      </li>
    </ul>
    <c_btn :config="config" @go-next="goNext"></c_btn>
    <div class="bomtips">查看支持银行及限额</div>
    <div v-transfer-dom id="bankpaypage">
      <alert v-model="show" @on-show="onShow" @on-hide="onHide" title="订单超时" content="支付超时订单已取消，请重新下单" button-text="我知道了"></alert>
    </div>
  </div>
</template>
<script>
  import c_orderTime from 'src/components/service/orderTime'
  import c_btn from 'src/components/base/nextbtn'
  import { Alert, TransferDomDirective as TransferDom, Countdown } from 'vux'
  import store from 'src/widget/plugin/store.js'
  import c_countdown from 'src/components/base/countdown'
  export default {
    name: "BankPay",
    directives: {
      TransferDom
    },
    data () {
      return {
        config:{
          val: "确认支付"
        },
        show: false,
        value: "",
        ordertime: "2017-5-4 10:10:00",
        cardNum: "",
        userName: "",
        phoneNum: "",
        smsCode: "",
        time: 60,
        color:"#06c49c",
        content:"秒后重发"
      }
    },
    components:{
      c_orderTime, c_btn, Alert, Countdown, c_countdown
    },
    methods: {
      showPlugin () {
        this.show = true
      },
      onShow (){

      },
      onHide (){
        console.log(1)
      },
      finish (){
        this.show1 = false;
      },
      showCountDown (){
        this.show1 = true
        this.time = 60
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
          
          
          }
        }).catch((err)=>{
         console.log(err)
        });
      }
    }
    
  }
</script>
<style lang='scss' rel='stylesheet/scss'>
  @import '~src/assets/scss/function';
  #bankpay{
    width:100%;
    height:100%;
    background:#f6f6f6;
    &>p{
      line-height:rem-calc(40px);
      padding-left:rem-calc(15px);
      color:#999;
    }
    &>.bankinfo{
      background:#fff;
      margin-bottom:rem-calc(36px);
      &>li{
        height:rem-calc(50px);
        line-height:rem-calc(50px);
        margin-left:rem-calc(15px);
        list-style:none;
        position:relative;
        &>span{
          display:inline-block;
          width:rem-calc(90px);
        }
        &>input{
          border:none;
          outline:none;
          font-size:14px;
        }
      }
      &>li::after{
        @include borderbottom;
        color:#eee;
      }
      &>li:last-child::after{
        border:none;
      }
      &>li:last-child>input{
        width:120px;
      }
    }
    &>.bomtips{
      color:#2ad099;
      font-size:13px;
      position:absolute;
      bottom:20px;
      width:135px;
      left:50%;
      margin-left:-68px;
    }
    &>.bomtips::after{
      content: " ";
      display: inline-block;
      height: 6px;
      width: 6px;
      border-width: 1px 1px 0 0;
      border-color: #2ad099;
      border-style: solid;
      transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
      position: relative;
      position: absolute;
      top: 50%;
      margin-top: -3px;
      right: 3px;
    }
  }
  #bankpaypage .vux-alert .vux-x-dialog .weui-dialog{
    width:rem-calc(280px);
    height:rem-calc(135px);
    margin:0;
    padding:0;
    &>.weui-dialog__hd{
      padding-top:rem-calc(27px);
      height:rem-calc(18px);
      &>.weui-dialog__title{
        font-size:rem-calc(18px);
      }
    }
    &>.weui-dialog__bd{
      font-size:rem-calc(14px);
      margin-top:rem-calc(8px);
      text-align:center;
      padding:0;
      color:#999;
    }
    &>.weui-dialog__ft{
      font-size:rem-calc(18px);
      height:rem-calc(48px);
    }
  }
</style>