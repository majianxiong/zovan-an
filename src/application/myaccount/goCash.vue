<template>
  <div id="gocash">
    <div class="cashinfo">
      <div class="chos-bank">
        <popup-picker :data="list1" title="到账银行卡" v-model="value1" @on-show="onShow" @on-hide="onHide" @on-change="onChange" value-text-align="left" show-name></popup-picker>
      </div>
      <div class="chos-money">
        <p>提出金额</p>
        <div class="moneydetail">
          <span>￥</span>
          <input v-validate data-vv-rules="required" data-vv-name='转出金额' :maxLength='10' type='text'  v-model.trim='money' name='金额'>
          <i @click="pushAll">全部转出</i>
          <div class="borderbom"></div>
        </div>
        <div class="remain">
          余额&nbsp;{{balance|toDecimal2}}
        </div>
      </div>
    </div>
    <div class="to-cash" @click="goCash" onselectstart="return false">
      提现
    </div>
    <p>2小时到账</p>
  </div>
</template>
<script>
  import store from 'src/widget/plugin/store.js'
  import {goCashApi,BankCardListApi} from 'src/api/index.js'
  import { PopupPicker, Group, Picker} from 'vux'
  import cookie from 'src/widget/plugin/cookie'
  let token = cookie.get('http_usertoken')
  let userId = cookie.get('http_userID')
  export default {
    name: "GoCash",
    data () {
      return {
        balance:"",
        money: "",
        list1:[[]],
        value1:[" "],
        cardId:null
      }
    },
    components:{
      PopupPicker, Group, Picker
    },
    methods:{
      onShow(){
      },
      onHide(){
        let goCashCard = this.value1[0];
        store.set("goCashCard",goCashCard);
      },
      onChange(v){
        this.cardId= v[0];
      },
      getInfo(){
        this.$store.dispatch('toggleLoadingStatus', true)
        this.balance = store.get("userInfo").accountInfo.balance;
        let userInfo = store.get("userInfo")
        let url = BankCardListApi+"/"+userId
        let instance =this.axios.create({
              headers: {'token': token}
            });
        instance.get(url).then(res=>{
        this.$store.dispatch('toggleLoadingStatus', false)
          let list = res.data.data;
          let cardList=[];
          for(let i=0;i<list.length;i++){
            let num = list[i].bankCardNo?list[i].bankCardNo.slice(-4):"";
            let bankname = list[i].bankName;
            let cardId = list[i].bankCardId+"";
            let info = {
              name : bankname + " ("+ num + ")",
              value: cardId
            }
            this.list1[0].push(info);
            userInfo.cardInfo = this.list1[0];
            store.set("userInfo",userInfo);
            this.value1 = [store.get("goCashCard")?store.get("goCashCard"):this.list1[0][0].value];
            this.cardId = store.get("goCashCard")?store.get("goCashCard"):this.list1[0][0].value
          }
        }).catch(err=>{
          this.$store.dispatch('toggleLoadingStatus', false)
          this.$vux.toast.show({
            text: "系统错误",
            type: 'text',
            width: '80%'
          });
        })

      },
      goCash(){
        let userInfo = store.get("userInfo")
        let url = goCashApi
        if(this.money>this.balance){
          this.$vux.toast.show({
            text: "账户余额不足",
            type: 'text',
            width: '80%'
          });
        }else if(this.money==""||this.money<=0){
          this.$vux.toast.show({
            text: "请输入正确的金额",
            type: 'text',
            width: '80%'
          }); 
        }else{
          this.$store.dispatch('toggleLoadingStatus', true)
          this.axios({
            method: 'put',
            url,
            params: {
              userId,
              cashAmount: this.money,
              bankCardId: this.cardId
            }
          }).then(res=>{
            this.$store.dispatch('toggleLoadingStatus', false)
            if(res.data.status="SUCCESS"){
              let gocashnum = this.money;
              userInfo.accountInfo.balance = userInfo.accountInfo.balance - this.money
              this.balance = userInfo.accountInfo.balance
              store.set("userInfo",userInfo)
              this.$router.push({name:'GoCashSuc',params:{cardId: this.cardId,gocashnum:this.money}})
            }else{
              this.$vux.toast.show({
                text: res.data.message,
                type: 'text',
                width: '80%'
              });
            }
          }).catch(err=>{
            this.$store.dispatch('toggleLoadingStatus', false);
            this.$vux.toast.show({
                text: "系统错误",
                type: 'text',
                width: '80%'
              });
          })
        }
        
      },
      pushAll (){
        this.money = this.balance
      }
    },
    created(){
      this.getInfo()
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss'>
  @import '~src/assets/scss/function';
  #gocash{
    height:100%;
    padding:rem-calc(15px);
    background:#f6f6f6;
    &>.cashinfo{
      height:rem-calc(191px);
      &>.chos-bank{
        background:#EDEDED;
        line-height:rem-calc(50px);
        padding-left:rem-calc(15px);
        &>.vux-cell-box::before{
          border-top:none;
        }
        
        &>.vux-cell-box .weui-cell{
          height:rem-calc(50px);
          line-height:rem-calc(50px);
          padding:0;
          .weui-cell__hd>.weui-label{
            font-size:14px !important;
            width:rem-calc(90px);
          }
          & .vux-popup-picker-select-box{
            color:#00bd96;
            font-size:rem-calc(15px); 
          }
          & .weui-cell__ft:after{
            border:none;
          }
        }
      }
      &>.chos-money{
        height:rem-calc(141px);
        background:#fff;
        padding:0 rem-calc(15px);
        &>p{
          padding-top:rem-calc(20px);
          font-size:13px;
        }
        &>.moneydetail{
          height:rem-calc(60px);
          padding-top:rem-calc(8px);
          position: relative;
          &>span{
            font-size:24px;
            float:left;
          }
          &>input{
            height:50px;
            border:none;
            outline:none;
            float:left;
            text-align:center;
            width:210px;
            font-size:22px;
          }
          &>i{
            float:right;
            font-style:normal;
            padding-top:rem-calc(10px);
            color:#1C96FF;
          }
          &>.borderbom{
            @include borderbottom;
          }
        }
        &>.remain{
          line-height:rem-calc(38px);
          font-size:12px;
          color:#666;
        }
      }
    }
    .to-cash{
      width:rem-calc(345px);
      background-image: -webkit-linear-gradient( 0deg, rgb(108,217,182) 0%, rgb(54,210,159) 45%, rgb(0,203,135) 100%);
      border-radius:3px;
      line-height:rem-calc(45px);
      text-align:center;
      color:#fff;
      font-size:rem-calc(17px);
      margin:rem-calc(36px) auto rem-calc(13px);
      font-weight:100;
    }
    &>p{
      color:#666;
      font-size:12px;
      text-align:center;
    }
    &>.vux-cell-box{
      .weui-cell{
        height:rem-calc(50px);
        line-height:rem-calc(50px);
        padding:0;
        padding-left:rem-calc(15px);
        .weui-cell__hd>.weui-label{
          font-size:14px !important;
          width:rem-calc(90px);
        }
        & .vux-popup-picker-select-box{
          color:#00bd96;
          font-size:rem-calc(15px); 
        }
        & .weui-cell__ft:after{
          border:none;
        }
      }
    }
    &>.vux-cell-box:before{
      border:none;
    }
  }
</style>