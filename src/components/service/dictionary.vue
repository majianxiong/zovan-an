<template>
    <div class="page-dictionary">
         <div v-if="showSearchbar" class="input">
            <div class="input-content">
                <img src="~assets/image/search.png" alt="">
                <input ref="search" type="search" :placeholder="placeholder" @keydown.enter="search" @input="input">
            </div>
         </div>
         <div v-if="showInitialData" v-for="(l,listIndex) in arr1" class="list" v-show="show" ref="lists" @click.stop="tog($event)">
            <!-- <div class="list-icon"></div> -->
            <span class="li-title" ref="lis1"> {{l.cname}}</span>
            <ul class="list-clear">
                <li v-for="(a,index) in l.children">
                    <div ref="lis2" class="li-title" @click.stop="tog($event)">{{a.cname}}</div>
                    <ul>
                        <li v-if="stage == 4" v-for="b in a.children" class="content">
                            <span class="li-title">{{b.cname}}</span>
                            <!-- <span class="content-foot" :class="{'reject':b.category=='拒保'}">{{b.category}}类</span> -->
                            <div class="cbox">
                              <div v-for="c in b.children" class="content" v-tap="{methods:goback,name:c.cname,level:c.lifeRiskLevel,code:c.code}">
                                <span>{{c.cname}}</span>
                                <span class="content-foot" :class="{'reject':c.category=='拒保'}">{{c.lifeRiskLevel}}类</span>
                              </div>
                            </div>
                        </li>
                        <li v-if="stage == 3" v-for="c in a.children" class="content" v-tap="{methods:goback,name:c.cname,level:c.lifeRiskLevel,code:c.code}">
                          <div class="content bgn">
                            <span>{{c.cname}}</span>
                            <span class="content-foot" :class="{'reject':c.category=='拒保'}">{{c.lifeRiskLevel}}类</span>
                          </div>
                        </li>
                    </ul>
                </li>
            </ul>
         </div>

         <!-- <div v-for="l in arr1" class="list" v-show="show">
            <div class="list-icon"></div>
            <span class="li-title"> {{l.title}}</span>
            <ul class="list-clear">
                <li v-for="(a,index) in l.content">
                    <div class="li-title" @click="tog($event)">{{a.title}}<div></div></div>
                    <ul style="display:none">
                        <li v-for="b in a.content" class="content">
                            <span>{{b.title}}</span>
                            <span class="content-foot" :class="{reject:b.content == '拒保'? true : false}">{{b.content}}类</span>
                        </li>
                    </ul>
                </li>
            </ul>
         </div> -->

         <div class="nofound" v-if="showed">
            <p>未查询到相关职业~</p>
         </div>
         <ul class="message" v-if="!show">
            <li v-tap="{methods:goback,name:t.cname,code:t.lifeRiskLevel}" v-for="t in list">{{t.cname}}</li>
        </ul>
    </div>
