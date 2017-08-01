<template>
  <div class="user-center" id="usercenter">
    <div class="user">
    <!--个人中心头部-->
      <div class="user-header">
        <!--未登陆-->
        <div v-if='!logined' class="unlogin">
          <div to="login" class="un-gologin" @click="goLogin">
            <img src="~assets/image/usercenter/touxiang.fw.png" alt="">
            <span>立即登陆 / 注册</span>
          </div>
        </div>
        <!--已登陆-->
        <div v-else class="logined">
          <div class="user-info">
            <router-link to="settingpage" class="user-pic" tag="div">
              <img :src="headImg" alt="">
            </router-link>
            <div class="user-detail">
              <p>
                <span class="u-name" style="font-size:rem-calc(14px)">{{userName}}</span>
                <img src="~assets/image/usercenter/@v.png" alt="">
              </p>
              <span class="sign unsign" v-if="!sign" @click="onConfirm">
                未签约
                <img src="~assets/image/usercenter/@r-arrow.png" alt="" style="margin-left:2px">
              </span>
              <span class="sign signed" v-else>
                <img src="~assets/image/usercenter/signed.png" alt="" id="sign-img">
                已签约
              </span>
            </div>
          </div>
          <div class="user-money" @click="goMyAccount">
            <p class="remain-money">
              <span>账户余额(元)</span>
              <br><b>{{balance | toDecimal2}}</b>
            </p>
            <p class="increase" @click="handle">近一周内将入账(元)
              <b>+{{increase | toDecimal2}}</b>
            </p>
          </div>
        </div>
        <router-link to="settingpage" class="setting" @click="handle" v-show="logined"></router-link>
      </div>
      <!--头部结束-->
      <!--订单列表开始-->
      <div class="orderlist">
        <p class="ordertitle" @click="goOrder">
          <span>待支付订单</span>
          <i v-if="num2 > 0"><span>{{num2}}</span></i>
        </p>
        <ul class="list">
          <div class="border1"></div>
          <li @click="!logined?showTip():gonext('planlist')">
            <img src="~assets/image/usercenter/@icon1.png" alt="">
            <div class="numbers" v-show="num1 > 0">{{num1}}</div>
            <p>计划书</p>
          </li>
          <li @click="!logined?showTip():gonext('orderlist')">
            <img src="~assets/image/usercenter/@icon2.png" alt="">

            <p>全部投保单</p>
          </li>
          <li @click="!logined?showTip():gonext('policylist')">
            <img src="~assets/image/usercenter/@icon3.png" alt="">
            <div class="numbers" v-show="num3 > 0">{{num3}}
            </div>
            <p>全部保单</p>
          </li>
        </ul>
      </div>
      <!--订单列表结束-->
      <!--cell-box开始-->
      <div id="group">
        <!--<group>
          <cell-box is-link id="study" @click="handle">
            <img src="~assets/image/usercenter/@study.png" alt="" style="width:25px;height:25px;vertical-align: middle;margin-top:-3px;margin-right:4px">
            专栏学习
          </cell-box>
        </group>-->
        <group>
          <cell-box is-link v-tap="{methods:()=>{!logined?showTip():gonext('myweal')}}">
            <img src="~assets/image/usercenter/center1.png" alt="" >
            我的福利
          </cell-box>
          <cell-box is-link v-tap="{methods:()=>{!logined?showTip():gonext('myfriend')}}">
            <img src="~assets/image/usercenter/center2.png" alt="">
            我的好友
          </cell-box>
          <cell-box is-link v-tap="{methods:()=>{!logined?showTip():invitefriend('invitefriends')}}">
            <img src="~assets/image/usercenter/center3.png" alt="">
            邀请好友
            <!--<span class="ask">邀请人奖励3%</span>-->
          </cell-box>
          <cell-box is-link v-tap="{methods:()=>{!logined?showTip():gonext('mytask')}}">
            <img src="~assets/image/usercenter/center7.png" alt="">
            我的任务
          </cell-box>
        </group>
        <group>
          <cell-box is-link link="commonquestion">
            <img src="~assets/image/usercenter/center4.png" alt="">
            常见问题
          </cell-box>
          <cell-box is-link @click.native="goaboutbaoa">
            <img src="~assets/image/usercenter/center5.png" alt="">
            关于保啊
          </cell-box>
        </group>
      </div>

      <!--cell-box结束-->
    </div>
    <div v-transfer-dom id="user-conf">
      <confirm v-model="showConf" @on-cancel="onCancel" @on-confirm="onConfirm" :title="title" :content="content" confirm-text="去签约认证" cancel-text="暂不 就看看">
      </confirm>
    </div>
  </div>
