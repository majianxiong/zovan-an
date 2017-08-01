<template>
  <div id="myfriend">
    <!--<div class="friend_tip">仅好友首单才可获得奖励</div>-->
    <!--<c_headbar :content="content"></c_headbar>-->
    <div id="headbar">
    <div class="bor">
      <div>{{content.firval}}</div>
      <p>{{content.firtip}}</p>
    </div>
    <div class="bor">
      <div>{{content.secval}}</div>
      <p>{{content.sectip}}</p>
    </div>
    <!--<div>
      <div>{{content.thrval}}</div>
      <p>{{content.thrtip}}</p>
    </div>-->
  </div>
    <ul class="friend_list">
      <li v-for="item in list">
        <div class="f_name fl">
            <div>{{item.userName}}</div>
            <div>{{item.loginName}}</div> 
        </div>
        <div class="f_detail">
          <span>出单件数<i>{{item.issueCount}}</i></span>
          <!--<span>奖励<i>{{item.rewardAmount}}</i></span>-->
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import c_headbar from 'src/components/service/headbar'
  import {myFriendApi} from 'src/api/index.js'
  import cookie from 'src/widget/plugin/cookie'
  let token = cookie.get('http_usertoken')//"27_38e0e7cc371bf1420e5cadfdca6976b4"
  let userId = cookie.get('http_userID')//56//51
  export default {
    name:"MyFriend",
    data (){
      return {
        content:{
          firval:0,
          secval:0,
          // thrval:0,
          firtip:"好友(个)",
          sectip:"出单件数(件)",
          // thrtip:"奖励(元)"
        },
        list:[]
      }
    },
    components:{
      c_headbar
    },
    methods:{
      getData(){
        this.$store.dispatch('toggleLoadingStatus', true)
        let url = myFriendApi + userId;
        let instance =this.axios.create({
          headers: {'token': token},
          timeout:6000
        });
        instance.post(url)
        .then(res=>{
          this.$store.dispatch('toggleLoadingStatus', false)
          let data = res.data.data
          if(data){
            this.list = data;
            this.content.firval = data.length;
            data.forEach((item,i)=>{
              this.content.secval += (+item.issueCount);
              this.content.thrval += (+item.rewardAmount);
            })
          }

        }).catch(err=>{
          this.$store.dispatch('toggleLoadingStatus', false);
          this.$vux.toast.show({
            text: "网络异常",
            type: 'text',
            width: '80%'
          });
        })
      }
    },
    created(){
      this.getData()
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import '~src/assets/scss/function';
  #myfriend{
    width:100%;
    min-height:100%;
    background:#f6f6f6;
    #headbar{
    width:100%;
    overflow:hidden;
    background:#fff;
    &>div{
      width:50%;
      height:rem-calc(70px);
      position:relative;
      float:left;
      text-align:center;
      &>div{
        margin-top:rem-calc(16px);
        color: #00bd96;
        font-size: rem-calc(18px);
        margin-bottom:rem-calc(6px);
      }
      &>p{
        color:#999;
        font-size:rem-calc(13px)
      }
    }
    &>.bor:after{
      content: " ";
      position: absolute;
      right: 0;
      top: 50%;
      width: 1px;
      height: rem-calc(36px);
      border-right: 1px solid #eee;
      color: #eee;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleX(0.5);
      transform: scaleX(0.5);
      margin-top:rem-calc(-18px);
    }
  }
    &>.friend_list{
      margin-top:rem-calc(10px);
      background:#fff;
      overflow:hidden;
      &>li{
        overflow:hidden;
        height:rem-calc(53px);
        padding-top:rem-calc(17px);
        position:relative;
        margin:0 rem-calc(15px);
        &>.f_name{
          position:relative;
          width:50%;
          text-align:center;
          font-size:rem-calc(14px);
          color:#333;
          &>div:nth-child(1){
            margin-bottom:rem-calc(7px);
            color:#666;
            margin-left:rem-calc(-15px);
          }
          &>div:nth-child(2){
            font-size:rem-calc(13px);
            margin-left:rem-calc(-15px);
          }


        }
          .f_name:after{
            content: "";
            position: absolute;
            right: 0;
            top:50%;
            width: 1px;
            height: rem-calc(36px);
            border-right: 1px solid #eee;
            color: #eee;
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            -webkit-transform: scaleX(0.5);
            transform: scaleX(0.5);
            margin-top:rem-calc(-18px);
          }
        &>.f_detail{
          margin-left:rem-calc(55px);
          float:left;
          color: #666;
          line-height:rem-calc(35px);
          font-size:rem-calc(13px);
          & i{
            font-style:normal;
            margin-left:rem-calc(10px);
          }
        }
      }
      &>li:after{
        padding:0 rem-calc(15px);
        @include borderbottom;
        border-color:#eeeeee!important;
      }
      li:last-child:after{
        border:none;
      }
      &>li:nth-of-type(1){
        background:none;
      }
    }
    
  }
</style>