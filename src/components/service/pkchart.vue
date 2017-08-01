<!--********************************************************************
 * Author        : anfeng
 * Email         : wb_anfeng@zhongan.io
 * Create Date   : 2017-07-17 14:03
 * Filename      : pkchart.vue
 * Description   : 直方图
 * friendly      : props   Object 友方保费
 * enemy         : props   Object 对方保费
 * progress      : props   Object 活动进度条
    
********************************************************************-->


<template>
    <div id="pkchart">
        <ul>
            <li class='friendly' ref="friendlyheight">
                <span class="money">{{friendly.money}}元</span>
                <span class="friname">{{friendly.title}}</span>
            </li>
            <li class='enemy' ref="enemyheight">
                <span class="money">{{enemy.money}}元</span>
                <span class="enname">{{enemy.title}}</span>
            </li>
            <li class="line">
                <p>
                    <span>保底保费</span><br>
                    <span>{{progress.targetPremium}}</span>
                </p>
            </li>
        </ul>
        <div class="progress">
            <p>{{progress.jobStartTime | timefilter4}}</p>
            <p>{{progress.jobEndTime | timefilter4}}</p>
            <p ref='progress'></p>
            <p ref="procontent"></p>
        </div>
    </div>
</template>
 
<script>
    export default {
        name:'pkchart',
        // data(){
        //     return{
        //         friendly:{money:'65000',title:'我方队名我发队名'},
        //         enemy:{money:'52000',title:'对方队名对方对名'},
        //         progress:{day:20,today:4}
        //     }
        // },
        props:{
             friendly:{
                type:Object,
                default:function(){
                    return {money:'65000',title:'我方队名我发队名'}
                }
             },
             enemy:{
                 type:Object,
                 default:function(){
                     return {money:'52000',title:'对方队名对方对名'}
                 }
             },
             progress:{
                 type:Object,
                 default:function(){
                     return {day:20,today:4}
                 }
             },
             targetPremium:{
                 default:function(){
                     return 0
                 }
             }
        },
        mounted(){
            // this.axios.post('http://pkufi-perftest.zhongan.io/pluto/activityTeam/activityTeamTask',{userId:60})
            // .then(res=>{
            //     console.log(res)
            //     // res.data.data[0].activityTeamResultVO 友方的
            //     // res.data.data[0].otherActivityTeamResultVO 对方的
            //     // res.data.data[0].activityVOList  活动
            //     this.friendly = res.data.data[0].activityTeamResultVO
            //     console.log(this.friendly)
            //     // this.friendly.money = this.friendly.totalPremium - this.friendly.invalidPremium
            //     // this.$refs.friendlyheight.style.height = this.friendly.money * 79 / 50000 + 'px'
                

            //     // this.enemy = res.data.data[0].otherActivityTeamResultVO
            //     // this.enemy.money = this.enemy.totalPremium - this.enemy.invalidPremium
            //     // this.$refs.enemyheight.style.height = this.enemy.money * 79 / 50000 + 'px'


            //     // this.enemy = res.data.data[0].otherActivityTeamResultVO
            //     // console.log(this.enemy)
            //     // this.progress =res.data.data[0].activityVOList
            //     // console.log(this.progress)
            // }).catch(err=>{
            //     console.log(err)
            // })
            //保底保费 79px 50000元  直方图高度
            // top:  79 / 50000 * 投保金额
            console.log(this.friendly)
            this.$refs.friendlyheight.style.height = this.friendly.money * 79 / this.progress.targetPremium + 'px'
            this.$refs.enemyheight.style.height = this.enemy.money * 79 / this.progress.targetPremium + 'px'
            // 按钮位置
            // 进度条 235 / 活动天数 * 活动开始几天了
            let left = 235 / this.progress.day * this.progress.today;
            if(left>235){
                left = 235
            }
            this.$refs.progress.style.left = left - 12 + 'px'
            // 进度
            this.$refs.procontent.style.width = left + 'px'
        }
    }
</script>

