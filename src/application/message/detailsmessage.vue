<template>
    <div id="detailsmessage">
         <div class="details">
            <div class='title'>
                <img src="~assets/image/policy/policy.png" alt="">
                <p>{{productDescription}}</p>
            </div>
            <ul class="policy">
                <li v-for="(l,index) in list">{{l}}：{{detailList[index]}}</li>
            </ul>
         </div>
    </div>
</template>
<script>
    import {policyDetailApi} from 'src/api/index.js'
    import cookie from 'src/widget/plugin/cookie'
    let token = cookie.get('http_usertoken')
    let userId = cookie.get('http_userID')
    export default {
        data(){
            return {
                productDescription:'',
                list:["保单号", "承保公司", "投保人", "被保险人", "受益人", "投保时间", "生效时间", "保单状态", "保险金额", "保障期限" ],
                detailList:[]
            }
        },
        mounted(){
            let url = policyDetailApi + this.$route.query.proposalCode
            let instance =this.axios.create({
                headers: {'token': token}
                });
            instance.get(url)
            .then(res=>{
                console.log(res)
                let list = res.data.data
                let applyTime =new Date(list.applyTime).Format("yyyy-MM-dd");
                let effectTime = list.effectTime?new Date(list.effectTime).Format("yyyy-MM-dd"):"";
                let status=""
                if(list.status==0){
                    status="待支付"
                }else if(list.status==1){
                    status="待承保"
                }else if(list.status==2){
                    status="已承保"
                }else if(list.status==3){
                    status="未承保"
                }else if(list.status==4){
                    status="已退保"
                }else{
                    status="待签收"
                }
                let organization="";
                if(list.productCode=='ZA0003'){
                    organization="陆家嘴国泰人寿";
                }else if(list.productCode=='ZA0002'){
                    organization = "长城人寿";
                }else{
                    organization=""
                }
                let contentList=[list.proposalCode, organization ,list.insured.cname,list.beInsured.cname,"法定",applyTime,effectTime,status,list.policyPlanEntities[0].amount,list.guaranteePeriod !=0?list.guaranteePeriod+"年":"终生"]
                this.detailList = contentList
                this.productDescription = list.policyPlanEntities[0].riskDescription
            }).catch(err=>{
            })
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '~src/assets/scss/function';
  #detailsmessage{
      overflow-x:hidden;
      height:100%;
      background:#f6f6f6;
      &>.details{
        background:#ffffff;
        box-shadow:0 rem-calc(1.5px) rem-calc(15px) 3px rgba(84, 220, 142, 0.2);
        border-radius:rem-calc(7px);
        padding:rem-calc(15px);
        margin:rem-calc(15px);
        &>.title{
            position:relative;
            border-bottom:1px solid #e6e6e6;
            padding-bottom:rem-calc(15px);
            &>img{
                position:absolute;
                top:0;
                left:0;
            }
            &>p{
                color:#666666;
                font-size:rem-calc(14px);
                margin-left:rem-calc(23px);
                line-height:rem-calc(14px);
            }
        }
        &>.policy{
            margin-top:rem-calc(10px);
            &>li{
                color:#666666;
                font-size:rem-calc(13px);
                line-height:rem-calc(25px);
            }
        }
      }
  }
</style>
