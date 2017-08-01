
<!--********************************************************************
 * Author        : Geyan
 * Email         : geyan@zhongan.io
 * Create Date   : 2017-05-06 11:32
 * Filename      : camera.vue
 * Description   : 身份证上传拍照组件
 * Arguments     :
     face // 是否正面 0为反面，1为正面
********************************************************************-->

<template>
<div class='camera-block-container'>
  <div style='width:0;height:0;overflow:hidden'>
    <img ref='imghide' src='' style="visibility:hidden;">
  </div>
  <div ref='cam' class='camera-block'>
    <span v-if='face=="0"' class='camera-title'>上传身份证背面</span>
    <span v-if='face=="1"' class='camera-title'>上传身份证正面</span>
    <div class='camera-view-container' >
      <div v-if='!getted' class='view-before' :class='{front:face=="1", back:face=="0"}'>
        <i></i><i></i><i></i><i></i>
        <img src='/static/pic/ad/big-camera.png'>
      </div>
      <div v-else class='view-after'>
        <div class='redo'>
          <div class='redo-bg'></div>
          <i></i>
        </div>
        <img class='pic-after' ref='pic' src=''>
      </div>
    </div>
    <div class='camera-mask' v-tap='{methods:onPic}'></div>
  </div>
</div>
</template>

