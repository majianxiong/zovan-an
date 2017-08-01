
<!--********************************************************************
 * Author        : Geyan
 * Email         : geyan@zhongan.io
 * Create Date   : 2017-05-04 18:01
 * Filename      : infoblock.vue
 * Description   : 类似时间线方式的信息块
 * Arguments     :
     title(string) : 标题
     icon(string)  : 标题左侧图标 eg. /static/pic/detail/*.png
     list  : 下方信息列表，可以是字符串数组或对象数组。 对象数组格式： {main:'主信息', sub:'副信息'}
        字符串格式：突出字体需要用span标签包裹
     guide : 是否需要左侧时间轴
     order : 是否有序列表
********************************************************************-->

<template>
  <div class='info-block'>
    <div class='info-title'>
      <span>{{blockTitle}}</span>
      <i ref='icon'></i>
    </div>
    <div class='info-split'></div>
    <div class='info-content' :class='{guide:useGuide,order:useOrder}'>
      <div v-for='(item,index) in infoList' class='info-line'>
        <template v-if='!!item.main'>
          <p class='main' v-html='item.main'></p>
          <p v-if='!!item.sub' class='sub' v-html='item.sub'></p>
          <i v-if='useOrder'>{{index+1}}.</i>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => {
      return {
      }
    },
    props: ['title', 'icon', 'list', 'guide', 'order'],
    activated () {
      this.initIcon()
    },
    created () {
      this.$nextTick(()=>{
        this.initIcon()
      })
    },
    computed: {
      blockTitle () {
        return this.title == '' ? '未定义' : this.title
      },
      useOrder () { // 是否使用有序列表
        return (this.order === false || this.order === 'false' || !this.order) ? false : true
      },
      useGuide () { // 是否使用时间线无序列表
        // 有序和无序列表只能选择一种，有序列表优先级高
        return this.useOrder || (this.guide === false || this.guide === 'false') ? false : true
      },
      infoList () {
        let tmplist = []
        for(let item of this.list) {
            if(typeof item === 'string') {
              tmplist.push({main:item, sub:''})
            } else if (item instanceof Object && item !== null) {
              tmplist.push({main:item.main?item.main:'', sub:item.sub?item.sub:''})
            } else {
              continue
            }
        }
        return tmplist
      }
    },
    methods: {
      initIcon () {
        const icon = this.$refs.icon
        icon.style.background = 'url('+this.icon+') no-repeat'
        icon.style.backgroundSize = 'auto 1rem'
      }
    }   
  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  @import '~assets/scss/function';
  .info-block {
    width:rem-calc(345px);
    margin:auto;
    padding:rem-calc(15px);
    padding-bottom:rem-calc(5px);
    box-sizing: border-box;
    border-radius:rem-calc(5px);
    box-shadow:0 rem-calc(1.5px) rem-calc(15px) 0 rgba(84, 220, 142, 0.2);
    background-color:#fff;

    .info-title {
      position:relative;
      span {
        font-size:rem-calc(16px);
        color:#333;
        margin-left:rem-calc(21px);
        font-weight:bold;
      }
      i {
        position:absolute;
        width:rem-calc(16px);
        height:rem-calc(14px);
        left:0;
        top:0;
        bottom:0;
        margin:auto;
      }
    }
    .info-split {
      margin-top:rem-calc(14.5px);
      margin-bottom:rem-calc(16px);
      border-top:1px solid #eee;
    }
    .info-content {
      color:#666;
      .info-line:last-child:after {
        border:none!important;
      }
      .info-line {
        position:relative;
        padding-bottom:rem-calc(25px);
        .main {
          font-size:rem-calc(14px);
          line-height:rem-calc(21px);
          position:relative;
          margin-bottom:rem-calc(6px);
          span {
            font-size:rem-calc(17px);
            color:#00bd96;
          }
        }
        .sub {
          font-size:rem-calc(11px);
          color:#999;
          line-height:rem-calc(15px);
          span {
            font-size:rem-calc(14px)
          }
        }
      }
    }
    .info-content.guide {
      margin-left:rem-calc(4px);
      .info-line {
        padding-left:rem-calc(18px);
        &:after{
          content:'';
          border-left:1px solid #0bce91;
          position:absolute;
          left:0;
          top:rem-calc(7px);
          width:0;
          height:100%;
        }
        .main:before {
          content:'';
          position:absolute;
          left:rem-calc(-22px);
          top:0;
          bottom:0;
          margin:auto;
          border-radius:50%;
          border:1px solid #0bce91;
          width:rem-calc(8px);
          height:rem-calc(8px);
          background-color:#fff;
          z-index:1;
        }
      }
    }
    .info-content.order {
      .info-line {
        padding-left:rem-calc(18px);
        i {
          position:absolute;
          left:0;
          top:rem-calc(3px);
          margin:auto;
          width:rem-calc(16px);
          height:rem-calc(14px);
        }
      }
    }
  }

</style>
