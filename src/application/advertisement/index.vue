
<!--********************************************************************
 * Author        : Geyan
 * Email         : geyan@zhongan.io
 * Create Date   : 2017-05-06 11:37
 * Filename      : index.vue
 * Description   : 图片上传
 * Arguments     :
********************************************************************-->

<template>
<div class='upload-container'>
  <div class='upload-block'>
    <p class='upload-tip'>请分别上传身份证正面和背面照片</p>
    <camera face='1' class='upload-front' :base='base1' @setBase='setBase'></camera>
    <camera face='0' class='upload-back' :base='base2' @setBase='setBase'></camera>
  </div>
  <div class='upload-sample'>
    <div class='sample-title'>拍摄示例</div>
    <img src='/static/pic/ad/sample.png'>
  </div>
  <footer-button name='提交验证' color='#6cd9b6' class='upload-link' @tap='onNext'></footer-button>
</div>
</template>

<script>
  import Camera from 'src/components/service/camera'
  import footerButton from 'src/components/service/footersingle'
  import {authApi,wechatSignApi} from 'src/api'
  import cookie from 'src/widget/plugin/cookie'

  let userid = cookie.get('http_userID')

  export default {
    data: () => {
      return {
        which: -1,
        base1: '',
        base2: '',
        certiName: '',
        certiNo: '',
        sex: ''
      }
    },
    props: [],
    components: {Camera,footerButton},
    created () {
      if(this.uaDetector && this.uaDetector.inWechat) {
        try {
          let instance = this.axios.create({
            timeout: 3000
          })
          instance.get(wechatSignApi+'?url='+window.location.protocol+'//'+window.location.host+'/').then((res)=> {
            let value = res.data.data
            // let wx = this.$wechat
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: value.appId, // 必填，公众号的唯一标识
              timestamp: value.timestamp, // 必填，生成签名的时间戳
              nonceStr: value.nonceStr, // 必填，生成签名的随机串
              signature: value.signature,// 必填，签名，见附录1
              jsApiList: ["showMenuItems","hideMenuItems",'chooseImage','onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            })
            wx.ready(()=> {
              // alert('ready')
            })
          })
          .catch((errorResponse) => {
            //alert(errorResponse)
            let toastConf = {
             type: 'text',
             width: '80%',
             isShowMask: true,
             text: '授权失败，稍后再试',
            //  time: 150000
            }
            this.$vux.toast.show(toastConf)
          })
        } catch(e) {
        }
      }
    },
    activated () {
      this.certiNo = this.$route.query.certiNo
      this.certiName = this.$route.query.certiName
      this.sex = this.certiNo && this.certiNo.length == 18 ? (this.certiNo[16] % 2) : 1

      window.imageCb = (base) => {
        if(this.which == 1) {
          this.base1 = base
        }else if(this.which == 0) {
          this.base2 = base
        }
      }
    },
    methods: {
      onNext () {
        if(!this.base1 || !this.base2) {
          this.$vux.toast.show({
             text: '图片上传不完整',
             type: 'text',
             width: '80%'
          });
          return
        }

        this.axios.post(authApi, {
          "backImage": this.base2,
          "certiNo": this.certiNo,
          "positiveImage": this.base1,
          "suffix": ".jpg",
          "userId": userid,
          "userName": this.certiName
        }).then(res=>{
          if(res.data.status == 'SUCCESS') {
            this.$router.push({path:'/authsucc', query:{name:this.certiName, sex: this.sex}})
          } else {
            this.$vux.toast.show({
               text: res.data.message,
               type: 'text',
               width: '80%'
            });
          }
        }).catch(err=>{

        })
      },
      setBase (face, data) {
        this.which = face
        if(data) {
          if(face == '1') {
            this.base1 = data
          } else if(face == '0') {
            this.base2 = data
          }
        }
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  @import '~assets/scss/function';
  .upload-container {
    position:absolute;
    top:0;right:0;bottom:0;left:0;
    overflow-x:hidden;
    overflow-y:scroll;
    background-color:#f6f6f6;
    .upload-block {
      padding-top:rem-calc(20px);
      padding-bottom:rem-calc(25px);
      background-color:#fff;
      margin-bottom:rem-calc(10px);
      .upload-tip {
        text-align:center;
        font-size:rem-calc(15px);
        color:#333;
        font-weight:bold;
        margin-bottom:rem-calc(20px);
      }
      .upload-front {
        margin-bottom:rem-calc(15px);
      }
    }
    .upload-sample {
      padding-top:rem-calc(20px);
      padding-bottom:rem-calc(25px);
      background-color:#fff;
      text-align:center;
      .sample-title {
        text-align:center;
        color:#999;
        font-size:rem-calc(14px);
        width:rem-calc(57px);
        margin:auto;
        margin-bottom:rem-calc(14px);
        position:relative;
        &:before, &:after {
          content:'';
          width:rem-calc(50px);
          height:0;
          position:absolute;
          top:0;
          bottom:0;
          margin:auto;
          border-top:1px solid #dedede;
        }
        &:before {
          left:rem-calc(-60px);
        }
        &:after {
          right:rem-calc(-60px);
        }
      }
      img {
        width:rem-calc(305px);
      }
    }
  }
</style>
