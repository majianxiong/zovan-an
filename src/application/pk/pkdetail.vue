<template>
  <div id="pkdetail" ref="pkdetail" :style="{backgroundImage:'url('+ bg +')'}">
    <div class="shadow" ref="shadow" v-show="showtip">
      <img src="~assets/image/teamact/openbower.png" alt="">
    </div>
    <div class="pk-day">
      <div>
        <div class="pk-discr" :style="(status<4||status==8||status==9)?pkday2:pkday1">
          <div class="pk-time" >{{groupStartTime|timefilter5}}-{{groupEndTime|timefilter5}}</div>
          <p :style="(status<4||status==8||status==9)?{color:'#51b5c6'}:{color:'#fff'}">创建团队</p>
        </div>
        <div class="pk-discr" :style="status==6?pkday2:pkday1">
          <div class="pk-time" >{{jobStartTime|timefilter5}}-{{jobEndTime|timefilter5}}</div>
          <p :style="status==6?{color:'#51b5c6'}:{color:'#fff'}">战胜对手</p>
        </div>
        <div class="pk-discr" :style="status==4||status==5||status==10?pkday2:pkday1">
          <div class="pk-time" >保单犹豫期结束</div>
          <p :style="status==4||status==5||status==10?{color:'#51b5c6'}:{color:'#fff'}"><img :src="status==4||status==5||status==10?pkstat2:pkstat1" alt=""><span>奖励<span :style="status==4||status==5||status==10?{color:'#f3da26'}:{color:'#fff'}">{{totalAmount}}</span>元</span><img :src="status==4||status==5||status==10?pkstat2:pkstat1" alt=""></p>
        </div>
      </div>
    </div>
    <c_pkchart v-if="showchart" :friendly="friendly" :enemy="enemy" :progress="progress" v-show="status==6||status==10" class="pkchart"></c_pkchart>
    <div class="teamname" v-if="mode==2">
      <i>团队名称:</i>
      <span>
        {{title?title:""}}
      </span>
    </div>
    <div class="teammember" v-if="mode==2&&status>1">
      <div class="slide-blank">
        <div class="slide-content" :class="{'flex': sidelist.length > 3 ? false : true}">
           <div class="wodpic" v-for="(item,index) in sidelist" :key="index" :class="{'backgr':index==0 ? true : false}"> 
             <img :src="item.headImage?item.headImage:require('src/assets/image/teamact/header_picture.png')">
             <p>{{item.title?item.title:item.userName}}</p> 
           </div> 
        </div>
      </div>
    </div>
    <div class="teammem2" v-if="mode==2&&status==1">
      <div class="slide-blank">
        <div class="slide-content" :class="{'flex': sidelist.length > 3 ? false : true}">
           <div class="wodpic" v-for="(item,index) in sidelist" :key="index" :class="{'backgr':index==0 ? true : false}"> 
             <img :src="item.headImage?item.headImage:require('src/assets/image/teamact/header_picture.png')">
             <p>{{item.userName}}</p> 
           </div> 
        </div>
      </div>
      <div style="text-align:center;">
        <img src="~assets/image/pkact/ASKBTN.png" class="askbtn" v-show="showaskbtn" @click="askbtn">
        <img src="~assets/image/pkact/JOINBTN.png" class="joinbtn" v-show="showjoinbtn" @click="joinbtn">
      </div>
    </div>
    <div class="pkproduct" v-if="status>3">
      <div class="productde">
        <div class="pro1"><img :src="img1" alt="">长城人寿2款</div>
        <div class="pro2"><img :src="img2" alt="">大白定期1款</div>
      </div>
    </div>
    <div class="picture_join" v-else>
      <div class="task">
        <img src="~assets/image/pkact/pk_title2.png" alt="">
        <div class="fl" v-for="(item,index) in task" :key='index'>{{item}}:&nbsp;&nbsp;{{content[index]}}</div>
      </div>
      <div class="product">
        <img src="~assets/image/pkact/pk_title1.png" alt="">
        <img :src="img1" alt="">
        <img :src="img2" alt="">
        <p>{{product.split(" ")[0]}}</p>
        <p>{{product.split(" ")[1]}}</p>
      </div>
    </div>
    <div class="rule">
      <div class="title">
        <img src="~assets/image/pkact/pk_rule.png" alt="">
      </div>
      <ul>
        <li>
          <span>1</span>
          <p>参与者在此页面领取任务,根据任务要求自行组队,组队完成后，系统随机分配对手,在指定的时间开始PK;</p>
        </li>
        <li>
          <span>2</span>
          <p>在指定时间内到达（或超过）指定产品的保底保费目标且保费较多的团队即为获胜团队,获胜团队才能得到额外奖励金,未获胜团队,保单按照正常出单奖励,若双方保费相同且超过保底保费目标,双方平分额外奖励</p>
        </li>
        <li>
          <span>3</span>
          <p>获胜团队奖励根据团队成员标准保费贡献按比例分配;</p>
        </li>
        <li>
          <span>4</span>
          <p>团队成员必须是保啊的签约用户;</p>
        </li>
        <li>
          <span>5</span>
          <p>任务奖金将在保单全部过犹豫期后发放至保啊账户上;</p>
        </li>
        <li>
          <span>6</span>
          <p>此活动最终解释权归保啊所有;</p>
        </li>
      </ul>
      <div class="footer">
        <img src="~assets/image/pkact/pk_footer.jpg" alt="">
      </div>
    </div>
  </div>