</template>
<script>
  import { Group, Cell, CellBox, Confirm , TransferDomDirective as TransferDom} from 'vux'
  import {getUserInfoApi, accountInfoApi, policyListApi} from 'src/api/index.js'
  import store from 'src/widget/plugin/store.js'
  import cookie from 'src/widget/plugin/cookie'
  let token = cookie.get('http_usertoken')//"27_38e0e7cc371bf1420e5cadfdca6976b4"
  let userId = cookie.get('http_userID')//56//51
  let loginName = cookie.get('http_phoneNo')//15695575008//13761684420
  export default {
    name: 'UserCenter',
    directives: {
      TransferDom
    },
    data () {
      return {
        userName: "",
        logined: false,
        sign: false,
        levels: 1,
        balance: 0,
        increase: 0,
        num1: 0,
        num2:0,
        num3:0,
        headImg: require("src/assets/image/usercenter/touxiang.png"),
        showConf:false,
        title:'实名认证提醒',
        content:'<img src="/static/pic/renzheng.png"/>亲，您还未实名认证哦，未实名认证的用户不能进行如下操作:<p>1.邀请好友；<br/>2.制作保单计划书；<br/>3.代客户投保。</p>'
      }
    },
    components: {
      Group,
      Cell,
      CellBox,
      Confirm
    },
    methods:{
      goaboutbaoa(){
        this.jsbridge.goAboutBaoa()
      },
      goLogin(){
        this.jsbridge.callLogin()
      },
      handle() {
      },
      goMyAccount (){
        if(this.sign){
          this.$router.push("myaccount")
        }
      },
      invitefriend(url){
        if(this.sign){
          this.$router.push(url)
        }else{
          this.showConf = true;
        }
      },
      onConfirm(){
        let routerpath = window.location.href.split("#")[1];
        store.set("routerpath",routerpath);
        this.$router.push("electronicsign");
      },
      onCancel(){

      },
      showTip(){
        this.$vux.toast.show({
          text: "请先登录",
          type: 'text',
          width: '80%'
        });
      },
      gonext(url){
        this.$router.push(url)
      },
      getUserInfo (){
        if(token){
          this.$store.dispatch('toggleLoadingStatus', true)
          let params = {loginName};
          let instance =this.axios.create({
                headers: {'token': token},
                timeout:6000
              });
          instance.get(getUserInfoApi,{params})
          .then(res=>{
            if(res.data.status=="SUCCESS"){
              store.set("userInfo",res.data.data)
              if(res.data.data.userType==1){
                this.sign = true
              }else if(res.data.data.userType==2){
                this.sign = false
              }
              this.userName = res.data.data.loginName
			        this.headImg = res.data.data.headImage?res.data.data.headImage:require("src/assets/image/usercenter/touxiang.png")
              instance.get(accountInfoApi,{params:{
                userId
              }}).then(res2=>{
                this.$store.dispatch('toggleLoadingStatus', false)
                if(res2.data.status=="SUCCESS"){
                  let userInfo = store.get("userInfo");
                  userInfo.accountInfo=res2.data.data;
                  store.set("userInfo",userInfo)
                  this.balance = res2.data.data.balance;
                  this.increase = res2.data.data.intransitBalance
                }else{
                  this.$vux.toast.show({
                    text: res2.data.message,
                    type: 'text',
                    width: '80%'
                  });
                }
              }).catch(err2=>{
                this.$store.dispatch('toggleLoadingStatus', false)
                this.$vux.toast.show({
                    text: "网络异常",
                    type: 'text',
                    width: '80%'
                  });
              })
              let url3 = policyListApi+"/?pageNum=1&pageSize=10"
              instance.post(url3,{
                userId,
                status:0
              }).then(res3=>{
                console.log(res3.data.total)
                this.num2 = res3.data.total;
              }).catch(err=>{
                this.$store.dispatch('toggleLoadingStatus', false)
                this.$vux.toast.show({
                  text: "网络异常",
                  type: 'text',
                  width: '80%'
                });
              })
            }else{
              this.$store.dispatch('toggleLoadingStatus', false)
              this.$vux.toast.show({
                text: res.data.message,
                type: 'text',
                width: '80%'
              });
            }
          }).catch(err=>{
            this.$store.dispatch('toggleLoadingStatus', false)
            this.$vux.toast.show({
              text: "网络异常",
              type: 'text',
              width: '80%'
            });
          })
        }

      },
      isLogin(){
        if(token){
          this.logined=true
        }else{
          this.logined=false
        }
      },
      goOrder(){
        if(this.logined){
          this.$router.push({name:'OrderList',params:{status:0}})
        }else{
          this.showTip()
        }
      }
    },
    activated (){
      this.getUserInfo ()
      this.isLogin()
    },
    created () {
      // this.setTitle('保啊')
    },
    computed: {
      total: function(){
        return this.num1+ this.num2 + this.num3
      }
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss'>
  @import '~src/assets/scss/function';
  #usercenter{
    width: 100%;
    min-height:100%;
    position :relative;
    .ask{
      position:absolute;
      font-size:rem-calc(12px);
      color:#999;
      right:rem-calc(30px);
      top:0;
    }
    a{
      text-decoration: none;
    }
    &>.user{
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width :100%;
      background:#f5f5f5;
      overflow:auto;

      /*头部开始*/
      &>.user-header{
        background-image: url(~assets/image/usercenter/headbg.png);
        height: rem-calc(170px);
        background-size:100%;
        width: 100%;
        .unlogin,.logined{
          height: 100%;
          width: 100%;
          position: relative;
          /*未登陆*/
          &>.un-gologin{
            width: rem-calc(130px);
            height: rem-calc(113px);
            position: absolute;
            top: 50%;
            left :50%;
            margin-left: rem-calc(-65px);
            margin-top: rem-calc(-51px);
            text-align: center;
            &>img{
              width :rem-calc(95.5px);
              height :rem-calc(96px);
              display:block;
              margin:0 auto;
            }
            &>span{
              font-size: rem-calc(16px);
              color: #ffffff;
            }
          }
          /*未签约*/
          .user-info{
            width: rem-calc(140px);
            height: rem-calc(48px);
            padding:rem-calc(15px) 0 0 rem-calc(15px);
            .user-pic{
              width:rem-calc(38px);
              height: rem-calc(38px);
              border-radius: rem-calc(19px);;
              float: left;
              margin-right:rem-calc(12px);
              &>img{
                width:100%;
                height:100%;
                border-radius: rem-calc(19px);;
              }
            }
            .user-detail{
              width:300px;
              &>p{
                position:relative;
                .u-name{
                  color:#fff;
                }
                &>img{
                  position:absolute;
                  width:rem-calc(15px);
                  height:rem-calc(15px);
                  margin-top:rem-calc(-.5px);
                  margin-left:rem-calc(5px);
                }
              }
            }
            .sign{
              background-color: rgba(24,86,57,0.5);
              border-radius:rem-calc(9px);
              line-height:rem-calc(18px);
              font-size:rem-calc(12px);
              text-align:center;
              padding:0 rem-calc(8px);
              display:inline-block;
              margin-top:rem-calc(5px);
              height:rem-calc(18px);
              
              #sign-img{
                width:rem-calc(13px);
                height:rem-calc(11px);
                margin-bottom:rem-calc(-1px);
              }
            }
            
            .signed{
              color:#FFF68B;
            }
            .unsign{
              opacity:0.8;
              font-size:rem-calc(12px);
              color:#ffffff;
            }
          }
          .user-money{
            text-align:center;
            color:#ffffff;
            margin-top:rem-calc(15px);
            .remain-money{
              font-size:rem-calc(13px);
              color:#ffffff;
              &>b{
                font-size:rem-calc(30px);
                display:inline-block;
                margin-top:rem-calc(5px);
                color:#ffffff;
              }
            }
            .increase{
              font-size:rem-calc(13px);
              height:rem-calc(34px);
              line-height:rem-calc(34px);
              color:#ffffff;
              &>b{
                color:#ffffff;
                margin-left:rem-calc(15px);
                font-size:rem-calc(14px);
              }
            }
          }
        }
      .setting{
        width: rem-calc(20.5px);
        height: rem-calc(19px);
        position: absolute;
        top: rem-calc(15px);
        right: rem-calc(13px);
        background-image: url(~assets/image/usercenter/setting.fw.png);
        background-size:100%;
        z-index:1000;
      }
      }
      /*头部结束*/
      /*订单列表开始*/
      .orderlist{
        width: 100%;
        background:#ffffff;
        position:relative;
        overflow:hidden;
        &>.ordertitle{
          height: rem-calc(48px);
          padding: 0px rem-calc(15px) 0px;
          position:relative;
          background:url(~src/assets/image/usercenter/center.png) no-repeat rem-calc(15px) center;
          background-size:rem-calc(16px);
          &>span{
            font-size:rem-calc(15px);
            line-height:rem-calc(50px);
            color:#333;
            padding-left:rem-calc(30px);
          }
          &>i{
            float:right;
            line-height:rem-calc(45px);
            font-style: normal;
            color:#999;
            font-weight:normal;
            height:rem-calc(45px);
            padding-right:rem-calc(25px);
            position:relative;
            &>span{
              box-sizing:border-box;
              border-radius:rem-calc(17px);
              width:rem-calc(17px);
              height:rem-calc(17px);
              display:inline-block;
              position:absolute;
              right:rem-calc(20px);
              top:50%;
              margin-top:rem-calc(-8.5px);
              font-size:rem-calc(10px);
              line-height:rem-calc(16px);
              text-align:center;
              background:#ff5d5d;
              color:#fff;
              text-indent:rem-calc(-1px);
            }
          }
        }
        &>.ordertitle:after{
          content: " ";
          display: inline-block;
          height: 8px;
          width: 8px;
          border-width: 1.2px 1.2px 0 0;
          border-color: #aaa;
          border-style: solid;
          -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
          transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
          position: relative;
          top: -2px;
          position: absolute;
          top: 50%;
          margin-top: -4px;
          right: 17px;
        }
        .list{
          position:relative;
          overflow:hidden;
          .border1{
            content: " ";
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 1px;
            border-top: 1px solid #eeeeee;
            color: #eeeeee;
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            -webkit-transform: scaleY(0.5);
            transform: scaleY(0.5);
          }
          &>li{
            width: 33.33%;
            height: rem-calc(66px);
            padding-top:rem-calc(16px);
            text-align:center;
            float: left;
            list-style:none;
            overflow:hidden;
            position:relative;
            &>img{
              //width:rem-calc(30px);
              height:rem-calc(23px);
            }
            &>p{
              margin-top:rem-calc(11px);
              color:#666666;
              font-size:rem-calc(13px);
            }
            .numbers{
              box-sizing:border-box;
              position:absolute;
              top:rem-calc(10px);
              left:51%;
              color:#fff;
              font-size:rem-calc(10px);
              width:rem-calc(17px);
              height:rem-calc(17px);
              text-align:center;
              line-height:rem-calc(15px);
              border-radius:rem-calc(17px);
              background:#fff;
              z-index:10;
              background:#ff5d5d;
            }
          }
          &>li:after{
            content: " ";
            position: absolute;
            right: 0;
            top: 50%;
            width: 1px;
            height: rem-calc(30px);
            border-right: 1px solid #eee;
            color: #eee;
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            -webkit-transform: scaleX(0.5);
            transform: scaleX(0.5);
            margin-top:rem-calc(-15px);
          }
        }
      }
      /*订单列表结束*/
      /*cell-box开始*/
      #group{
        margin-bottom:rem-calc(20px);
        .weui-cell_access.vux-cell-box:after{
          content: " ";
          display: inline-block;
          height: 8px;
          width: 8px;
          border-width: 1.2px 1.2px 0 0;
          border-color: #aaa;
          border-style: solid;
          -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
          transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
          position: relative;
          top: -2px;
          position: absolute;
          top: 50%;
          margin-top: -4px;
          right: 17px;
        }
        &>div>.weui-cells{
          margin-top:rem-calc(10px);
        }
        .weui-cells::before,.weui-cells::after{
          border:none;
        }
        .weui-cell{
          margin-top:0px;
          height: rem-calc(50px);
          padding-top:0;
          padding-bottom: 0;
          line-height: rem-calc(50px);
          vertical-align: middle;
          font-size:rem-calc(15px);
          color:#333333;
          position:relative;
          img{
            height:rem-calc(16px);
            width:rem-calc(16px);
            margin-right:rem-calc(13px);
            margin-bottom:rem-calc(-2px);
          }
        }
      }
    }
  }
  #user-conf{
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
