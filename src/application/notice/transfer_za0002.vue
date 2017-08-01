<template>
    <div id="transfer">
        <div class="content">
            <span>1、投保人同意本公司从本投保书授权的银行账号中转账支付保险费。<br></span>
            <span>2、投保人保证此账号中余额充足。若因余额不足造成转账不成功，导致合同不能生效或合 同失效的，后果由投保人承担。<br></span>
            <span>3、投保人同意本公司通过此账号进行退费操作。<br></span>
            <span>4、投保人因故结清账户或希望改变付费账户，应及时通知本公司进行变更。</span>
        </div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import '~src/assets/scss/function';
  #transfer{
      box-sizing:border-box;
      -webkit-box-sizing: border-box;
      width:100%;
      background:#f6f6f6;
      min-height:100%;
      &>.content{
          padding:rem-calc(15px);
          &>span{
              line-height:rem-calc(20px);
              color:#999;
          }
      }
  } 
</style>