<!--********************************************************************
父组件引入子组件之后，绑定v-show控制显隐
 *$emit('childup',value,false) : 第一个参数事件名，第二个参数传递到父组件的数据，第三个参数父组件上控制子组件显隐的属性
********************************************************************-->
<template>
    <div id="selectpage">
        <div class="search">
            <div class="content">
                <div class="picture">
                    <img src="~assets/image/search.png" alt="">
                </div>
                <form @submit.prevent="search($event)">
                    <input type="text" placeholder="例如，会计">
                </form>
                <!-- <span v-tap="{methods:closeSelectpage}">取消</span> -->
            </div>
        </div>
        <c_dictionary></c_dictionary>
        <div class="nofound" v-if="show">
            <p>未查询到相关职业~</p>
        </div>
        <ul class="message">
            <li v-for="l in list" @click="tranmess">{{l.cname}}</li>
        </ul>
    </div>
</template>
<style lang='scss' rel="stylesheet/scss" scoped>
@import '~src/assets/scss/function';
     #selectpage{
         width:100%;
         height:100%;
         background:#fff;
         position:fixed;
         top:0;
         left:0;
         bottom: 0;
         right: 0;
         z-index: 999;
         .search{
            background:#f0f0f0;
            padding:rem-calc(10px);
            &>.content{
                overflow:hidden;
                width:95%;
                height:rem-calc(30px);
                line-height:rem-calc(30px);
                margin:0 auto;
                background:#ffffff;
                &>.picture{
                    float:left;
                    height:rem-calc(30px);
                    line-height:rem-calc(30px);
                    padding:rem-calc(0 10px);
                    line-height:rem-calc(35px);
                }
                & input{
                    float:left;
                    width:80%;
                    height:rem-calc(30px);
                    border:none;
                }
            }
         }
         .nofound{
             width:rem-calc(150px);
             height:rem-calc(100px);
             background:url(../../assets/image/nofound.png) no-repeat center ;
             background-size:100% 100%;
             margin: 0 auto;
             margin-top:rem-calc(60px);
             text-align:center;
             line-height:rem-calc(240px);
             color:#a6a6a6;
             &>p{
                 font-size:rem-calc(14px);
                 color:#999;
             }
        }
        .message{
            li{
                text-indent:1rem;
                height:rem-calc(40px);
                line-height:rem-calc(40px);
                border-bottom:1px solid #f6f6f6;
                color:#999999;
            }
        }
    }
</style>
<script>
    import { getProfessionApi } from "src/api"
    export default {
        data(){
            return {
                show:false,
                list:[],
            }
        },
        methods:{
          closeSelectpage(){
            this.$emit('closeSelectpage')
          },
          search(e){
              this.list = []
              var name = e.target[0].value
              // console.log(name)
              this.axios.get(getProfessionApi + '?name=' + name)
              .then(res=>{
                  this.show = false
                  if(res.data.data.length !== 0){
                      this.list = res.data.data
                  }else{
                      this.show = true
                  }
              }).catch(err=>{
                  console.log(err)
              })
          },
          tranmess(e){
              var oli = document.querySelectorAll('li')
              for(var i=0;i<oli.length;i++){
                  oli[i].style.color = '#999999'
                  oli[i].style.borderBottom = '1px solid #f6f6f6'
              }
              e.target.style.color = '#1bc4a1'
              e.target.style.borderBottom = '1px solid #1bc4a1'
              var value = e.target.innerHTML
              this.$emit('childup',value,false)
          }
        }
    }
</script>
