<!--
      descript: 单选组件
        author: gongshuai
        param: props

-->
<template>
  <div class="wrapper">
    <div class="radio-index">{{index+1}}.</div>
    <div class="radio-text">{{item.text}}</div>
    <div class="radio-button" @click="check()" v-show="radioShow">
      <span :class="{active: item.checked}">是</span>
      <span :class="{active: !item.checked}">否</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        default: function () {
          return {}
        }
      },
      index: '',
      radioShow: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      check () {
        this.item.checked = !this.item.checked
      }
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss" scoped>
  @import '~src/assets/scss/function';

  .wrapper {
    background-color: #ffffff;
    display: flex;
    .radio-index {
      margin-right: rem-calc(3);
      color: #999999;
    }
    .radio-text {
      flex: 1;
      line-height: rem-calc(20);
    }
    .radio-button {
      display: flex;
      height: rem-calc(25);
      overflow: hidden;
      width: rem-calc(70);
      margin-left: rem-calc(21);
      align-items: center;
      border: 1px solid #00a5ff;
      border-radius: 5px;
      & > span {
        flex: 1;
        text-align: center;
        color: #999999;
        padding: rem-calc(6) 0;
      }
      & > :first-child {
        border-right: 1px solid #00a5ff;
      }
      .active {
        color: #ffffff;
        background-color: #00a5ff;
      }
    }
  }
</style>
