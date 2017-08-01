<template>
    <div id="invitefriends">
        <img src="~assets/image/usercenter/contain_backgr.jpg">
        <!--<div class="gray"></div>-->
        <!--<img src="~assets/image/usercenter/icon_friend.png" alt="" class="erwei" v-tap="{methods:invitecode}">-->
        <!--<img src="~assets/image/usercenter/icon_erweima.png" alt="" class="friend" v-tap="{methods:invitefriend}">-->
        <!--遮罩-->
        <div class="cover" v-if="showcover"></div>
        <!--分享二维码-->
        <div class="enjoycode" v-if="showenjoycode">
            <img :src="imgpath" alt="">
            <img src="~assets/image/usercenter/code_contain.png" alt="">
            <img src="~assets/image/usercenter/codeclose.png" alt="" v-tap="{methods:codeclose}">
        </div>
        <signConfirm :show-conf="showConf" @tofalse="tofalse" @gonext="gonext"></signConfirm>
    </div>
</template>

<script>
import {invitefriendsApi} from 'src/api/index.js'
import cookie from 'src/widget/plugin/cookie'
import signConfirm from 'src/components/service/signConfirm'
import store from 'src/widget/plugin/store.js'
let token = cookie.get('http_usertoken')
let userId = cookie.get('http_userID')
let url = 'http://pkufi-perftest.zhongan.io/index.html#/inviteRegister?inviter='+userId
export default {
  name:'inviteFriends',
  data(){
    return{
        imgpath:'',
        showcover:false, 
        showenjoycode:false,   
        showConf:false 
    }
  },
  components:{
      signConfirm
  },
  created(){
    let url = invitefriendsApi + userId
    let instance = this.axios.create({
        headers:{'token':token}
    })
    instance.post(url)
    .then(res=>{
        console.log(res.data.data)
        this.imgpath = 'data:image/png;base64,'+res.data.data
    }).catch(err=>{
        console.log(err)
    })
  },
  mounted(){  
    let backgr = document.createElement('div')
    let btl = document.createElement('img')
    let btr = document.createElement('img')
    backgr.className = 'gray'
    backgr.id = 'gray'
    btl.src = "/static/pic/icon_friend.png"
    btl.className = 'erwei'
    btl.id = 'code'
    btl.onclick = this.invitecode
    btr.src = "/static/pic/icon_erweima.png"
    btr.className = 'friend'
    btr.id = 'friend'
    btr.onclick = this.invitefriend
    try{
        document.body.appendChild(backgr)
        document.body.appendChild(btl)
        document.body.appendChild(btr)
    }catch(e){

    }
  },
  methods:{
    invitecode(){
        let userType = cookie.get('http_userType')
        this.showConf =false;
        if(userType==1){
            this.showenjoycode=true
            this.showcover=true
        }else{
            this.showConf = true;
        }
    },
    tofalse(){
        this.showConf = false
    },
    gonext(){
        this.showConf = false;
        let routerpath = window.location.href.split("#")[1];
        store.set("routerpath",routerpath);
        this.$router.push("electronicsign")
    },
    invitefriend(){
        let userType = cookie.get('http_userType')
        if(userType==1){
        // this.showcover=true
            this.jsbridge.shareConfig({
            img:'',
            title:'没保单就用保啊，超高推广奖励，一起来赚钱吧！',
            desc:'我正在使用保啊，强烈推荐您加入。超高推广奖励，更多团队玩法，任性赚钱！！',
            link:url
            })
        }else{
            this.showConf = true;
        }
    },
    codeclose(){
        this.showenjoycode=false
        this.showcover=false
    }
  },
  beforeDestroy(){
      let gray = window.document.getElementById('gray')
      gray && document.body.removeChild(gray)
      let btnl = window.document.getElementById('code')
      btnl && document.body.removeChild(btnl)
      let btnr = window.document.getElementById('friend')
      btnr && document.body.removeChild(btnr)
  }
}
</script>

<style lang='scss' rel='stylesheet/scss'>
  @import '~src/assets/scss/function';

  #invitefriends{
    &>img{
        width:100%;
        height:100%;
        display:block;
    }
    // 遮罩
    &>.cover{
        width:100%;
        height:100%;
        background:#000000;
        opacity: .4;
        position:fixed;
        top:0;
        left:0;
        z-index: 50;
    }
    // 分享二维码
    &>.enjoycode{
        position:fixed;
        top:0;
        z-index:90;
        width:100%;
        height:auto;
        &>img:nth-child(1){
            width:rem-calc(171px);  
            height:rem-calc(171px);
            position:absolute;
            top:rem-calc(278px);
            left:rem-calc(2px);
            right:0;
            margin:auto;
        }
        &>img:nth-child(2){
            display:block;
            width:83.8%;
            height:auto;
            margin:rem-calc(150px) auto;
        }
        &>img:nth-child(3){
            position:absolute;
            top:21%;
            right:5%;
            width:rem-calc(30px);
            height:rem-calc(30px);
        }
    }
}
   .gray{
        width:100%;
        height:rem-calc(70px);
        position:absolute;
        bottom:0;
        z-index:20;
        background:#01594c;
        opacity: .3;
    }
    .erwei,.friend{
        width:rem-calc(164px);
        position:absolute;
        bottom:rem-calc(9px);
        z-index:40;
    }
    .erwei{
        left:rem-calc(17px);
    }
    .friend{
        right:rem-calc(17px);
    }
</style>
