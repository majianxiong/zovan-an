
<!--********************************************************************
 * Author        : Geyan
 * Email         : geyan@zhongan.io
 * Create Date   : 2017-05-04 18:00
 * Filename      : list.vue
 * Description   : 计划书列表
 * Arguments     :
     datas: 数据对象，包含如下字段
        sex // 0男1女
        age // 被保人年龄字符串，如“20周岁”
        limit // 缴费期限
        duration // 保险期间
        recent // 最近打开时间
        price // 总金额

********************************************************************-->

<template>
<div class='plan-list-container'>
  <div v-for='(mainItem, i) in dataList' :key="i" v-if='show' class='plan-list-item' >
      <div class='item-header'>
        <p class='main'>{{mainItem.planTitle}}</p>
        <p class='sub'>{{mainItem.productDescription}}</p>
      </div>
      <div class='item-body' @click='goDetail(mainItem)'>
        <div class='table'>
          <div class='row'>
            <div class='cell'>被保人年龄</div>
            <div class='cell'>{{mainItem.age}}<span class='sex-span' :class='mainItem.sex=="M"?"male":"female"'>{{mainItem.sex == 'M'?'男':'女'}}</span></div>
          </div>
          <div class='row'>
            <div class='cell'>缴费年限</div>
            <div class='cell' v-if="mainItem.productDTOList&&mainItem.productDTOList[0]">{{mainItem.productDTOList[0].payWay == 0 ? '趸交' : mainItem.productDTOList[0].payWay + '年交'}}</div>
          </div>
          <div class='row'>
            <div class='cell'>保障期限</div>
            <div class='cell'>{{mainItem.guarantee == "0" ? "保终身" : mainItem.guarantee}}</div>
          </div>
          <div class='row'>
            <div class='cell'>保险金额</div>
            <div class='cell' v-if="mainItem.productDTOList&&mainItem.productDTOList[0]">¥{{mainItem.productDTOList[0].amount}}</div>
          </div>
          <!-- <div class='row'>
            <div class='cell'>最近打开时间</div>
            <div class='cell'>{{mainItem.startDate | timefilter3 }}</div>
          </div> -->
        </div>
      </div>
      <div class='item-footer'>
        <p>生成日期<span>{{mainItem.startDate | timefilter}}</span></p>
        <span class="delete" @click="remove(mainItem,i)">删除</span>
      </div>
  </div>
  <div class="no-order" v-if="!show">
    <span>暂时没有计划书</span>
  </div>
  <div v-transfer-dom id="planlist-conf">
    <confirm v-model="showConf" @on-cancel="onCancel" @on-confirm="onConfirm" title=" " content="确认删除本计划书" confirm-text="删除">
    </confirm>
  </div>
</div>
</template>

