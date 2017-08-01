<template>
  <div id="policyinfo">
    <div class="content">
      <div class="detail marbom">
        <div class="policyname">
          {{productDescription}}
        </div>
        <div class="detaillist">
          <p v-for="(item,i) in list">
            <span>{{item}}:</span>
            <i>{{detailList[i]}}<span v-if="i==3" v-show="show" v-for="(ele,j) in beneficiarys">{{ele.cname+":&nbsp;&nbsp;"+ele.benefitsRate+"%"}}<br/></span><span v-if="i==3" v-show="!show">法定</span></i>
          </p>
        </div>
      </div>
     <infoblock class="marbom" v-for="(item,i) in info" :key="i" :title="item.title" :icon="item.icon" :list="item.infolist" :guide="item.guide" :order="item.order"></infoblock>
    <div class='info-block' v-show="showHM">
      <div class='info-title'>
        <span>{{addtip.title}}</span>
        <i><img :src="addtip.icon"/></i>
      </div>
      <div class='info-split'></div>
      <div class='info-content guide'>
        <p class="subtit">主险合同交费期内</p>
        <div v-for='(item,index) in addtip.infolist' class='info-line'>
          <p class='main' v-html="item.main">
            <p class='sub' v-if="!!item.sub" v-html='item.sub'></p>
          </p>
        </div>
      </div>
      <!--<div class='info-split' style="border-style:dashed;margin-top:0;"></div>
      <div class='info-content guide'>
        <p class="subtit" >主险合同交费期满后</p>
        <div v-for='(item,index) in addtip.addlist' class='info-line'>
          <p class='main' v-html="item.main">
            <p class='sub' v-if="!!item.sub" v-html='item.sub'></p>
          </p>
        </div>
      </div>-->
    </div>
    <infoblock class="marbom" :title="tips.title" :icon="tips.icon" :list="tips.infolist" :guide="tips.guide" :order="tips.order"></infoblock>
    </div>
    <div class="footer">
      <p style="background:#324150" @click="goback">返回修改</p>
      <p @click="goSign" style="background:#13cd8f">确认并签字</p>
    </div>
  </div>
