
<!--********************************************************************
 * Author        : Geyan
 * Email         : geyan@zhongan.io
 * Create Date   : 2017-05-04 17:58
 * Filename      : female.vue
 * Description   : 计划书详情

********************************************************************-->

<template>
<div class='plan-female-container'>
  <div class='plan-female'>
    <header-block ref='subcomp'
                :sex='headerData.sex=="M" ? 0 : 1'
                :age='headerData.age'
                :list='{amount:amount,premium:premium,payment:payment,guarantee:guarantee}'></header-block>
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
     <!-- <div class='info-split' style="border-style:dashed;margin-top:0;"></div>
      <div class='info-content guide'>
        <p class="subtit" >主险合同交费期满后</p>
        <div v-for='(item,index) in addtip.addlist' class='info-line'>
          <p class='main' v-html="item.main">
            <p class='sub' v-if="!!item.sub" v-html='item.sub'></p>
          </p>
        </div>
      </div>-->
    </div>
    <!--<infoblock class="marbom" :title="addtip.title" :icon="addtip.icon" :list="addtip.infolist" :guide="addtip.guide" :order="addtip.order"></infoblock>-->
    <infoblock class="marbom" :title="tips.title" :icon="tips.icon" :list="tips.infolist" :guide="tips.guide" :order="tips.order"></infoblock>
  </div>
  <footerGroup @leftclick='footerLClick' @rightclick='footerRClick' btlname='转发给朋友' btrname='确认并投保' :btlshow='hasSign'></footerGroup>
</div>
</template>