<script>
  import cookie from 'src/widget/plugin/cookie'
  export default {
    data: () => {
      return {
        getted: false,
        which: {},
        list: []
      }
    },
    props: ['face','base'],
    created () {
      let self = this
    },
    watch: {
      base(val) {
        this.$refs.cam.style.backgroundImage = 'url(data:image/jpg;base64,'+val+')'
        this.$refs.cam.style.backgroundRepeat = 'no-repeat'
        this.$refs.cam.style.backgroundSize = '9.29rem 5.86rem'
        this.$refs.cam.style.backgroundPosition = 'center'
        this.getted = true
        this.$nextTick(() => {
          this.$refs.pic.style.display = 'none'
        })
      }
    },
    methods: {
      onPic (e) {
        if(cookie.get('http_ostype')) {
          this.jsbridge.callImage('imageCb')
          this.$emit('setBase', this.face)
        } else if (this.uaDetector && this.uaDetector.inWechat){
          // let wx = this.$wechat
          let self = this
          wx.ready(() => {
            wx.chooseImage({
              count: 1, // 默认9
              sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
              sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
              success: function (res) {
                let localid = res.localIds[0]
                self.getted = true
                self.getBase64(localid, function(data) {
                  try {
                    self.$emit('setBase', self.face, data.replace(/.*?base64,/, ''))
                  } catch(e) {
                    alert(e.message)
                  }
                }, .8)
                self.$nextTick(() => {
                  self.$refs.pic.src = localid
                })

                //this.$refs.cam.style.backgroundImage = 'url(data:image/jpg;base64,'+res.localIds[0]+')'
                // try {
                //   let localid = res.localIds[0]
                //   let img = self.$refs.imghide
                //   let canvas = document.createElement('canvas');
                //   img.src = localid
                //   img.onload = function() {
                //     canvas.width = this.width;
                //     canvas.height = this.height;
                //     let context = canvas.getContext('2d').drawImage(this, 0, 0, this.width, this.height);
                //
                //     let dataUrl = canvas.toDataURL('image/jpeg');
                //     self.$refs.cam.style.backgroundImage = 'url('+dataUrl+')'
                //     self.$refs.cam.style.backgroundRepeat = 'no-repeat'
                //     self.$refs.cam.style.backgroundSize = '9.29rem 5.86rem'
                //     self.$refs.cam.style.backgroundPosition = 'center'
                //     self.getted = true
                //   }
                //
                //
                //   // wx.uploadImage({
                //   //   localId: localid, // 需要上传的图片的本地ID，由chooseImage接口获得
                //   //   isShowProgressTips: 1, // 默认为1，显示进度提示
                //   //   success: function (res) {
                //   //     var serverId = res.serverId; // 返回图片的服务器端ID
                //   //     alert(JSON.stringify(res))
                //   //
                //   //     let img = self.$refs.test
                //   //     self.$refs.test.onload = () => {
                //   //       var canvas = document.createElement('canvas');
                //   //       canvas.width = img.width;
                //   //       canvas.height = img.height;
                //   //       canvas.getContext('2d').drawImage(img);
                //   //
                //   //       var dataUrl = canvas.toDataURL();
                //   //       alert(dataUrl)
                //   //     }
                //   //     img.src = serverId
                //   //   }
                //   // });
                //
                //
                //   // wx.getLocalImgData({
                //   //   localId: localid,
                //   //   success: function (res) {
                //   //     let localData = ''
                //   //     if(res.localData.indexOf('base64') != -1) {
                //   //       localData = 'data:image/jpg;base64,' + res.localData.split('base64,')[1]
                //   //     } else {
                //   //       localData = 'data:image/png;base64,' + res.localData;
                //   //     }
                //   //     alert(localData)
                //   //     self.$refs.cam.style.backgroundImage = 'url('+localData+')'
                //   //     self.$refs.cam.style.backgroundRepeat = 'no-repeat'
                //   //     self.$refs.cam.style.backgroundSize = '9.29rem 5.86rem'
                //   //     self.$refs.cam.style.backgroundPosition = 'center'
                //   //     self.getted = true
                //   //   }
                //   // });
                //
                // } catch(e) {
                //   alert(e.message)
                // }
              }
            });
          })
          //this.getted = true
        } else {
          // alert('other')
        }
      },
      getBase64: function(src,cb,quality){
        let localData = ''
        wx.getLocalImgData({
          localId: src, // 图片的localID
          success: function (res) {
            localData = res.localData // localData是图片的base64数据，可以用img标签显示
            // alert(localData)
            cb && cb(localData)
          }
        });
      },
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  @import '~assets/scss/function';
  .camera-block-container {
    width:100%;
    .camera-block {
      position:relative;
      width:rem-calc(225px);
      height:rem-calc(135px);
      border-radius:rem-calc(5px);
      background-color:#e3faf1;
      margin:auto;
      position:relative;
      padding-top:rem-calc(15px);
      box-sizing: border-box;
      .camera-title {
        font-size:rem-calc(13px);
        width:rem-calc(92px);
        height:rem-calc(13px);
        position:absolute;
        bottom:rem-calc(15.5px);
        left:0;right:0;
        margin:auto;
        color:#05cf9c;
      }
      .camera-view-container {
        .view-before {
          width:rem-calc(100px);
          height:rem-calc(70px);
          margin:auto;
          margin-top:rem-calc(5px);
          position:relative;
          i {
            position:absolute;
            width:rem-calc(12px);
            height:rem-calc(8px);
          }
          i:nth-child(1) {
            top:0;
            left:0;
            border-left:rem-calc(2px) solid #42e1b1;
            border-top:rem-calc(2px) solid #42e1b1;
          }
          i:nth-child(2) {
            top:0;
            right:0;
            border-right:rem-calc(2px) solid #42e1b1;
            border-top:rem-calc(2px) solid #42e1b1;
          }
          i:nth-child(3) {
            bottom:0;
            left:0;
            border-left:rem-calc(2px) solid #42e1b1;
            border-bottom:rem-calc(2px) solid #42e1b1;

          }
          i:nth-child(4) {
            bottom:0;
            right:0;
            border-right:rem-calc(2px) solid #42e1b1;
            border-bottom:rem-calc(2px) solid #42e1b1;

          }
          img {
            position:absolute;
            top:0;right:0;bottom:0;left:0;
            margin:auto;
            width:rem-calc(40px);
          }
        }
        .view-before.front {
          background-image:url('/static/pic/ad/card-front.png');
          background-size:rem-calc(83px) rem-calc(53px);
          background-position:center;
          background-repeat: no-repeat;
        }
        .view-before.back {
          background-image:url('/static/pic/ad/card-back.png');
          background-size:rem-calc(83px) rem-calc(53px);
          background-position:center;
          background-repeat: no-repeat;
        }
        .view-after {
          width:rem-calc(130px);
          height:rem-calc(82px);
          margin-left:auto;
          margin-right:auto;
          position:relative;
          img {
            width:100%;
            height:100%;
          }
          .redo {
            width:rem-calc(50px);
            height:rem-calc(50px);
            position:absolute;
            top:0;right:0;bottom:0;left:0;
            margin:auto;
            .redo-bg {
              display:inline-block;
              width:100%;
              height:100%;
              border-radius:50%;
              opacity:.6;
              background-color:#000;
            }
            i {
              position:absolute;
              width:rem-calc(28px);
              height:rem-calc(23px);
              top:0;right:0;bottom:0;left:0;
              margin:auto;
              background:url('/static/pic/ad/camera.png') no-repeat center;
              background-size:contain;
            }
          }
        }
      }
      .camera-mask {
        position:absolute;
        z-index:1;
        top:0;
        bottom:0;
        left:0;
        right:0;
      }
    }
  }

</style>
