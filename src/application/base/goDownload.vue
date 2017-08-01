<template>
  <div id="godownload">
  <p v-tap="{methods:download}">
    <img class="downloadbtn" src="~assets/image/download.png" alt="">
  </p>
  </div>
</template>
<script>
  export default {
    name:"GoDownload",
    data () {
      return {
      }
    },
    methods:{
      download(){
        if(this.uaDetector.osAndroid){
          window.location.href = "https://pkufi-test.zhongan.io/upload/baoAapp.apk"
        }else if(this.uaDetector.osIos){
          alert("暂无苹果地址")
        }
      }
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss'>
  @import '~src/assets/scss/function';
  #godownload{
    width:100%;
    height:100%;
    background:url(~assets/image/loadbg.jpg) no-repeat left center;
    background-size:100% 100%;
    position:relative;
    p{
      position:absolute;
      bottom:rem-calc(75px);
      width:100%;
      height:rem-calc(50px);
      text-align:center;
    }
  }

  .downloadbtn{
    width:80%;
    height: 100%;
  }
</style>