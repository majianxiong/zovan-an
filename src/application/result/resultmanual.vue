
<!--********************************************************************
 * Author			: Geyan
 * Email			: geyan@zhongan.io
 * Last modified	: 2017-04-07 13:37
 * Filename			: resultManual.vue
 * Description		: e投保－查看投保结果－人工核保

********************************************************************-->

<template>
  <div class="rst-manual-content">
    <div v-if='show'>
      <div class="rst-manual">
        <p class="manual-icon-content"><img src="~src/assets/image/sand_box.png"></p>
        <p>您的投保单将进一步进行人工核保,</p>
        <p>请关注人工核保结果, 谢谢!</p>
        <p class="manual-contract">您的保险合同编号为<span>{{ contractId }}</span>。</p>
        <div class="manual-rule-content">
          <h5>自核不通过规则如下:</h5>
          <p>1.不通过原因大大扩大的我是分身乏术改法国队获得话动活动革；</p>
          <p>2.大的企鹅服务福斯特天的发射任务；</p>
          <p>3.认为特工很糊涂加工费。</p>
        </div>
      </div>
      <button class="manual-repay-btn" @onclick="onRePay">重新支付</button>
    </div>
    <c_errMsg  v-else txt = "啊哦 ～～,抱歉当前无记录信息哦!"></c_errMsg>
  </div>
</template>

<script>
  // import {IRESULTMANUAL} from 'src/api'
  export default {
    data: () => {
      return {
        show: true,
        contractId: '',
        repayUrl: ''
      }
    },
    name: 'resultManual',
    methods: {
      onRePay: () => {
        window.location.href = this.repayUrl
      },
      getData () {
        let self = this
        // this.axios.get(IRESULTMANUAL, {}).then((response) => {
        //   this.repayUrl = response.data.repayurl
        //   this.contractId = response.data.contractid
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
  .rst-manual-content {
    position:absolute;
    width:100%;
    height:100%;
    text-align:center;
    background-color:#f6f6f6;
    .rst-manual {
      padding-top:rem-calc(50px);
      background-color:#fff;
      margin-bottom:rem-calc(26px);
      p {
        text-align:center;
      }
      .manual-icon-content {
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
      }
      .manual-contract {
        font-size:rem-calc(15px);
        span {
          color:#00aeff;
        }
      }
      .manual-rule-content {
        width:100%;
        border-top:1px solid #eee;
        margin-top:rem-calc(25px);
        padding:rem-calc(20px) rem-calc(15px);
        color:#999;
        h5 {
          text-align:left;
          font-weight:normal;
          font-size:rem-calc(12px);
          margin-bottom:rem-calc(10px);
        }
        p {
          text-align:left;
          font-size:rem-calc(12px);
          margin:0;
          line-height:rem-calc(20px);
        }
      }
    }
    .manual-repay-btn {
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
