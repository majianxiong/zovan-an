<!--********************************************************************
 * Author        : anfeng
 * Email         : wb_anfeng@zhongan.io
 * Create Date   : 2017-07-04 19:42
 * Filename      : teamslider.vue
 * Description   : 滑动条
 * list          : props  传数组
 * crownshow     : props  是否显示皇冠 默认false
 * gonext        : 向父组件传递的事件
 * canclick      : props 第一个是否可以点击 默认false
********************************************************************-->

<template>
    <div class="slide">
      <div class="slide-blank">
        <div class="slide-content" :class="{'flex': list.length > 3 ? false : true}">
           <div class="wodpic" v-for="(item,index) in list" :key="index" :class="{'backgr':(index==0 && crownshow==true) ? true : false}" v-tap="{methods:()=>{(index==0 && canclick)?gonext():''}}"> 
             <img :src="item.headImage?item.headImage:require('src/assets/image/teamact/header_picture.png')">
             <p>{{item.title?item.title:item.userName}}</p> 
           </div> 
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name:'teamslider',
  data(){
    return{
    }
  },
  props:{
    crownshow:{
      type:Boolean,
      default:false
    },
    canclick:{
      type:Boolean,
      default:false
    },
    list:{
      type:Array,
      default:function(){
          return [
          
        ]
      },
    }
  },
  methods:{
    gonext(){
      this.$emit('godetail')
    }
  }
}
</script>

<style lang='scss' rel="stylesheet/scss">
  @import '~src/assets/scss/function';
  ::-webkit-scrollbar{
    width:0;
    height:0;
  }
  .flex{
    display:flex;
    flex-flow: row nowrap;
    justify-content: space-around;
  }
  .backgr{
     background:url(~assets/image/teamact/icon_crown.png) rem-calc(45px) rem-calc(13px) no-repeat;
  }
  .slide{
   margin:rem-calc(0 15px);
    .slide-blank{
      background-image: linear-gradient(34deg, #ff8238, #fe9538);
      box-shadow: 0px 3px 10px 0px rgba(237, 97, 12, 0.26);
      padding-left:rem-calc(15px);
      padding-right:rem-calc(15px);
      height:rem-calc(105px);
      .slide-content{
        overflow-y:hidden;
        overflow-x:auto;
        white-space: nowrap;
        min-width: 100%;
        &>.wodpic{
          display:inline-block;
          margin-left:rem-calc(17px);
          width:22%;
          & img{
            margin-top:rem-calc(13px);
            border-radius:50%;
            width:rem-calc(55px);
            height:rem-calc(55px);
          }
          & p{
            font-size:rem-calc(13px);
            text-align:center;
            color:#fff19f;
            width:rem-calc(80px);
            padding-top:rem-calc(8px);
            margin-left:rem-calc(-12px);
            overflow:hidden; //隐藏
            white-space:nowrap; //文本不进行换行
            word-break: keep-all;  //中英文不断词
            word-wrap: normal;    //保持默认处理
            text-overflow: ellipsis;  //显示省略符号来代表被修剪的文本
            -webkit-text-overflow: ellipsis;
          }
        }
      }
      }
  }
</style>