<style lang='scss' rel='stylesheet/scss'>
  @import '~src/assets/scss/function';
    #pkchart{
        height:rem-calc(350px);
        background:url(~assets/image/pkact/chartbg.jpg);
        background-size:100% 100%;
        position:relative;
        &>ul{
            border-left:2px solid rgb(17, 37, 90);
            border-bottom:2px solid rgb(17, 37, 90);
            position:relative;
            left: rem-calc(86px);
            width: rem-calc(223px);
            height: rem-calc(130px);
            top:rem-calc(112px);
        }
        .friendly{
            position:absolute;
            max-height:rem-calc(133px) !important;
            z-index:100;
            bottom:0;
            left:rem-calc(51px);
            border:2px solid rgb(17, 37, 90);
            border-bottom:none;
            background-color: rgb(243, 218, 38);
            width:rem-calc(35px);
            .money{
                display:inline-block;
                width:rem-calc(75px);
                text-align:center;
                position:absolute;
                z-index:100;
                top:rem-calc(-20px);
                left:rem-calc(-20px);
                font-size:rem-calc(15px);
                font-weight:bolder;
                color: rgb(255, 255, 255);
                -webkit-text-stroke-width:0.5px;
                -webkit-text-stroke-color:#11255a;
            }
            .friname{
                position:absolute;
                z-index:100;
                bottom:rem-calc(-30px);
                left:rem-calc(-22px);
                display:inline-block;
                width:rem-calc(80px);
                font-weight:bolder;
                font-size: rem-calc(14px);
                color: rgb(243, 218, 37);
                -webkit-text-stroke-width:0.5px;
                -webkit-text-stroke-color:#11255a;
                text-align:center;
                overflow:hidden; //隐藏
                white-space:nowrap; //文本不进行换行
                word-break: keep-all;  //中英文不断词
                word-wrap: normal;    //保持默认处理
                text-overflow: ellipsis;  //显示省略符号来代表被修剪的文本
                -webkit-text-overflow: ellipsis;
            }
        }
        .enemy{
            max-height:rem-calc(133px) !important;
            position:absolute;
            z-index:100;
            bottom:0;
            left:rem-calc(141px);
            border:2px solid rgb(17,37,90);
            border-bottom:none;
            background-color: rgb(105, 115, 204);
            width: rem-calc(35px);
            height:rem-calc(91px);
            .money{
                display:inline-block;
                width:rem-calc(75px);
                text-align:center;
                position:absolute;
                z-index:100;
                top:rem-calc(-20px);
                left:rem-calc(-20px);
                font-size:rem-calc(15px);
                font-weight:bolder;
                color: rgb(255, 255, 255);
                -webkit-text-stroke-width:0.5px;
                -webkit-text-stroke-color:#11255a;
            }
            .enname{
                position:absolute;
                z-index:100;
                bottom:rem-calc(-30px);
                left:rem-calc(-22px);
                text-align:center;
                display:inline-block;
                width:rem-calc(80px);
                font-weight:bolder;
                font-size: rem-calc(14px);
                color: rgb(243, 218, 37);
                -webkit-text-stroke-width:0.5px;
                -webkit-text-stroke-color:#11255a;
                overflow:hidden; 
                white-space:nowrap; 
                word-break: keep-all;  
                word-wrap: normal;    
                text-overflow: ellipsis; 
                -webkit-text-overflow: ellipsis;
            }
        }
        .line{
            position:absolute;
            z-index:50;
            bottom:0;
            width:rem-calc(223px);
            height:rem-calc(79px);
            border-top:2px dotted rgba(17, 37, 90, 0.5);
            &>p{
                margin:rem-calc(-15px -65px);
                text-align:center;
                width:rem-calc(60px);
                font-size:rem-calc(11px);
                color: rgb(25, 42, 98);
            }
        }
        .progress{
            position:absolute;
            width:rem-calc(235px);
            height:rem-calc(10px);
            border-radius:rem-calc(5px);
            margin:0 rem-calc(70px);
            background:#ccc;
            bottom:rem-calc(27px);
            &>p:nth-child(1){
                position:absolute;
                top:rem-calc(-20px);
                left:rem-calc(-15px);
                font-size:rem-calc(12px);
                color: rgb(17, 37, 90);
            }
            &>p:nth-child(2){
                position:absolute;
                top:rem-calc(-20px);
                left:rem-calc(180px);
                font-size:rem-calc(12px);
                color: rgb(17, 37, 90);
            }
            &>p:nth-child(3){
                border-radius: 50%;
                background-color: rgb(255, 251, 253);
                position: absolute;
                width:rem-calc(12px);
                height:rem-calc(12px);
                top:rem-calc(-1px);
                left:rem-calc(20px);
                box-shadow:2px 2px 10px 1px #ccc;
                z-index:50;
            }
            &>p:nth-child(4){
                position:absolute;
                z-index:20;
                background-image: linear-gradient( 0deg, rgb(103,88,195) 0%, rgb(243,98,155) 100%);
                background-image: -webkit-linear-gradient( 0deg, rgb(103,88,195) 0%, rgb(243,98,155) 100%);
                height:rem-calc(10px);
                width:rem-calc(30px);
                border-radius:rem-calc(5px);
            }
        }
    }
</style>

