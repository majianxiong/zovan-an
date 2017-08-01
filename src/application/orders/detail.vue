<template>
  <div id="orderdetail">
    <div class="orderinfo">
      <div class="detail">
        <div class="policyname">
          {{productDescription}}
          <p>{{status}}</p>
        </div>
        <div class="detaillist">
          <p v-if="proposalCode">
            <span>投保单编号</span>
            <i>{{proposalCode}}</i>
          </p>
          <p>
            <span>承保公司</span>
            <i>{{organization}}</i>
          </p>
          <p>
            <span>生成时间</span>
            <i>{{applyTime}}</i>
          </p>
          <p>
            <span>保单状态</span>
            <i>{{status}}</i>
          </p>
          <p>
            <span>保险金额</span>
            <i>{{amount}}</i>
          </p>
          <p>
            <span>保费</span>
            <i>{{premium}}</i>
          </p>
          <p>
            <span>保障期限</span>
            <i>{{guaranteePeriod}}</i>
          </p>
        </div>
      </div>
      <div class="detail">
        <div class="policyname">
          投保人信息
        </div>
        <div class="detaillist">
          <p>
            <span>投保人信息</span>
            <i>{{insured.cname?insured.cname:"暂未填写"}}</i>
          </p>
          <p>
            <span>性别</span>
            <i>{{insured.gender?(insured.gender=="M"?"男":"女"):"暂未填写"}}</i>
          </p>
          <p>
            <span>出生日期</span>
            <i>{{insured.birthday?new Date(insured.birthday).Format('yyyy/MM/dd'):"暂未填写"}}</i>
          </p>
          <p>
            <span>证件类型</span>
            <i>身份证</i>
          </p>
          <p>
            <span>证件号码</span>
            <i>{{insured.idno?insured.idno:"暂未填写"}}</i>
          </p>
        </div>
      </div>
      <div class="detail">
        <div class="policyname">
          被投保人信息
        </div>
        <div class="detaillist">
          <p>
            <span>与投保人关系</span>
            <i>{{beInsured.relation?judgeRelation(beInsured.relation):"暂未填写"}}</i>
          </p>
          <p v-if="beInsured.relation!=0">
            <span>被投保人</span>
            <i>{{beInsured.cname?beInsured.cname:"暂未填写"}}</i>
          </p>
          <p v-if="beInsured.relation!=0">
            <span>性别</span>
            <i>{{beInsured.gender?(beInsured.gender=="M"?"男":"女"):"暂未填写"}}</i>
          </p>
          <p v-if="beInsured.relation!=0">
            <span>出生日期</span>
            <i>{{beInsured.birthday?new Date(beInsured.birthday).Format('yyyy/MM/dd'):"暂未填写"}}</i>
          </p>
          <p v-if="beInsured.relation!=0">
            <span>证件类型</span>
            <i>身份证</i>
          </p>
          <p v-if="beInsured.relation!=0">
            <span>证件号码</span>
            <i>{{beInsured.idno?beInsured.idno:"暂未填写"}}</i>
          </p>
        </div>
      </div>
      <div class="detail">
        <div class="policyname">
          收益人信息
        </div>
        <div class="detaillist" v-if="beneficiarys.length==0">
         <p>
            <span>与投保人关系</span>
            <i>本人</i>
          </p>
        </div>
        <div class="detaillist" v-for="(el,i) in beneficiarys" :key="i" v-else>
          <p>
            <span>与投保人关系</span>
            <i>{{el.relationship?judgeRelation(el.relationship):"暂未填写"}}</i>
          </p>
          <p v-if="el.relation!=0">
            <span>姓名</span>
            <i>{{el.cname?el.cname:"暂未填写"}}</i>
          </p>
          <p v-if="el.relation!=0">
            <span>性别</span>
            <i>{{el.gender?(el.gender=="M"?"男":"女"):"暂未填写"}}</i>
          </p>
          <p v-if="el.relation!=0">
            <span>出生日期</span>
            <i>{{el.birthday?new Date(el.birthday).Format('yyyy/MM/dd'):"暂未填写"}}</i>
          </p>
          <p v-if="el.relation!=0">
            <span>证件类型</span>
            <i>身份证</i>
          </p>
          <p v-if="el.relation!=0">
            <span>证件号码</span>
            <i>{{el.idno?el.idno:"暂未填写"}}</i>
          </p>
        </div>
      </div>
    </div>
    <div class="nextbtn" @click="gonext">{{btntext}}</div>
  </div>
