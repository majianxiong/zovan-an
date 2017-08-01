
<!--********************************************************************
 * Author        : liuliqi
 * Email         : wb_liuliqi@zhongan.io
 * Create Date   : 2017-05-02 17:42
 * Filename      : nextbtn.vue
 * Description   : 底部渐变按钮
 * showPlugin:显示弹框；
 *config：按钮内容等一些参数;
 *onBtClick:事件处理

********************************************************************-->

<template>
  <div class='next-btn' @click='onBtClick' onselectstart="return false">
    {{ config.val }}
  </div>
</template>

<script>
  export default {
    name: 'c_btn',
    data: () => {
      return {
      }
    },
    props: ['showPlugin', "config", "goNext"],
    methods: {
      onBtClick: function () {
        this.$emit('show-plugin');
        this.$emit("go-next")
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss' scope>
  @import '~assets/scss/function';
  .next-btn{
    height:rem-calc(45px);
    line-height:rem-calc(45px);
    width:rem-calc(345px);
    background-image: -webkit-linear-gradient( 0deg, rgb(108,217,182) 0%, rgb(54,210,159) 45%, rgb(0,203,135) 100%);
    border-radius: rem-calc(3px);
    margin:0 auto;
    text-align:center;
    color:#fff;
    font-size:rem-calc(17px);
  }
</style>
