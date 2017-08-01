<template>
  <div class="page-at">
    <p v-for="item in p">{{item}}</p>
    <c_footergroup btlname="至少有一项是" btrname="全部为否" @leftclick="lBtnCallback" @rightclick="rBtnCallback"></c_footergroup>
  </div>
</template>
<script>
  // import { at1 } from "src/api"
  export default {
    name: 'at',
    data () {
      return {
        p:[
          '这里显示健康告知文字内容。为了保证电子商务活动的正常进行，需要具有书面签名功能的电子签字。而正在被使用或仍在研制开发中的签名技术，其目的是寻求与手写签名和在纸基环境中的其他认证方式（如封缄或盖章）功能相同的替换物。但在电子商务环境中这些技术还可能实现别的功能，这些功能是从签名功能派生出来的，但在纸基环境中却不能找到严格类似的替代物。《电子商业示范法》第7条侧重于签字的两种基本功能：',
          '一．确定一份文件的作者',
          '二．证实该作者同意了该文件的内容',
          '我国《电子签字法》第14条进一步规定，可靠的电子签字与手写签名或者盖章具有同等的法律效力。这是《电子签字法》的核心，它确立了可靠的电子签字的法律效力。电子签字获得法律效力，意味着互联网上用户的身份确定成为可能。使用电子签字业务的用户将不再对与其交流信息的对方一无所知，在这个基础上，网络才有可能真正越出媒体之外，充分运用到商务、政务、科学研究、日常生活等诸多方面，从而使“虚拟空间”真正全面地与现实世界接轨。鉴于电子签字技术的迅速发展，我国《电子签字法>'
        ]
      }
    },
    created () {
      // setTimeout(()=>{this.name=['c']},1000)
      // console.log('hehe')
    },
    methods: {
      lBtnCallback () {
        // console.log('left')
      },
      rBtnCallback () {
        // console.log('right')
        this.$router.push({path:'order/'+this.$route.query.productcode, query:{
          proposalId:this.$route.query.proposalId,
          price:this.$route.query.price
        }})
      }
    },
    watch: {
    },
    components: {
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss">
  @import '~assets/scss/function';
  .page-at{
    background-color: #f6f6f6;
    min-height: 100%;
    padding: 15px 0;
    p{
      text-indent: 28px;
      font-size: 14px;
      line-height: 1.6;
      margin-top: 5px;
      padding: 0 15px;
    }
  }
</style>
