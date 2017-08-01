<template>
  <div id="remaindetail">
  <v_scroll :on-refresh="onRefresh" :on-infinite="onInfinite" :dataList="scrollData">
    <div v-for="(item,i) in detaillist" class="detailbox">
        <div :class="i===0?'':'border-t'"></div>
        <p class="detail-tit">
          <span class="tit">{{item.fundsName}}</span>
          <i :class="item.inOutType==1 ? 'addfont':''">{{(item.inOutType==1?item.inComeAmount.toString():"-"+item.payOutAmount) | toDecimal2}}</i>
        </p>
        <p class="t-detail">
          <span class="time">{{new Date(item.gmtCreate).Format("yyyy-MM-dd hh:mm:ss")}}</span>
          <i :class="item.info==='已到账'?'arr-bg':''">{{item.info}}</i>
        </p>
      </div>
  </v_scroll>
  </div>
</template>
<script>
  import {remainDetailApi} from 'src/api/index.js'
  import store from 'src/widget/plugin/store.js'
  import cookie from 'src/widget/plugin/cookie'
  import v_scroll from "src/components/service/pullrefresh"
  let token = cookie.get('http_usertoken')
  let userId = cookie.get('http_userID')
  export default {
    name: "RemainDetail",
    data (){
      return {
        detaillist:[],
        pageNum: 1, //当前页
        pageSize: 15, // 一页显示多少条
        pageStart: 0, // 开始页数
        pageEnd: 0, // 结束页数
        scrollData: {
          noFlag: false //暂无更多数据显示
        }
      }
    },
    components:{
      v_scroll
    },
    methods:{
      getData(){
        let userId = store.get("userInfo").id;
        let instance =this.axios.create({
              headers: {'token': token}
            });
        instance.get(remainDetailApi,{
          params:{
            pageNum:this.pageNum,
            pageSize: this.pageSize,
            userId
          }
        }).then(res=>{
          if(this.detaillist.length>0){
            this.detaillist = this.detaillist.concat(res.data.datas)
          }else{
            this.detaillist = res.data.datas;
          }
          this.pageEnd = res.data.total
        }).then(err=>{

        })
      },
      onRefresh(done) {
        this.pageNum = 1;
        this.detaillist=[];
        this.getData();
        done()
      },
      onInfinite(done) {
        this.pageNum++;
        let end = Math.ceil(this.pageEnd/this.pageSize)
        console.log(this.pageNum)
        console.log(end)
        let more = this.$el.querySelector('.load-more')
        if(this.pageNum > end) {
          more.style.display = 'none'; //隐藏加载条
          //走完数据调用方法
          this.scrollData.noFlag = true;
          console.log(1)
        } else {
          this.getData()
          more.style.display = 'none'; //隐藏加载条
        }
        done();
      }
    },
    created(){
      this.getData()
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss'>
  @import '~src/assets/scss/function';
  #remaindetail{
    width:100%;
    &>.yo-scroll .detailbox{
      margin-left:rem-calc(15px);
      padding-right:rem-calc(15px);
      height:rem-calc(64px);
      position:relative;
      &>.border-t{
        @include borderbottom;
        top:0;
        bottom:auto;
      }
      .detail-tit{
        padding-top:rem-calc(15px);
        overflow:hidden;
        color:#333;
        &>span{
          font-size:15px;
        }
        &>.addfont{
          color:#00bd96;
        }
        &>.addfont:before{
          content:"+"
        }
        &>i{
          font-style:normal;
          float:right;
          padding-top:2px;
        }
      }
      .t-detail{
        padding-top:7px;
        font-size:12px;
        color:#999;
        &>.time{
          font-size:12px;
        }
        &>i{
          font-style:normal;
          float:right;
          padding-left:rem-calc(20px);
          height:14px;
          line-height:14px;
        }
        &>.arr-bg{
          background:url(~assets/image/usercenter/arrow2.png) no-repeat left center;
          background-size:14px 100%;
        }
      }
    }
  }
</style>