</template>
<script>
  import cookie from 'src/widget/plugin/cookie'
  import store from 'src/widget/plugin/store.js'
  import c_pkchart from 'src/components/service/pkchart'
  import { wechatSignApi, joinTeam, getTeamDetail, getActivity,getTeamList,myTaskApi} from "src/api"
  let userId = cookie.get('http_userID')?cookie.get('http_userID'):""//56//51127
  let token = cookie.get('http_usertoken')?cookie.get('http_usertoken'):""//"27_38e0e7cc371bf1420e5cadfdca6976b4"
  export default {
    name:"PkDetail",
    data(){
      return{
        pic:require("src/assets/image/pkact/pkstatus5-1.jpg"),
        status:1,//1.团战发起 2组团成功，3//组团失败 //6团战中  4 任务成功 5.任务失败 8匹配对手失败  9等待任务 10 待确认
        showtip:false,//微信蒙层
        pkday1:{backgroundImage:'url('+require("src/assets/image/pkact/pk-day1.png")+')'},
        pkday2:{backgroundImage:'url('+require("src/assets/image/pkact/pk-day2.png")+')'},
        pkstat1:require("src/assets/image/pkact/pkstar1.png"),
        pkstat2:require("src/assets/image/pkact/pkstar2.png"),
        friendly:{money:'65000',title:'我方队名我发队名'},
        enemy:{money:'52000',title:'对方队名对方对名'},
        groupEndTime:0,
        groupStartTime:0,
        jobStartTime:0,
        jobEndTime:0,
        nowTime:0,
        progress:{day:20,today:4},
        showchart:false,
        showaskbtn:false,
        showjoinbtn:false,
        title:"",
        totalTeam:1,
        groupTeam:1,
        teamPerson:1,
        isLeader:false,
        inteam:false,
        totalAmount:0,//任务奖金
        mode:1,//pk模式，单人是1，组队是2
        complete:20000,//完成的保费
        targetPremium:50000,//需要完成的总计保费
        task:['任务名称','任务奖金','保底保费','团队人数'],
        content:['华山论剑','500元','50000元','1人'],
        img1:require('src/assets/image/pkact/pk_cc.png'),
        img2:require('src/assets/image/pkact/pk_db.png'),
        sidelist:[{headImage:require("src/assets/image/usercenter/touxiang.png"),userName:"哈哈哈"}],
        product:""
      }
    },
    components:{
      c_pkchart
    },
    created(){
      if(this.$route.query.activityId==2){
        this.mode = 1
      }else{
        this.mode = 2
      }
      this.getActivity()
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
      //this.$refs.pkdetail.style.backgroundImage = "url("+this.pic+")"
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
              activityId: this.$route.query.activityId,
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
              console.log(err);
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
        //this.getData();
        //let userType = cookie.get('http_userType');
        this.jsbridge.shareConfig({
          img:'http://pkufi-perftest.zhongan.io/static/pic/teampk.png',
          title:'我正在参加PK大战，诚邀你来参加！',
          desc:'自行组队，随机分配对手，完胜对手即可获得额外奖励！',
          link:window.location.href
        })
      },
      getpkdata(){
        this.axios.post(myTaskApi,{
          activityId:this.$route.query.activityId,
          userId
        }).then(res=>{
          if(res.data&&res.data.data){
            let data =res.data&&res.data.data[0];
            console.log(res);
            this.targetPremium = data.activityVOList.targetPremium;
            this.friendly = data.activityTeamResultVO;
            this.friendly.money = this.friendly.totalPremium - this.friendly.invalidPremium
            this.enemy = data.otherActivityTeamResultVO
            this.enemy.money = this.enemy.totalPremium - this.enemy.invalidPremium;
            this.progress =data.activityVOList;
            this.progress.today =res.data.date-this.progress.jobStartTime;
            this.progress.day = this.progress.jobEndTime - this.progress.jobStartTime;
            console.log(this.progress.day)
            console.log(this.progress.today)
            this.showchart = true;
          }
        }).catch(err=>{
          console.log(err)
          this.$vux.toast.show({
            text: "系统异常",
            type: 'text',
            width: '80%'
          });
        })
      },
      getActivity(){
        let url = getActivity + this.$route.query.activityId
        this.axios.get(url)
        .then(res=>{
          console.log(res,1111)
          this.teamPerson = res.data.data.teamPerson;
          this.totalAmount = res.data.data.totalAmount;
          this.groupTeam = res.data.data.groupTeam;
          this.totalTeam = res.data.data.totalTeam;
          this.groupStartTime = res.data.data.groupStartTime
          this.groupEndTime = res.data.data.groupEndTime;
          this.jobStartTime = res.data.data.jobStartTime
          this.jobEndTime = res.data.data.jobEndTime;
          this.targetPremium = res.data.data.targetPremium;
          this.product = res.data.data.product;
          console.log(this.product)
          this.getData();
        }).catch(err=>{
          console.log(err)
          this.$vux.toast.show({
            text: "系统异常",
            type: 'text',
            width: '80%'
          }); 
        })
      },
      getteamuser(){
        if(this.mode == 1){
          this.showaskbtn = false;
          this.showjoinbtn = false;
        }else{
          this.axios.post(getTeamDetail,{
            activityTeamId: this.$route.query.id,
            userId
          }).then(res=>{
            if(res.data&&res.data.data.activityTeamUserResultVOList){
              this.inteam = true;
              this.showjoinbtn =false;
              if(res.data.data.activityTeamUserResultVOList[0].isLeader){
                //if()
                this.isLeader = true;
                this.showaskbtn = true;
              }else{
                this.isLeader = false;
                this.showaskbtn = false;
              }
            }else{
              console.log(222222)
              this.inteam = false;
              this.showjoinbtn = true;
              this.showaskbtn = false;
            }
          }).catch(err=>{
            console.log(err)
            this.$vux.toast.show({
              text: "系统异常",
              type: 'text',
              width: '80%'
            });
          })
        }
      },
      getData(){
        this.axios.post(getTeamDetail,{
          activityTeamId: this.$route.query.id
        })
        .then(res=>{
          let data = res.data&&res.data.data;
          console.log(data);
          this.title = data.activityTeamResultVO.title?data.activityTeamResultVO.title:"";
          this.status = data.activityTeamResultVO.teamStatus
          this.complete = (data.activityTeamResultVO.totalPremium?data.activityTeamResultVO.totalPremium:0) - (data.activityTeamResultVO.invalidPremium?data.activityTeamResultVO.invalidPremium:0);
          this.sidelist = data.activityTeamUserResultVOList;
          this.content = ['华山论剑',this.totalAmount+'元',this.targetPremium+'元',this.teamPerson+'人']
          if((this.uaDetector && this.uaDetector.inWechatt)||!token){
            if(this.totalTeam<=this.groupTeam){
              this.$vux.alert.show({
                content: "<p style='color:#333333;'>您来晚了<br/>活动已满团，不能参加咯！</p>",
                buttonText:"我知道了"
              })
              this.showjoinbtn = false;
              this.showaskbtn = false;
            }else{
              if(res.data.date>this.groupEndTime){
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
            }
            if(this.status==1){
              this.getteamuser();
            }else if(this.status==6||this.status==10){
              this.getpkdata();
            }
          }
        }).catch(err=>{
          console.log(err)
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
          if(this.mode==1){
            this.setTitle('待分配对手')
            return require("src/assets/image/pkact/pkstatus1-1.jpg")
          }else{
            this.setTitle('PK邀请')
            if(this.isLeader){
              return require("src/assets/image/pkact/pkstatus1-2.jpg")
            }else{
              if(this.inteam){
                return require("src/assets/image/pkact/joinsuc.jpg")
              }else{
                return require("src/assets/image/pkact/pkstatus1-2.jpg")
              }
            }
          }
        }else if(this.status==2){
          this.setTitle('待分配对手')
          if(this.mode==1){
            return require("src/assets/image/pkact/pkstatus1-1.jpg")
          }else{
            return require("src/assets/image/pkact/pkstatus2.jpg")
          }
        }else if(this.status==3){
          this.setTitle('组团失败')
          if(this.mode==1){
          }else{
            return require("src/assets/image/pkact/pkstatus3.jpg")
          }
        }else if(this.status==4){
            this.setTitle('pk获胜')
          if(this.mode==1){
            return require("src/assets/image/pkact/pkstatus4-1.jpg")
          }else{
            return require("src/assets/image/pkact/pkstatus4-2.jpg")
          }
        }else if(this.status==5){
          this.setTitle('pk失败')
          if(this.mode==1){
            return require("src/assets/image/pkact/pkstatus5-1.jpg")
          }else{
            return require("src/assets/image/pkact/pkstatus5-2.jpg")
          }
        }else if(this.status==6){
            this.setTitle('pk对战')
            return require("src/assets/image/pkact/pkstatus6.jpg")
        }else if(this.status==8){
          this.setTitle('无人挑战')
          return require("src/assets/image/pkact/pkstatus7-1.jpg")
        }else if(this.status==9){
          this.setTitle('等待任务开始')
          return require("src/assets/image/pkact/pkstatus9.jpg")
        }else if(this.status==10){
          if(this.mode==1){
            if(this.friendly.money>this.enemy.money){
              return require("src/assets/image/pkact/pkstatus6-1-2.jpg")
            }else{
              return require("src/assets/image/pkact/pkstatus6-1-1.jpg")
            }
          }else{
             if(this.friendly.money>this.enemy.money){
              return require("src/assets/image/pkact/pkstatus6-2-2.jpg")
            }else{
              return require("src/assets/image/pkact/pkstatus6-1-1.jpg")
            } 
          }
        }
      },
    }
  }
</script>
<style lang='scss' rel="stylesheet/scss">
@import '~src/assets/scss/function';
  #pkdetail{
    width:100%;
    min-height:100%;
    background-color: rgb(25, 42, 98);
    background-size:100% rem-calc(433px);
    background-repeat:no-repeat;
    background-position:left top;
    -webkit-text-stroke-width:0.5px;
    -webkit-text-stroke-color:#11255a;
    &>.shadow{
      background-color: rgb(0, 0, 0);
      opacity: 0.85;
      position:fixed;
      top:0;
      right:0;
      left:0;
      bottom:0;
      z-index:3;
      &>img{
        width:rem-calc(224px);
        height:rem-calc(110px);
        position:absolute;
        z-index:999;
        right:rem-calc(18px);
      }
    }
    &>.pk-day{
      padding-top:rem-calc(180px);
      font-size:0;
      margin-bottom:rem-calc(25px);
      display:flex;
      justify-content:space-around;
      &>div{
        &>.pk-discr{
          width:rem-calc(102px);
          margin-right:rem-calc(8px);
          height:rem-calc(72.5px);
          background-size:100% 100%;
          display:inline-block;
          color:#fff;
          font-weight:600;
          -webkit-text-stroke-width:0.5px;
          -webkit-text-stroke-color:#11255a;
          &>.pk-time{
            padding-top:rem-calc(18px);
            height:rem-calc(22px);
            text-align:center;
            font-size:rem-calc(16px);
          }
          &>p{
            line-height:rem-calc(31px);
            text-align:center;
            font-size:rem-calc(14px);
            padding-top:rem-calc(2px);
          }
        }
        &>.pk-discr:last-child{
          width:auto;
          margin-right:0;
          &>.pk-time{
            padding-top:rem-calc(19px);
            font-size:rem-calc(13px);
          }
          &>p{
            margin-top:rem-calc(-1px);
            vertical-align: middle;
            line-height:rem-calc(31px);
            &>img{
              vertical-align: middle;
            }
            &>span{
              padding:0 3px;
            }
          }
        }
      }
    }
    &>.teamname{
      padding:0 0 rem-calc(16px) rem-calc(48px);
      color:#fff;
      font-size:rem-calc(18px);
      font-weight:600;
      overflow:visible;
      height:rem-calc(24px);
      &>i{
        display:inline-block;
        overflow:hidden;
        font-style:normal;
        height:rem-calc(24px);
        padding-top:rem-calc(2px);
      }
      &>span{
        color:#f3da26;
        display:inline-block;
        width:rem-calc(100px);
        height:rem-calc(24px);
        text-overflow:ellipsis;
        overflow:hidden;
        white-space: nowrap;
        padding-top:rem-calc(2px);
      }
    }
    &>.teammember,&>.teammem2{
      height:rem-calc(149px);
      background:url(~assets/image/pkact/teammember.png) no-repeat left center;
      background-size:100% 100%;
      margin-bottom:rem-calc(30px);
      ::-webkit-scrollbar{
        width:0;
        height:0;
      }
      .flex{
        display:flex;
        flex-flow: row nowrap;
        justify-content: space-around;
      }
      .backgr{
        background:url(~assets/image/teamact/icon_crown.png) rem-calc(45px) rem-calc(10px) no-repeat;
      }
      .slide-blank{
        //background-image: linear-gradient(34deg, #ff8238, #fe9538);
        //box-shadow: 0px 3px 10px 0px rgba(237, 97, 12, 0.26);
        padding-left:rem-calc(52px);
        padding-right:rem-calc(56px);
        .slide-content{
          overflow-y:hidden;
          overflow-x:auto;
          white-space: nowrap;
          min-width: 100%;
          &>.wodpic{
            display:inline-block;
            margin-left:rem-calc(15px);
            width:22%;
            margin-top:rem-calc(40px);
            & img{
              margin-top:rem-calc(13px);
              border-radius:50%;
              width:rem-calc(50px);
              height:rem-calc(50px);
              border:rem-calc(1.5px) solid #333;
            }
            & p{
              font-size:rem-calc(13px);
              text-align:center;
              color:#fff;
              width:rem-calc(80px);
              padding-top:rem-calc(8px);
              margin-left:rem-calc(-12px);
              overflow:hidden;
              white-space:nowrap;
              word-break: keep-all;
              word-wrap: normal;
              text-overflow: ellipsis;
              -webkit-text-overflow: ellipsis;
              font-weight:600;

            }
          }
          &>.wodpic:first-child{
            margin-left:0;
          }
        }
      }
    }
    .teammem2{
      height:rem-calc(201px);
      background:url(~assets/image/pkact/teammem2.png) no-repeat left top;
      background-size:100% 100%;
      &>div>.askbtn,&>div>.joinbtn{
        margin-top:rem-calc(10px);
        height:rem-calc(44px);
        margin-left:rem-calc(-5px);
      }
    }
    &>.pkproduct{
      height:rem-calc(248px);
      background:url(~assets/image/pkact/pkproduct.jpg) no-repeat left top;
      background-size:100% 100%;
      overflow:hidden;
      &>.productde{
        width:rem-calc(250px);
        margin:rem-calc(93px) auto 0;
        display:flex;
        justify-content:space-between;
        &>.pro1,.pro2{
          width:rem-calc(113px);
          height:rem-calc(128px);
          text-align:center;
          -webkit-text-stroke-width:0.5px;
          -webkit-text-stroke-color:#11255a;
          color:#fff;
          font-size:rem-calc(15px);
          &>img{
            border:rem-calc(1.5px) solid #333;  
            height:rem-calc(102px);
            width:100%;
            margin-bottom:rem-calc(9px);
          }
        }
      }
    }
    &>.picture_join{
      width:100%;
      background:url(~assets/image/pkact/jointask.jpg) no-repeat left top;
      background-size:100% 100%;
      padding-top:rem-calc(52px);
      height:rem-calc(311px);
      overflow:hidden;
      &>.task{
        width:100%;
        height:rem-calc(100px);
        overflow:hidden;
        img{
          width:rem-calc(107px);
          display:block;
          margin:0 auto rem-calc(18px);
        }
        div{
          width:50%;
          line-height:rem-calc(20px);
          font-size: rem-calc(13px);
          color: rgb(17, 37, 90);
        }
        div:nth-child(even){
          text-indent:rem-calc(50px);
        }
      }
      &>.product{
        padding-top:rem-calc(15px);
        width:100%;
        height:rem-calc(200px);
        position:relative;
        &>img:nth-child(1){
          width:rem-calc(107px);
          display:block;
          margin:0 auto;
        }
        img:nth-child(2){
          width:rem-calc(111px);
          height:rem-calc(99px);
          position:absolute;
          top:rem-calc(53px);
          left:rem-calc(61px);
          border:rem-calc(1.5px) solid #333;
        }
        img:nth-child(3){
          height:rem-calc(100px);
          width:rem-calc(112px);
          position:absolute;
          top:rem-calc(53px);
          left:rem-calc(196px);
          border:rem-calc(1.5px) solid #333;
        }
        p:nth-child(4){
          position:absolute;
          top:rem-calc(160px);
          left:rem-calc(61px);
          font-size:rem-calc(13px);
          width:rem-calc(111px);
          color: rgb(255, 255, 255);
          font-weight:bolder;
          text-align:center;
          -webkit-text-stroke-width:0.5px;
          -webkit-text-stroke-color:#11255a;
        }
        p:nth-child(5){
          position:absolute;
          top:rem-calc(160px);
          left:rem-calc(196px);
          font-size:rem-calc(13px);
          width:rem-calc(112px);
          text-align:center;
          color: rgb(255, 255, 255);
          font-weight:bolder;
          -webkit-text-stroke-width:0.5px;
          -webkit-text-stroke-color:#11255a;
        }
      }
    }
    &>.rule{
      background:#192a62;
      width:100%;
      min-height:rem-calc(100px);
      padding-top:rem-calc(15px);
      .title{
        position:relative;
        margin:15px auto 10px;
        width:rem-calc(102px);
        img{
          width:rem-calc(102px);
        }
        &:before{
          content:' ';
          position:absolute;
          box-sizing:border-box;
          top:rem-calc(8px);
          left:rem-calc(-105px);
          display:inline-block;
          background-color: rgb(255, 255, 255);
          opacity: 0.4;
          width:rem-calc(88px);
          height: 1px;
          border-top:1px solid #ccc;
        }
        &:after{
          content:' ';
          position:absolute;
          box-sizing:border-box;
          top:rem-calc(8px);
          display:inline-block;
          background-color: rgb(255, 255, 255);
          opacity: 0.4;
          width:rem-calc(88px);
          height: 1px;
          border-top:1px solid #ccc;
          left:rem-calc(120px);
        }
      }
      &>ul{
        padding:rem-calc(0 30px);
        &>li{
          overflow:hidden;
          &>span{
            margin-top:rem-calc(10px);
            text-align:center;
            float:left;
            width:rem-calc(14px);
            height:rem-calc(15px);
            border-radius:50%;
            background:#d9326d;
            line-height:rem-calc(18px);
            font-size:rem-calc(12px);
            color:#192a62;
          }
          &>p{
            margin-top:rem-calc(8px);
            font-family: "PingFangHK";
            margin-left:rem-calc(8px);
            width:rem-calc(290px);
            float:left;
            font-size:rem-calc(13px);
            color: rgb(173, 199, 233);
            line-height:rem-calc(17px);
            text-align: left;
            letter-spacing:rem-calc(1px);
          }
        }
        &>li:nth-child(2) span{
          background:#f15d97;
        }
        &>li:nth-child(3) span{
          background:#d3c34c;
        }
        &>li:nth-child(4) span{
          background:#25c0c5;
        }
        &>li:nth-child(5) span{
          background:#55cef6;
        }
        &>li:nth-child(6) span{
          background:#8d8df2;
        }
      }
      .footer{
        margin-top:rem-calc(35px);
        img{
          width:100%;
        }
      }
    }
    .pkchart{
      margin-bottom:rem-calc(20px);
    }
  }
</style>