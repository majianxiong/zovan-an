<template>
  <div id="comdetail">
    <div class="shadow" v-show="showtip">
      <img src="~assets/image/teamact/openbower.png" alt="">
    </div>
    <div class="openapp">
      <div class="openbtn" @click="openapp"></div>
    </div>
    
    <div class="own">
      <div class="ownpic"></div>
      <div class="owncontext">
        <div class="ownname">
          呵呵
        </div>
        <div class="owntime">
          7-23 12
        </div>
        <div class="contextinfo">
        干我们这行好苦，好多人觉得买保险就是不吉利，怎么破？！
        </div>
        <div class="owmimg" v-if="hasimg">
          <img v-for="(el,i) in imglist" :class="imglist.length>=3?'img3':'img1'" :src="el" alt="">
        </div>
        <div class="commentnum">
          <div class="dianzan">
            99+
          </div>
          <div class="comnum">
            0
          </div>
        </div>
      </div>
    </div>
    <div class="other">
      <div class="otherlist">
        <div class="otherpic"></div>
        <div class="othercontext">
          <div class="othername">
            呵呵<span>回复</span>哈哈
          </div>
          <div class="othercom">
            哈哈哈哈哈，不能同意更多
          </div>
          <div class="owntime">
          7-23 12
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name:"comdetail",
    data(){
      return {
        hasimg:true,
        showtip:false,
        imglist:[require('src/assets/image/pkact/pk_cc.png'),require('src/assets/image/pkact/pk_cc.png'),require('src/assets/image/pkact/pk_cc.png'),require('src/assets/image/pkact/pk_cc.png'),require('src/assets/image/pkact/pk_cc.png'),require('src/assets/image/pkact/pk_cc.png')]
      }
    },
    methods:{
      openapp(){
        console.log(1)
      }
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
  @import '~src/assets/scss/function';
  #comdetail{
    height:100%;
    width:100%;
    overflow:hidden;
    background:#f6f6f6;
    &>.shadow{
      background-color: rgb(0, 0, 0);
      opacity: 0.6;
      position:fixed;
      top:0;
      right:0;
      left:0;
      bottom:0;
      z-index:5;
      &>img{
        width:rem-calc(224px);
        height:rem-calc(110px);
        position:absolute;
        z-index:999;
        right:rem-calc(18px);
      }
    }
    &>.openapp{
      width:100%;
      height:rem-calc(75px);
      background-image:url(~assets/image/miyixia/open.png);
      background-size:100%;
      position:absolute;
      bottom:0;
      z-index:4;
      &>.openbtn{
        position:absolute;
        width:rem-calc(92px);
        height:rem-calc(32px);
        top:rem-calc(21px);
        right:rem-calc(20px);
      }
    }
    &>.own{
      background:#fff;
      overflow:hidden;
      &>.ownpic{
        width:rem-calc(54px);
        height:50px;
        float:left;
      }
      &>.owncontext{
        padding-top:rem-calc(21px);
        float:left;
        padding-right:rem-calc(15px);
        width:rem-calc(306px);
        &>.ownname{
          font-size:rem-calc(12px);
          color:#999999;
        }
        &>.owntime{
          font-size:rem-calc(12px);
          color:#cccccc;
          margin-top:rem-calc(10px);
        }
        &>.contextinfo{
          line-height:rem-calc(25px);
          font-size:rem-calc(17px);
          color:#333333;
          margin-top:rem-calc(16px);
        }
        &>.owmimg{
          width:100%;
          display:flex;
          justify-content:space-around;
          overflow:hidden;
          flex-wrap:wrap;
          margin:rem-calc(15px 0 10px 0);
          &>.img1{
            width:rem-calc(150px);
            height:rem-calc(150px);
            margin-bottom:rem-calc(5px);
          }
          &>.img3{
            width:rem-calc(98px);
            height:rem-calc(98px);
            margin-bottom:rem-calc(5px);
          }
        }
        &>.commentnum{
          overflow:hidden;
          margin-bottom:rem-calc(15px);
          &>.dianzan{
            float:right;
            padding-left:rem-calc(27px);
            background:url(~assets/image/miyixia/dianzan.png) no-repeat left center;
            background-size:rem-calc(18px 15px); 
            height:rem-calc(16px);
            color:#ff5200;
            line-height:rem-calc(16px);
          }
          &>.comnum{
            margin-right:rem-calc(25px);
            float:right;
            padding-left:rem-calc(28px);
            background:url(~assets/image/miyixia/comnum.png) no-repeat left center;
            background-size:rem-calc(18px 14px); 
            color:#666666;
            line-height:rem-calc(16px);
            
          }
        }
      }
    }
    &>.other{
      margin-top:rem-calc(10px);
      background:#ffffff;
      &>.otherlist{
        overflow:hidden;
        padding-bottom:rem-calc(10px);
        &>.otherpic{
        width:rem-calc(54px);
        float:left;
        height:50px;
        }
        &>.othercontext{
          padding-top:rem-calc(15px);
          float:left;
          padding-right:rem-calc(15px);
          width:rem-calc(306px);
          &>.othercom{
            line-height:rem-calc(20px);
            font-size:rem-calc(15px);
            color:#666;
            margin-top:rem-calc(8px);
          }
          &>.othername{
            color:#00bd86;
            &>span{
              color:#666;
              padding:0 5px;
            }
          }
          &>.owntime{
          font-size:rem-calc(12px);
          color:#cccccc;
          margin-top:rem-calc(15px);
        }
        }
      }
      &>.otherlist:after{
        @include borderbottom;
        border-color:#eee;
      }
      &>.otherlist:after:last-child:after{
        border:none;
      }
    }
  }
</style>