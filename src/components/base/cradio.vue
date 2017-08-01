<!--
      descript: 单选组件
        author: gongshuai
        param: props

-->
<template>
    <div class="radio-button" @click="seledcheck()" >
      <span :class="{active: checked}">是</span>
      <span :class="{active: !checked}">否</span>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        checked: false
      }
    },
    methods: {
      seledcheck (n) {
        this.checked = !this.checked
        this.$emit('input', this.checked)
      }
    }
  }
</script>
<style lang='scss' rel="stylesheet/scss">
  @import '~src/assets/scss/function';
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
</style>
