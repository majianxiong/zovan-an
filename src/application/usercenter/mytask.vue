<template>
  <div id="mytask">
    <ul class="tasklist">
      <li v-for="(item,i) in tasklist" :key="i" @click="gonext(item)">
        <img :src="img(item)" alt="">
        <p>{{item.activityTeamResultVO.title}}</br><span>约{{item.activityId==1?(~~(item.activityVOList.totalAmount/item.activityVOList.totalTeam)):item.activityVOList.totalAmount}}元/任务</span></p>
        <span>{{status(item)}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
  import {myTaskApi} from 'src/api/index.js'
  import cookie from 'src/widget/plugin/cookie'
  let userId = cookie.get('http_userID')?cookie.get('http_userID'):""//56//51
  export default {
    name:"MyTask",
    data(){
      return{
        tasklist:[],
      }
    },
    created(){
      this.getData()
    },
    methods:{
      getData(){
        this.axios.post(myTaskApi,{
          userId
        }).then(res=>{
          console.log(res)
          if(res.data&&res.data.data){
            let data =res.data&&res.data.data;
            this.tasklist = data;
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
      gonext(item){
        if(item.activityTeamResultVO.activityId==1){
          this.$router.push({path:"teamdetail",query:{id:item.activityTeamResultVO.id,activityId:item.activityTeamResultVO.activityId}})
        }else{
          this.$router.push({path:"pkdetail",query:{id:item.activityTeamResultVO.id,activityId:item.activityTeamResultVO.activityId}})
        }
      },
      status(item){
        if(item.activityTeamResultVO.teamStatus==1){
          return "组队中"
        }else if(item.activityTeamResultVO.teamStatus==2){
          if(item.activityTeamResultVO.activityId==1){
            return "组队成功"
          }else{
            return "等待对手"
          }
        }else if(item.activityTeamResultVO.teamStatus==3){
          return "组队失败"
        }else if(item.activityTeamResultVO.teamStatus==4){
          return "任务成功"
        }else if(item.activityTeamResultVO.teamStatus==5){
          return "任务失败"
        }else if(item.activityTeamResultVO.teamStatus==6){
          return "任务进行中"
        }else if(item.activityTeamResultVO.teamStatus==8){
          return "匹配失败"
        }else if(item.activityTeamResultVO.teamStatus==9){
          return "待开始"
        }else if(item.activityTeamResultVO.teamStatus==10){
          return "待确认"
        }
      },
      img(item){
        if(item.activityTeamResultVO.activityId==1){
          return require("src/assets/image/usercenter/teamact.png")
        }else{
          return require("src/assets/image/usercenter/pkact.png")
        }
      }
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss'>
  @import '~src/assets/scss/function';
  #mytask{
    width:100%;
    min-height:100%;
    background:#f6f6f6;
    &>.tasklist{
      padding:0 rem-calc(15px);
      background:#fff;
      &>li{
        height:rem-calc(75px);
        position:relative;
        &>img{
          float:left;
          margin-top:rem-calc(13px);
          width:rem-calc(48px);
          height:rem-calc(48px);
          border-radius:rem-calc(24px);
        }
        &>p{
          margin-top:rem-calc(20px);
          color:#333;
          float:left;
          font-size:rem-calc(15px);
          margin-left:rem-calc(14px);
          &>span{
            font-size:rem-calc(13px);
            display:inline-block;
            padding-top:rem-calc(5px);
            color:#666;
          }
        }
        &>span{
          float:right;
          margin-right:rem-calc(15px);
          height:rem-calc(25px);
          padding:0 rem-calc(8px);
          background:#e5f8f4;
          color:#00bd96;
          border-radius:rem-calc(12.5px);
          line-height:rem-calc(26px);
          text-align:center;
          margin-top:rem-calc(25px);
        }
      }
      &>li:after{
        content: " ";
        display: inline-block;
        height: 8px;
        width: 8px;
        border-width: 1px 1px 0 0;
        border-color: #ccc;
        border-style: solid;
        -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        position: absolute;
        top: 50%;
        margin-top: -4px;
        right: 0;
      }
    }
  }
</style>