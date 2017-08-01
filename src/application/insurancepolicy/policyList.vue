<template>
  <div id="policylist">
    <v_scroll :on-refresh="onRefresh" :on-infinite="onInfinite" :dataList="scrollData" v-show="show">
      <div class="list" v-for="(item,i) in policyList" :key="i" @click="goDetail(item)">
        <div class="listhead">
          <img :src="imgsrc" alt="">
          <div class="info">
            <h4>{{item.productDescription}}</h4>
            <span>生成日期 {{item.applyTime|timefilter("/")}}</span>
          </div>
          <p>{{listStatus(item.status)}}</p> 
        </div>
        <div class="listcontent">
          <p>
            <span>投保人</span>
            <i>{{item.insured.cname}}</i>
          </p>
          <p>
            <span>被投保人</span>
            <i>{{item.beInsured.cname}}</i>
          </p>
          <p>
            <span>投保期间</span>
            <i><!--{{item.guarantee==0?new Date(item.effectTime).Format("yyyy/MM/dd"):(new Date(item.effectTime).Format("yyyy/MM/dd")+" - "+new Date(item.effectTime).Format("yyyy/MM/dd").replace(/\d{4}/,new Date(item.effectTime).Format("yyyy/MM/dd").substring(0,4)*1+1*item.guaranteePeriod))}}-->终生</i>
          </p>
        </div>
        <div class="listfoot">
          <span>投保金额<i>¥{{item.policyPlanEntities.length>0?item.policyPlanEntities[0].amount:""}}</i></span>
          <span>保费<i>¥{{item.totalPremium}}</i></span>
        </div>
      </div>
    </v_scroll>
    <div class="no-order" v-show="!show">
      <span>暂时没有相关保单</span>
    </div>
  </div>
</template>
<script>
  import {policyListApi} from 'src/api/index.js'
  import store from 'src/widget/plugin/store.js'
  import cookie from 'src/widget/plugin/cookie'
  import v_scroll from "src/components/service/pullrefresh"
  let token = cookie.get('http_usertoken')
  let userId = cookie.get('http_userID')
  export default {
    name: "PolicyList",
    data () {
      return {
        imgsrc: require('src/assets/image/policy/logo.png'),
        num: 1,
        show:true,
        policyList:[],
        pageNum: 1, //当前页
        pageSize: 10, // 一页显示多少条
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
        this.$store.dispatch('toggleLoadingStatus', true)
        let url = policyListApi+"/?pageNum="+this.pageNum+"&pageSize="+this.pageSize
        let instance =this.axios.create({
              headers: {'token': token},
              timeout:6000
            });
        instance.post(url,{
          status:2,
          userId
        })
        .then(res=>{
          console.log(res)
          this.$store.dispatch('toggleLoadingStatus', false)
          if(res.data.datas){
            this.show = true
            if(this.policyList.length>0){
              this.policyList = this.policyList.concat(res.data.datas)
            }else{
              this.policyList = res.data.datas;
            }
          }else{
            this.show=false
          }
          this.pageEnd = res.data.total
        }).catch(err=>{
           this.$store.dispatch('toggleLoadingStatus', false)
           this.$vux.toast.show({
              text: "网络异常",
              type: 'text',
              width: '80%'
            });
        })
      },
      goDetail(item){
        this.$router.push({path:"/policydetail", query:{proposalCode:item.id}})
      },
      onRefresh(done) {
        this.pageNum = 1;
        this.policyList=[];
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
        } else {
          this.getData()
          more.style.display = 'none'; //隐藏加载条
        }
        done();
      },
      listStatus(sts){
        let status=""
        if(sts==0){
          status="待支付"
        }else if(sts==1){
          status="待承保"
        }else if(sts==2){
          status="已承保"
        }else if(sts==3){
          status="未承保"
        }else if(sts==4){
          status="已退保"
        }else{
          status="待签收"
        }
        return status
      }
    },
    created (){
      this.getData()
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import '~src/assets/scss/function';
  #policylist{
    width:100%;
    background:#f6f6f6;
    min-height:100%;
    &>.yo-scroll .list{
      margin-bottom:rem-calc(10px);
      padding-left:rem-calc(15px);
      background:#fff;
      overflow:hidden;
      &>.listhead{
        position:relative;
        height:rem-calc(50px);
        &>img{
          width:rem-calc(24px);
          height:rem-calc(24px);
          border-radius:rem-calc(24px);
          margin:auto;
          position:absolute;
          top:0;
          bottom:0;
          left:0;
        }
        &>.info{
          position:absolute;
          left:rem-calc(38px);
          top:rem-calc(10px);
          &>h4{
            margin-bottom:4px;
            font-weight:normal;
          }
          &>span{
            color:#999;
            font-size:12px;
          }
        }
        &>p{
          position:absolute;
          top:50%;
          right:-5px;
          width:rem-calc(60px);
          margin-top:rem-calc(-12px);
          line-height:rem-calc(25px);
          background:#E5F9F1;
          color:#00BD96;
          text-align:center;
          border-radius:3px;
        }
      }
      &>.listhead::after{
        @include borderbottom;
        color:#eee;
      }
      &>.listcontent{
        font-size:13px;
        position:relative;
        padding:rem-calc(15px) 0 rem-calc(5px);
        &>p{
          padding-bottom:rem-calc(11px);
          color:#666;
          &>span{
            display:inline-block;
            width:rem-calc(75px);
          }
          &>i{
            font-style:normal;
          }
        }
      }
      &>.listcontent::after{
        @include borderbottom;
        color:#eee;
      }
      &>.listfoot{
        line-height:rem-calc(47px);
        color:#666;
        overflow:hidden;
        margin-left:rem-calc(-15px);
        font-size:13px;
        
        &>span{
          float:left;
          position:relative;
          padding:0 rem-calc(15px);
          &>i{
            color:#333;
            font-style:normal;
            margin-left:8px;
          }
        }
        &>span:first-child:after{
          content: " ";
          position: absolute;
          right: 0;
          top: 50%;
          width: 1px;
          height: 20px;
          border-right: 1px solid #D9D9D9;
          color: #eee;
          margin-top:-10px;
          -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
          -webkit-transform: scaleX(0.5);
          transform: scaleX(0.5);
        }
      }
    }
    &>.no-order{
      height:100%;
      background:url(~assets/image/order/noorder.png) no-repeat center rem-calc(80px);
      text-align:center;
      line-height:rem-calc(500px);
      &>span{
        color:#999;
      }
    }
  }
</style>
