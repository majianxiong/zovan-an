
<!--********************************************************************
 * Author        : Geyan
 * Email         : geyan@zhongan.io
 * Create Date   : 2017-05-05 10:02
 * Filename      : headerblock.vue
 * Description   : 带头像的信息块
 * Arguments     :
     age     : 年龄
     sex     : 性别， 0男1女 , 默认0
     list    : 四个信息块的对象数组，每个对象格式：{main:'主标题', sub:'副标题'}

********************************************************************-->

<template>
<div class='header-block-container'>
  <div class='header-block'>
    <div class='header-img' :class='[sex==0?"boy":"girl"]'>
      <img v-if='sex==0' class='' src='/static/pic/plan/head-boy.png'>
      <img v-if='sex==1' class='' src='/static/pic/plan/head-girl.png'>
      <div class='age-span'>{{age}}岁</div>
    </div>
    <div class='part part1'>
      <p class='main'>保障金额(元)</p>
      <p class='sub'>{{amount}}</p>
    </div>
    <div class='part part2'>
      <p class='main'>年交保费(元)</p>
      <p class='sub'>{{premium}}</p>
    </div>
    <div class='part part3'>
      <p class='main'>保障期限</p>
      <p class='sub small'>{{guarantee}}</p>
    </div>
    <div class='part part4'>
      <p class='main'>缴费年限</p>
      <p class='sub'>{{list.payment!='0' ? list.payment : '趸交'}}<span>{{list.payment!='0' ? '年交' : ''}}</span></p>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    data: () => {
      return {
      }
    },
    props: ['sex','age','list'],
    methods: {
    },
    computed: {
      amount () {
        return this.list.amount ? this.list.amount : 0.00
      },
      premium () {
        return this.list.premium ? this.list.premium : 0.00
      },
      guarantee () {
        console.log(this.list.guarantee)
        let gua = parseInt(this.list.guarantee)
        return gua !== 0 ? gua < 55 ? '保险期间'+gua+'年' : '保险期间至'+gua+'周岁' : '保终身'
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  @import '~assets/scss/function';
  .header-block-container {
    height:rem-calc(233px);
    padding-top:rem-calc(48px);
    box-sizing: border-box;
    .header-block {
      width:rem-calc(345px);
      height:rem-calc(185px);
      box-sizing: border-box;
      margin:auto;
      position:relative;
      padding:rem-calc(15px);
      box-sizing: border-box;
      border-radius:rem-calc(5px);
      box-shadow:0 rem-calc(1.5px) rem-calc(15px) 0 rgba(84, 220, 142, 0.2);
      background-color:#fff;
      .part {
        position:absolute;
        width:rem-calc(157px);
        height:rem-calc(68px);
        padding-top:rem-calc(14.5px);
        padding-bottom:rem-calc(14.5px);
        box-sizing: border-box;
        p {
          text-align:center;
        }
        .main {
          font-size:rem-calc(13px);
          color:#666;
          margin-bottom:rem-calc(7px);
        }
        .sub {
          color:#00bd96;
          font-weight:bold;
          font-size:rem-calc(20px);
          span {
            font-size:rem-calc(13px);
          }
        }
      }
      .part1 {
        left:rem-calc(15px);
        bottom:rem-calc(68px);
      }
      .part2 {
        right:rem-calc(15px);
        bottom:rem-calc(68px);
      }
      .part3 {
        left:rem-calc(15px);
        bottom:0;
      }
      .part4 {
        right:rem-calc(15px);
        bottom:0;
      }

      &:before {
        content:'';
        position:absolute;
        width:0;
        height:rem-calc(86.5px);
        border-left:.5px solid #eee;
        left:0;
        right:0;
        bottom:rem-calc(22.5px);
        margin:auto;
      }
      &:after {
        content:'';
        position:absolute;
        width:rem-calc(315px);
        height:0;
        border-top:.5px solid #eee;
        left:0;
        right:0;
        bottom:rem-calc(68px);
        margin:auto;
      }
      .header-img {
        position:absolute;
        display:block;
        width:rem-calc(96px);
        height:rem-calc(96px);
        left:0;
        right:0;
        top:rem-calc(-48px);
        margin:auto;
        img{
          width:100%;
          height:100%;
        }
        .age-span {
          position:absolute;
          width:rem-calc(65px);
          height:rem-calc(20px);
          border-radius:rem-calc(10px);
          background-image: linear-gradient(to left, #30edda, #25aafe);
          background-image: -webkit-linear-gradient(to left, #30edda, #25aafe);
          -moz-box-shadow:3px 3px 14px #25aafe;
          -webkit-box-shadow:3px 3px 14px #25aafe;
          box-shadow:3px 3px 14px #25aafe;
          bottom:rem-calc(-3px);
          right:0;
          left:0;
          padding-right:rem-calc(10px);
          box-sizing:border-box;
          margin:auto;
          color:#fff;
          text-align:right;
          line-height:rem-calc(21px);
          font-size:rem-calc(13px);
          &:before {
            content:'';
            position:absolute;
            width:rem-calc(11.5px);
            height:rem-calc(11.5px);
            top:0;
            bottom:0;
            left:rem-calc(11.5px);
            margin:auto;
          }
        }
      }
      .header-img.boy {
        .age-span:before {
          background:url(/static/pic/plan/icon-sex.png) no-repeat;
          background-size:rem-calc(11.5px);
          background-position:0 rem-calc(-30px);
        }
      }
      .header-img.girl {
        .age-span:before {
          background:url(/static/pic/plan/icon-sex.png) no-repeat;
          background-size:rem-calc(11.5px);
        }
      }
    }
    & .small{
      font-size:18px!important;
    }
  }
</style>
