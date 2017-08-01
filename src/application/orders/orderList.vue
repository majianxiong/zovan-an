<template>
  <div id="orderlist">
    <tab :animate="false" :line-width="2" active-color="#00bd96" defaultColor="#666">
      <tab-item v-for="(item,index) in tab" :key="item.id" :selected="tabIndex == index ? true : false" active-class="active" @on-item-click="tabHandler(index)">
        {{item.text}}
      </tab-item>
    </tab>
    <v_scroll :on-refresh="onRefresh" :on-infinite="onInfinite" :dataList="scrollData" v-show="show">
      <div class="list" v-for="(item,i) in orderList" :key="i" @click="goDetail(item)">
        <!-- <div class="box" @click="goDetail(item)">
        </div> -->
        <div class="listhead">
          <!-- <img :src="imgsrc" alt=""> -->
          <div class="info">
            <h4>{{item.productDescription}}</h4>
            <span>生成日期 {{item.applyTime|timefilter("/")}}</span>
          </div>
          <p>{{item.status | filterStatus}}</p>
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
            <span>保障期限</span>
            <i><!--{{item.guarantee==0?new Date(item.effectTime).Format("yyyy/MM/dd"):(new Date(item.effectTime).Format("yyyy/MM/dd")+" - "+new Date(item.effectTime).Format("yyyy/MM/dd").replace(/\d{4}/,new Date(item.effectTime).Format("yyyy/MM/dd").substring(0,4)*1+1*item.guaranteePeriod))}}-->终生</i>
          </p>
        </div>
        <div class="listfoot">
          <!-- <span>投保金额<i>¥{{item.policyPlanEntities.length>0?item.policyPlanEntities[0].amount:""}}</i></span> -->
          <span>保费<i>¥{{item.totalPremium}}</i></span>
          <div class="btn-green" @click.stop="goNext(item)">{{item.status | filterBtntext}}</div>
        </div>
      </div>
    </v_scroll>
    <div class="no-order" v-show="!show">
      <span>暂时没有相关订单</span>
    </div>
  </div>
