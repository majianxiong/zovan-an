<!--
      descript: 单选组件
        author: gongshuai
        param: props

      methods:
   seledcheck: 用于选择默认值 传入一个索引数即可
-->
<template>
    <div class="csinglebox" >
      <ul>
        <li v-for="(item, index) in items" :key="index">
            <chkbox
              :title = "item.title"
              :value = "item.value"
              :index = "index"
              @C_Click="seledcheck"
            ></chkbox>
        </li>
      </ul>
    </div>
</template>
<script>
  const chkbox = {
    template: `<div @click = "seledEvent('value')" class="ccheckbox" :class = "{'seled': seled}">{{title}}</div>`,
    data () {
      return {
        seled: false
      }
    },
    name: 'chkbox',
    props: ['title', 'value', 'index', 'seledindex'],
    computed: {
    },
    methods: {
      seledEvent (n) {
        if (this.seled) {
          return
        }
        this.seled = !this.seled
        this.$emit('C_Click', {title: this.title, value: this.value, index: this.index})
      },
      seled () {
        this.seled = true
      }
    }
  }
  export default {
    data () {
      return {
        checked: false
      }
    },
    created: function () {
    },
    mounted: function () {
      this.seledcheck({index: this.setValue})
    },
    // watch: {
    //   "setValue" (newVal, oldVal) {
    //     console.log('newVal')
    //     if (newVal != oldVal) {
    //       this.seledcheck(newVal)
    //     }
    //   }
    // },
    components: {
      chkbox
    },
    props: ["items", "setValue"],
    methods: {
      seledcheck (n) {
        let val = null
        this.$children.map(function (v, i, a) {
          if (i != n.index) {
            v.seled = false
          } else {
            v.seled = true
            val = v.value
          }
        })
        this.$emit('input', val)
      }
    }
  }
</script>
<style lang='scss' rel="stylesheet/scss">
  @import '~src/assets/scss/function';
  .csinglebox{
    &>ul{
      margin-left: rem-calc(15px);
    }
    .ccheckbox{
      position: relative;
      line-height: rem-calc(30px);
      vertical-align: middle;
      padding-left: rem-calc(25px);
      &:before{
        content: ' ';
        width:rem-calc(20px);
        height: rem-calc(20px);
        background:url('~src/assets/image/check/unseled.png') no-repeat;
        background-size:100% 100%;
        display: inline-block;
        position: absolute;
        top: rem-calc(3px);
        left:0;
        margin-right: rem-calc(10px);
      }
      &.seled{
        &:before{
          content: ' ';
          width:rem-calc(20px);
          height: rem-calc(20px);
          background:url('~src/assets/image/check/seled.png') no-repeat;
          background-size:100% 100%;
          display: inline-block;
          position: absolute;
          top: rem-calc(3px);
          left:0;
          margin-right: rem-calc(10px);
        }
      }
    }
  }
</style>
<style lang='scss' rel="stylesheet/scss">
  @import '~src/assets/scss/function';
  .csinglebox{
    &>ul{
       &>li{
         list-style: none;
         display: inline-block;
         line-height: rem-calc(25px);
         vertical-align: top;
       }
    }
    &.seled{
      color: #f00;
    }
  }
</style>
