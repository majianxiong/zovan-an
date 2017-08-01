<!--********************************************************************
 * Author        : liuliqi
 * Description   : 订单倒计时及信息

********************************************************************-->
<template>
  <div id="ordertime">
    <div class="countdown">
      <p>支付剩余时间</p>
      <span>{{fen}}:{{sec}}</span>
    </div>
    <div class="goodsinfo">
      {{productDescription}}
      <span>￥{{amount}}</span>
    </div>
  </div>
</template>
<script>
  let tik2
  export default {
    name: "c_orderTime",
    data () {
      return {
        time:0,
        sec: '00',
        fen: '30',
        start: false
      }
    },
    props:["orderTime", "showPluginTime","amount", "productDescription", "duration"],
    methods:{
      showtime1(){
        // var olddate = this.orderTime;
        // var nowdate = +new Date();
        // var secs = parseInt((nowdate - olddate)/1000);
        // this.fen = this.addzero(29-parseInt(secs/60));
        // this.sec = this.addzero(59-parseInt(secs%60));
        // if(secs/60>=30||!secs){
        //   this.$emit("show-plugin-time");
        //   clearInterval(timer);
        //   this.sec = this.addzero(0);
        //   this.fen = this.addzero(0);
        // }else{
        //   var i = 1800 - secs;
        //   var that = this;
        //   var timer = setInterval(function(){
        //     i--;
        //     that.fen = that.addzero(parseInt(i/60));
        //     that.sec = that.addzero(parseInt(i%60));
        //     console.log(that.sec);
        //     if(i==0){
        //       clearInterval(timer);
        //       that.sec = that.addzero(0);
        //       that.fen = that.addzero(0);
        //       that.$emit("show-plugin-time");
        //     }
        //   },1000);
        // }
          //let tik1 = setInterval(() => {
            //alert(this.orderTime)
            if(this.orderTime != 0){
             // clearInterval(tik1)
              var nowdate = +new Date();
              this.time = parseInt(this.duration) - (~~(nowdate - this.orderTime)/1000)
              //console.log(nowdate)
              //console.log(this.orderTime)
              //this.time = this.time < 0 ? 0 : this.time
              // this.fen = ~~(this.time / 60)
              // this.fen = this.addzero(this.fen)
              // this.sec = ~~(this.time % 60)
              // this.sec = this.addzero(this.sec)
              
              tik2 = setInterval(() => {
                if(this.time < 0) {
                  this.fen = '00'
                  this.sec = '00'
                  clearInterval(tik2)
                  this.$emit("show-plugin-time");
                // return
                }else{
                  this.time--
                  this.fen = ~~(this.time / 60)
                  this.fen = this.addzero(this.fen)
                  this.sec = ~~(this.time % 60)
                  this.sec = this.addzero(this.sec)
                }
              }, 1000)
            }
       //},400)
      },
      addzero (i){
        if(i<10){
          return "0"+i
        }else{
          return i
        }
      }
    },
    created(){
      // clearInterval(tik1)
      var nowdate = +new Date();
      this.time = parseInt(this.duration) - (~~(nowdate - this.orderTime)/1000)
      this.fen = ~~(this.time / 60)
      this.fen = this.addzero(this.fen)
      this.sec = ~~(this.time % 60)
      this.sec = this.addzero(this.sec)
      this.showtime1();
    },
    beforeDestroy(){
      clearInterval(tik2)
    }
/*     activated(){
      //this.$nextTick(()=>{
        this.showtime1();
      //})
     
    } */
  }
</script>
<style lang='scss' rel='stylesheet/scss'>
  @import '~src/assets/scss/function';
  #ordertime{
    width:100%;
    height:rem-calc(118px);
    background:#fff;
    &>.countdown{
      margin:0 rem-calc(15px) 0;
      text-align:center;
      height:rem-calc(73px);
      position:relative;
      &>p{
        color:#666;
        padding:rem-calc(14px) 0 rem-calc(6px);
      }
      &>span{
        font-size:28px;
      }
    }
    &>.countdown::after{
      @include borderbottom;
      border-color:#eee;
    }
    &>.goodsinfo{
      line-height:rem-calc(45px);
      margin:0 rem-calc(15px);
      color:#333;
      &>span{
        float:right;
        color:#ff7c81;
        font-weight:600;
      }
    }
  }
</style>