</template>
<style lang='scss' rel="stylesheet/scss">
@import '~src/assets/scss/function';
  .page-dictionary{
    background-color: #fff;
     &>.input{
         box-sizing:border-box;
         width:100%;
         height:rem-calc(45px);
         background:#f0f0f0;
         border-radius:rem-calc(3px);
         padding-top:rem-calc(8px);
         &>.input-content{
            height:rem-calc(28px);
            margin:0 rem-calc(15px);
            background:#fff;
            &>img{
                vertical-align: middle;
                height:rem-calc(15px);
                width:rem-calc(15px);
                margin-left:rem-calc(13px);
            }
            &>input{
                width:80%;
                height:rem-calc(30px);
                border:none;
                padding-left: 5px;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                font-size: rem-calc(14px);
            }
         }
     }
     .li-title{
        color:#333;
        margin-left:rem-calc(15px);
        min-height:rem-calc(40px);
        line-height:rem-calc(40px);
        display: block;
        position: relative;
        @include borderbottom-1px(#eee);
        & + ul{
          display: none;
        }
        &.active{
          &:after{
            transform: rotate(90deg);
          }
          & + ul{
            display: block;
          }
        }
        &:after{
          content: '';
          background: url(~assets/image/arrow_l.png) 0 0 no-repeat;
          width: rem-calc(5px);
          height: rem-calc(8px);
          -webkit-background-size: contain;
          background-size: contain;
          display: block;
          transform:rotate(-90deg);
          margin:rem-calc(16px);
          top: 0;
          right: 0;
          position: absolute;
        }
     }
     &>.list{
       font-size: rem-calc(14px);
       overflow: hidden;
         &>.list-icon{
           float:left;
           width:rem-calc(5px);
           height:rem-calc(20px);
           background:#56d4b4;
           margin-top:rem-calc(10px);
           box-shadow: 3px 0px 7px 0px rgba(0, 197, 147, 0.21);
         }
         &>.list-clear{
           display: none;
           clear:both;
             .li-title{
               padding-left: rem-calc(10px);
               color: #666666;
             }
             > li{
               overflow: hidden;
             }
             & .content{
                margin-left:rem-calc(25px);
                padding-left:rem-calc(10px);
                line-height:2;
                @include borderbottom-1px(#eee);
                clear: both;
                color: #666;
                // overflow: hidden;
                & > .li-title{
                  padding-left: 0;
                  margin-left: 0;
                  background: none;
                  &.active + .cbox{
                    display: block;
                  }
                }
                .cbox{
                  display: none;
                }
                .content{
                  background: none;
                  margin-left: rem-calc(-10px);
                  padding: rem-calc(5px)  rem-calc(10px);
                  @include bordertop-1px(#eee);
                  color: #999;
                  &.bgn{
                    background: none;
                  }
                }
                &>.content-foot{
                    color:#00bd96;
                    float:right;
                    &.reject{
                      width:rem-calc(30px);
                      height:rem-calc(25px);
                      background:#ccc;
                      float:right;
                      margin:rem-calc(8px);
                      border-radius:rem-calc(5px);
                      line-height:rem-calc(25px);
                      color: #666;
                    }
                }
             }
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
    .nofound{
        width:rem-calc(150px);
        height:rem-calc(100px);
        background:url(../../assets/image/nofound.png) no-repeat center ;
        background-size:100% 100%;
        margin: 0 auto;
        margin-top:rem-calc(50px);
        text-align:center;
        line-height:rem-calc(280px);
        color:#a6a6a6;
     }
  }
</style>
<script>
    import * as utils from 'src/widget/plugin/libs/util'
    import * as types from 'src/store/mutation-types'
    import * as store from 'src/widget/plugin/store'
    import { getProfessionApi } from "src/api"
    let data = {
      backgd:false,
      show:true,
      theme:'职业查询类别',
      placeholder:"例如，工程师",
      arr1:[],
      arr2:[],
      arr3:[],
      arr4:[],
      list:[],
      name:'',
      showed:false,
    }
    export default {
      name: 'dictionary',
        data(){
            return {
              ...data,
              //后续扩展接口必须输出层级数
              stage: ''
              // searchVal:''
            }
        },
        props: {
          'showInitialData': {
            type: Boolean,
            // required: true,
            default: true
          },
          'showSearchbar': {
            type: Boolean,
            // required: true,
            default: false
          },
          'query':{
            type: Object
          },
          'source':{
            type: String
          },
          'keyword':{
            type: String
          },
          'version':{
            type: String,
            defalut: '2010'
          }
        },
        created(){
            this.$store.commit(types.VISITEDDICTIONARY,{flag:true})
          // console.log('created')
            //  存储localstorage
            if(this.$route.name == 'selectjob'){
              this.reset()
            }
            this.stage = this.version == '2008'?3:4
            let ls = store.get('dictionary_job'+this.version)
              // console.log(ls)
            if( ls && ls!='[]' && store.get('dictionary_job_expires') == '20170727'){
              // console.log(ls)
              this.dataFilter(JSON.parse(ls))
              // this.arr1 = JSON.parse(ls)
            }else{
            // console.log(store.get('dictionary_job'))
              this.arr1 = []
              this.axios.get(getProfessionApi+'?version='+this.version).then((data)=>{
                if(data.data.status != "SUCCESS"){
                  this.$vux.toast.show({
                    text: data.data.message || '获取数据失败',
                    type: 'text',
                    width: '80%'
                  });
                  return
                }
                var arr =  data.data.data
                this.dataFilter(arr)
                store.set('dictionary_job_expires','20170727')
                store.set('dictionary_job'+this.version,JSON.stringify(arr))
              }).catch(err=>{
                console.log(err)
              })
            }
          if( this.$refs.search ){
            this.$refs.search.value = ''
          }
          this.show = true
          // console.log(this.$refs.lis.length)
          if(this.$refs.lis1 && this.$refs.lis1.length){
            this.$refs.lis1.forEach((item)=>{
              item.className = "li-title"
            })
          }
          if(this.$refs.lis2 && this.$refs.lis2.length){
            this.$refs.lis2.forEach((item)=>{
              item.className = "li-title"
            })
          }
        },
        mounted(){
        },
        activated(){
          this.$store.commit(types.VISITEDDICTIONARY,{flag:true})
          if(this.$refs.lis1 && this.$refs.lis1.length){
            this.$refs.lis1.forEach((item)=>{
              item.className = "li-title"
            })
          }
          if(this.$refs.lis2 && this.$refs.lis2.length){
            this.$refs.lis2.forEach((item)=>{
              item.className = "li-title"
            })
          }
        },
        // created() {
        //   if( this.$refs.search ){
        //     this.$refs.search.value = ''
        //   }
        //   this.show = true
        //   // console.log(this.$refs.lis.length)
        //   if(this.$refs.lis && this.$refs.lis.length){
        //     this.$refs.lis.forEach((item)=>{
        //       item.className = "li-title"
        //     })
        //   }
        // },
        methods:{
          jsonTree(data){
            let res = utils.jsonTree(data, {
                id: 'code',
                pid: 'parent'
                // children: 'kids'
            })
            console.log(res.data)
            this.arr1 = res.data
            // res.data.forEach((v,i)=>{
            //   v.children && v.children.forEach((w,i)=>{
            //     w.children && w.children.forEach((x,i)=>{
            //       x.children && x.children.forEach((y,i)=>{
            //         this.arr2.push(y)
            //       })
            //     })
            //   })
            // })
            // console.log(this.arr2)
          },
          dataFilter(arr){
            for(var i=0;i<arr.length;i++){
              if(arr[i].parent == null){
                  var arr2 = []
                  for(var j=0;j<arr.length;j++){
                      if(arr[j].parent == arr[i].code){
                          var arr3 = []
                          for(var k=0;k<arr.length;k++){
                              if(arr[k].parent == arr[j].code){
                                var arr4 = []
                                for(var l=0;l<arr.length;l++){
                                    if(arr[l].parent == arr[k].code){
                                      arr4.push({cname:arr[l].cname,code:arr[l].code,lifeRiskLevel:arr[l].lifeRiskLevel,category:arr[l].category,children:arr[l].children})
                                      // this.arr4.push(arr4)
                                    }
                                }
                                arr3.push({cname:arr[k].cname,code:arr[k].code,lifeRiskLevel:arr[k].lifeRiskLevel,category:arr[k].category,children:arr4})
                                // this.arr3.push(arr3)
                              }
                          }
                          arr2.push({cname:arr[j].cname,code:arr[j].code,lifeRiskLevel:arr[j].lifeRiskLevel,children:arr3})
                          // this.arr2.push(arr2)
                      }
                  }
                  this.arr1.push({cname:arr[i].cname,code:arr[i].code,lifeRiskLevel:arr[i].lifeRiskLevel,children:arr2})
              }
            }
            // console.log(arr)
            console.log(this.arr1)
            // console.log(this.arr2)
            // console.log(this.arr3)
            // console.log(this.arr4)
          },
          reset(){
            // console.log('reset')
            for(let x in this.$data){
              this.$data[x] = data[x]
            }
            // window.scrollTo(0,0)
          },
          goback(param){
            if(this.$route.name == 'selectjob'){
              let query = this.query
              // this.query.forEach((item)={
              //
              // })
              query[this.keyword] = [param.name,param.code,param.level]
              console.log(query)
              this.$store.commit(types.ADDJOB,{arr:query})
              // console.log(this.$store.state.dictionary)
              this.$router.go(-1)
              // this.$router.replace({path:this.source,query:query})
            }
          },
          tog(e){
            // console.log(!!~(e.target.className.indexOf('active')))
            e.target.className = !!~(e.target.className.indexOf('active'))? e.target.className.replace(' active',''):e.target.className+" active"
          },
          search(e){
              if(e.target.value){
                  this.show = false
                  this.name = e.target.value
                  this.axios.get(getProfessionApi+'?name='+this.name)
                  .then(res=>{
                      // console.log(res)
                      if(res.data.data.length !== 0){
                          this.showed = false
                          this.list = res.data.data
                          // console.log(res.data.data)
                      }else{
                           this.list = []
                           this.showed = true
                      }
                  }).catch(err=>{
                      console.log(err)
                  })
              }else{
                  this.show = false
                  this.showed = true
              }
          },
          input(e){
              if(!e.target.value){
                  this.show =true
              }
          }
      },
      watch:{
        // searchVal(val){
        //   // console.log(val)
        //   if(!val){
        //     this.show = true
        //   }
        // }
      }
    }
</script>
