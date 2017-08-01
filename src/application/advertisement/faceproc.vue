
<!--********************************************************************
 * Author        : Geyan
 * Email         : geyan@zhongan.io
 * Create Date   : 2017-05-06 11:37
 * Filename      : faceproc.vue
 * Description   : 人脸识别
 * Arguments     :
********************************************************************-->

<template>
<div class='face-proc-container'>
  <div class='face-block'>
    <div class='face-show'>
      <img src='/static/pic/ad/face-proc.png'>
    </div>
    <div class='face-title'>人脸识别</div>
    <div class='face-table'>
      <div class='row'>
        <div class='cell'>在光线充足环境下拍摄</div>
        <div class='cell'>请不要戴眼镜露出耳朵</div>
      </div>
      <div class='row'>
        <div class='cell'>与摄像头保持合适距离</div>
        <div class='cell'>保持您的脸在绿色框内</div>
      </div>
    </div>
  </div>
  <footer-button name='开始验证' color='#6cd9b6' class='upload-link' @tap='onStart'></footer-button>
</div>
</template>

<script>
  import footerButton from 'src/components/service/footersingle'
  import {authFaceApi} from 'src/api'
  export default {
    data: () => {
      return {
      }
    },
    props: [],
    components: {footerButton},
    activated () {
      this.getData()
    },
    methods: {
      onStart () {
        //alert('start')
      },
      getData () {
        this.axios.get(authFaceApi).then((response) => {
          // 获取数据
        }, (response) => {
          // this.loadStatus = !this.loadStatus
        })
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  @import '~assets/scss/function';
  .face-proc-container {
    position:absolute;
    top:0;right:0;bottom:0;left:0;
    overflow-x:hidden;
    overflow-y:scroll;
    background-color:#f6f6f6;
    .face-block {
      background-color:#fff;
      padding-top:rem-calc(36px);
      padding-bottom:rem-calc(35px);
      padding-left:rem-calc(25px);
      padding-right:rem-calc(28px);
      .face-show {
        margin-bottom:rem-calc(36px);
        text-align:center;
        img {
          width:rem-calc(200px);
          margin-left:rem-calc(50px);
        }
      }
      .face-title {
        text-align:center;
        color:#999;
        font-size:rem-calc(14px);
        width:rem-calc(57px);
        margin:auto;
        margin-bottom:rem-calc(30px);
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
      .face-table {
        width:100%;
        display:table;
        .row {
          display:table-row;
          .cell {
            display:table-cell;
            height:rem-calc(30px);
            vertical-align: middle;
            padding-left:rem-calc(26px);
            font-size:rem-calc(13px);
            color:#666;
            position:relative;
            &:before {
              content:'';
              position:absolute;
              left:rem-calc(10px);top:0;bottom:0;
              margin:auto;
              width:rem-calc(6px);
              height:rem-calc(6px);
              border-radius:rem-calc(3px);
              background-color:#00bd96;
            }
          }
        }
      }
    }
  }
</style>
