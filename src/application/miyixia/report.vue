<template>
  <div id="report">
    <img class="Toasttip" v-show="showtoast" src="~assets/image/miyixia/Toast.png" alt="">
    <div class="report-tip">
      选择举报原因（单选）
    </div>
    <div class="reportlist">
      <p v-for="(el,i) in reportlist"  :key="i" @click="choose(i)" :data-id="i">
        <span>{{el}}</span>
        <img :src="ischoose==i?src2:src1" alt="">
      </p>
    </div>
    <c_btn :config="config" @go-next="goNext"></c_btn>
  </div>
</template>
<script>
  import c_btn from 'src/components/base/nextbtn'
  export default {
    name:"report",
    data(){
      return{
        reportlist:["人身攻击","暴力色情","违法/政治敏感","虚假消息/谣言","其他"],
        src1:require("src/assets/image/miyixia/unchoose.png"),
        src2:require("src/assets/image/miyixia/choose.png"),
        showtoast:false,
        config:{
          val:"确认举报"
        },
        ischoose:10,
      }
    },
    components:{
      c_btn
    },
    methods:{
      goNext(){

      },
      choose(i){
        this.ischoose = i
      }
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
  @import '~src/assets/scss/function';
  #report{
    min-height:100%;
    background:#f6f6f6;
    &>.Toasttip{
      position:absolute;
      top:0;
      left:0;
      bottom:0;
      right:0;
      margin:auto;
      z-index:999;
      height:rem-calc(110px);
      width:rem-calc(160px);
    }
    &>.report-tip{
      padding-left:rem-calc(15px);
      height:rem-calc(35px);
      line-height:rem-calc(35px);
      color:#999;
    }
    &>.reportlist{
      background:#fff;
      padding-left:rem-calc(15px);
      margin-bottom:rem-calc(35px);
      &>p{
        height:rem-calc(45px);
        line-height:rem-calc(45px);
        position:relative;
        font-size:rem-calc(15px);
        color:#333;
        &>img{
          float: right;  
          margin-top:rem-calc(13px);
          margin-right:rem-calc(15px);
                
        }
      }
      &>p:after{
        @include borderbottom;
        border-color:#eee;
      }
      &>p:last-child:after{
        border:none;
      }
    }
  }
</style>