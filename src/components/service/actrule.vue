<template>
  <div id="actrule">
    <div class="context" v-for="item in context">
      {{item.title}}
      <p v-for="el in item.detail">
      {{el.text}}
      </p>
    </div>
  </div>
</template>
<script>
  export default {
    name:"c_actrule",
    data(){
        return{

        }
    },
    props:["context"]
  }
</script>
<style lang='scss' rel='stylesheet/scss'>
  @import '~src/assets/scss/function';
  #actrule{
    width:96%;
    margin:0 auto;
    background-image:url(~assets/image/teamact/actgz.png);
    background-size:100% 100%;
    padding-top:rem-calc(30px);
    height:rem-calc(275px);
    &>.context{
      line-height:rem-calc(22px);
      margin-left:rem-calc(20px);
      margin-bottom:rem-calc(12px);
      color:#fff19f;
      &>p{
        
      }
    }
  }
</style>