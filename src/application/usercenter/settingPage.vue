<template>
  <div id="settingpage">
    <group id="user-info">
        <div class="info">

          <div class="userdetail">
            <p>{{userinfo.name}}</p>
            <span>手机号 {{userinfo.phone}}</span>
          </div>
        </div>
      <cell link="" is-link >
        <span @click="showAction" style="display:inline-block">
          <span class="name-pic">
            <img :src="headImg" alt="">
          </span>
        </span>
      </cell>
    </group>
    <group id="rel">
      <cell title="签约经纪公司" link="" class="notlink">{{userinfo.companyName}}</cell>
      <cell title="实名认证" link="" class="notlink">{{userinfo.realName}}</cell>
      <cell title="绑定手机" link="changephone" is-link class="link">修改手机号</cell>
    </group>
    <group>
      <cell title="登陆密码" link="changepas" is-link>{{userinfo.pasword}}</cell>
      <cell title="指纹登陆" link="fingerlogin" is-link>{{userinfo.zhiwen}}</cell>
      <cell title="支付密码" link="setpaypas" is-link>{{userinfo.payPas}}</cell>
    </group>
    <group>
      <cell title="我的银行卡" link="cardlist" is-link></cell>
    </group>
    <div class="loginout" @click="loginOut">安全退出</div>
  </div>
</template>
<script>
  import { Group, Cell, Actionsheet } from 'vux'
  import store from 'src/widget/plugin/store.js'
  import {headUploadApi} from 'src/api/index.js'
  import cookie from 'src/widget/plugin/cookie'

  let userid = cookie.get('http_userID')
  let token = cookie.get('http_usertoken')/*"27_38e0e7cc371bf1420e5cadfdca6976b4"*/
  //token = "27_38e0e7cc371bf1420e5cadfdca6976b4"

  export default {
    name: "SettingPage",
    data () {
      return {
        userinfo: {
          pasword: "修改密码",
          zhiwen: "未设置",
          payPas: "未设置",
          imgSrc: require("src/assets/image/usercenter/touxiang.png"),
          realName: "未认证",
          companyName: "未认证"
        },
        show: false,
        headImg: require("src/assets/image/usercenter/touxiang.png")
      }
    },
    components:{
      Group,
      Cell
    },
    methods: {
      showAction () {
        this.jsbridge.callImage('headCb')
      },
      loginOut(){
        store.remove("userInfo");
        store.remove("goCashCard");
        this.jsbridge.callLogout()
      },
      getUserInfo(){
        let userInfo = store.get("userInfo")
        if(userInfo){
          this.headImg = userInfo.headImage?userInfo.headImage:require("src/assets/image/usercenter/touxiang.png")
          this.userinfo.name = userInfo.userName;
          this.userinfo.phone = userInfo.accountInfo.mobile;
          userInfo.accountInfo.companyName?this.userinfo.companyName= userInfo.accountInfo.companyName:this.userinfo.companyName="未认证"
          userInfo.accountInfo.realName?this.userinfo.realName = userInfo.accountInfo.realName:this.userinfo.realName="未认证";
          if(userInfo.accountInfo.isUsePayPsw==1){
            this.userinfo.payPas = "修改密码";
          }else{
            this.userinfo.payPas = "未设置";
          }
        }
      }
    },
    created(){
      this.getUserInfo()
      let self = this
      window.headCb = (base) => {
        let instance = self.axios.create({
          headers: {'token': token}
        });
        instance.post(headUploadApi, {
          image: base,
          suffix: '.jpg',
          userId: userid
        }).then(res => {
          let data = res.data
          if(data.status == 'SUCCESS') {
            self.headImg = data.data
          } else {
            this.$vux.toast.show({
              text: res.data.message,
              type: 'text',
              width: '80%'
            });
          }
        }).catch(err=> {

        })
      }
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss'>
  @import '~src/assets/scss/function';
  #settingpage{
    width:100%;
    height:100%;
    background:#f6f6f6;
    padding-top:rem-calc(10px);
    #rel .weui-cell__ft{
      padding:0;
    }
    #rel .notlink .weui-cell__ft:after{
      border:none;
    }
    #rel .link .weui-cell__ft{
      padding-right:20px;
    }
    #user-info{
      position:relative;
      .info{
        position:absolute;
        left:rem-calc(15px);
        float:left;
        height:rem-calc(64px);
        overflow:hidden;
        z-index:5;
        & .userdetail{
          float:left;
          height:rem-calc(54px);
          text-align:left;
          padding-top:rem-calc(10px);
          &>p{
            line-height:20px;
            font-size:14px;
            color:#333;
            margin-bottom:2px;
          }
          &>span{
            color:#999;
            font-size:13px;
          }
        }
      }
      & .name-pic{
          display:inline-block;
          border-radius:rem-calc(50px);
        & img{
          width:rem-calc(50px);
          height:rem-calc(50px);
          border-radius:rem-calc(25px);
          vertical-align: middle;
          }
        }
      .weui-cell::before{
        border:none;
      }
      .weui-cells{
        height:rem-calc(64px);
        .weui-cell{
          height:rem-calc(64px);
            }
          }
    }
    & .weui-cells{
      margin-bottom:rem-calc(10px);
      margin-top:0;
      &>.weui-cell{
        height:rem-calc(45px);
        padding:0 rem-calc(15px);
        line-height:rem-calc(45px);
        & .vux-cell-bd{
          font-size:15px;
        }
        & .weui-cell__ft{
          font-size:13px;
          padding-right:20px;
        }
        & .weui-cell__ft:after{
          content: " ";
          display: inline-block;
          height: rem-calc(8px);
          width: rem-calc(8px);
          border-width: 1px 1px 0 0;
          border-style: solid;
          -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
          transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
          top: rem-calc(-2px);
          position: absolute;
          top: 50%;
          margin-top: rem-calc(-5px);
          right: rem-calc(2px);
        }
      }
    }
    & .weui-cells::before,& .weui-cells::after{
      border:none;
    }
    & .loginout{
      color:#FA5959;
      text-align:center;
      line-height:rem-calc(45px);
      background:#fff;
    }
    & .weui-actionsheet__cell{
      padding:0;
    }
    .weui-actionsheet__menu,.weui-actionsheet__action{
      height:rem-calc(45px);
      padding:0;
      line-height:rem-calc(45px);
      font-size:rem-calc(16px)
      .weui-actionsheet__cell{
        padding:0;
      }
      .vux-actionsheet-menu-default{
        color:#00bd96;
      }
    }
  }
</style>
