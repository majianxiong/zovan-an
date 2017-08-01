<template>
  <div id="teamactivity">
    <div class="head">
      <img :src="bg" alt="">
    </div>
    <div class="acttime">
      <div class="discr">
        <div class="time" >{{groupStartTime|timefilter5}}-{{groupendtime|timefilter5}}</div>
        <p>三人成团</p>
      </div>
      <div class="discr">
        <div class="time">{{jobStartTime|timefilter5}}-{{taskendtime|timefilter5}}</div>
        <p>完成团战目标</p>
      </div>
      <div class="discr">
        <div class="time">保单犹豫期结束</div>
        <p><img src="~assets/image/teamact/star.png" alt="">奖励{{bonus}}元<img src="~assets/image/teamact/star.png" alt=""></p>
      </div>
    </div>
    <!--三个按钮  -->
    <div class="threebtn">
      <div class="teambtn battlstart" v-if="btnshow==1" @click.stop="showalert">
        {{btntext}}
      </div>
      <div class="battling" v-if="btnshow==2">
          <img src="~assets/image/teamact/icon_hourglass.png" alt=""> 
      </div>
      <div class="battlend" v-if="btnshow==3">
          <img src="~assets/image/teamact/icon_bell.png" alt="">    
      </div>
    </div>
    <div class="team" v-show="slidershow">
      <img src="~assets/image/teamact/bolang.png" alt="">
      <span class="teamname">
        已成团
      </span>
      <img src="~assets/image/teamact/bolang.png" alt="">
    </div>
    <c_teamslider :list='list' class="havespace" v-show="slidershow" @godetail='godetails' :canclick="canclick"></c_teamslider>
    <c_actrule :context="context"></c_actrule>
    <div class="cover" v-if="covershow">
      <div class="confirm">
        <div v-if="!getnameshow" class="gosign">
            此活动仅限签约用户<br>参与，您还未签约
        </div>
        <div class="top" v-if="getnameshow">
          <p class="title">给你的团队取个吊炸天的名字吧</p>
          <input type="text" placeholder="3-10个字长度的团队名称" maxlength='10' minlength='3' required ref="input">
        </div>
        <div class="bottom">
          <span v-tap="{methods:closecover}">取消</span>  
          <span v-tap="{methods:()=>{texts=='确定'? namesuccess() : gotosign()}}">{{texts}}</span>  
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import c_actrule from 'src/components/service/actrule'
  import c_teamslider from 'src/components/service/teamslider'
  import cookie from 'src/widget/plugin/cookie'
  import store from 'src/widget/plugin/store.js'
  import {createTeam,getActivity,teamList,getTeamList,getTeamDetail} from 'src/api'
  let userId = cookie.get('http_userID')?cookie.get('http_userID'):""
  // let userId = 102
  let userType = cookie.get('http_userType')?cookie.get('http_userType'):""
  // let userType = 1
  let pageNum = 1
  let pageSize = 10000
  export default {
    name:"teamactivity",
    data(){
      return{
        activityStatus:2,
        taskendtime:0,
        groupendtime:0,
        jobStartTime:0,
        groupStartTime:0,
        bonus:500,
        notime:true,
        canCreateTeam:true,
        totalTeam:0,
        activityId:1,
        canclick:false,
        isteam:false,
        slidershow:false,
        bg:require("src/assets/image/teamact/top_img1.png"),
        btntext:"组团去挑战",
        texts:'确定',
        btnshow:1,
        covershow:false,
        getnameshow:true,
        list:[],
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
    methods:{
      godetails(){
          let userId = cookie.get('http_userID')
          this.axios.post(getTeamList+'?pageNum='+pageNum+'&pageSize='+pageSize,{activityId: this.activityId,userId:userId}).then(res=>{
            this.$router.push({path:'teamdetail',query:{id:res.data.data.list[0].activityTeamId,activityId:res.data.data.list[0].activityId}})
            console.log(res.data.data.list[0].activityTeamId)
            console.log(res)
          }).catch(err=>{
            this.$vux.toast.show({
              text: "系统异常",
              type: 'text',
              width: '80%'
            })
          })
      },
      closecover(){
        this.covershow = false
      },
      showalert(){
        let userId = cookie.get('http_userID')
        let userType = cookie.get('http_userType')
        this.getstartdata()
        if(this.activityStatus == 1){
          this.$vux.toast.show({
            type:"text",
            text:"活动未上架"
          })
        }else if(this.activityStatus == 3){
          this.$vux.toast.show({
            type:"text",
            text:"活动已下架"
          })
        }else{
          if(this.notime == false){
            this.$vux.toast.show({
              type:"text",
              text:"活动还未开始"
            })
            this.covershow = false
          }else{
            if(this.canCreateTeam==false){
              this.$vux.toast.show({
                type:'text',
                text:'你来晚啦！活动已满团，不能参加咯！'
              })
            }else{
              if(userId==undefined){
                this.$vux.toast.show({
                  type:'text',
                  text:'你还没有账号'
                })
                this.canclick = false
                console.log('没账号')
              }else{
                if(this.isteam == false){
                  this.covershow = true
                  if(userType==1){
                    this.getnameshow = true
                    this.texts = '确定'
                  }else{
                    this.getnameshow = false
                    this.texts = '去签约'
                  }
                }else{
                  this.slidershow = true
                  this.$vux.toast.show({
                    type:'text',
                    text:'你已加入其他团，不能重复参团哦'
                  })
                }
              }
            }
          }
        }
      },
      namesuccess(){
        let userId = cookie.get('http_userID')
        let name = this.$refs.input.value 
        let names = name.replace(/\s/g, "")
        if(names.length<3){
          this.$vux.toast.show({
            type:'text',
            text:'请输入3-10个字长度的团队名称',
          })
        }else{
          // 建团
          this.axios.post(createTeam,{activityId: this.activityId,userId:userId,title:name})
          .then(res=>{
            console.log(res)
             if(res.data.status == "SUCCESS"){
               this.covershow = false
              this.$router.push({path:'teamdetail',query:{id:res.data.data.id,activityId:res.data.data.activityId}})
             }else{
               this.$vux.toast.show({
                 text:res.data.message,
                 type:'text'
               })
             }
          }).catch(err=>{
             console.log(err)
          })
        }
      },
      gotosign(){
        // console.log('去签约')
        let routerpath = window.location.href.split("#")[1];
        store.set("routerpath",routerpath);
        this.$router.push('electronicsign')
      },
      getstartdata(){
        let userId = cookie.get('http_userID')
          if(userId == undefined){
            this.canclick == false
            return
          }else{
            this.axios.get(getActivity + this.activityId).then(res=>{
              console.log(res)
              if(res.data.data){
                //res.data.data.activityStatus //1  3 
                // res.data.date 发送请求的时间
                // res.data.data.endTime 活动结束时间
                // res.data.data.groupEndTime  组团结束时间，活动开始时间
                // res.data.data.totalTeam
                this.activityStatus = res.data.data.activityStatus
                this.bonus = res.data.data.totalAmount  //奖金
                this.groupStartTime = res.data.data.groupStartTime
                this.groupendtime = res.data.data.groupEndTime
                this.jobStartTime = res.data.data.jobStartTime
                this.taskendtime = res.data.data.jobEndTime
                this.context[0].detail=[{text:"组团时间："+ new Date(this.groupStartTime).Format("yyyy年MM月dd日")+"—"+new Date(this.groupendtime).Format("yyyy年MM月dd日")},{text:"团战时间："+ new Date(this.jobStartTime).Format("yyyy年MM月dd日")+"—"+new Date(this.taskendtime).Format("yyyy年MM月dd日")}]
                if(res.data.date > res.data.data.groupEndTime){
                    if(res.data.date < res.data.data.jobEndTime){
                      this.btnshow = 2
                    }else{
                      this.btnshow = 3
                      this.setTitle('7.7团战活动结束')
                    }
                }else{
                  this.btnshow = 1
                  if(res.data.date > res.data.data.groupStartTime){
                    this.notime = true
                    if(res.data.data.groupTeam < res.data.data.totalTeam){
                      this.canCreateTeam = true
                    }else{
                      this.canCreateTeam = false
                    }
                  }else{
                    this.canCreateTeam = false
                    this.notime = false
                  }
                }
              } 
            }).catch(err=>{
                console.log(err)
            })
        }
      },
    },
    created(){
      //展示最初的状态
      this.getstartdata()
        // 展示团，判断是否有团 
      this.axios.post(teamList,{activityId:this.activityId})
      .then(res=>{
          // 有团展示，没有不展示
          console.log(res)
          if(res.data.data == null){
            console.log(res.data.message)
          }else{
            let lists = res.data.data
            console.log('团的总数'+lists.length)
            if(lists.length == 0){
              this.slidershow = false
            }else{
                // 把自己的团放在第一位  
                // 判断是否已经在团里 根据userId查自己的团  
                console.log(userId)
                this.axios.post(getTeamDetail,{activityId: this.activityId,userId:userId})
                .then(res=>{
                  console.log(res)
                  // if()
                  if(res.data.data.activityTeamUserResultVOList == null){
                    this.isteam = false   //不在团里
                    this.list = lists
                    this.slidershow = true
                    console.log('没参团')
                  }else{
                    console.log('已参团')
                    this.isteam = true    //已经在团里
                    // console.log(res.data.data[0].id)
                    let teamId = res.data.data.activityTeamUserResultVOList[0].activityTeamId
                    console.log(teamId)
                    // 自己的团放在第一个
                    let chooseIndex;
                    lists.forEach((item,index,arr)=>{
                      if(item.id == teamId){   
                        chooseIndex = index
                      }
                    })
                    console.log(chooseIndex)
                    let chooseItem = lists.splice(chooseIndex,1)
                    this.list = chooseItem.concat(lists)
                    this.slidershow = true
                    this.canclick = true
                  }
                }).catch(err=>{
                  console.log(err)
                })
            }
          }
      }).catch(err=>{
          console.log(err)
      })
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss'>
  @import '~src/assets/scss/function';
  #teamactivity{
    width:100%;
    min-height:100%;
    background-image: -webkit-linear-gradient( 90deg, rgb(255,184,72) 0%, rgb(250,111,42) 70%);
    &>.head{
      height:rem-calc(380px);
      position:relative;
      width:100%;
      &>img{
        height:100%;
        width:100%;
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
        &>p{
          height:rem-calc(44px);
          line-height:rem-calc(40px);
          text-align:center;
          color: #a73536;
          font-size:rem-calc(14px);
          &>img{
            width:rem-calc(12px);
            height:rem-calc(12px);
            // margin:0 rem-calc(-1px);
          }
        }
      }
      &>.discr:last-child{
        margin-right:0;
        &>.time{
          padding-top:rem-calc(18px);
          font-size:rem-calc(13px);
        }
        &>p{
          margin-top:rem-calc(-2px);
        }
      }
    }
    &>.team{
      text-align:center;
      padding-bottom:rem-calc(10px);
      margin:rem-calc(30px) auto rem-calc(20px);
      overflow: hidden;
      width:rem-calc(286px);
      &>img{
        margin-top:rem-calc(-5px);
        width:rem-calc(33px);
        height:rem-calc(11px);
        vertical-align:middle;
      }
      &>.teamname{
        line-height:rem-calc(30px);
        padding:rem-calc(0 15px 0);
        box-sizing:border-box;
        overflow: hidden;
        text-overflow:ellipsis;
        width:rem-calc(215px);
        white-space: nowrap;
        color:#fefeff;
        font-size: rem-calc(18px);
        height:rem-calc(20px);
        text-align: center;
      }
    }
    &>.threebtn{
      &>.teambtn{
        box-shadow: 0px 3px 15px 0px rgba(226, 91, 24, 0.55);
        width:90%;
        margin:rem-calc(30px) auto rem-calc(23px);
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
      &>.battling{
        width:64%;
        margin: rem-calc(20px) auto;
        img{
          width:100%;
          height:100%;
        }
      }
      &>.battlend{
        width:79%;
        margin: rem-calc(20px) auto;
        img{
          width:100%;
          height:100%;
        }
      }
    }
    .havespace{
      margin-bottom:rem-calc(30px);
    }
    .cover{
      display:flex;
      width:100%;
      height:100%;
      position:fixed;
      top:0;
      left:0;
      background:rgba(0,0,0,0.5);
      padding-top:rem-calc(150px);
      &>.confirm{
        align-items:center;
        border-radius: rem-calc(10px);
        margin:0 auto;
        background:#ffffff;
        width:76%;
        height:rem-calc(145px);
        &>.gosign{
          padding: rem-calc(20px 0 10px 0);
          text-align:center;
          line-height:rem-calc(28px);
          font-size: rem-calc(18px);
          color: rgb(51, 51, 51);
        }
        &>.top{
          padding:rem-calc(15px 13px);
          &>p{
            letter-spacing: rem-calc(1px);
            font-size:rem-calc(14px);
            color:#333333;
          }
          &>input{
            outline:none;
            -webkit-appearance: none;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            text-indent: 1rem;
            margin-top:rem-calc(8px);
            height:rem-calc(35px);
            width:100%;
            border-radius:0;
          }
        }
        &>.bottom{
          margin-top:rem-calc(8px);
          @include bordertop-1px(#f6f6f6);
          overflow: hidden;
          &>span{
            float:left;
            width:50%;
            text-align:center;
            line-height:30px;
            font-size: rem-calc(18px);
            color: rgb(0, 189, 150);
            line-height: 3.5rem;
          }
          &>span:last-child{
            box-sizing:border-box;
            border-left:1px solid #f6f6f6;
          }
        }
      }
    }
  }
    .weui-dialog__bd>div>p{
      font-size:rem-calc(16px);
    }

</style>