<template>
  <div id="h5paypage">
    <c_orderTime :order-time="orderTime" duration="1800" :productDescription="productDescription" :amount="amount" @show-plugin-time="showPluginTime" v-if="showdown"></c_orderTime>
    <p></p>
    <c_btn :config="config" @show-plugin="showPlugin"></c_btn>
    <div v-transfer-dom id="h5payalert">
      <confirm v-model="showPay" title="保费将通过银行代扣，请确认银行卡信息" @on-confirm="onHidePay" @on-cancel="goback" confirm-text="确认支付" cancel-text="返回修改">
        <table>
          <tr>
            <td>持卡人</td>
            <td>{{cardInfo.cardname}}</td>
          </tr>
          <tr>
            <td>银行卡号</td>
            <td>{{cardInfo.cardnum}}</td>
          </tr>
        </table>
      </confirm>
    </div>
    <div v-transfer-dom id="bankpaypage">
      <alert v-model="showTime" @on-show="onShowTime" @on-hide="onHideTime" title="订单超时" content="支付超时订单已取消，请重新下单" button-text="我知道了"></alert>
    </div>
  </div>
</template>
<script>
  import c_orderTime from 'src/components/service/orderTime'
  import c_btn from 'src/components/base/nextbtn'
  import { Confirm ,Alert,TransferDomDirective as TransferDom } from 'vux'
  import {goPayApi,policyDetailApi} from 'src/api/index.js'
  import cookie from 'src/widget/plugin/cookie'
  let token = cookie.get('http_usertoken')
  let userId = cookie.get('http_userID')
  let result
  export default {
    name: "H5PayPage",
    directives: {
      TransferDom
    },
    data () {
      return {
        config: {
          val: "下一步",
          path:"",
        },
        orderTime:1499249204296,
        amount:"",
        showTime:false,
        showdown:false,
        showPay:false,
        productDescription:"",
        cardInfo:{
          cardname:"",
          cardnum:""
        },
        canclick:true
      }
    },
    components:{
      c_orderTime, c_btn, Alert,Confirm
    },
    methods:{
      clearStore: function(){
        // this.clearSession = true
        let code = this.$route.query.productcode
        let sessionKeyArr = ['trial_input_'+code ,'plan_input_'+code , 'order_input_'+code]
        if(window.sessionStorage){
          sessionKeyArr.forEach((sessionKey)=>{
            if(sessionStorage.getItem(sessionKey)){
              sessionStorage.removeItem(sessionKey)
            }
          })
        }
      },
      onShowPay(){

      },
      onShowTime(){

      },
      goback(){
        this.$router.push({path:"/order/"+result.productCode, query:{id:result.id,proposalId:JSON.parse(result.policyJson).proposalId}})
      },
      showPluginTime (){
        this.showTime=true
      },
      showPlugin(){
        console.log(this.canclick)
        if(this.canclick){
          this.showPay=true
        }
      },
      onHideTime(){
        this.$router.push("/")
      },
      onHidePay(){
        this.canclick = false
        this.$store.dispatch('toggleLoadingStatus', true)
        let url = goPayApi+"/?proposalCode="+this.$route.query.proposalId ;
        let instance =this.axios.create({
              timeout:60000,
              headers: {'token': token}
            });
        instance.post(url)
        .then(res=>{
          this.$store.dispatch('toggleLoadingStatus', false)
          if(res.data.status=="SUCCESS"){
            this.clearStore()
           /* this.$vux.toast.show({
              text: "支付成功5S返回首页",
              type: 'text',
              width: '80%'
            });*/
            this.$router.push("subsucc")
          }else{
            this.$vux.toast.show({
              text: "支付失败",
              type: 'text',
              width: '80%'
            });
            this.canclick = true;
          }
        }).catch(err=>{
          this.$store.dispatch('toggleLoadingStatus', false);
          this.canclick = true;
          this.$vux.toast.show({
            text: "网络异常，支付失败",
            type: 'text',
            width: '80%'
          });
        })
      },
      getData(){
        let instance =this.axios.create({
              headers: {'token': token}
            });
        instance.post(policyDetailApi,{
          proposalCode:this.$route.query.proposalId
        })
        .then(res=>{
          if(res.data.status=="SUCCESS"){
          if(res.data&&res.data.data){
            result = res.data.data;
            console.log(result)
            this.orderTime = result.gmtCreate;
            this.showdown = true;
            console.log(this.orderTime)
            this.productDescription=result.productDescription;
            this.amount = result.totalPremium;
            this.cardInfo.cardname = result.insuredName;
            this.cardInfo.cardnum = result.bankCard;
          }
          }
        }).catch(err=>{
          this.$vux.toast.show({
            text: "网络异常",
            type: 'text',
            width: '80%'
          });
        })
      }
    },
    mounted(){
      this.getData();
    },
    activated(){
      this.getData()
      this.canclick=true
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
      height:rem-calc(35px);
    }
  }
  #h5payalert{
    font-size:rem-calc(14px);
    & .weui-dialog{
      //height:rem-calc(195px);
      &>.weui-dialog__hd{
        height:rem-calc(50px);
        padding:0;
        padding-top:rem-calc(20px);
        box-sizing:border-box;
        &>strong{
          font-size:rem-calc(14px);
          display:inline-block;
          width:100%;

        }
      }
      &>.weui-dialog__bd{
        padding:0;
        font-size:rem-calc(13px);
        &>table{
          margin:0 auto;
          position:relative;
          width:rem-calc(255px);
          margin-bottom:rem-calc(25px);
          font-size:rem-calc(13px);
          &>tr{
            line-height:rem-calc(35px);
            &>td{
              text-align:left;
              padding-left:rem-calc(12px);
              color:#666;
            }
            & td:first-child{
              text-align:left;
              padding-left:10px;
              position:relative;
              width:rem-calc(62px);
              color:#ccc;
            }
            & td:first-child::after{
              content: '';
              position: absolute;
              width: 1px;
              height: 100%;
              border-right: 1px solid #dedede;
              right:0;
              -webkit-transform-origin: 0 0;
              -webkit-transform: scaleX(0.5);
              transform: scaleX(0.5);
            }
          }
          tr:first-child{
            position:relative;
          }
          tr:first-child:after{
            @include borderbottom;
            bottom:rem-calc(35px);
          }
        }
        &>table:before{
          content: '';
          position: absolute;
          width: 200%;
          height: 200%;
          border: 1px solid #dedede;
          left:0;
          right:0;
          -webkit-transform-origin: 0 0;
          -webkit-transform: scale(0.5, 0.5);
          transform: scale(0.5, 0.5);
        }
      }
      &>.weui-dialog__ft{
        font-size:rem-calc(16px);
      }
    }
  }
</style>
