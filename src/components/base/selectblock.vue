<!--
      descript: 选择块组件
        author: gongshuai
        param: props

-->
<template>
  <div class="wrapper">
    <div class="title">{{title}}</div>
    <div class="item">
      <ul>
        <li v-for="(item, index) in list" :key="index" class="block"
            :class="{selected: selectArr[index] == index}"
            @click="select(index)">{{item.value}}
        </li>
      </ul>
    </div>
    <div class="input" v-show="inputShow">
      <input type="text" placeholder="请输入" v-model="inputText">
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        inputShow: false,
        inputText: '',
        selectArr: []
      }
    },
    props: {
      list: {
        type: Array,
        defaylt: []
      },
      mutiple: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      }
    },
    computed: {},
    created () {
      this.selectArr = new Array(this.list.length)
    },
    methods: {
      select (index) {
        const current = this.selectArr[index] !== undefined
        const select = current && this.selectArr[index] === index
        if (this.mutiple) {
          if (select) {
            this.selectArr.splice(index, 1, undefined)
          } else {
            this.selectArr.splice(index, 1, index)
          }
        } else {
          this.selectArr.forEach((item) => {
            this.selectArr.splice(item, 1, undefined)
          })
          this.selectArr.splice(index, 1, index)
        }
        this.inputShow = this.selectArr[this.list.length - 1] !== undefined
      }
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss" scoped>
  @import '~src/assets/scss/function';

  .wrapper {
    background-color: #ffffff;
    font-size: rem-calc(15);
    .title {
      color: #333333;
    }
    .item {
      margin: rem-calc(10) 0;
      margin-left: rem-calc(-5);
      & > ul {
        list-style: none;
        .block {
          display: inline-block;
          color: #999999;
          text-align: center;
          height: rem-calc(30);
          width: rem-calc(75);
          line-height: rem-calc(30);
          margin: rem-calc(4);
          border: rem-calc(1) solid #b5b5b5;
          border-radius: rem-calc(5)
        }
        .selected {
          color: #ffffff;
          background-color: #00b0ff;
          border: rem-calc(1) solid #00b0ff;
        }
      }
    }
    .input {
      display: flex;
      & > input {
        flex: 1;
        height: rem-calc(45);
        font-size: rem-calc(15);
        padding-left: rem-calc(15);
        outline: none;
        border-color: #b5b5b5;
      }
    }
  }
</style>
