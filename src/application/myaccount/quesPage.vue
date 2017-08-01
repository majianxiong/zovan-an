<template>
  <div id="ques-page">
    <div class="ques" v-for="(item, i) in quesarr" :key="i">
      <p>
        <span>
          <span class="que-num">
            {{item.ques}}
          </span>
        </span>
        {{item.title}}
      </p>
      <span>
        <span class="que-num">
          {{item.context}}
        </span>
      </span>
    </div>
  </div>
</template>
<script>
  export default {
    name: "QuesPage",
    data () {
      return {
        quesarr: [{
          ques: 'Q1',
          title: '保啊提供哪些服务？',
          context: '汇集各大保险公司的精品险种，我们提供直接在线投保等功能，助力您的展业。'
        }, {
          ques: 'Q2',
          title: '如何注册？',
          context: '采用邀请注册制，在 ‘我的’里面选择‘邀请注册’来帮助您邀请好友来展业。'
        }, {
          ques: 'Q3',
          title: '保单以及发票寄送说明',
          context: '经纪公司专业代理人通过保啊展业，保单以及发票寄送均有经纪公司内部相关人员来完成配送。'
        },{
          ques: 'Q4',
          title: '投保可以使用那些支付方式？',
          context: '美泰人生、康健人生选择是实时代扣或者批扣的方式进行保费支付。'
        }]
      }
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss'>
  @import '~src/assets/scss/function';
  #ques-page{
    padding:rem-calc(25px) rem-calc(14px) 0;
    height: 100%;
    
    &>.ques{
      margin-bottom:rem-calc(30px);
      &>p{
        font-size:rem-calc(15px);
        font-weight:600;
        margin-bottom:rem-calc(12px);
        &>span{
          display:inline-block;
          width: 21px;
          height: 16px;
          background:url(~assets/image/usercenter/qes.png) no-repeat 100%;
          text-align:center;
          line-height:12px;
          color:#fff;
          margin-right:rem-calc(10px);
          .que-num{
            display:inline-block;
            font-size:20px;
            -webkit-transform: scale(0.5,.5);
            transform: scale(0.5,0.5);
            margin-left:-3px;
            font-weight:100;
          }
        }
      }
      &>span{
        font-size:12px;
        color:#666;
        line-height:rem-calc(20px);
        letter-spacing:1px;
      }
    }
  }
</style>
