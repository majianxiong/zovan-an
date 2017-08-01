
<!--********************************************************************
 * Author        : Geyan
 * Email         : geyan@zhongan.io
 * Create Date   : 2017-04-11 17:42
 * Filename      : bluebutton.vue
 * Description   : 蓝色底部按钮

********************************************************************-->

<template>
  <div class='ui-btn-content'>
    <button class='ui-btn' v-tap='{methods:onBtClick}'>{{ text }}</button>
  </div>
</template>

<script>
  export default {
    name: 'ui-btn',
    data: () => {
      return {
      }
    },
    props: {
      'text': {
        type: String,
        // required: true,
        // default: 'text'
      },
      'linkUrl': {
        type: String,
        // default: ''
      },
      'event':{
        type: Function
      }
      // 'params': {
      //   type: Object,
      // }
    },
    methods: {
      onBtClick: function () {
        this.event()
        // this.$emit('event')
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  @import '~assets/scss/function';
  .ui-btn-content {
    text-align:center;
    border-radius: 6px;
    .ui-btn {
      @include button;
    }
  }
</style>
