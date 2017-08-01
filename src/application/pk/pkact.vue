<template>
    <div id="pkact">
    <!--
        挑战
    -->
        <div class="picture_challenge" v-show="bgshow == 1">
            <img src="~assets/image/pkact/pk_bg1.jpg" alt="">
            <img src="~assets/image/pkact/pk_btn.png" alt="" class="challenge one" v-tap="{methods:gonext,number:2}">
            <img src="~assets/image/pkact/pk_btn.png" alt="" class="challenge three" v-tap="{methods:gonext,number:3}">
            <img src="~assets/image/pkact/pk_btn.png" alt="" class="challenge five" v-tap="{methods:gonext,number:4}">
        </div>
        <!--
            参加
        -->
        <div class="picture_join" v-show="bgshow == 2">
            <img src="~assets/image/pkact/pk_bg2.jpg" alt="">
            <div class="task">
                <img src="~assets/image/pkact/pk_title2.png" alt="">
                <div class="fl" v-for="(item,index) in task" :key='index'>{{item}}:&nbsp;&nbsp;{{content[index]}}</div>
            </div>
            <div class="product">
                <img src="~assets/image/pkact/pk_title1.png" alt="">
                <img :src="img1" alt="">
                <img :src="img2" alt="">
                <div>
                    <div v-if="more" @click.stop="setname">
                        <img src="~assets/image/pkact/pk_invitefri.png" alt="">
                    </div>
                    <div v-if="!more" @click.stop="gojoin">
                        <img src="~assets/image/pkact/pk_enter.png" alt="">
                    </div>
                </div>
                <p>{{product1}}</p>
                <p>{{product2}}</p>
            </div>
        </div>
        <!--
            规则
        -->
        <div class="rule">
            <div class="title">
                <img src="~assets/image/pkact/pk_rule.png" alt="">
            </div>
            <ul>
                <li>
                    <span>1</span>
                    <p>参与者在此页面领取任务，根据任务要求自行组队,组队完成后，系统随机分配对手，在指定的时间开始PK；</p>
                </li>
                <li>
                    <span>2</span>
                    <p>在指定时间内达到（或超过）指定产品的保底保费目标且保费较多的团队即为获胜团队，获胜团队才能得到额外奖励金，未获胜团队，保单按照正常出单奖励，若双方保费相同且超过保底保费目标，双方平分额外奖励；</p>
                </li>
                <li>
                    <span>3</span>
                    <p>获胜团队奖励根据团队成员标准保费贡献按比例分配；</p>
                </li>
                <li>
                    <span>4</span>
                    <p>团队成员必须是保啊的签约用户；</p>
                </li>
                <li>
                    <span>5</span>
                    <p>任务奖金将在保单全部过犹豫期后发放至保啊账户上；</p>
                </li>
                <li>
                    <span>6</span>
                    <p>此活动最终解释权归保啊所有</p>
                </li>
            </ul>
            <div class="footer">
                <img src="~assets/image/pkact/pk_footer.jpg" alt="">
            </div>
        </div>
        <div class="cover" v-if="covershow">
            <div class="confirm">
                <div v-if="!getnameshow" class="gosign">
                    此活动仅限签约用户<br>参与，您还未签约
                </div>
                <div class="top" v-if="getnameshow">
                    <p class="title">给你的团队取个吊炸天的名字吧</p>
                    <input type="text" placeholder="3-10个字长度的团队名称" maxlength='10' minlength='3' required ref="input">
                </div>
                <div class="bottom">
                    <span v-tap="{methods:closecover}">取消</span>  
                    <span v-tap="{methods:()=>{texts=='确定'? namesuccess() : gotosign()}}">{{texts}}</span>  
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import cookie from 'src/widget/plugin/cookie'
import store from 'src/widget/plugin/store.js'
import {messageListApi,teamList,createTeam,getActivity,getTeamList} from 'src/api'
let userId = cookie.get('http_userID')?cookie.get('http_userID'):""
let pageNum=1
let pageSize=10000
let userType = cookie.get('http_userType')?cookie.get('http_userType'):""
export default {
    name:'pkact',
    data(){
        return{
            product1:'长城人寿2款',
            product2:'大白定期1款',
            activityId:2,
            more:false,
            covershow:false,
            bgshow:2,
            task:['任务名称','开始时间','保底保费','结束时间','任务奖金','团队人数'],
            content:['华山论剑','2017/07/01','50000元','2017/07/31','500元','1人'],
            img1:require('src/assets/image/pkact/pk_cc.png'),
            img2:require('src/assets/image/pkact/pk_db.png'),
        }
    },
    created(){
        
    },
    methods:{
        closecover(){
            this.covershow = false
        },
        gonext(even){
            let userId = cookie.get('http_userID')
            if(userId == undefined){
                this.$vux.toast.show({
                    type:'text',
                    text:'您还没有账号'
                })
            }else{
                this.activityId = even.number
                this.axios.get(getActivity + this.activityId)
                .then(res=>{
                    console.log(res)
                    let cons = res.data.data
                    console.log(cons.product.split(" ")) 
                    this.product1 = cons.product.split(" ")[0]
                    this.product2 = cons.product.split(" ")[1]
                    let par = '/'
                    cons.startTime = new Date(cons.startTime).Format("yyyy"+par+"MM"+par+"dd")
                    cons.endTime = new Date(cons.endTime).Format("yyyy"+par+"MM"+par+"dd")
                    this.content =  [cons.title,cons.startTime,cons.targetPremium+"元",cons.endTime,cons.totalAmount+"元",cons.teamPerson+'人']
                    // 活动状态判断
                    if(res.data.data.activityStatus==1){
                        this.$vux.toast.show({
                            type:"text",
                            text:"活动未上架"
                        })
                    }else if(res.data.data.activityStatus == 3){
                        this.$vux.toast.show({
                            type:"text",
                            text:"活动已下架"
                        })
                    }else{
                    // 时间判断
                        if(res.data.date<res.data.data.groupStartTime){
                            this.$vux.toast.show({
                                type:'text',
                                text:'请等待组团开始'
                            })
                        }else{
                            if(res.data.date<res.data.data.groupEndTime){
                                if(res.data.data.groupTeam < res.data.data.totalTeam ){
                                    this.axios.post(getTeamList+'?pageNum='+pageNum+'&pageSize='+pageSize,{activityId: this.activityId,userId:userId})
                                    .then(res=>{
                                        console.log(res)
                                        if(res.data.data.list.length == 0){
                                            // 可以建团
                                                this.bgshow = 2
                                                this.setTitle('领取任务')
                                                if(even.number==2){
                                                    this.more = false
                                                }else{
                                                    this.more = true
                                                }
                                        }else{
                                            this.$vux.toast.show({
                                                type:"text",
                                                text:"对不起，你不能重复参团"
                                            })
                                        }
                                    }).catch(err=>{
                                        this.$vux.toast.show({
                                                text: "系统异常",
                                                type: 'text',
                                                width: '80%'
                                            });
                                    })
                                }else{
                                    this.$vux.toast.show({
                                        type:"text",
                                        text:"你来晚啦！活动已满团，不能参加咯！"
                                    })
                                }
                            }else{
                                this.$vux.toast.show({
                                    type:"text",
                                    text:'组团时间已过，您不能参加组团'
                                })
                            }
                        }
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
        },
        setname(){
            // 活动的各个时间段
            let userType = cookie.get('http_userType')
            this.axios.get(getActivity + this.activityId)
            .then(res=>{
                console.log(res)  
                // res.data.date 发请求的时间 groupStartTime开始组团的时间  groupEndTime组团结束时间
                if(!res.data.data){
                    this.$vux.toast.show({
                        type:'text',
                        text:'您还不能创建团队'
                    })
                }else{
                    if(res.data.date>res.data.data.groupStartTime && res.data.date<res.data.data.groupEndTime){
                        if(userType==1){
                            this.getnameshow = true
                            this.texts = '确定'
                        }else{
                            this.getnameshow = false
                            this.texts = '去签约'
                        }
                        this.covershow = true
                    }else{
                        this.$vux.toast.show({
                            type:'text',
                            text:"现在不是组团时间,您不能邀请好友"
                        })
                    }
                }
            }).catch(err=>{
                this.$vux.toast.show({
                    text: "系统异常",
                    type: 'text',
                    width: '80%'
                });
            })
        },
        gojoin(){
            // 单人建团
            let userId = cookie.get('http_userID')
            this.axios.post(createTeam,{activityId:this.activityId,userId:userId})
                .then(res=>{
                     if(res.data.status == 'FAIL'){
                         this.$vux.toast.show({
                             type:"text",
                             text:res.data.message
                         })
                     }else{
                        this.$router.push('mytask')
                     }
                }).catch(err=>{
                    this.$vux.toast.show({
                        text: "系统异常",
                        type: 'text',
                        width: '80%'
                    });
                })
        },
        namesuccess(){
            let userId = cookie.get('http_userID')
            let name = this.$refs.input.value 
            let names = name.replace(/\s/g, "")
            if(names.length<3){
                this.$vux.toast.show({
                    type:'text',
                    text:'请输入3-10个字长度的团队名称',
                })
            }else{
            // 多人建团
            this.covershow = false
            // let userId = 60
                this.axios.post(createTeam,{activityId:this.activityId,userId:userId,title:name})
                .then(res=>{
                    console.log(res)
                    if(res.data.status == "SUCCESS"){
                        this.$router.push('mytask')
                        // this.$router.push({path:'teamdetail',query:{id:res.data.data.id,activityId:res.data.data.activityId}})
                    }else{
                        this.$vux.toast.show({
                             type:"text",
                             text:"建团失败"
                        })
                    }
                }).catch(err=>{
                    this.$vux.toast.show({
                        text: "系统异常",
                        type: 'text',
                        width: '80%'
                    });
                })
            }
        },
        gotosign(){
            let routerpath = window.location.href.split("#")[1];
            store.set("routerpath",routerpath);
            this.$router.push('electronicsign')
        }
    },
    
}
</script>

<style lang='scss' rel="stylesheet/scss" scoped>
@import '~src/assets/scss/function';
    #pkact{
        position:relative;
        &>.picture_challenge{
            img{
                width:100%;
                display:block;
            }
            .challenge{
                width:rem-calc(114px);
            }
            .one{
                position:absolute;
                top:rem-calc(468px);
                right:rem-calc(75px);
            }
            .three{
                position:absolute;
                top:rem-calc(568px);
                right:rem-calc(75px);
            }
            .five{
                position:absolute;
                top:rem-calc(670px);
                right:rem-calc(75px);
            }
        }
        &>.picture_join{
            width:100%;
            img{
                width:100%;
                display:block;
            }
            &>.task{
                position:absolute;
                top:rem-calc(420px);
                width:100%;
                height:rem-calc(120px);
                overflow:hidden;
                img{
                    width:rem-calc(107px);
                    display:block;
                    margin:rem-calc(15px) auto rem-calc(6px);
                }
                div{
                   
                    width:50%;
                    line-height:rem-calc(20px);
                    font-size: rem-calc(13px);
                    font-family: "PingFangSC";
                    color: rgb(17, 37, 90);
                }
                div:nth-child(even){
                    text-indent:rem-calc(50px);
                }
            }
            &>.product{
                padding-top:rem-calc(15px);
                position:absolute;
                top:rem-calc(540px);
                width:100%;
                height:rem-calc(250px);
                &>img:nth-child(1){
                    width:rem-calc(107px);
                    display:block;
                    margin:0 auto;
                }
                img:nth-child(2){
                    width:rem-calc(111px);
                    height:rem-calc(99px);
                    position:absolute;
                    top:rem-calc(53px);
                    left:rem-calc(61px);
                }
                img:nth-child(3){
                    height:rem-calc(100px);
                    width:rem-calc(112px);
                    position:absolute;
                    top:rem-calc(53px);
                    left:rem-calc(196px);
                }
                div>div>img{
                    width:rem-calc(170px);
                    margin:rem-calc(155px) auto;
                }
                p:nth-child(5){
                    position:absolute;
                    top:rem-calc(162px);
                    left:rem-calc(60px);
                    font-size:rem-calc(13px);
                    color: rgb(255, 255, 255);
                    font-weight:bolder;
                    -webkit-text-stroke-width:0.5px;
                    -webkit-text-stroke-color:#11255a;
                    width:rem-calc(112px);
                    text-align:center;
                }
                p:nth-child(6){
                    position:absolute;
                    top:rem-calc(162px);
                    left:rem-calc(195px);
                    font-size:rem-calc(13px);
                    color: rgb(255, 255, 255);
                    font-weight:bolder;
                    text-align:center;
                    -webkit-text-stroke-width:0.5px;
                    -webkit-text-stroke-color:#11255a;
                    width:rem-calc(112px);
                }
            }
        }
       &>.rule{
            background:#192a62;
            width:100%;
            min-height:rem-calc(100px);
            padding-top:rem-calc(15px);
            .title{
                position:relative;
                margin:15px auto 10px;
                width:rem-calc(102px);
                img{
                    width:rem-calc(102px);
                }
                &:before{
                    content:' ';
                    position:absolute;
                    box-sizing:border-box;
                    top:rem-calc(8px);
                    left:rem-calc(-105px);
                    display:inline-block;
                    background-color: rgb(255, 255, 255);
                    opacity: 0.4;
                    width:rem-calc(88px);
                    height: 1px;
                    border-top:1px solid #ccc;
                }
                &:after{
                    content:' ';
                    position:absolute;
                    box-sizing:border-box;
                    top:rem-calc(8px);
                    display:inline-block;
                    background-color: rgb(255, 255, 255);
                    opacity: 0.4;
                    width:rem-calc(88px);
                    height: 1px;
                    border-top:1px solid #ccc;
                    left:rem-calc(120px);
                }
            }
            &>ul{
                padding:rem-calc(0 30px);
                &>li{
                    overflow:hidden;
                    &>span{
                        margin-top:rem-calc(10px);
                        text-align:center;
                        float:left;
                        width:rem-calc(14px);
                        height:rem-calc(15px);
                        border-radius:50%;
                        background:#d9326d;
                        line-height:rem-calc(18px);
                        font-size:rem-calc(12px);
                        color:#192a62;
                    }
                    &>p{
                        margin-top:rem-calc(8px);
                        font-family: "PingFangHK";
                        margin-left:rem-calc(8px);
                        width:rem-calc(290px);
                        float:left;
                        font-size:rem-calc(13px);
                        color: rgb(173, 199, 233);
                        line-height:rem-calc(17px);
                        text-align: left;
                        letter-spacing:rem-calc(1px);
                    }
                }
                &>li:nth-child(2) span{
                    background:#f15d97;
                }
                &>li:nth-child(3) span{
                    background:#d3c34c;
                }
                &>li:nth-child(4) span{
                    background:#25c0c5;
                }
                &>li:nth-child(5) span{
                    background:#55cef6;
                }
                &>li:nth-child(6) span{
                    background:#8d8df2;
                }
            }
            .footer{
                margin-top:rem-calc(35px);
                img{
                    display:block;
                    width:100%;
                }
            }
        }
        .cover{
            display:flex;
            width:100%;
            height:100%;
            position:fixed;
            top:0;
            left:0;
            background:rgba(0,0,0,0.5);
            padding-top:rem-calc(150px);
            &>.confirm{
                align-items:center;
                border-radius: rem-calc(10px);
                margin:0 auto;
                background:#ffffff;
                width:76%;
                height:rem-calc(145px);
                &>.gosign{
                padding: rem-calc(20px 0 10px 0);
                text-align:center;
                line-height:rem-calc(28px);
                font-size: rem-calc(18px);
                color: rgb(51, 51, 51);
                }
                &>.top{
                    padding:rem-calc(15px 13px);
                    &>p{
                        letter-spacing: rem-calc(1px);
                        font-size:rem-calc(14px);
                        color:#333333;
                    }
                    &>input{
                        outline:none;
                        -webkit-appearance: none;
                        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                        text-indent: 1rem;
                        margin-top:rem-calc(8px);
                        height:rem-calc(35px);
                        width:100%;
                        border-radius:0;
                    }
                }
                &>.bottom{
                    margin-top:rem-calc(8px);
                    @include bordertop-1px(#f6f6f6);
                    overflow: hidden;
                    &>span{
                        float:left;
                        width:50%;
                        text-align:center;
                        line-height:30px;
                        font-size: rem-calc(18px);
                        color: rgb(0, 189, 150);
                        line-height: 3.5rem;
                    }
                    &>span:last-child{
                        box-sizing:border-box;
                        border-left:1px solid #f6f6f6;
                    }
                }
            }
        }
  
    }
</style>