<template>
  <div id="myAccount">
    <div class="my-top">
    </div>
    <div class="ac-money">
      <p>
        账户余额(元)
      </p>
      <span>
        ￥<b>{{balance | toDecimal2}}</b>
      </span>
    </div>
    <div class="to-cash" id="to-cash" @click="goCash" onselectstart="return false">
      提现
    </div>
    <router-link to="/quespage" class="some-qus" tag="div" >
      常见问题
    </router-link>
  </div>
</template>
<script>
  import router from 'src/router'
  import store from 'src/widget/plugin/store.js'
  import {BankCardListApi} from 'src/api/index.js'
  import cookie from 'src/widget/plugin/cookie'
  let token = cookie.get('http_usertoken')
  let userId = cookie.get('http_userID')
  export default {
    name: "MyAccount",
    data () {
      return {
        balance: 0,
        hascard: true
      }
    },
    methods: {
      showPlugin () {
        this.$vux.confirm.show({
          content: '使用提现功能需添加一张支持体现的储蓄卡',
          confirmText: '添加储蓄卡',
          onConfirm () {
            router.push({ path: '/addbankcard' })
          }
        })
      },
      goCash(){
        if(this.balance){
          if(!this.hascard){
            this.showPlugin()
          }else{
            this.$router.push("gocash")
          }
        }else{
           this.$vux.toast.show({
              text: "账户余额不足，无法提现",
              type: 'text',
              width: '80%'
            });
            return 
        }
      },
      getdata() {
        this.balance = store.get("userInfo").accountInfo.balance
        let url = BankCardListApi+"/"+userId
        if(this.balance){
          let instance =this.axios.create({
                headers: {'token': token}
              });
            instance.get(url).then(res=>{
            console.log(res)
            if(res.data.data.length>0){
              this.hascard = true
            }else{
              this.hascard = false
            }
          }).catch(err=>{
            console.log(err)
          })
        }else{
          
        }

      }
    },
    created(){
      let that = this;
      window.goAccontDetail = function(){
        that.$router.push('remaindetail')
      }
    },
    beforeMount(){
      this.getdata()
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss'>
  @import '~src/assets/scss/function';
  /*uiconfirm窗口*/
  .vux-x-dialog{
    .weui-dialog{
      width: rem-calc(280px);
      height: rem-calc(148px);
      border-radius:rem-calc(10px);
      .weui-dialog__hd{
        height:0px;
        padding:0px;
      }
      .weui-dialog__bd{
        color:#333;
        padding:rem-calc(21px) rem-calc(40px);
        font-size:rem-calc(18px);
        line-height:rem-calc(25px);
        height:rem-calc(100px);
        box-sizing:border-box;
      }
      .weui-dialog__ft{
        height:rem-calc(48px);
      }
      .weui-dialog__btn_primary,.weui-dialog__btn_default{
        color:#00bd96;
      }
    }
  }
  /*正常页面视图*/
  #myAccount{
    width: 100%;
    height: 100%;
    position:relative;
    &>.my-top{
      height: rem-calc(155px);
      width: 100%;
      background:url(~assets/image/usercenter/zhanghu1.png) no-repeat center rem-calc(34px);
      background-size:100%
    }
    &>.ac-money{
      text-align:center;
      &>p{
        font-size:rem-calc(16px);
        margin-bottom:rem-calc(26px);
      }
      &>span{
        display:inline-block;
        font-size:rem-calc(16px);
        color:#FF7c18;
        &>b{
          font-size:rem-calc(38px)
        }
      }
    }
    .to-cash{
      width:rem-calc(345px);
      background-image: -webkit-linear-gradient( 0deg, rgb(108,217,182) 0%, rgb(54,210,159) 45%, rgb(0,203,135) 100%);
      border-radius:2px;
      line-height:rem-calc(45px);
      text-align:center;
      color:#fff;
      font-size:rem-calc(20px);
      margin:rem-calc(11px) auto;
      font-weight:100;
    }
    &>.some-qus{
      position:absolute;
      bottom:rem-calc(19px);
      text-align:center;
      left:0;
      width:100%;
      font-size:15px;
      color:#00bd96;
    }
  }
</style>