<script>
  import {planListApi,deletePlanApi} from 'src/api'
  import {Confirm , TransferDomDirective as TransferDom} from 'vux'
  import cookie from 'src/widget/plugin/cookie'
  let userid = cookie.get('http_userID') ? cookie.get('http_userID') : '123'
  let proposalId = ""
  export default {
    directives: {
      TransferDom
    },
    data: () => {
      return {
        dataList: [],
        show:true,
        showConf: false,
        index:0
      }
    },
    props: [],
    components:{
      Confirm
    },
    activated () {
      this.getData()
    },
    methods: {
      onCancel(){

      },
      onConfirm(){
        this.axios({
          method: 'put',
          url: deletePlanApi,
          data: {
            proposalId
          }
        }).then(res=>{
          console.log(res)
          if(res.data.status=="SUCCESS"){
            this.$vux.toast.show({
              text: res.data.message,
              type: 'text',
              width: '80%'
            });
            this.dataList.splice(this.index,1)
            if(this.dataList.length ==0){
              this.show = false;
            }
          }else{
            this.$vux.toast.show({
              text: res.data.message,
              type: 'text',
              width: '80%'
            });
          }
        }).catch(err=>{
          console.log(err)
          this.$vux.toast.show({
            text: "网络异常",
            type: 'text',
            width: '80%'
          });
        })
      },
      getData () {
        let url = planListApi + userid
        // let url = planListApi + '51'
        this.axios.get(url).then((response) => {
          console.log(response)
          this.dataList = response.data.data;
          let total = response.data.data.length
          this.dataList.forEach(function(el,index){
            console.log(el.productDTOList[0])
          })
          if(total) {
            this.show = true
          }else{
            this.show = false
          }
        }, (response) => {
          // this.loadStatus = !this.loadStatus
        })
      },
      goDetail (mainItem) {
        this.$router.push({path:'/plan', query:{proposalId:mainItem.proposalId, productcode:mainItem.productDTOList[0].productId}})
      },
      remove(mainItem,i){
        console.log(i)
        this.index = i;
        proposalId = mainItem.proposalId;
        this.showConf = true;
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  @import '~assets/scss/function';
  .plan-list-container {
    width:100%;
    position:absolute;
    top:0;left:0;right:0;bottom:0;
    overflow-x:hidden;
    overflow-y:scroll;
    background-color:#f6f6f6;
    .plan-list-item {
      width:100%;
      background-color:#fff;
      padding-left:rem-calc(15px);
      box-sizing: border-box;
      margin-bottom:rem-calc(10px);
      .item-header {
        height:rem-calc(64px);
        border-bottom:1px solid #eee;
        padding-top:rem-calc(14px);
        box-sizing: border-box;
        .main {
          font-size:rem-calc(15px);
          color:#333;
          font-weight:bold;
          margin-bottom:rem-calc(9px);
        }
        .sub {
          font-size:rem-calc(13px);
          color:#666;
        }
      }
      .item-body {
        padding:rem-calc(15px) 0;
        box-sizing: border-box;
        .table {
          display:table;
          .row {
            display:table-row;
            .cell {
              display:table-cell;
              height:rem-calc(24px);
              vertical-align: middle;
              color:#666;
              font-size:rem-calc(13px);
              .sex-span {
                display:inline-block;
                vertical-align:text-top;
                width:rem-calc(40px);
                height:rem-calc(15px);
                border-radius:rem-calc(8px);
                color:#fff;
                font-size:rem-calc(12px);
                line-height:rem-calc(16px);
                margin-left:rem-calc(10px);
                padding-right:rem-calc(7.5px);
                box-sizing: border-box;
                text-align:right;
              }
              .male {
                background:url('/static/pic/plan/icon-sex.png') no-repeat;
                background-color:#86d0ff;
                background-size:rem-calc(9px);
                background-position: rem-calc(7.5px) rem-calc(-20px);
              }
              .female {
                background:url('/static/pic/plan/icon-sex.png') no-repeat;
                background-color:#ff9797;
                background-size:rem-calc(9px);
                background-position: rem-calc(7.5px) rem-calc(2px);
              }
            }
            & .cell:first-child {
              width:rem-calc(95px);
              color:#999999;
            }
          }
        }
      }
      .item-footer {
        height:rem-calc(45px);
        border-top:1px solid #eee;
        p {
          font-size:rem-calc(13px);
          float:left;
          height:rem-calc(45px);
          line-height:rem-calc(45px);
          color:#999;
          span {
            padding-left:rem-calc(10px);
          }
        }
        &>.delete{
          @include convert-to-1px(#ccc,3px)
          width:rem-calc(60px);
          height:rem-calc(25px);
          margin-top:rem-calc(10px);
          float:right;
          text-align:center;
          margin-right:rem-calc(15px);
          line-height:rem-calc(25px);
          font-size:rem-calc(13px);
          color:#666666;
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
  #planlist-conf{
    &>div>.vux-x-dialog>.weui-dialog{
      width:rem-calc(280px);
      height:rem-calc(145px);
      &>.weui-dialog__hd{
        height:0;
        padding:0;
        font-size:0;
      }
      &>.weui-dialog__bd{
        height:rem-calc(95px);
        padding:0;
        color:#333;
        line-height:rem-calc(95px);
        font-size:rem-calc(18px);
      }
      &>.weui-dialog__ft{
        height:rem-calc(50px);
        line-height:rem-calc(50px);
        & a{
          color:#00bd96;
        }
      }
    }

  }

</style>
