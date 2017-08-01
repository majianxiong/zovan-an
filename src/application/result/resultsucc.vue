
<!--********************************************************************
 * Author			: Geyan
 * Email			: geyan@zhongan.io
 * Last modified	: 2017-04-07 13:35
 * Filename			: resultSucc.vue
 * Description		: e投保－查看投保结果－成功

********************************************************************-->

<template>
  <div class="rst-succ-content">
    <div v-if='show'>
      <div class="rst-succ">
        <p class="succ-icon-content"><img src="~src/assets/image/succ.png"></p>
        <p>恭喜您投保成功</p>
        <p>您的保险合同编号为{{ contractId }},保险合同生效日期为{{ startTime }}。</p>
        <p class="succ-tip">温馨提示: 电子保单将发送到您的电子邮箱,请注意查收。</p>
      </div>
    </div>
    <c_errMsg  v-else txt = "啊哦 ～～,抱歉当前无记录信息哦!"></c_errMsg>
  </div>
</template>

<script>
  // import {IRESULTSUCC} from 'src/api'
  export default {
    name: 'resultSucc',
    data: () => {
      return {
        show: true,
        contractId: '',
        startTime: ''
      }
    },
    methods: {
      getData () {
        let self = this
        // this.axios.get(IRESULTSUCC, {}).then((response) => {
        //   this.contractId = response.data.contractid
        //   this.startTime = response.data.starttime
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
  .rst-succ-content {
    position:absolute;
    width:100%;
    height:100%;
    text-align:center;
    background-color:#f6f6f6;
    .rst-succ {
      padding-top:rem-calc(50px);
      background-color:#fff;
      padding-bottom:rem-calc(50px);
      margin-bottom:rem-calc(26px);
      p {
        text-align:center;
      }
      .succ-icon-content {
        height:rem-calc(46px);
        margin-bottom:rem-calc(22px);
        text-align:center;
        img {
          height:100%;
        }
      }
      & p:nth-child(2) {
        font-size:rem-calc(18px);
        margin-bottom:rem-calc(24px);
      }
      & p:nth-child(3) {
        font-size:rem-calc(15px);
        color:#666;
        line-height:rem-calc(28px);
        padding-left:rem-calc(10px);
        padding-right:rem-calc(10px);
        margin-bottom:rem-calc(11px);
      }
      .succ-tip {
        color:#00bd96;
      }
    }
  }

</style>
