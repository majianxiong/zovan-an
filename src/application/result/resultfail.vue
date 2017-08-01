
<!--********************************************************************
 * Author        : Geyan
 * Email         : geyan@zhongan.io
 * Last modified : 2017-04-07 17:36
 * Filename      : resultFail.vue
 * Description   : e投保－查看投保结果－支付失败

********************************************************************-->

<template>
  <div class="rst-fail-content">
    <div v-if='show'>
      <div class="rst-fail">
        <p class="fail-icon-content"><img src="~src/assets/image/sad.png"></p>
        <p>啊哦 ~ ~, 支付遇到问题,</p>
        <p>请核实后, 再进行支付。</p>
        <p>问题描述:  {{ failedMsg }}</p>
      </div>
      <button class="fail-repay-btn" @onclick="onRePay">重新支付</button>
    </div>
    <c_errMsg  v-else txt = "啊哦 ～～,抱歉当前无记录信息哦!"></c_errMsg>
  </div>
</template>

<script>
  // import {IRESULTFAIL} from 'src/api'
  export default {
    name: 'resultFail',
    data: () => {
      return {
        show: true,
        failedMsg: '',
        repayUrl: ''
      }
    },
    activated: function () {
      this.getData()
    },
    methods: {
      onRePay: () => {
        window.location.href = this.repayUrl
      },
      getData () {
        let self = this
        // this.axios.get(IRESULTFAIL, {}).then((response) => {
        //   this.repayUrl = response.data.repayurl
        //   this.failedMsg = response.data.failedmsg
        //   self.show = true
        // }).catch((err) => {
        //   console.log(err)
        //   self.show = false
        // })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '~src/assets/scss/function';
  .rst-fail-content {
    position:absolute;
    width:100%;
    height:100%;
    text-align:center;
    background-color:#f6f6f6;
    .rst-fail {
      padding-top:rem-calc(50px);
      background-color:#fff;
      padding-bottom:rem-calc(54px);
      margin-bottom:rem-calc(26px);
      p {
        text-align:center;
      }
      .fail-icon-content {
        height:rem-calc(46px);
        margin-bottom:rem-calc(22px);
        text-align:center;
        img {
          height:100%;
        }
      }
      & p:nth-child(2) {
        font-size:rem-calc(19px);
        margin-bottom:rem-calc(8px);
      }
      & p:nth-child(3) {
        font-size:rem-calc(19px);
        margin-bottom:rem-calc(30px);
      }
      & p:nth-child(4) {
        font-size:rem-calc(15px);
        color:#666;
      }
    }
    .fail-repay-btn {
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
