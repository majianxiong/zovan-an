
<!--********************************************************************
 * Author        : Geyan
 * Email         : geyan@zhongan.io
 * Create Date   : 2017-05-06 16:18
 * Filename      : payform.vue
 * Description   : 支付功能输入框
 * Arguments     :
	inputlen // 输入长度
 * Callback      :
	submit // 输入满提交回调
********************************************************************-->

<template>
<div class='pay-form-container'>
  <div v-for='n in totallen' class='form-item' :class='curlen >= n ? "set" : ""' :style="{width:(100/inputlen + '%')}"></div>
  <input id='payinput' type='tel' v-model='value' :maxlength='totallen'>
</div>
</template>

<script>
  export default {
    data: () => {
      return {
        value:'',
        max: 10,
      }
    },
    computed: {
      totallen () {
        let cur = this.inputlen > this.max ? this.max : this.inputlen
        return parseInt(cur)
      },
      curlen () {
        return this.value.length
      }
    },
    watch: {
      curlen (val) {
        if(val === this.totallen) {
          this.$emit('submit', this.value)
        }
      }
    },
    created() {
      this.$nextTick(() => {
        this.value = this.val
      })
    },
    activated () {
      this.$nextTick(() => {
        this.value = this.val
      })
    },
    deactivated () {
    },
    props: ['inputlen', 'val'],
    methods: {
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  @import '~assets/scss/function';
  .pay-form-container {
    display:table;
    border-collapse: collapse;
    position:relative;
    width:100%;
    height:100%;
    margin:0 auto;
    background:#f5f5f5;
    input {
      opacity:0;
      position:absolute;
      left:0;
      top:0;
      width:100%;
      height:rem-calc(33px);
    }
    .form-item {
      display:table-cell;
      border:1px solid #c7c7c7;
      height:rem-calc(33px);
      position:relative;
      box-sizing:border-box;
      background:#fff;
    }
    .form-item.set:before {
      content:'';
      position:absolute;
      top:0;bottom:0;right:0;left:0;
      margin:auto;
      width:rem-calc(8px);
      height:rem-calc(8px);
      border-radius:rem-calc(4px);
      background-color:#000;
    }
  }

</style>
