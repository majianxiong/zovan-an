<template>
  <div id="teamdetail" ref="fullpage">
    <div class="shadow" ref="shadow" v-show="showtip">
      <img src="~assets/image/teamact/openbower.png" alt="">
    </div>
    <div class="head">
      <img :src="bg" alt="">
      <div v-if="this.status==6">
        <div class="timedown">
          <span>{{day.split("")[0]}}</span>
            <span>{{day.split("")[1]}}</span>
            <i>天</i>
            <span>{{hour.split("")[0]}}</span>
            <span>{{hour.split("")[1]}}</span>
            <i>小时</i>
        </div>
        <div class="percent">
          <p>目标保费达{{targetPremium}}元，即可获奖励</p>
          <div class="percent-bar">
            <div class="bar" ref="bar" :style="{width:percent * 200 + 'px'}">
              <div class="per-tip" ref="pertip">
                <p>{{Math.floor(percent*100)}}%</p>
                <div>￥{{complete}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="acttime">
      <div class="discr" :style="{opacity:((status<=3||status==9)?1:0.66)}">
        <div class="time" >{{groupStartTime|timefilter5}}-{{groupendtime|timefilter5}}</div>
        <p>三人成团</p>
      </div>
      <div class="discr" :style="{opacity:((status==6)?1:0.66)}">
        <div class="time">{{jobStartTime|timefilter5}}-{{taskendtime|timefilter5}}</div>
        <p>完成团战目标</p>
      </div>
      <div class="discr" :style="{opacity:((status==4||status==5||status==10)?1:0.66)}">
        <div class="time last">保单犹豫期结束</div>
        <p><img src="~assets/image/teamact/star.png" alt="">奖励{{totalAmount}}元<img src="~assets/image/teamact/star.png" alt=""></p>
      </div>
    </div>
    <div class="team">
      <img src="~assets/image/teamact/bolang.png" alt="">
      <div class="teamname">
        团队名称:{{title}}
      </div>
      <img src="~assets/image/teamact/bolang.png" alt="">
    </div>
    <c_teamslider :list="list" :crownshow="true"></c_teamslider>
    <div class="teambtn" @click="askbtn" v-show = "showaskbtn">
      邀请好友来参战
    </div>
    <div class="teambtn" @click="joinbtn" v-show="showjoinbtn">
      我要参加
    </div>
    <c_actrule :context="context" class="actru" ></c_actrule>
  </div>
</template>
<script>
  import c_actrule from 'src/components/service/actrule'
  import c_teamslider from 'src/components/service/teamslider'
  import cookie from 'src/widget/plugin/cookie'
  import store from 'src/widget/plugin/store.js'
  import { wechatSignApi, joinTeam, getTeamDetail, getActivity,getTeamList} from "src/api"
  let userId = cookie.get('http_userID')?cookie.get('http_userID'):""//56//51
  let token = cookie.get('http_usertoken')?cookie.get('http_usertoken'):""//"27_38e0e7cc371bf1420e5cadfdca6976b4"
  export default {
    name:"TeamDetail",
    data(){
      return{
        bg0:require("src/assets/image/teamact/teamsts0.png"),
        bg1:require("src/assets/image/teamact/teamsts1.png"),
        bg2:require("src/assets/image/teamact/teamsts2.png"),
        bg3:require("src/assets/image/teamact/teamsts3.png"),
        bg4:require("src/assets/image/teamact/teamsts4.png"),
        bg5:require("src/assets/image/teamact/teamsts5.png"),
        bg10:require("src/assets/image/teamact/teamsts10.png"),
        bg9:require("src/assets/image/teamact/teamsts9.png"),
        showaskbtn:false,
        showjoinbtn:false,
        list:[],
        title:"",
        totalTeam:1,
        groupTeam:1,
        isinteam:false,
        jobStartTime:0,
        groupendtime:0,
        groupStartTime:0,
        showtip:false,
        totalAmount:200,//总奖金
        status:1, //1.团战发起 2组团成功，3//组团失败 //6团战中(倒计时)  4 团战成功 5.团战失败
        taskendtime:0,
        complete:20000,//完成的保费
        targetPremium:50000,//需要完成的总计保费
        day:"00",
        hour:"00",
        context:[
          {
            title:"一、活动时间：",
            detail:[{text:"组团时间：2017年07月07日—2017年07月09日"},{text:"团战时间：2017年07月10日—2017年07月17日"}]
          },
          {
            title:"二、活动详情：",
            detail:[{text:"1.本活动仅限保啊签约用户参加"},{text:"2.每人仅允许参加一个团"},{text:"3.在组团时间内完成组队方可进行团战"},{text:"4.本团的任务奖金将在本团销售的保单全部过犹豫期后，以团为单位均分至成员保啊账户上"},{text:"5.每单销售提成与团战奖励不冲突"},{text:"6.保啊平台保留活动最终解释权"}]
          }
        ]
      }
    },
    components:{
      c_actrule,c_teamslider
    },
    created(){
      console.log(this.$route.query.id)
      this.getActivity();
     // this.getteamuser();
      let CancelToken = this.axios.CancelToken
      let source = CancelToken.source()
      if(this.uaDetector && this.uaDetector.inWechat){
        this.showtip = true;
        this.axios.post(wechatSignApi,{
          url:window.location.href.split('#')[0].replace('/?','?')
        },{cancelToken:source.token}).then((res)=> {
          let value = res.data.data
          // let wx = this.$wechat
          if(!!value){
             wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: value.appId, // 必填，公众号的唯一标识
              timestamp: value.timestamp, // 必填，生成签名的时间戳
              nonceStr: value.nonceStr, // 必填，生成签名的随机串
              signature: value.signature,// 必填，签名，见附录1
              jsApiList: ["showMenuItems","hideMenuItems",'chooseImage','onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            })
             wx.ready(()=> {
              wx.showMenuItems({
                menuList: ["menuItem:openWithQQBrowser","menuItem:openWithSafari"] // 要显示的菜单项，所有menu项见附录3
              });
             })
          }
        }).catch(err=>{

        })
      }else{
        this.showtip = false;
      }
    },
    mounted(){
      let height = this.$refs.fullpage.offsetHeight + "px";
      this.$refs.shadow.style.height = height
      if(this.status==6){
        this.$refs.bar.style.width = this.percent * 200 + "px";
        let timer = setInterval(()=>{//10分钟获取一次数据，更新状态
          this.getData()
          if(this.status==4||this.status==5||this.status==10){
            clearInterval(timer);
          }
        },600000)
      }
      
    },
    methods:{
      joinbtn(){
        let url = window.location.href.replace(/#/g,'%23').replace(/&/g,'%26')
        if(!token){
          this.jsbridge.openclient(url)
        }else{
          let userType = cookie.get('http_userType');
          let that = this
          if(userType==1){
            this.axios.post(joinTeam,{
              userId,
              activityId:this.$route.query.activityId,
              activityTeamId: this.$route.query.id
            }).then(res=>{
              if(res.data.status=="SUCCESS"){
                this.getData()
                this.$vux.toast.show({
                  text: "参团成功",
                  type: 'text',
                  width: '80%'
                });
              // this.showaskbtn = true;
              }else{
                this.$vux.toast.show({
                  text: res.data.message,
                  type: 'text',
                  width: '80%'
                });
              }
            }).catch(err=>{
              this.$vux.toast.show({
                text: "系统异常",
                type: 'text',
                width: '80%'
              });
            })
          }else if(userType==2){
            this.$vux.confirm.show({
              content: "<p style='color:#333333;'>此活动仅限签约用户<br/>参与，您还未签约</p>",
              confirmText:"去签约",
              onConfirm () {
                let routerpath = window.location.href.split("#")[1];
                store.set("routerpath",routerpath);
                that.$router.push("electronicsign")
              }
            })
          }
        }
      },
      askbtn(){
        this.getData();
        let userType = cookie.get('http_userType');
        if(userType==1){
          this.jsbridge.shareConfig({
            img:'http://pkufi-perftest.zhongan.io/static/pic/teamshare.png',
            title:'我正在参加7.7团战活动，诚邀你一起来组团赢现金！',
            desc:'三人成团，人人有奖，丰厚奖励诚邀你来共享~',
            link:window.location.href
          })
        }else if(userType==2){
          this.$vux.confirm.show({
            content: "<p style='color:#333333;'>此活动仅限签约用户<br/>参与，您还未签约</p>",
            confirmText:"去签约",
            onConfirm () {
              let routerpath = window.location.href.split("#")[1];
              store.set("routerpath",routerpath);
              that.$router.push("electronicsign")
            }
          })
        }
      },
      getActivity(){
        let url = getActivity + this.$route.query.activityId
        this.axios.get(url)
        .then(res=>{
          this.groupStartTime = res.data.data.groupStartTime
          this.groupendtime = res.data.data.groupEndTime;
          this.jobStartTime = res.data.data.jobStartTime
          this.taskendtime = res.data.data.jobEndTime;
          this.groupTeam = res.data.data.groupTeam;
          this.totalTeam = res.data.data.totalTeam;
          this.totalAmount = res.data.data.totalAmount;
          this.targetPremium = res.data.data.targetPremium;
          this.context[0].detail=[{text:"组团时间："+ new Date(this.groupStartTime).Format("yyyy年MM月dd日")+"—"+new Date(this.groupendtime).Format("yyyy年MM月dd日")},{text:"团战时间："+ new Date(this.jobStartTime).Format("yyyy年MM月dd日")+"—"+new Date(this.taskendtime).Format("yyyy年MM月dd日")}]
          this.getData();
        }).catch(err=>{
          this.$vux.toast.show({
            text: "系统异常",
            type: 'text',
            width: '80%'
          }); 
        })
      },
      getteamuser(){
        this.axios.post(getTeamDetail,{
          activityTeamId: this.$route.query.id,
          userId
        }).then(res=>{
          console.log(res);
          if(res.data&&res.data.data.activityTeamUserResultVOList){
            this.showaskbtn = true;
            this.showjoinbtn =false;
          }else{
            this.showjoinbtn = true;
            this.showaskbtn = false;
          }
        }).catch(err=>{
          this.$vux.toast.show({
            text: "系统异常",
            type: 'text',
            width: '80%'
          });
        })
      },
      getData(){
        this.axios.post(getTeamDetail,{
          activityTeamId: this.$route.query.id
        })
        .then(res=>{
          let data = res.data&&res.data.data;
          console.log(data);
          this.title = data.activityTeamResultVO.title;
          this.status = data.activityTeamResultVO.teamStatus
          this.complete = (data.activityTeamResultVO.totalPremium?data.activityTeamResultVO.totalPremium:0) - (data.activityTeamResultVO.invalidPremium?data.activityTeamResultVO.invalidPremium:0);
          this.list = data.activityTeamUserResultVOList;
          if((this.uaDetector && this.uaDetector.inWechatt)||!token){
            if(this.totalTeam<=this.groupTeam){
              this.$vux.alert.show({
                content: "<p style='color:#333333;'>您来晚了<br/>活动已满团，不能参加咯！</p>",
                buttonText:"我知道了"
              })
              this.showjoinbtn = false;
              this.showaskbtn = false;
            }else{
              if(res.data.date>this.groupendtime){
                this.$vux.alert.show({
                  content: "<p style='color:#333333;'>已经超过组团时间<br/>不能参团</p>",
                  buttonText:"我知道了"
                })
                this.showjoinbtn = false;
                this.showaskbtn = false;
              }else{
                if(data.activityTeamResultVO.currentPerson>=data.activityTeamResultVO.maxPerson){
                  this.$vux.alert.show({
                    content: "<p style='color:#333333;'>您来晚了！<br/>此团已完成组团咯</p>",
                    buttonText:"我知道了"
                  })
                  this.showjoinbtn = false;
                  this.showaskbtn = false;
                }else{
                  this.showjoinbtn = true;
                }
              }
            }
          }else{
            if(this.status>1){
            this.showjoinbtn = false;
            this.showaskbtn = false;
            }else{
              this.getteamuser();
            }
            if(this.status==6){
              let remaintime =this.taskendtime - res.data.date;
              this.day = ~~(remaintime/(1000*60*60*24))+"";
              this.hour = ~~(remaintime/(1000*60*60)-this.day*24)+ "";
              if(this.day<10){
                this.day = "0"+this.day;
              }
              if(this.hour<10){
                this.hour = "0"+this.hour
              }
              if(remaintime<=0&&this.complete>=targetPremium){
                this.status = 10
              }else if(remaintime<=0&&this.complete<targetPremium){
                this.status = 5
              }
            }
          }
        }).catch(err=>{
          this.$vux.toast.show({
            text: "系统异常",
            type: 'text',
            width: '80%'
          });
        })
      }
    },
    computed:{
      bg(){
        if(this.status==1){
          this.setTitle('团战邀请页')
          return this.bg0
        }else if(this.status==2){
          this.setTitle('组团成功')
          return this.bg1
        }else if(this.status==3){
          this.setTitle('组团失败')
          return this.bg2
        }else if(this.status==4){
          this.setTitle('团战结束')
          return this.bg4
        }else if(this.status==5){
          this.setTitle('团战结束')
          return this.bg5
        }else if(this.status==6){
          this.setTitle('团战进行中')
          return this.bg3
        }else if(this.status==10){
          this.setTitle('待分配奖励')
          return this.bg10
        }else if(this.status==9){
          this.setTitle('待任务开始')
          return this.bg9
        }
      },
      percent(){
        if(this.complete/this.targetPremium>=1){
          return 1
        }else{
          let per = this.complete/this.targetPremium
          console.log(this.targetPremium)
          console.log(per)
          return per
        }
      }
    },
    beforeDestroy(){
      wx.hideMenuItems({
        menuList: ["menuItem:openWithQQBrowser","menuItem:openWithSafari"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
      });
    }
  }
  
</script>
<style lang='scss' rel='stylesheet/scss'>
  @import '~src/assets/scss/function';
  #teamdetail{
    width:100%;
    min-height:100%;
    background-image: -webkit-linear-gradient( 90deg, rgb(255,184,72) 0%, rgb(250,111,42) 70%);
    &>.shadow{
      background-color: rgb(0, 0, 0);
      opacity: 0.7;
      position:fixed;
      top:0;
      right:0;
      left:0;
      z-index:3;
      &>img{
        width:rem-calc(224px);
        height:rem-calc(110px);
        position:absolute;
        z-index:999;
        right:rem-calc(18px);
      }
    }
    &>.head{
      height:rem-calc(380px);
      position:relative;
      width:100%;
      &>img{
        height:100%;
        width:100%;
      }
      &>div{
        position:absolute;
        top:rem-calc(151px);
        left:rem-calc(95px);
        width:rem-calc(200px);
        height:rem-calc(59px);
        .timedown{
          color: rgb(255, 79, 81);
          height:rem-calc(44px);
          width:rem-calc(193px);
          margin-bottom:rem-calc(12px);
          padding-left:rem-calc(10px);
          &>span{
            display:inline-block;
            border-radius: rem-calc(6px);
            background-color: rgb(255, 255, 255);
            box-shadow: 0px 2px 0px 0px rgba(255, 160, 160, 0.75);
            width: rem-calc(30px);
            height: rem-calc(42px);
            text-align:center;
            overflow:hidden;
            line-height:rem-calc(44px);
            font-size:rem-calc(32px);
          }
          &>i{
            display:inline-block;
            font-style:normal;
            margin:0 rem-calc(1px);
            height:rem-calc(44px);
            overflow:hidden;
            line-height:rem-calc(60px);
          }
        }
        &>.percent{
          &>p{
            color: #a73536;
            font-size:rem-calc(12px);
            text-align:center;
            font-weight:500;
            margin-bottom:rem-calc(13px);
          }
          &>.percent-bar{
            width:100%;
            height:rem-calc(7px);
            border-radius:rem-calc(4px);
            background-color:#ffd4be;
            position:relative;
            &>.bar{
              background-image: linear-gradient(to left, #ff6160, #ffba23);
              height:rem-calc(7px);
              border-radius:rem-calc(4px);
              position:absolute;
              top:0;
              left:0;
              
            }
            .per-tip{
              position:absolute;
              top:0;
              right:rem-calc(-15px);
              width:rem-calc(30px);
              &>p{
                width: rem-calc(30px);
                height: rem-calc(13px);
                border-radius: rem-calc(6.5px);
                background-color: #fffbfd;
                font-size:rem-calc(10px);
                margin-top:rem-calc(-3px);
                text-align:center;
                line-height:rem-calc(13px);
                color:#ff6160;
              }
              &>div{
                width:rem-calc(55px);
                margin-top:rem-calc(3px);
                height:rem-calc(22px);
                background:url(~assets/image/teamact/tips.png) no-repeat left top;
                background-size:rem-calc(55px) rem-calc(22px);
                font-size:rem-calc(11px);
                color:#ff6160;
                padding-top:rem-calc(9px);
                text-align:center;
                box-sizing:border-box;
                margin-left:rem-calc(-15px);
              }
            } 
          }
        }
      }
    }
    &>.acttime{
      height:rem-calc(77px);
      width:92%;
      padding:0 4%;
      margin-bottom:rem-calc(30px);
      &>.discr{
        width:32%;
        float:left;
        height:rem-calc(77px);
        margin-right:2%;
        background-image:url(~assets/image/teamact/timebg.png);
        background-size:100% 100%;
        &>.time{
          height:rem-calc(17px);
          padding-top:rem-calc(16px);
          color:#fff;
          font-size:rem-calc(15px);
          text-align:center;
        }
        &>.last{
          //margin-top:rem-calc(-2px);
        }
        &>p{
          height:rem-calc(44px);
          line-height:rem-calc(40px);
          text-align:center;
          color: #a73536;
          font-size:rem-calc(14px);
          &>img{
            width:rem-calc(12px);
            height:rem-calc(12px);
          }
        }
      }
      &>.discr:last-child{
        margin-right:0;
        &>.time{
          padding-top:rem-calc(17px);
          font-size:rem-calc(13px);
        }
        &>p{
          margin-top:rem-calc(-1px);
        }
      }
    }
    &>.team{
      margin:0 auto;
      width:rem-calc(286px);
      margin-bottom:rem-calc(16px);
      //padding-top:rem-calc(2px);
      //height:rem-calc(20px);
      overflow:hidden;
      &>img{
        float:left;
        margin-top:rem-calc(4px);
        width:rem-calc(33px);
        height:rem-calc(11px);
      }
      &>.teamname{
        float:left;
        padding:rem-calc(6px) rem-calc(14px) 0;
        box-sizing:border-box;
        text-overflow:ellipsis;
        overflow:hidden;
        width:rem-calc(215px);
        white-space: nowrap;
        color:#fefeff;
        font-size: rem-calc(18px);
        text-align: center;
        height:rem-calc(26px);
        margin-top:rem-calc(-5px);
      }
    }
    &>.teambtn{
      
      box-shadow: 0px 3px 15px 0px rgba(226, 91, 24, 0.55);
      width:90%;
      margin:rem-calc(30px) auto 0;
      height: rem-calc(50px);
      color: #d53d00;
      font-size: rem-calc(20px);
      line-height:rem-calc(50px);
      text-align:center;
      border-radius: rem-calc(25px);
      letter-spacing: 2px;
      font-weight:600;
      background-image: linear-gradient(to bottom, #ffe451, #ffa701);
      box-shadow: 0px 3.5px rem-calc(15px) 0 rgba(226, 91, 24, 0.55);

    }
    &>.actru{
      margin-top:rem-calc(30px);
    }
  }
    .weui-dialog__bd>div>p{
      font-size:rem-calc(16px);
    }

</style>