<template>
    <div>
        <div class="success"></div>
        <p>提交成功</p>
        <p>关注下面公众号，或在</p>
        <p>微信中搜索公众号保啊，了解投保进度</p>
        <div class="sweep"></div>
        <p>扫一扫关注</p>
        <button>确认</button>
    </div>
</template>
<style lang='scss' rel='stylesheet/scss'>
@import '~assets/scss/function';
    .success,p,.sweep,button{
        margin:0 auto;
    }
    .success{
        margin-top:rem-calc(50px);
        height:rem-calc(72px);
        width:rem-calc(72px);
        background:url(../../assets/image/success.png) no-repeat center;
    }
    p{
        width:100%;
        text-align:center;
        color:#666666;
    }
    p:nth-child(2){
        font-size:rem-calc(19px);
        line-height:rem-calc(55px);
        color:#00bd96;
        font-weight:bold;
    }
    p:nth-child(3),p:nth-child(4), p:nth-child(6){
        font-size:rem-calc(16px);
        line-height:rem-calc(28px);
    }
    .sweep{
        margin-top:rem-calc(40px);
        background:url(../../assets/image/sweep.png) no-repeat center;
        width:rem-calc(170px);
        height:rem-calc(170px);
    }
    p:nth-child(6){
        margin-top:rem-calc(10px);
    }
    button{
        display:block;
        width:85%;
        height:rem-calc(45px);
        background:#4cd5a8;
        margin-top:rem-calc(25px);
        border:none;
        color:#ffffff;
        font-size:rem-calc(20px);
        border-radius:rem-calc(7px);
    }
</style>