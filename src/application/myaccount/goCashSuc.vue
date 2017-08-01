<template>
  <div id="cashsucc">
    <div class="succ">
      <div class="suc-img">
      </div>
      <div class="suc-context">
        <h4>申请提现成功</h4>
        <p>银行处理中，资金2小时到账</p>
      </div>
    </div>
    <ul class="suclist">
      <li>
        <span>提取银行卡</span>
        <i>
          {{card.bank}}
          <span>尾号{{card.num}}</span>
        </i>
        <div class="borderbom"></div>
      </li>
      <li>
        <span>充值金额</span>
        <i>
          ￥{{nums | toDecimal2}}
        </i>
      </li>
    </ul>
    <router-link to="usercenter" tag="div" class="goback">返回用户中心</router-link>
  </div>
</template>
<script>
  import store from 'src/widget/plugin/store.js'
  export default {
    name: "GoCashSuc",
    data () {
      return {
        card: {
          bank: "工商银行",
          num:""
        },
        nums: 0
      }
    },
    methods:{
      getData(){
        let userInfo = store.get("userInfo")
        let i = this.$route.params.cardId
        userInfo.cardInfo.forEach((e,ind)=>{
          if(e.value == i){
            this.card.num = e.name.slice(-5,-1)
          }
        })
        this.nums = this.$route.params.gocashnum
      }
    },
    created(){
      this.getData()
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss'>
  @import '~src/assets/scss/function';
  #cashsucc{
    height:100%;
    width:100%;
    background:#f6f6f6;
    &>.succ{
      height:rem-calc(68px);
      overflow:hidden;
      margin-bottom:rem-calc(10px);
      background:#fff;
      &>.suc-img{
        float:left;
        background:url(~assets/image/usercenter/succ.png) no-repeat;
        background-position:center center;
        width:rem-calc(59px);
        height:100%;
      }
      &>.suc-context{
        float:left;
        &>h4{
          color:#00bd96;
          font-size:rem-calc(16px);
          font-weight:400;
          margin-top:rem-calc(14px);
          margin-bottom:rem-calc(7px);
        }
        &>p{
          color:#666;
          font-size:rem-calc(14px);
          
        }
      }
    }
    &>.suclist{
      background:#fff;
      &>li{
        height:rem-calc(45px);
        margin-left:rem-calc(15px);
        padding-right:rem-calc(15px);
        list-style:none;
        line-height:rem-calc(45px);
        position:relative;
        .borderbom{
          @include borderbottom;
        }
        &>span{
          float:left;
          color:#666;
          
        }
        &>i{
          float:right;
          font-style:normal;
          color:#333;
        }
      }
    }
    &>.goback{
      position:absolute;
      bottom:rem-calc(20px);
      color:#00bd96;
      text-align:center;
      width:100%;
    }
  }
</style>