</template>
<script>
  import infoblock from 'src/components/service/infoblock'
  import {policyDetailApi} from 'src/api/index.js'
  import cookie from 'src/widget/plugin/cookie'
  let token = cookie.get('http_usertoken')
  let userId = cookie.get('http_userID')
  export default {
    name: "PolicyInfo",
    data () {
      return {
        list:["承保公司", "投保人", "被保险人", "受益人", "保单状态", "保险金额", "保障期限" ],
        detailList:[],
        productDescription:"",
        beneficiarys:[],
        show:false,
        showHM:false,
        canclickhis:true,
        canclicksign:true,
        info:[],
        addtip:{},
        tips:{
          title: "保障说明",
          icon: require("src/assets/image/policy/shuoming.png"),
          infolist: [{main:"等待90天，因意外不受90天限制"},{main:"投保人在保单犹豫期后解除合同会遭受一定损失，本计划书仅供参考"},{main:"具体保险利益请以保单合同为准"}],
          guide:false,
          order: true
        }
      }
    },
    components:{
      infoblock
    },
    methods:{
      goback(){
        if(this.canclickhis){
          this.canclick=false;
          this.$router.go(-1)
        }
      },
      goSign(){
        if(this.canclicksign){
          this.canclick=false;
          this.$router.push({path:"policysign",query:{proposalId:this.$route.query.policyId}})
        }
      },
      getInfo(){
        this.canclickhis = true;
        this.canclicksign = true;
        this.$store.dispatch('toggleLoadingStatus', true)
        let instance =this.axios.create({
              headers: {'token': token},
              timeout:6000
            });
        instance.post(policyDetailApi,{
          proposalCode:this.$route.query.policyId
        })
        .then(res=>{
          console.log(res)
          this.$store.dispatch('toggleLoadingStatus', false)
          let list = res.data.data
          //let applyTime =new Date(list.applyTime).Format("yyyy-MM-dd");
          //let effectTime = list.effectTime?new Date(list.effectTime).Format("yyyy-MM-dd"):"";
          let status=""
          let heavyAmount = list.heavyAmount?list.heavyAmount:"0";
          let paymentAmount = list.paymentAmount?list.paymentAmount:"0";
          let diseaseAmount = list.diseaseAmount?list.diseaseAmount:"0";
          let deathAmount = list.deathAmount?list.deathAmount:"0";
          let specificHeavyAmount = list.specificHeavyAmount?list.specificHeavyAmount:"0";
          let endLifeAmount = list.endLifeAmount?list.endLifeAmount:"0";
          let careAmount = list.careAmount?list.careAmount:"0";
          if(list.status==0){
          status="待支付"
          }else if(list.status==1){
            status="已支付"
          }else if(list.status==2){
            status="已退款"
          }else if(list.status==4){
            status="已承保"
          }else{
            status="待签收"
          }
          if(list.beneficiarys.length>0){
            this.show = true;
            this.beneficiarys = list.beneficiarys;
          }else{
            this.show=false;
          }
          let organization="";
          if(list.productCode=='ZA0003'){
            organization="陆家嘴国泰人寿";
            this.showHM = false;
            this.info = [
            {
              title: "基本保障",
              icon: require("src/assets/image/policy/jbbz.png"),
              infolist: [{main:"身故/全残保险金<span> "+deathAmount+"元</span>"},{main:"生命期末保险金<span> "+endLifeAmount+"元</span>"},{main:"长期护理保险金<span> "+careAmount+"元/次</span>",sub:"60岁起给付，连续给付10年，共120次"}],
              guide:true,
              order: false
            },
            {
              title: "健康保障",
              icon: require("src/assets/image/policy/jkbz.png"),
              infolist: [{main:"重大疾病保险金<span> "+heavyAmount+"元</span>",sub:"累计给付以3次为限"},{main:"特定重大疾病保险金<span> "+specificHeavyAmount+"元/次</span>",sub:"80岁前额外给付"},{main:"轻疾疾病保险金<span> "+paymentAmount+"元/次</span>",sub:"80岁前额外给付，累计给付以3次为限"}],
              guide:true,
              order: false
            }]
          }else if(list.productCode=='ZA0002'){
            organization = "长城人寿";
            this.showHM = true;
            this.info = [
            {
              title: "基本保障",
              icon: require("src/assets/image/policy/jbbz.png"),
              infolist: [{main:"身故/全残保险金<span> "+deathAmount+"元</span>"}],
              guide:true,
              order: false
            },
            {
              title: "健康保障",
              icon: require("src/assets/image/policy/jkbz.png"),
              infolist: [{main:"重大疾病保险金<span> "+heavyAmount+"元</span>"},{main:"轻疾疾病保险金<span> "+paymentAmount+"元</span>",sub:"累计给付以5次为限"},{main:"疾病终末期保险金<span> "+diseaseAmount+"元</span>"}],
              guide:true,
              order: false
            },
            {
              title: "祝寿金",
              icon: require("src/assets/image/policy/zsj.png"),
              infolist: [{main:(list.wishBirthday?list.wishBirthday:'')+"岁一次性返还<span> "+ (list.returnAmount?list.returnAmount:0)+"元</span>"}],
              guide:true,
              order: false
            }]
            this.addtip = {
              title: "豁免保险费",
              icon: require("src/assets/image/policy/huomian.png"),
              infolist: [{main:"轻症疾病豁免保险费"},{main:"重大疾病豁免保险费"},{main:"身故／全残豁免保险费",sub:"＊90日内返还所交保费，90日后豁免续期保险费，本附加险合同终止。"}],
              addlist: [{main:"重大疾病保险金"},{main:"身故／全残保险金",sub:"＊给付附加豁免险所交保费。"}]
            }
          }else{
            organization=""
          }
          let contentList=[organization,list.insured.cname,list.beInsured.cname,"",status,list.policyPlanEntities[0].amount,list.guaranteePeriod !=0?list.guaranteePeriod+"年":"终生"]
          this.detailList = contentList
          this.productDescription = list.productDescription
        }).catch(err=>{
          this.$store.dispatch('toggleLoadingStatus', false)
           this.$vux.toast.show({
              text: "网络异常",
              type: 'text',
              width: '80%'
            });
        })
      }
    },
    activated(){
      this.getInfo()
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import '~src/assets/scss/function';
  #policyinfo{
    box-sizing:border-box;
    -webkit-box-sizing: border-box;
    width:100%;
    position:relative;
    background:#f6f6f6;
    height:100%;
    padding-bottom:rem-calc(15px);
    &>.content::-webkit-scrollbar{
      width:0;
    }
    &>.content{
      position:absolute;
      left:rem-calc(15px);
      right:rem-calc(15px);
      top:rem-calc(15px);
      bottom:rem-calc(50px);
      color:#666;
      overflow:auto;
      &>.detail{
      width:rem-calc(315px);
      margin:auto;
      padding:0 rem-calc(15px);
      background:#fff;
      border-radius:6px;
      box-shadow:0 rem-calc(1.5px) rem-calc(15px) 0 rgba(84, 220, 142, 0.2);
      &>.policyname{
        line-height:rem-calc(45px);
        position:relative;
        background:url(~assets/image/policy/policy.png) no-repeat left center;
        background-size:rem-calc(18px 16px);
        padding-left:rem-calc(21px);
        font-size:rem-calc(16px);
        font-weight:bold;
        color:#333;
      }
      &>.policyname:after{
        @include borderbottom;
        border-color:#eee;
        position:absolute;
      }
      &>.detaillist{
        padding-top:rem-calc(16px);
        padding-bottom:rem-calc(7px);
        &>p{
          color:#666;
          overflow:hidden;
          padding-top:rem-calc(2px);
          margin-bottom:rem-calc(14px);
          &>span{
            display:inline-block;
            width:rem-calc(70px);
            vertical-align: top;
          }
          &>i{
            display:inline-block;
            font-style:normal;
            &>span{
              display:block;
              height:rem-calc(18px);
            }
          }
        }
      }
    }
      .marbom{
        margin-bottom:rem-calc(15px)!important;
      }
      .info-block {
      width:rem-calc(345px);
      margin:auto;
      padding:rem-calc(15px);
      padding-bottom:rem-calc(5px);
      box-sizing: border-box;
      border-radius:rem-calc(5px);
      box-shadow:0 rem-calc(1.5px) rem-calc(15px) 0 rgba(84, 220, 142, 0.2);
      background-color:#fff;

      .info-title {
        position:relative;
        span {
          font-size:rem-calc(16px);
          color:#333;
          margin-left:rem-calc(21px);
          font-weight:bold;
        }
        i {
          position:absolute;
          width:rem-calc(16px);
          height:rem-calc(14px);
          left:0;
          top:0;
          bottom:0;
          margin:auto;
        }
      }
      .info-split {
        margin-top:rem-calc(14.5px);
        margin-bottom:rem-calc(16px);
        border-top:1px solid #eee;
      }
      .info-content {
        color:#666;
        .subtit{
          color:#00bd96;
          font-size:rem-calc(15px);
          margin-bottom:rem-calc(15px);
        }
        .info-line:last-child:after {
          border:none!important;
        }
        .info-line {
          position:relative;
          padding-bottom:rem-calc(15px);

          .main {
            font-size:rem-calc(14px);
            line-height:rem-calc(21px);
            position:relative;
            margin-bottom:rem-calc(6px);
            span {
              font-size:rem-calc(17px);
              color:#00bd96;
            }
          }
          .sub {
            font-size:rem-calc(11px);
            color:#999;
            line-height:rem-calc(15px);
            span {
              font-size:rem-calc(14px)
            }
          }
        }
      }
      .info-content.guide {
        margin-left:rem-calc(4px);
        .info-line {
          padding-left:rem-calc(18px);
          &:after{
            content:'';
            border-left:1px solid #0bce91;
            position:absolute;
            left:0;
            top:rem-calc(7px);
            width:0;
            height:100%;
          }
          .main:before {
            content:'';
            position:absolute;
            left:rem-calc(-22px);
            top:0;
            bottom:0;
            margin:auto;
            border-radius:50%;
            border:1px solid #0bce91;
            width:rem-calc(8px);
            height:rem-calc(8px);
            background-color:#fff;
            z-index:1;
          }
        }
      }
      .info-content.order {
        .info-line {
          padding-left:rem-calc(18px);
          i {
            position:absolute;
            left:0;
            top:rem-calc(3px);
            margin:auto;
            width:rem-calc(16px);
            height:rem-calc(14px);
          }
        }
      }
    }
    }
    &>.footer{
      position:absolute;
      bottom:0;
      left:0;
      width:100%;
      &>p{
        float:left;
        width:50%;
        text-align:center;
        font-size:rem-calc(18px);
        line-height:rem-calc(50px);
        color:#fff;
      }
    }
  }
</style>
