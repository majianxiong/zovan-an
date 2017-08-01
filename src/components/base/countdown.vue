<!--********************************************************************
 * Author        : liuliqi
 * Email         : wb_liuliqi@zhongan.io
 * Create Date   : 2017-05-14 17:42
 * Filename      : countdown.vue
 * Description   : 短信验证码倒计时
 * time:倒计时时间（s）；
 *content：时间后的内容;
 *color:字体颜色
 *cansendmsg:是否切换倒计时（用于先验证表单，通过之后再倒计时）

********************************************************************-->
<template>
  <div id="countdown">
    <span v-if="showdown" :style="{color}" @click="showCountDown">获取验证码</span>
    <span v-if="!showdown">
      <countdown slot="value" v-model="timers" @on-finish="finish" class="down"></countdown>
      秒后重发
    </span>
  </div>
</template>
<script>
  import { Countdown } from 'vux'
  export default {
    name: "c_countdown",
    data (){
      return {
        showdown: true,
        timers: 60
      }
    },
    components:{
      Countdown
    },
    props:["time","content","color","cansendmsg","get-msg-code"],
    methods:{
      finish(){
        this.showdown = true
      },
      showCountDown(){
        
        //this.showdown = !this.getMsgCode()
        //setTimeout(()=>{
          this.$props.getMsgCode()
        //},100)
        //setTimeout(()=>{
          if(this.cansendmsg){
            this.timers = this.time;
            this.showdown = false;
          }
        //},200)
      }
    },
    computed:{
      // cansend(){
      //   return this.$props.cansendmsg
      // }
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss' scope>
  @import '~assets/scss/function';
  #countdown{
    float:right;
    height:100%;
    font-size:rem-calc(13px);
    position:relative;
    margin-right:rem-calc(15px);
    width:rem-calc(80px);
    text-align:right;
    &>span{
      
      color:#ccc;
      &>.down{
        margin-right:rem-calc(-2px);
      }
    }
  }
  #countdown:before{
    content: " ";
    position: absolute;
    left: 0;
    top: 50%;
    width: 1px;
    height: 50%;
    margin-top:-15%;
    border-left: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleX(0.5);
    transform: scaleX(0.5);
  }
</style>