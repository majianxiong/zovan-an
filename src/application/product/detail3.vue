
<!--********************************************************************
 * Author        : Geyan
 * Email         : geyan@zhongan.io
 * Create Date   : 2017-05-03 19:48
 * Filename      : detail.vue
 * Description   : 陆家嘴国泰美泰人生重疾险
********************************************************************-->

<template>
<div class='detail-content'>
  <div class='detail-header'>
    <img src='/static/pic/detail/header3.jpg'>
    <!-- <div class='header-info'>销量2488份</div> -->
  </div>
  <div class='detail-desc'>
    <p class='desc-title'>陆家嘴国泰美泰人生重大疾病保险</p>
    <p class='desc-info'><span>70</span>种重大疾病+<span>50</span>种轻疾病+长期护理保险金</p>
    <p class='desc-price'><span>1110.00</span>￥起</p>
  </div>
  <div class='detail-split'>
    <span>重疾、轻症保障全</span>
    <span>可赔付3次</span>
  </div>
  <group class="detail-group" label-width="4.5em" label-margin-right="2em" label-align="right">
    <cell title='保障计划' value='10万起' ></cell>
    <cell title='投保年龄' value='28天-55周岁' ></cell>
    <cell title='保障期限' value='终身' ></cell>
  </group>
  <div class='identity'>
    <div class='identity-item' :class='{selected:avatarActived == 1}' data-val='1' data-comp='charactor' @click='toggleTab'>
      <span>产品特色</span>
      <div class='under'></div>
    </div>
    <div class='identity-item' :class='{selected:avatarActived == 2}' data-val='2' data-comp='plan' @click='toggleTab'>
      <span>投保责任</span>
      <div class='under'></div>
    </div>
    <div class='identity-item' :class='{selected:avatarActived == 3}' data-val='3' data-comp='rule' @click='toggleTab'>
      <span>投保规则</span>
      <div class='under'></div>
    </div>
  </div>
  <div class="detail-view">
    <component v-bind:is="currentView" :datas="compdata">
    </component>
  </div>
  <footerGroup @leftclick='footerLClick' @rightclick='footerRClick' btlname='制作计划书' btrname='确认投保'></footerGroup>
  <div v-transfer-dom id="user-conf">
    <confirm v-model="showConf" @on-cancel="onCancel" @on-confirm="onConfirm" :title="title" :content="content" confirm-text="去签约认证" cancel-text="暂不 就看看">
    </confirm>
  </div>
</div>
</template>

