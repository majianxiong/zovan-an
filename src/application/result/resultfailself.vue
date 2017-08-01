
<!--********************************************************************
 * Author        : Geyan
 * Email         : geyan@zhongan.io
 * Last modified : 2017-04-07 17:37
 * Filename      : resultFailSelf.vue
 * Description   : e投保－查看投保结果－自核失败

********************************************************************-->

<template>
  <div class="rst-self-fail-content">
    <div v-if='show'>
      <div class="rst-self-fail">
        <p class="sf-icon-content"><img src="~src/assets/image/sad.png"></p>
        <p>您的投保单提交遇到问题,</p>
        <p>请点击<span @onclick="onReTry">重新支付</span>按钮后再尝试。</p>
      </div>
      <button class="sf-repay-btn" @onclick="onRePay">重新支付</button>
    </div>
    <c_errMsg  v-else txt = "啊哦 ～～,抱歉当前无记录信息哦!"></c_errMsg>
  </div>
</template>

<script>
  // import {IRESULTFAILSELF} from 'src/api'
  export default {
    data: () => {
      return {
        show: true,
        repayUrl: '',
        retryUrl: ''
      }
    },
    name: 'resultFailSelf',
    props: [],
    methods: {
      onRePay: () => {
        window.location.href = this.repayUrl
      },
      onReTry: () => {
        window.location.href = this.retryUrl
      },
      getData () {
        let self = this
        // this.axios.get(IRESULTFAILSELF, {}).then((response) => {
        //   this.repayUrl = response.data.repayurl
        //   this.retryUrl = response.data.retryurl
        //   self.show = true
        // }).catch((err) => {
        //   console.log(err)
        //   self.show = false
        // })
      }
    },
    activated: function () {
      this.getData()
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '~src/assets/scss/function';
  .rst-self-fail-content{
    position:absolute;
    width:100%;
    height:100%;
	overflow-x:hidden;
	overflow-y:scroll;
    text-align:center;
    background-color:#f6f6f6;
    .rst-self-fail {
      padding-top:rem-calc(50px);
      background-color:#fff;
      padding-bottom:rem-calc(50px);
      margin-bottom:rem-calc(26px);
      p {
        text-align:center;
      }
      .sf-icon-content {
        height:rem-calc(46px);
        margin-bottom:rem-calc(22px);
        text-align:center;
        img {
          height:100%;
        }
      }
      & p:nth-child(2) {
        font-size:rem-calc(18px);
        margin-bottom:rem-calc(8px);
      }
      & p:nth-child(3) {
        font-size:rem-calc(19px);
        margin-bottom:rem-calc(30px);
        span {
          color:#00adff;
        }
      }
    }
    .sf-repay-btn {
      font-size:16px;
      background-color:#00aeff;
      border-radius:4px;
      color:#fff;
      border:none;
      width:rem-calc(350px);
      height:rem-calc(46px);
    }
  }
</style>
