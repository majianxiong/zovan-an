<template>
    <div class="infocenter">
        <div class="backtop">
            <img src="~assets/image/backtop.png"  v-show="topshow" v-tap="{methods:backtop}">
        </div>
        <pullrefresh :on-refresh="onRefresh" :on-infinite="onInfinite" :dataList="scrollData" v-show="show" id="scroll" @scroll.native="getScroll">
            <main>
            <!--
                卡片
            -->
                <div class="policy" v-for="(l,index) in list" :key="index">
                    <div class="time">{{l.gmtCreate | timefilter2}}</div>
                    <div class="content" @click="gotoDetail(l.orderNo)">
                        <!--
                            保单部分
                        -->
                        <div class="policy-content">
                            <div class="remind">{{l.title}}</div>
                            <div class="finish">{{l.content}}</div>
                        </div>
                        <!--
                            秘一下的举报部分
                        -->
                        <div class="myx-content" v-if="false">
                            <div class="remind">
                                <div>您举报的吐槽：</div>
                                <div>干我们这行好苦，好多人觉得买保险就是不吉利不...</div>
                            </div>
                            <div class="finish">已初步认定为正常消息，感谢您的举报</div>
                        </div>
                        <!--
                            公共底部
                        -->
                        <div class="bot" >
                            <span>查看详情</span>
                            <img src="~assets/image/arrow_l.png" alt="">
                        </div>
                    </div>
                </div>
            </main>
        </pullrefresh>
    </div>
</template>
<style lang='scss' rel="stylesheet/scss" scoped>
@import '~src/assets/scss/function';
    .infocenter{
        overflow:hidden;
        width:100%;
        height:100%;
        background:#f6f6f6;
        & main{
            margin-bottom:rem-calc(30px);
            & .policy{
                 & .time{
                    width:rem-calc(85px);
                    margin:22px auto 15px;
                    height:rem-calc(24px);
                    background:#d6d6d6;
                    border-radius:rem-calc(24px);
                    text-align:center;
                    font-size:rem-calc(12px);
                    line-height:rem-calc(24px);
                    color:#ffffff;
                }
                & .content{
                    box-shadow: 0px 3px 20px 0px rgba(177, 177, 177, 0.16);
                    margin:rem-calc(0 15px 0 15px);
                    background:#ffffff;
                    border-radius:rem-calc(7px);
                    border:1px solid transparent;
                    &>.policy-content>.remind{
                        padding:rem-calc(15px 10px 0 15px);
                        font-size:rem-calc(15px);
                        color:#333333;
                        margin-bottom:rem-calc(7px);
                    }
                    &>.policy-content>.finish{
                        margin-left:rem-calc(15px);
                        padding:rem-calc(2px 10px 0 0);
                        font-size:rem-calc(13px);
                        color:#666666;
                        line-height:rem-calc(22px);
                        padding-bottom:rem-calc(8px);
                        border-bottom:1px solid rgb(238, 238, 238);
                    }
                    &>.myx-content>.remind{
                        margin:rem-calc(20px 15px 0 15px);
                        border-left:2px solid #dedede;
                        padding-left:rem-calc(10px);
                        &>div:nth-child(1){
                            font-size: rem-calc(14px);
                            color: #333333;
                            line-height:rem-calc(25px);
                        }
                        &>div:nth-child(2){
                            font-size: rem-calc(13px);
                            color: #666666;
                            line-height:rem-calc(20px);
                        }
                    }
                    &>.myx-content>.finish{
                        margin:rem-calc(10px 0 0 15px);
                        padding:rem-calc(2px 10px 15px 0);
                        font-size:rem-calc(14px);
                        color:#333333;
                        line-height:rem-calc(22px);
                         
                        border-bottom:1px solid rgb(238, 238, 238);
                    }
                    &>.bot{
                        padding:rem-calc(12px 15px 16px 15px);
                        overflow:hidden;
                        &>span{
                            font-size:rem-calc(13px);
                        }
                        &>img{
                            float:right;
                            transform:rotate(180deg);
                        }
                    }
                }
            }
        }
        .backtop{
            position:absolute;
            bottom:3%;
            right:5%;
            z-index:110;
            &>img{
                width:rem-calc(65px);
                height:rem-calc(65px);
            }
        }
     }
</style>
<script>
  import {messageListApi} from 'src/api'
  import cookie from 'src/widget/plugin/cookie'
  import pullrefresh from 'src/components/service/pullrefresh'
//   let scrol = this.$el.querySelector('#scroll')
    export default {
        data(){
            return{
                scrollTop:0,
                topshow:false,
                show:true,
                list:[],
                pageNum:1,
                pageSize:8,
                pageStart: 0, // 开始页数
                pageEnd: 0, // 结束页数
                scrollData:{
                    noFlog:false //暂时没事数据
                }
            }
        },
        components:{
            pullrefresh
        },
        methods: {
          getData(){
            let userId = cookie.get('http_userID')
            // let userId = 102
            this.axios.post(messageListApi+'/'+this.pageNum+'/'+this.pageSize,{userId:userId,type:1})
            .then(res=>{
                console.log(res)
            if(res.data.data){
                this.show = true
                if(this.list.length>0){
                    this.list = this.list.concat(res.data.data)
                }else{
                    this.list = res.data.data;
                }
            }else{
                this.show=false
            }
            this.pageEnd = res.data.total
            }).catch(err=>{
                console.log(err)
            })
          },
          gotoDetail(a) {
            this.$router.push({path:'/detailsmessage', query:{proposalCode:a}})
            console.log(a)
          },
          onRefresh(done){
            this.pageNum = 1;
            this.list=[];
            this.getData();
            done()
          },
          onInfinite(done){
            this.pageNum++;
            let end = Math.ceil(this.pageEnd/this.pageSize)
            // console.log(this.pageNum)
            // console.log(end)
            
            let more = this.$el.querySelector('.load-more')
            if(this.pageNum > end) {
            more.style.display = 'none'; //隐藏加载条
            //走完数据调用方法
            this.scrollData.noFlag = true;
            } else {
            this.getData()
            more.style.display = 'none'; //隐藏加载条
            }
            done()
          },
          getScroll(){
              this.scrollTop = this.$el.querySelector("#scroll").scrollTop;
              console.log(this.scrollTop)
              if(this.scrollTop>=350){
               this.topshow =true;
              }else{
                this.topshow =false;
              }
          },
          backtop(){
            let timer = setInterval(()=>{
            if(this.scrollTop > 0){
              this.$el.querySelector('#scroll').scrollTop  -= 70
            }else{
              clearInterval(timer)
              this.$el.querySelector('#scroll').scrollTop = 0
            }
            },20)
          }
        },
        created(){
            this.getData()
        },
    }
</script>