<script>
  import {Tab, TabItem, Group, Cell, Confirm , TransferDomDirective as TransferDom} from 'vux'
  import {getDetailData} from 'src/api'
  import footerGroup from 'src/components/service/footergroup'
  import cookie from 'src/widget/plugin/cookie'
  import store from 'src/widget/plugin/store.js'
  let token = cookie.get('http_usertoken')||""//"27_38e0e7cc371bf1420e5cadfdca6976b4"
  let isapp = cookie.get('http_ostype')||""
  const wxnickname = decodeURIComponent(cookie.get('ZATECH1000104')) || ''
  let userId = cookie.get('http_userID')
  const charactor = {
      data: () => {
        return {
        }
      },
      'template' : `
        <div class='detail-charactor'>
          <img src='/static/pic/detail/content31.jpg'>
          <img src='/static/pic/detail/content32.jpg'>
          <img src='/static/pic/detail/content33.jpg'>
          <img src='/static/pic/detail/content34.jpg'>
        </div>
      `
  }
  const rule = {
    data: () => {
      return {
        notice: '',
        tableData: [
        ],
        response: [
        ]
      }
    },
    props: ['datas'],
    mounted () {
      this.notice = this.datas.notice ? this.datas.notice : ''
      this.tableData = this.datas.tabledata ? this.datas.tabledata : []
      this.response = this.datas.response ? this.datas.response : []
    },
    'template' : `
      <div class='detail-plan'>
        <img src='/static/pic/detail/content38.jpg'>
      </div>
    `
  }
  const plan = {
    data: () => {
      return {
        tableData: [
        ]
      }
    },
    props: ['datas'],
    mounted () {
      this.tableData = this.datas.tabledata ? this.datas.tabledata : []
    },
    'template' : `
      <div class='detail-rule'>
        <img src='/static/pic/detail/content35.png'>
        <img src='/static/pic/detail/content36.png'>
        <img src='/static/pic/detail/content37.jpg'>
      </div>
    `
  }

  export default {
    name: 'detail3',
    directives: {
      TransferDom
    },
    data: () => {
      return {
        avatarActived: 1,
        currentView: 'charactor',
        groupData: [],
        charactorData: {},
        ruleData: {},
        planData: {},
         showConf:false,
        title:'实名认证提醒',
        content:'<img src="/static/pic/renzheng.png"/>亲，您还未实名认证哦，未实名认证的用户不能进行如下操作:<p>1.邀请好友；<br/>2.制作保单计划书；<br/>3.代客户投保。</p>'
      }
    },
    computed: {
      compdata () {
        if(this.currentView == 'charactor') {
          return this.charactorData
        } else if(this.currentView == 'rule') {
          return this.ruleData
        } else if(this.currentView == 'plan') {
          return this.planData
        }
      }
    },
    activated: function () {
      console.log('active')
    },
    created(){

      let wechatuserId = this.getQueryString('userId');
      if(wechatuserId != 'undefined')
        this.log({targetType:0,eventType:2,productCode:'ZA0003',userId:wechatuserId})

      window.detailShare3 = ()=>{
        window.shareLog3 = (res)=>{
          //res 1:分享成功 2:失败
          if(!!res){
            this.log({targetType:0,eventType:1,productCode:'ZA0003',userId:userId})
          }
        };
        this.jsbridge.shareConfig({
          img:'',
          title:'快来看看！我发现了一份好保险，推荐给您！',
          desc:'快来看看！我发现了一份好保险，推荐给您！',
          link: window.location.href+'?userId='+userId,
          callback: 'shareLog3'
        })
      }
    },
    components: {
      Tab, TabItem, Group, Cell, charactor, plan, rule, footerGroup,Confirm
    },
    props: [],
    methods: {
      getQueryString(name) {
        var after = window.location.hash.split("?")[1];
        if(after)
        {
          var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
          var r = after.match(reg);
          if(r != null)
          {
              return  decodeURIComponent(r[2]);
          }
          else
          {
              return null;
          }
        }
      },
      onCancel(){

      },
      onConfirm(){
        let routerpath = window.location.href.split("#")[1];
        store.set("routerpath",routerpath);
        this.$router.push("/electronicsign")
      },
      toggleTab (e) {
        let cur = e.target;
        if(!cur.className.match(/identity-item/)) {
          cur = cur.parentElement;
        }
        this.avatarActived = parseInt(cur.dataset.val)
        this.currentView = cur.dataset.comp
      },
      getData () {
        this.axios.get(getDetailData).then((response) => {
          this.groupData = response.data.groupdata
          this.charactorData = response.data.tabs.charactor
          this.ruleData = response.data.tabs.rule
          this.planData = response.data.tabs.plan
        }, (response) => {
          // this.loadStatus = !this.loadStatus
        })
      },
      // initWeixin () {
      //   let self = this;
      //   // let wx = this.$wechat
      //   const shareimgurl = window.location.protocol+'//static.zhongan.com/website/mobile/assets/images/fangzhen/share.jpg'
      //   let date = new Date().getTime()
      //
      //   //未登录不配置分享
      //   if(!this.$store.getters.logged){
      //     return
      //   }
      //
      //   self.$store.dispatch('convertProductShareUrl',{
      //     path:self.$route.path.replace('/',''),
      //     productId:self.$route.query.productId,
      //     productCode:self.productCode,
      //     cb:function(url){
      //       if(self.uaDetector && self.uaDetector.inWechat){
      //         // alert(url)
      //         let link1 = url + 'wxtimeline&t='+date
      //         let link2 = url + 'wxmessage&t='+date
      //         let pn = document.domain=='csuat.pkufi.com'?'无忧E生医疗保险-测试':'无忧E生医疗保险'
      //         wx.ready(function(){
      //           // alert(url)
      //           wx.onMenuShareTimeline({
      //               title: '您的好友'+wxnickname+'分享“'+ pn +'”', // 分享标题
      //               link: link1, // 分享链接
      //               imgUrl: shareimgurl, // 分享图标
      //               success: function () {
      //                   // 用户确认分享后执行的回调函数
      //               },
      //               cancel: function () {
      //                   // 用户取消分享后执行的回调函数
      //               }
      //           })
      //
      //           wx.onMenuShareAppMessage({
      //               title: '您的好友'+wxnickname+'分享“'+ pn +'”', // 分享标题
      //               desc: '200万医疗报销，不限社保药，赔付比例100%，可续保至79岁！', // 分享描述
      //               link: link2, // 分享链接
      //               imgUrl: shareimgurl, // 分享图标
      //               // type: '', // 分享类型,music、video或link，不填默认为link
      //               // dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      //               success: function () {
      //               },
      //               cancel: function () {
      //                   // 用户取消分享后执行的回调函数
      //               }
      //           })
      //
      //           // wx.onMenuShareQQ({
      //           //     title: '', // 分享标题
      //           //     desc: '', // 分享描述
      //           //     link: '', // 分享链接
      //           //     imgUrl: '', // 分享图标
      //           //     success: function () {
      //           //        // 用户确认分享后执行的回调函数
      //           //     },
      //           //     cancel: function () {
      //           //        // 用户取消分享后执行的回调函数
      //           //     }
      //           // });
      //           wx.showOptionMenu();
      //         })
      //       }
      //     }
      //   })
      // },
      footerLClick () {
        let userType = cookie.get('http_userType')
        console.log(userType)
        if(!isapp){
          this.$router.push("/convertPlan/ZA0003")
          return 
        }
        if(token){
          if(userType==1){
            this.$router.push("/convertPlan/ZA0003")
          }else if(userType==2){
            this.showConf = true;
          }
        }else{
          this.$router.push("/convertPlan/ZA0003")
        }
      },
      footerRClick () {
        let userType = cookie.get('http_userType')
        
        if(!isapp){
          this.$router.push("/trial/ZA0003")
          return 
        }
        if(token){
          if(userType==1){
            this.$router.push("/trial/ZA0003")
          }else if(userType==2){
            this.showConf = true;
          }
        }else{
          this.$router.push("/trial/ZA0003")
        }
       
      }
    },
    mounted () {
      //this.getData()
      //this.initWeixin()
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  @import '~assets/scss/function';
  .detail-content {
    position:absolute;
    background-color:#f6f6f6;
    left:0;right:0;bottom:0;top:0;
    overflow-x:hidden;
    overflow-y:scroll;
    .detail-header {
      width:100%;
      position:relative;
      img {
        width:100%;
      }
      .header-info {
        position:absolute;
        right:rem-calc(15px);
        bottom:rem-calc(15px);
        font-size:rem-calc(13px);
        color:#fff;
      }
    }
    .detail-desc {
      padding:rem-calc(15px);
      box-sizing: border-box;
      width:100%;
      background-color:#fff;
      .desc-title {
        font-size:rem-calc(18px);
        color:#333;
        margin-bottom:rem-calc(12px);
      }
      .desc-info {
        font-size:rem-calc(15px);
        color:#666;
        margin-bottom:rem-calc(20px);
        span {
          color:#ff7c1b;
        }
      }
      .desc-price {
        font-size:rem-calc(15px);
        color:#ff7c1b;
        span {
          font-size:rem-calc(26px);
        }
      }
    }
    .detail-split {
      width:100%;
      height:rem-calc(35px);
      font-size:rem-calc(13px);
      color:#999;
      line-height: rem-calc(35px);
      padding-left:rem-calc(15px);
      box-sizing: border-box;
      span {
        display:inline-block;
        padding-left:rem-calc(16px);
        background:url('/static/pic/check.png') no-repeat left center;
        background-size:rem-calc(13px);
        margin-right:rem-calc(13px);
      }
      &>span:nth-child(1) {

      }
      &>span:nth-child(1) {

      }
    }
    .detail-group {
      .vux-no-group-title {
        margin:0!important;
      }
      .weui-cells:before {
        border-top:none!important;
      }
      .weui-cells:after {
        border-bottom:none!important;
      }
      .weui-cell__ft {
        color:#333;
      }
    }
    .identity {
      height:rem-calc(50px);
      display:flex;
      box-sizing:border-box;
      text-align:center;
      background-color:#fff;
      margin-top:rem-calc(10px);
      padding-top:rem-calc(15px);
      border-bottom:1px solid #d1d1d1!important;
      .identity-item {
        flex:1;
        color:#666;
        position:relative;
        span {
          display:inline-block;
          width:100%;
          font-size:rem-calc(15px);
          line-height:rem-calc(16px);
          border-right:1px solid #d1d1d1;
        }
        .under {
          position:absolute;
          left:0;right:0;bottom:0;margin:auto;
          visibility:hidden;
          width:rem-calc(110px);
          height:rem-calc(2.5px);
          background-color:#00bd96;
        }
      }
      & .identity-item:last-child {
        span {
          border-right:none!important;
        }
      }
      .identity-item.selected {
        span {
          color:#00bd96;
        }
        .under {
          visibility:visible;
        }
      }
    }
    .detail-view {
      background-color:#fff;
      margin-bottom:rem-calc(48px);
      min-height:rem-calc(250px);
    }
    .table {
      display:table;
      border-collapse: collapse;
      width:100%;
      color:#333;
      .table-row {
        display:table-row;
        .table-tt {
          display:table-cell;
          background-color:#f6f6f6;
          width:rem-calc(79px);
          height:rem-calc(45px);
          vertical-align:middle;
          text-align:center;
          border:1px solid #eee;
          padding:rem-calc(12px);
          box-sizing:border-box;
        }
        .table-tb {
          display:table-cell;
          border:1px solid #eee;
          vertical-align:middle;
          padding:rem-calc(12px);
          box-sizing:border-box;
        }
      }
    }
    .detail-charactor, .detail-plan, .detail-rule {
      background-color:#fff;
      img {
        width:100%;
        display:block;
      }
    }
    .detail-footer {
      display:flex;
      align-items: stretch;
      position:fixed;
      bottom:0;
      width:100%;
      height:rem-calc(48px);
      z-index:3;
      background-color:#fff;
      button {
        flex:1;
        color:#fff;
        font-size:rem-calc(18px);
        border:none;
        outline: none;
      }
      .plan {
        background-color:#324150;
      }
      .confirm{
        background-color:#00bd96;
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