</template>
<script>
  import { Tab, TabItem } from 'vux'
  import {policyListApi} from 'src/api/index.js'
  import store from 'src/widget/plugin/store.js'
  import cookie from 'src/widget/plugin/cookie'
  import v_scroll from "src/components/service/pullrefresh"
  let token = cookie.get('http_usertoken')
  let userId = cookie.get('http_userID')
  export default {
    name: "OrderList",
    data () {
      return {
        // imgsrc: require('src/assets/image/policy/logo.png'),
        tab: [
          {
            text: '全部',
            query: 't1'
          },
          {
            text: '投保单',
            query: 't2'
          },
          {
            text: '保单',
            query: 't3'
          },
        ],
        orderList: [],
        show:true,
        tabIndex: 0,
        pageNum: 1, //当前页
        pageSize: 10, // 一页显示多少条
        pageStart: 0, // 开始页数
        pageEnd: 0, // 结束页数
        scrollData: {
          noFlag: false //暂无更多数据显示
        },
        btntext: ''
      }
    },
    components:{
      v_scroll,Tab, TabItem
    },
    filters:{
      filterStatus(sts){
        let status=""
        switch (sts) {
          case 0:
            status="待支付"
            break;
          case 1:
            status="待承保"
            break;
          case 2:
            status="已承保"
            break;
          case 3:
            status="未承保"
            break;
          case 4:
            status="已退保"
            break;
          case 5:
            status="待签收"
            break;
          default:
            status="待核保"
        }
        return status
      },
      filterBtntext(sts){
        let status=""
        switch (sts) {
          case 2:
            status="重新购买"
            break;
          case 4:
            status="重新购买"
            break;
          default:
            status="继续投保"
        }
        return status
      }
    },
    methods:{
      tabHandler(index){
        if(this.tabIndex != index){
          this.tabIndex = index
          this.pageNum = 1
          this.orderList = []
          this.getData()
        }
      },
      getData(){
        this.$store.dispatch('toggleLoadingStatus', true)
        let url = policyListApi+"/?pageNum=" + this.pageNum + "&pageSize=" + this.pageSize
        // let status = this.$route.params.status==0?this.$route.params.status:null
        let policyType = this.tabIndex
        // console.log(policyType)
        let instance = this.axios.create({
              headers: {'token': token},
              timeout:6000
            });
            instance.post(url,{
              userId,
              // status,
              policyType
            })
          .then(res=>{
            // console.log(res)
            this.$store.dispatch('toggleLoadingStatus', false)
            if(res.data.datas){
              this.show = true;
              if(this.orderList.length>0){
                this.orderList = this.orderList.concat(res.data.datas)
              }else{
                this.orderList = res.data.datas;
              }
            }else{
              this.show = false
            }

            this.pageEnd = res.data.total
            //this.orderList = res.data.data["0"].policyEntityList;
          }).catch(err=>{
            this.$store.dispatch('toggleLoadingStatus', false)
            this.$vux.toast.show({
              text: "网络异常",
              type: 'text',
              width: '80%'
            });
          })
      },
      goNext(item){
          let dest = ""
          switch (item.step) {
            case '1':
              this.$router.push({path:"/uploadIdentity", query:{policyId:item.policyId,insurerName:item.insurerName,recognizeeName:item.recognizeeName,proposalCode:item.proposalCode,bankCard:(item.bankCard).slice(-4)}})
              break;
            case '2':
              this.$router.push({path:"/policysign", query:{proposalId:item.proposalCode}})
              break;
            case '3':
              this.$router.push({path:"/h5gopay", query:{proposalId:item.proposalCode}})
            case '4':
              this.$router.push({path:"/order/"+item.productCode, query:{id:item.id,proposalId:JSON.parse(item.policyJson).proposalId}})
              break;
          }
      },
      goDetail(item){
        this.$router.push({path:"/orderdetail", query:{proposalCode:item.id}})
      },
      onRefresh(done) {
        this.pageNum = 1;
        this.orderList=[];
        this.getData();
        done()
      },
      onInfinite(done) {
        this.pageNum++;
        let end = Math.ceil(this.pageEnd/this.pageSize)
        // console.log(this.pageNum)
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
      // listStatus(sts){
      //   let status=""
      //   switch (sts) {
      //     case 0:
      //       status="待支付"
      //       break;
      //     case 1:
      //       status="待承保"
      //       break;
      //     case 2:
      //       status="已承保"
      //       break;
      //     case 3:
      //       status="未承保"
      //       break;
      //     case 4:
      //       status="已退保"
      //       break;
      //     case 5:
      //       status="待签收"
      //       break;
      //     default:
      //       status="待核保"
      //   }
      //   return status
      // },
    },
    beforeMount(){
      this.getData()
    },
    created(){
      let that = this
      window.goSearch = function(){
        that.$router.push('searchPolicy')
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '~src/assets/scss/function';
  #orderlist{
    width:100%;
    height:100%;
    background:#f6f6f6;
    .vux-tab-item{
      font-size: rem-calc(15px);
    }
    &>.yo-scroll{
      margin-top: rem-calc(55px);
      .list{
        margin-bottom:rem-calc(10px);
        padding-left:rem-calc(15px);
        background:#fff;
        overflow:hidden;
        position:relative;
      &>.box{
        position:absolute;
        left:0;
        right:rem-calc(60px);
        height:100%;
        z-index:90;
      }
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
          // left:rem-calc(38px);
          left: 0;
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
            width:rem-calc(65px);
          }
          &>i{
            font-style:normal;
          }
        }
        &:before {
          content: "";
          display: inline-block;
          height: 8px;
          width: 8px;
          border-width: 1px 1px 0 0;
          border-color: #999;
          border-style: solid;
          -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
          transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
          position: relative;
          top: -2px;
          position: absolute;
          top: 50%;
          margin-top: -4px;
          right: 12px;
        }
      }
      &>.listcontent::after{
        @include borderbottom;
        color:#eee;
      }
      &>.listfoot{
        position: relative;
        line-height:rem-calc(47px);
        color:#666;
        overflow:hidden;
        font-size:13px;
        &>span{
          float:left;
          position:relative;
          width:50%;
          &>i{
            margin-left:8px;
            color:#333;
            font-style:normal;
          }
        }
        &>span:last-child{
        }
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
    .btn-green{
      position: absolute;
      right: rem-calc(15px);
      top: rem-calc(8px);
      display: inline-block;
      border-radius: rem-calc(3px);
      background-image: linear-gradient( 90deg, rgb(47,221,180) 0%, rgb(24,215,154) 70%, rgb(0,208,127) 100%);
      width: rem-calc(80px);
      height: rem-calc(30px);
      line-height: rem-calc(30px);
      text-align: center;
      color: #fff;
      font-size: rem-calc(13px);
    }
  }
</style>
