<template>
  <div id="searchpolicy">
    <c_searchbar :default-info="defaultInfo" @get-his="getHis" @search="search" @show-his="showHis"></c_searchbar>
    <div class="search" v-show="!show">
      <div class="list" v-for="(item,i) in orderList" :key="i" v-show="showlist">
        <div class="box" @click="goDetail(item)"></div>
        <div class="listhead">
          <!-- <img :src="imgsrc" alt=""> -->
          <div class="info">
            <h4>{{item.productDescription}}</h4>
            <span>生成日期 {{item.applyTime|timefilter("/")}}</span>
          </div>
          <p @click="goNext(item)">{{listStatus(item.status)}}</p>
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
          <span>投保金额<i>¥{{item.policyPlanEntities.length>0?item.policyPlanEntities[0].amount:""}}</i></span>
          <span>保费<i>¥{{item.totalPremium}}</i></span>
        </div>
      </div>
      <div class="searchnone" v-show="!showlist">
        未找到合适的结果
      </div>
    </div>

    <div class="search-his" v-show="show">
      <p>搜索历史</p>
      <div class="hislist">
        <ul>
          <li v-for="item in hissearch" @click="search(item.name)">{{item.name}}</li>
        </ul>
        <div class="clearhis" @click="clearhis" v-show="showdelete"></div>
      </div>
    </div>
    <!--<div class="search-hot">
      <p>热门搜索</p>
      <div class="hislist">
        <ul>
          <li v-for="item in hotsearch">{{item.text}}</li>
        </ul>
      </div>
    </div>-->
  </div>
</template>
<script>
  import {policyListApi} from 'src/api/index.js'
  import c_searchbar from 'src/components/base/searchbar'
  import store from 'src/widget/plugin/store.js'
  import cookie from 'src/widget/plugin/cookie'
  let token = cookie.get('http_usertoken')
  let userId = cookie.get('http_userID')
  export default {
    name: "SearchPolicy",
    data () {
      return {
        // imgsrc: require('src/assets/image/policy/logo.png'),
        orderList: [],
        defaultInfo: "搜索险种/投保人/被保人",
        show: true,
        showlist: true,
        showdelete: false,
        hissearch: [],
        orderList: [],
        pageNum: 1, //当前页
        pageSize: 30, // 一页显示多少条
        pageStart: 0, // 开始页数
        pageEnd: 0, // 结束页数
        scrollData: {
          noFlag: false //暂无更多数据显示
        }
        // hotsearch:[
        //   {
        //     text: "多倍",
        //     url: ""
        //   },
        //   {
        //     text: "百万人生",
        //     url: ""
        //   },
        //   {
        //     text: "百万人生",
        //     url: ""
        //   },
        //   {
        //     text: "百万人生",
        //     url: ""
        //   },
        //   {
        //     text: "百万人生",
        //     url: ""
        //   }
        // ]
      }
    },
    components: {
      c_searchbar
    },
    methods: {
      goDetail(item){
        this.$router.push({path:"/orderdetail",query:{proposalCode:item.id}})
      },
      clearhis (){
        store.clear();
        this.hissearch = [];
        this.showdelete = false;
      },
      getHis () {
        var hissearch = store.get("searchHis");
        if(hissearch){
          this.hissearch = hissearch;
          this.showdelete = true;
        }
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
      },
      search(val){
        this.show = false;
        this.$store.dispatch('toggleLoadingStatus', true)
        let url = policyListApi+"/?pageNum="+this.pageNum+"&pageSize="+this.pageSize
        let instance =this.axios.create({
              headers: {'token': token}
            });
        instance.post(url,{
          name: val,
          userId
        }).then(res=>{
          this.$store.dispatch('toggleLoadingStatus', false)
          this.orderList = res.data.datas?res.data.datas:null
          console.log(this.orderList)
          if(this.orderList){
            this.showlist = true;
          }else{
            this.showlist = false;
          }
          //this.policyList = res.data.data["0"].policyEntityList;
        }).then(err=>{
          this.$store.dispatch('toggleLoadingStatus', false)
          this.show = false
        })
      },
      showHis(){
        this.show = true
      },
      goNext(item){
        if(item.status == 0){
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
              break;
          }
        }
      }
    },
    activated () {
      this.show = true;
      this.getHis ()
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import '~src/assets/scss/function';
  #searchpolicy{
    height:100%;
    position:relative;
    overflow:hidden;
    &>.search{
      position:absolute;
      top:rem-calc(50px);
      left:0;
      right:0;
      overflow:auto;
      bottom:0;
      &>.list{
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
            background:#f6f6f6;
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
        }
        &>.listcontent::after{
          @include borderbottom;
          color:#eee;
        }
        &>.listfoot{
          line-height:rem-calc(47px);
          color:#666;
          overflow:hidden;
          font-size:13px;
          &>span{
            float:left;
            position:relative;
            width:50%;
            &>i{
              color:#333;
              font-style:normal;
            }
          }
          &>span:last-child{
          }
        }
      }
      & .searchnone{
        background:url(~assets/image/order/searchnone.png) no-repeat center rem-calc(66px);
        line-height:500px;
        color:#999;
        text-align:center;
        width:100%;
      }
    }
    &>.search-his{
      position:absolute;
      top:rem-calc(50px);
      left:0;
      right:0;
    }
    &>.search-his,&>.search-hot{
      margin:rem-calc(15px);
      margin-top:rem-calc(10px);
      &>p{
        font-size:13px;
        color:#333;
      }
      .hislist{
        position:relative;
        &>ul{
          padding-top:rem-calc(10px);
          overflow:hidden;
          width:rem-calc(330px);
          &>li{
            margin-right:10px;
            padding:rem-calc(8.5px) rem-calc(15px);
            list-style:none;
            color:#666;
            background:#f6f6f6;
            font-size:12px;
            float:left;
            border-radius:3px;
            margin-bottom:rem-calc(10px);
          }
        }
        &>.clearhis{
          width:rem-calc(15px);
          height:rem-calc(15px);
          background:url(~assets/image/order/delete.png);
          background-size:100%;
          position:absolute;
          right:0;
          top:50%;
          margin-top:rem-calc(-7.5px);
        }
      }
    }
    &>.search-hot{
      margin-top:0;
    }
  }
</style>
