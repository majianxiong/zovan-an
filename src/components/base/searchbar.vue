<!--********************************************************************
 * Author        : liuliqi
 * Email         : wb_liuliqi@zhongan.io
 * Create Date   : 2017-05-05 16:42
 * Filename      : searchbar.vue
 * Description   : 搜索功能框
 * #props:        defaultinfo: 默认placeholder
                  val:  功能按钮的内容
                  

********************************************************************-->
<template>
  <div id="searchbar">
    <div class="searinput">
      <input type="search" :placeholder="defaultInfo" v-model="searchval" @keyup.enter="goSearch($event)" @focus="showsearch"/>
    </div>
    <span class="cancel" @click="cancel">{{val}}</span> 
  </div>
</template>
<script>
  import store from '../../widget/plugin/store.js'
  export default {
    name: "c_searchbar",
    data () {
      return {
        searchval:"",
        hisarr: [],
        val: "取消"
      }
    },
    props: ["defaultInfo", "getHis","search","showHis"],
    methods: {
      showsearch(){
        this.$emit("show-his")
      },
      goSearch ($event) {
        var hisarr = store.get("searchHis");
        hisarr = hisarr?hisarr:[];
        var searchval = this.searchval;
        if(searchval!=""){
          var isnotExist = true;
          hisarr.forEach(function(el,i){
            if(searchval == el.name){
              isnotExist=false
            }
          })
          if(isnotExist){
            hisarr.unshift({name: searchval});
            //最多存6个。超过就删除最后一个
            if(hisarr.length>=7){
              hisarr.pop()
            }
            store.set("searchHis", hisarr);
          }
          this.$emit("search",searchval)
          $event.target.blur();
          this.$emit("get-his")
        }

      },
      cancel(){
        if(this.val=="取消"){
          this.searchval = "";
          this.showsearch();
        }else{

        }
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import '~src/assets/scss/function';
  #searchbar{
    position:absolute;
    top:0;
    left:0;
    right:0;
    padding:rem-calc(9px) rem-calc(15px);
    overflow:hidden;
    background:#fff;
    @include borderbottom-1px(#eee);
    &>.searinput{
      width:rem-calc(303px);
      height:rem-calc(28px);
      border-radius:3px;
      background:url(../../assets/image/order/wenhao.png) no-repeat rem-calc(10px) center;
      background-color:#f6f6f6;
      float:left;
      &>input{
        height:100%;
        margin-right:rem-calc(34px);
        border:none;
        outline:none;
        margin-left:rem-calc(34px);
        width:85%;
      }
      &>input::-webkit-search-cancel-button{
        display:none;
      } 
    }
    &>.cancel{
      float:right;
      line-height:rem-calc(28px);
      color:#00bd96;
    }
  }
</style>