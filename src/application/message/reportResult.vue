<template>
    <div id="report">
        <div class="header">你举报的吐槽已初步认定为正常消息，感谢你的举报。</div>
        <div class="report-content">
            <div class="title">干我们这行好苦，好多人觉得买保险就不吉利，怎么破，怎么破，怎么破</div>
            <img src="~assets/image/myx-bg.png" alt="">
        </div>
        <div class="rule">
            <div v-for="(l,index) in list" :key="index" :class="index==0?'bloders':''">
                <div class="title">{{l.title}}</div>
                <div class="content">{{l.content}}</div>
            </div>
            <div style="margin-top:20px">
                <div>哪些类型的举报不受理？</div>
                <div>1、在其他平台或者社交应用内发生的纠纷或者被骗而举报，不予受理。</div>
                <div>2、因私人恩怨产生的口角争执，请自行拉黑，保啊不予调解。</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"reportresult",
        data(){
            return{
                list:[
                    {title:"举报问题处理规范",content:"为建设一个健康和完善的网络社区环境，维护保啊社区的基本秩序，当你发现以下行为，请举报提交给系统:"},
                    {title:"(1) 色情低俗",content:"在整体上宣传淫秽行为、跳动人们的性欲，导致普通人腐化、堕落，又没有艺术或者科学价值的文字、图片、音频、视频等信息内容。"},
                    {title:"(2) 广告骚扰",content:"频繁发布广告内容，销售违法违规的商品，或对用户造成严重骚扰的内容。"},
                    {title:"(3) 政治敏感",content:"发布包括反对宪法确定的基本原则；危害国家统一、主权和领土完整；泄露国家机密、危害国家安全或者损害国家荣誉和利益；煽动民族仇恨、民族歧视，破坏民族团结，或者侵害民族风俗、习惯；宣扬邪教、迷信；散布谣言，扰乱社会秩序，破坏社会稳定；宣扬赌博、暴力或者教唆犯罪；煽动非法集会、结社、游行、示威、聚众扰乱社会秩序以及含有法律、行政法规和国家规定禁止的其他内容。"},
                    {title:"(4) 谣言",content:"无事实依据，被捏造出来并通过一定手段推动传播的言论。"},
                    {title:"(5) 泄露他人信息",content:"公开他人真实姓名、身份证号、电话号码、家庭住址以及公开他人不愿被知悉的不危害社会的信息。用户已公开或授权公开的除外，涉及公共利益的除外。"},
                    {title:"(6) 人身攻击",content:"以侮辱性言论伤害他人；刻意捏造信息破坏他人名誉等侮辱、诽谤行为。当您发现以上违法信息时，可向后台举报。所有举报再提交一个工作日内处理，并反馈结果。违规信息被管理员删除后，作者将受到警告，多i次警告后经被禁言。若您被禁言，请耐心等待封禁时间结束（通常为3天），此后不要再发表违规信息，否则可能被禁言更长时间甚至永久禁言。"},
                    // {title:"哪些类型的举报不受理？",content:"1、在其他平台或者社交应用内发生的纠纷或者被骗而举报，不予受理。2、因私人恩怨产生的口角争执，请自行拉黑，保啊不予调解。"}
                ]
            }
        }
    }
</script>

<style lang='scss' rel="stylesheet/scss" scoped>
@import '~src/assets/scss/function';
    #report{
        .header{
            font-size: rem-calc(17px);
            color: rgb(51, 51, 51);
            line-height:rem-calc(25px);
            padding:rem-calc(20px 15px 20px);
        }
        .report-content{
            border-left:2px solid #dedede;
            margin:rem-calc(0 15px);
            padding:rem-calc(0 0 0 10px);
            .title{
                font-size: rem-calc(14px);
                color: rgb(102, 102, 102);
                line-height: rem-calc(20px);
                margin-bottom:rem-calc(10px);
            }
            img{
                width:rem-calc(190px);
                height:rem-calc(150px);
            }
        }
        .rule{
            width:92%;
            margin:rem-calc(30px) auto;
            padding:rem-calc(15px);
            box-sizing:border-box;
            border-radius:rem-calc(5px);
            line-height:rem-calc(25px);
            background-color: rgb(243, 243, 243);
            color: rgb(102, 102, 102);
            .bloders{
                .title{
                    font-size: rem-calc(15px);
                    color: rgb(51, 51, 51);  

                }      
            }
        }
    }
</style>