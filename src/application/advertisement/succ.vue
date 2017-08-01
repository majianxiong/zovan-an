
<!--********************************************************************
 * Author        : Geyan
 * Email         : geyan@zhongan.io
 * Create Date   : 2017-05-06 11:38
 * Filename      : succ.vue
 * Description   : 认证成功
 * Arguments     :
      sex: 1男0女
      name: 用户真名
********************************************************************-->

<template>
<div class='auth-succ'>
  <img src='/static/pic/ad/finish-check.png'>
  <p class='p1'>签约完成</p>
  <p class='p2'>尊敬的{{name}} {{sex == "1" ? "先生" : "女士"}}</p>
  <p class='p3'>欢迎您成为我们平台的签约推广用户</p>
  <p class='p4'>({{countdown}}秒后自动跳转)</p>
</div>
</template>

<script>
  import store from 'src/widget/plugin/store.js'
  import {authSuccApi} from 'src/api'
  import cookie from 'src/widget/plugin/cookie'
  let userType = cookie.get('http_userType')
  export default {
    data: () => {
      return {
        name: '',
        sex: 0,
        countdown: 0
      }
    },
    activated () {
      userType = 1;
      cookie.set('http_userType',userType)
      this.countdown = 5
      this.name = this.$route.query.name
      this.sex = this.$route.query.sex
      let routerpath = store.get("routerpath");
      console.log(routerpath)
      let tik = setInterval(() => {
        if(this.countdown-- == 0) {
          clearInterval(tik)
          this.$router.push(routerpath)
        }
      },1000)
    },
    props: [],
    methods: {
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  @import '~assets/scss/function';
  .auth-succ {
    position:absolute;
    top:0;right:0;bottom:0;left:0;
    overflow-x:hidden;
    overflow-y:scroll;
    background-color:#f6f6f6;
    text-align:center;
    img {
      width:rem-calc(75px);
      margin-top:rem-calc(107px);
      margin-bottom:rem-calc(20px);
    }
    .p1 {
      margin-bottom:rem-calc(20px);
      font-size:rem-calc(17px);
      font-weight:bold;
      color:#00bd96;
    }
    .p2,.p3 {
      font-size:rem-calc(14px);
      line-height:rem-calc(20px);
      color:#666;
    }
    .p4 {
      margin-top:rem-calc(10px);
      color:#999;
    }
  }
</style>
