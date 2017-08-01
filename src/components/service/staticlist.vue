
<!--********************************************************************
 * Author        : Geyan
 * Email         : geyan@zhongan.io
 * Create Date   : 2017-04-11 15:06
 * Filename      : staticlist.vue
 * Description   : 静态列表

********************************************************************-->

<template>
<div class='static-list-content'>
  <div v-if='title' class='list-title'>{{ title }}</div>
  <ul class='list-body'>
    <li class='list-item' v-for='(item,idx) in list'>
      <p :class='{last:idx === list.length-1}'>
        <span class='list-item-left'>{{ item.key }}</span>
        <span class='list-item-right' :class='{blue:item.color && item.color === "blue"}'>{{ item.value }}</span>
      </p>
    </li>
  </ul>
</div>
</template>

<script>
  export default {
    name: 'c_staticlist',
    data: () => {
      return {
      }
    },
    props: ['title', 'list'],
    methods: {
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  @import '~src/assets/scss/function';
  .static-list-content {
    .list-title {
      height:rem-calc(35px);
      line-height:rem-calc(35px);
      background-color: transparent;
      padding-left:rem-calc(13px);
    }
    .list-body {
      padding-left:rem-calc(15px);
      background-color:#fff;
      color:#333;
      .list-item {
        height:rem-calc(48px);
        list-style:none;
        p {
          height:100%;
          border-bottom:1px solid #e1e1e1;
          padding-left:rem-calc(5px);
          padding-right:rem-calc(13px);
          box-sizing:border-box;
        }
        .last {
          border-bottom: none;
        }
        span {
          line-height:rem-calc(48px);
          font-size:rem-calc(15px);
        }
        .list-item-left {
          float:left;
        }
        .list-item-right {
          float:right;
          color:#999;
        }
        .list-item-right.blue {
          color:#00adff;
        }
      }
    }
  }
</style>
