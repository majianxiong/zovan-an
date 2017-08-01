
<!--********************************************************************
 * Author        : Geyan
 * Email         : geyan@zhongan.io
 * Create Date   : 2017-05-05 18:47
 * Filename      : planform.vue
 * Description   : 计划书列表样式
 * Arguments     :
     datas: 数据对象，包含如下字段
        sex // 0男1女
        age // 被保人年龄字符串，如“20周岁”
        limit // 缴费期限
        duration // 保险期间
        recent // 最近打开时间
        price // 总金额

********************************************************************-->

<template>
<div class='plan-list-item'>
  <div class='item-header'>
    <p class='main'>{{title}}</p>
    <p class='sub'>{{subtitle}}</p>
  </div>
  <div class='item-body'>
    <div class='table'>
      <div class='row'>
        <div class='cell'>被保人年龄</div>
        <div class='cell'>{{userData.age}}<span class='sex-span' :class='userData.sex==0?"male":"female"'>{{userData.sex == 0?'男':'女'}}</span></div>
      </div>
      <div class='row'>
        <div class='cell'>缴费期限</div>
        <div class='cell'>{{userData.limit}}</div>
      </div>
      <div class='row'>
        <div class='cell'>保险期间</div>
        <div class='cell'>{{userData.duration}}</div>
      </div>
      <div class='row'>
        <div class='cell'>最近打开时间</div>
        <div class='cell'>{{userData.recent}}</div>
      </div>
    </div>
  </div>
  <div class='item-footer'>
    <p>保险金额<span>¥{{userData.price}}</span></p>
  </div>
</div>
</template>

<script>
  export default {
    data: () => {
      return {
      }
    },
    props: [],
    methods: {
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  @import '~assets/scss/function';

</style>
