
<!--********************************************************************
 * Author        : Geyan
 * Email         : geyan@zhongan.io
 * Create Date   : 2017-05-06 15:52
 * Filename      : footerSingle.vue
 * Description   : 底部单button
 * Arguments     :
     name: button名
	   color: 按钮颜色
 * Callbacks     :
     click: button点击事件

********************************************************************-->

<template>
<div class='footer-container'>
  <button :style='{backgroundColor:color}' v-tap='{methods:onclick}'>{{ name }}</button>
</div>
</template>

<script>
  export default {
    data: () => {
      return {
      }
    },
    props: ['name','color'],
    methods: {
      onclick () {
        this.$emit('tap')
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  @import '~assets/scss/function';
  .footer-container {
    position:fixed;
    -webkit-transform: translateZ(0);
    bottom:0;
    width:100%;
    height:rem-calc(50px);
    z-index:1;
    button {
      width:100%;
      height:100%;
      font-size:rem-calc(17px);
      border:none;
      outline: none;
      color:#fff;
    }
  }
</style>
