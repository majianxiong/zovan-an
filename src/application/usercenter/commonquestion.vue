<template>
    <div id="question">
        <!--<div class="search">
            <div class="search-content">
                <img src="~assets/image/search.png" alt="">
                <input type="text" placeholder="搜索" ref="input" @keyup.enter="searchquestion">
            </div>    
        </div>-->
        <div class="ques" v-for="(item, i) in quesarr" :key="i" v-show="showquestion">
            <p>
                <span>
                    <span class="que-num">
                        {{item.ques}}
                    </span>
                </span>
                {{item.title}}
            </p>
            <span>
                <span class="que-num" v-for="(l,index) in item.context" :key='index'>
                    <p>{{l.title}}</p>
                    <p>{{l.content}}</p>   
                </span>
            </span>
        </div>
        <!--未搜索到内容-->
        <!--<div class="nosearchcontent" v-show="!showquestion">
            <img src="~assets/image/nofound.png" alt="">
            <p>未查询到相关问题~</p>
        </div>-->
    </div>
</template>
<script>
export default {
    name:'commonquestion',
    data(){
        return{
            showquestion:true,
            quesarr: [{
                ques: 'Q1',
                title: '保啊提供哪些服务',
                context:[{title:'', content:'汇集各大保险公司的精品险种，我们提供直接在线投保等功能，助力您的展业。'}]
                }, {
                ques: 'Q2',
                title: '如何注册？',
                context:[{title:'',content:'采用邀请注册制，在 ‘我的’里面选择‘邀请注册’来帮助您邀请好友来展业。'}] 
                }, {
                ques: 'Q3',
                title: '保单以及发票寄送说明',
                context: [{title:'',content:'经纪公司专业代理人通过保啊展业，保单以及发票寄送均有经纪公司内部相关人员来完成配送'}]
                }, {
                ques: 'Q4',
                title: '投保可以使用那些支付方式',
                context:[{title:'',content: '美泰人生、康健人生选择是实时代扣或者批扣的方式进行保费支付'}]
                }, {
                ques: 'Q5',
                title: '理赔说明',
                context: [{title:'理赔报案',content:'报案人：投保人、被保险人、受益人，或是购买产品时对应的业务人员'},
                          {title:'',content:'报案时间：知道或应该知道保险事故发生之日起五天内通知对应保险公司或经纪公司'},
                          {title:'',content:'报案方式：书面报案（保险合同中印有保险事故通知书）/ 口头报案（打电话至保险公司总部报案）'},
                          {title:"",content:'报案要求：出险人姓名、保单号码、事故原因与地点、联系方式'},
                          {title:'理赔申请人',content:"为合同条款规定的受益人；"},
                          {title:'',content:'若无指定的受益人，申请人应为被保险人法定继承人；'},
                          {title:'',content:'受益人或继承人无民事行为能力，申请人可以是其法定监护人。'},
                          {title:'理赔申请方式',content:'受益人可以通过对应销售人员去保险公司或经纪公司办理手续；'},
                          {title:'',content:'受益人可以亲自前往保险公司办理理赔申请，也可以委托其他人为其办理理赔申请，委托他人需要有书面委托；'},
                          {title:'',content:'受益人可以通过邮寄方式将理赔所需要的材料寄送保险公司的客户服务部或经纪公司。'}
                ]
            }]
        }
    },
    // methods:{
    //     searchquestion(){
    //         console.log(this.$refs.input.value)
    //     }
    // }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
  @import '~src/assets/scss/function';
#question{
    margin-top:rem-calc(25px);
    // &>.search{
    //     width:100%;
    //     height:rem-calc(43px);
    //     background:#f0f0f0;
    //     border:1px solid #f0f0f0;
    //     &>.search-content{
    //     width:92%;
    //     height:rem-calc(29px);
    //     margin:rem-calc(7px) auto;
    //     background:#ffffff;
    //         &>img{
    //             vertical-align: middle;
    //             width:rem-calc(15px);
    //             height:rem-calc(15px);
    //             margin:0 rem-calc(8px) 0 rem-calc(15px);
    //         }
    //         &>input{
    //             height:rem-calc(29px);
    //             width:75%;
    //             border:none;
    //             background:#ffffff;
    //         }
    //     }
    // }
    &>.ques{
        padding:rem-calc(15px);
        &>p{
            font-size:rem-calc(15px);
            font-weight:600;
            margin-bottom:rem-calc(10px);
            &>span{
            font-weight:normal;
            display:inline-block;
            background-image:url(~assets/image/usercenter/qes.png);
            background-size:100% 100%;
            text-align:center;
            line-height:rem-calc(16px);
            color:#fff;
            margin-right:rem-calc(10px);
                .que-num{
                    display:inline-block;
                    width: rem-calc(21px);
                    height:rem-calc(16px);
                    line-height:rem-calc(16px);
                    margin-top:rem-calc(-4px);
                    vertical-align:middle;
                    text-align:center;
                    font-size:rem-calc(10px);
                    color: rgb(255, 255, 255);
                }
            }
        }
        &>span{
            font-size:rem-calc(14px);
            color:#666;
            line-height:rem-calc(20px);
            letter-spacing:rem-calc(1px);
        }
    }
    // &>.nosearchcontent{
    //     &>img{
    //         -webkit-transform: scale(0.5);
    //         transform: scale(0.5);
    //         width:100%;
    //     }
    //     &>p{
    //         text-align:center;
    //         color:#adadad;
    //         margin-top:rem-calc(-50px);
    //         font-size:rem-calc(16px);
    //     }
    // }
}
</style>

