<template>
    <div class="messagecenter">
        <div class="activity" v-tap="{methods:goactivity}" v-show="actshow">
            <img src="~assets/image/message/icon_activity.png" alt="">
            <span>活动通知</span> <br>
            <span class="content">团战活动已上线，快邀请好友来参加</span>
        </div>
        <div class="activity" v-tap="{methods:gomessages}">
            <img src="~assets/image/message/icon_message.png" alt="">
            <span>系统消息</span> <br>
            <span class="content">您客户的保单已填写完成</span>
        </div>
    </div>
</template>

<script>
    import cookie from 'src/widget/plugin/cookie'
    export default {
        name:'messagecenter',
        data(){
            return{
                actshow:true,
                pageNumber:1,
                pageSize:100,
                list:[]
            }
        },
        methods:{
            goactivity(){
                this.$router.push('highselectactivity')
            },
            gomessages(){
                this.$router.push('messages')
            }
        },
        created(){
            let userType = cookie.get('http_userType')
            if(userType == 1){
                this.actshow = true
            }else{
                this.actshow = false
            }
        },
        mounted(){
            
        }
    }
</script>

<style lang='scss' rel="stylesheet/scss" scoped>
    @import '~src/assets/scss/function';
    .messagecenter{
        width:100%;
        height:100%;
        background:#f6f6f6;
       &>.activity{
           overflow:hidden;
           width:100%;
           height:rem-calc(47px);
           background:#ffffff;
           padding:rem-calc(10px 15px);
           @include bordertop-1px(#f6f6f6);
           &>img{
                float:left;
                -webkit-transform-origin:0 0;
                transform-origin:0 0;
                -webkit-transform:scale(0.5);
                transform:scale(0.5);
           }
           &>span{
               font-size:rem-calc(15px);
               line-height:rem-calc(28px);
               margin:rem-calc(5px 0px 5px -35px);
               color:#333333;
               letter-spacing:rem-calc(1px);
           }
           &>.content{
               margin-top:rem-calc(-5px);
               font-size:rem-calc(13px);
               color:#666666;
               line-height:rem-calc(0);
           }
       }
    }
</style>