<script>
  import infoblock from 'src/components/service/infoblock'
  import headerBlock from 'src/components/service/headerblock'
  import footerGroup from 'src/components/service/footergroup'
  import {getProductInfo, planApi} from 'src/api'
  import store from 'src/widget/plugin/store'
  import cookie from 'src/widget/plugin/cookie'
  let userId = cookie.get('http_userID')

  export default {
    name: 'plan',
    data: () => {
      return {
        wishBirthShow: false,
        age:30,
        amount:0,
        premium:0,
        guarantee:0,
        payment:"",
        hasSign:false,
        wishBirth:0,
        returnAmount:0,
        headerData: {
          sex:'F',
          age:'0',
          planProductEntityList:[{}]
        },
                showHM:false,
        info:[],
        addtip:[],
        tips:{
          title: "保障说明",
          icon: require("src/assets/image/policy/shuoming.png"),
          infolist: [{main:"等待90天，因意外不受90天限制"},{main:"投保人在保单犹豫期后解除合同会遭受一定损失，本计划书仅供参考"},{main:"具体保险利益请以保单合同为准"}],
          guide:false,
          order: true
        },
        version:''
      }
    },
    props: [],
    computed: {

    },
    components: {
      infoblock, headerBlock, footerGroup
    },
    created () {
      try {
        this.hasSign = store.get('userInfo') ? (store.get('userInfo').userType == '1' ? true : false) : false // 1是已签约 2是未签约
      } catch(e) {
        //alert(e.message)
      }
      this.getData()
      //pv
      this.log({targetType:1,eventType:2,proposalId:this.$route.query.proposalId})
    },
    methods: {
      footerLClick () {
        //share times
        window.shareLog = (res)=>{
          //res 1:分享成功 2:失败
          if(!!res){
            this.log({targetType:1,eventType:1,proposalId:this.$route.query.proposalId,userId:userId})
          }
        }
        this.jsbridge.shareConfig({
          img:'',
          title:'快来看看！我发现了一份好保险，推荐给您！',
          desc:'快来看看！我发现了一份好保险，推荐给您！',
          link: window.location.href,
          callback: 'shareLog'
        })
      },
      footerRClick () {
        this.$router.push({path:'/health/'+this.$route.query.productcode, query:{
          proposalId:this.$route.query.proposalId,
          price:this.premium,
          version:this.$route.query.version,
          additionalRisk:this.$route.query.additionalRisk
        }})
      },
      getData () {
        let self = this
        let proposalid = this.$route.query.proposalId
        this.axios.get(getProductInfo+this.$route.query.productcode).then((response) => {
          let data = response.data
          var st = data.status
          if(st != 'SUCCESS'){
            this.$vux.toast.show({
             text: data.message,
             type: 'text',
             width: '80%'
            //  time: 15000
            });
            return
          }
          this.version = data.data && data.data.productVOList.length && data.data.productVOList[0].occupationVersion
          // console.log(this.version)
        } , (response) => {
        }).catch((err) => console.log(err))

        this.axios.get(planApi+'/'+proposalid).then((response) => {
          if(response.data.status != 'SUCCESS') {
            this.$vux.toast.show({
               text: data.message,
               type: 'text',
               width: '80%'
              //  time: 15000
            });
            return
          }
          let data = response.data.data
          self.headerData = data
          if(!data.length) {
            // console.log(data)
            self.amount = data && data.amount? data.amount : 0
            self.premium = data && data.premium? data.premium : 0
            self.guarantee = data && data.guarantee? data.guarantee : 0
            self.payment = data && data.payWay? data.payWay : 0
            self.wishBirth = data && data.wishBirthday? data.wishBirthday : 0
            self.wishBirthShow = data && data.wishBirthday
            self.returnAmount = data && data.returnAmount? data.returnAmount : 0
            let heavyAmount = data.heavyAmount?data.heavyAmount:"0";
            let paymentAmount = data.paymentAmount?data.paymentAmount:"0";
            let diseaseAmount = data.diseaseAmount?data.diseaseAmount:"0";
            let deathAmount = data.deathAmount?data.deathAmount:"0";
            let specificHeavyAmount = data.specificHeavyAmount?data.specificHeavyAmount:"0";
            let endLifeAmount = data.endLifeAmount?data.endLifeAmount:"0";
            let careAmount = data.careAmount?data.careAmount:"0";
            // self.amount = self.headerData.productDTOList && self.headerData.productDTOList.length > 0 ? self.headerData.productDTOList[0].amount : 0
            if(this.$route.query.productcode=="ZA0003"){
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
            }else if(this.$route.query.productcode=="ZA0002"){
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
                infolist: [{main:(data.wishBirthday?data.wishBirthday:'')+"岁一次性返还<span> "+ (data.returnAmount?data.returnAmount:0)+"元</span>"}],
                guide:true,
                order: false
              }]
              this.addtip = {
                title: "豁免保险费",
                icon: require("src/assets/image/policy/huomian.png"),
                infolist: [{main:"轻症疾病豁免保险费"},{main:"重大疾病豁免保险费"},{main:"身故／全残豁免保险费",sub:"＊90日内返还所交保费，90日后豁免续期保险费，本附加险合同终止。"}],
                //addlist: [{main:"重大疾病保险金"},{main:"身故／全残保险金",sub:"＊给付附加豁免险所交保费。"}]
                guide:true,
                order: false
              }
            }else{
            }
          }
        }, (response) => {
          // this.loadStatus = !this.loadStatus
        })
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  @import '~assets/scss/function';
  .plan-female-container {
    position:absolute;
    left:0;right:0;top:0;bottom:0;
    overflow-x:hidden;
    overflow-y:scroll;
    background-color:#f6f6f6;
    padding-bottom:rem-calc(50px);
    .plan-female {
      background:url('/static/pic/plan/plan-bg.png') no-repeat top;
      background-size:100%;
      background-attachment: scroll;
      .header-block-container {
        margin-bottom:rem-calc(15px);
      }
      .info-block {
        margin-bottom:rem-calc(15px);
      }
      .subtit{
        color:#00bd96;
        font-size:rem-calc(15px);
        margin-bottom:rem-calc(15px);
      }
    }
  }

</style>