</template>
<script>

  import {policyDetailApi} from 'src/api/index.js'
  import infoblock from 'src/components/service/infoblock'
  import cookie from 'src/widget/plugin/cookie'
  let token = cookie.get('http_usertoken')
  let userId = cookie.get('http_userID')
  let item = {};
  export default {
    name: "OrderDetail",
    data (){
      return {
        productDescription:"",
        organization:"",
        proposalCode:0,
        status:"",
        applyTime:0,
        amount:0,//保险金额
        premium:0,
        guaranteePeriod:"",
        insured:{},
        beInsured:{},
        beneficiarys:[1,2],
        beneflist:["与投保人关系","姓名","性别","出生日期","证件类型","证件号码"],
        btntext:"继续投保"
      }
    },
    methods:{
      getInfo(){
        this.$store.dispatch('toggleLoadingStatus', true)
        let instance =this.axios.create({
              headers: {'token': token},
              timeout:6000
            });
        instance.post(policyDetailApi,{
          id:this.$route.query.proposalCode
        })
        .then(res=>{
          this.$store.dispatch('toggleLoadingStatus', false)
          let data = res.data&&res.data.data;
          item = res.data&&res.data.data;
          this.productDescription = data.productDescription;
          this.proposalCode = data.proposalCode;
          this.applyTime =new Date(data.applyTime).Format("yyyy/MM/dd");
          if(data.productCode=='ZA0003'){
            this.organization="陆家嘴国泰人寿";
          }else if(data.productCode=='ZA0002'){
            this.organization = "长城人寿";
          }
          if(data.status==0){
            this.status="待支付"
          }else if(data.status==1){
            this.status="待承保"
          }else if(data.status==2){
            this.status="已承保"
          }else if(data.status==3){
            this.status="未承保"
          }else if(data.status==4){
            this.status="已退保"
          }else if(data.status==5){
            this.status="待签收"
          }else{
            this.status="待核保"
          }
          if(data.status==2||data.status==4){
            this.btntext = "重新购买"
          }else{
            this.btntext = "继续投保"
          }
          this.amount=data.policyPlanEntities[0].amount;
          this.premium = data.policyPlanEntities[0].premium
          this.guaranteePeriod = data.guaranteePeriod !=0?data.guaranteePeriod+"年":"终生";
          this.insured = data.insured?data.insured:{};
          this.beInsured  = data.beInsured?data.beInsured:{};
          if(data.beInsured&&data.beInsured.relation){
            this.judgeRelation(data.beInsured.relation)
          }
          this.beneficiarys = data.beneficiarys?data.beneficiarys:[];
          
        }).catch(err=>{
          this.$store.dispatch('toggleLoadingStatus', false)
           this.$vux.toast.show({
              text: "系统异常",
              type: 'text',
              width: '80%'
            });
        })
      },
      judgeRelation(val){
          if(val==0){
            return "本人"
          }else if(val==1){
            return "父母"
          }else if(val==2){
            return "配偶"
          }else if(val==3){
            return "子女"
          }
      },
      gonext(){
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
      }
    },
    created(){
      this.getInfo()
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '~src/assets/scss/function';
  #orderdetail{
    background:#f6f6f6;
    height:100%;
    width:100%;
    position:relative;
    overflow:hidden;
    &>.orderinfo{
      padding:rem-calc(15px) rem-calc(15px);
      position:absolute;
      top:0;
      bottom:rem-calc(50px);
      box-sizing:border-box;
      overflow:auto;
      &>.detail{
        width:rem-calc(315px);
        margin:auto;
        padding:0 rem-calc(15px);
        background:#fff;
        border-radius:6px;
        box-shadow:0 rem-calc(1.5px) rem-calc(15px) 0 rgba(84, 220, 142, 0.2);
        overflow:hidden;
        margin-bottom:rem-calc(15px);
        &>.policyname{
          line-height:rem-calc(45px);
          position:relative;
          background:url(~assets/image/policy/shuicon.png) no-repeat left center;
          padding-left:rem-calc(9px);
          font-size:rem-calc(16px);
          font-weight:bold;
          color:#333;
          &>p{
            position:absolute;
            top:50%;
            right:rem-calc(-20px);
            width:rem-calc(60px);
            margin-top:rem-calc(-12px);
            line-height:rem-calc(25px);
            background:#E5F9F1;
            color:#00BD96;
            text-align:center;
            border-radius:3px;
            font-size:rem-calc(12px);
          }
        }
        &>.policyname:after{
          @include borderbottom;
          border-color:#eee;
          position:absolute;
        }
        &>.detaillist{
          padding-top:rem-calc(16px);
          padding-bottom:rem-calc(7px);
          position:relative;
          &>p{
            color:#666;
            overflow:hidden;
            margin-bottom:rem-calc(14px);
            padding-top:rem-calc(2px);
            &>span{
              display:inline-block;
              width:rem-calc(90px);
              vertical-align: top;
              color:#999;
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
      &>.detail:last-child{
        &>.detaillist:after{
          content: " ";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 1px;
          border-bottom: 1px dashed #eee;
          -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
          -webkit-transform: scaleY(0.5);
          transform: scaleY(0.5);
        }
        &>.detaillist:last-child:after{
          border:none;
        }
      }
    }
    &>.nextbtn{
      background-image: -webkit-linear-gradient( 0deg, rgb(108,217,182) 0%, rgb(54,210,159) 45%, rgb(0,203,135) 100%);
      position:absolute;
      bottom:0;
      width:100%;
      height:rem-calc(50px);
      font-size:rem-calc(17px);
      color:#fff;
      text-align:center;
      line-height:rem-calc(50px);
    }
  }
</style>
