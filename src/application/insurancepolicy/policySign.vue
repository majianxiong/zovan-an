<template>
  <div class="policysign" >
    <div class="wrap" @touchstart='canvasDown($event)'>
      <canvas id="canvas"  @touchmove="canvasMove($event)" @touchend="canvasUp($event)">
      </canvas>
      <div class="mask" >
        <span :class="{disnone:isDisnone}">签字区域</span>
      </div>
      <div class="sign_bottom">
        <div class="clear-canvas" @click="clearCanvas">清空</div>
        <div class="canvas-drawImage" @click = "getImage">确定签字</div>
      </div>
    </div>
  </div>
</template>
<script>
  import {policySignApi} from 'src/api/index.js'
  import cookie from 'src/widget/plugin/cookie'
  let token = cookie.get('http_usertoken')
  let userId = cookie.get('http_userID')
  let source
  export default {
    name: 'PolicySign',
    data () {
      return {
        context: {},
        canvasMoveUse: false,
        isDisnone:false,
        preDrawAry: [],
        canclick: true,
        nextDrawAry: [],
        middleAry: [],
        config: {
          lineWidth: 1,
          lineColor: '#f2849e',
          shadowBlur: 2,
          scal:1
        },
        hasImg: false
      }
    },
    created (){
      let CancelToken = this.axios.CancelToken
      source = CancelToken.source()
    },
    mounted () {
      const canvas = document.querySelector('#canvas')
      canvas.width = canvas.parentNode.offsetWidth
      canvas.height = canvas.parentNode.offsetHeight
      this.context = canvas.getContext('2d')
      this.initDraw()
      this.setCanvasStyle()
      this.reSize()
      this.makeTextDN()
      this.width = canvas.width
      this.height = canvas.height
    },
    
    methods: {
      //  重置画布大小
      reSize () {
        let oriH = canvas.parentNode.offsetHeight;
        let _this=this;
        let recalc=function(){
          var newH = canvas.parentNode.offsetHeight;
          _this.config.scal = oriH/newH;
        }
        document.documentElement.addEventListener('DOMContentLoaded', recalc, false);
        document.documentElement.addEventListener('resize', recalc, false);
      },
      makeTextDN () {
        const _this = this
        setTimeout ( function () {
          _this.isDisnone = true
          } , 2000)
      },
      initDraw () {
        const preData = this.context.getImageData(0, 0, canvas.width, canvas.height)
        this.middleAry.push(preData)
      },
      canvasMove (e) {
        this.hasImg = true;
        if (this.canvasMoveUse) {
          const t = e.target
          let canvasX
          let canvasY
            canvasX = e.changedTouches[0].clientX - t.offsetLeft
            canvasY = e.changedTouches[0].clientY - t.offsetTop
          this.context.lineTo(canvasX, canvasY)
          this.context.stroke()
        }
        e.preventDefault()
      },
      beginPath (e) {
        const canvas = document.querySelector('#canvas')
        if (e.target !== canvas) {
          this.context.beginPath()
        }
      },
      canvasUp (e) {
        const preData = this.context.getImageData(0, 0,canvas.width, canvas.height)
        if (!this.nextDrawAry.length) {
          this.middleAry.push(preData)
        } else {
          this.middleAry = []
          this.middleAry = this.middleAry.concat(this.preDrawAry)
          this.middleAry.push(preData)
          this.nextDrawAry = []
        }
        this.canvasMoveUse = false
      },
      // mousedown
      canvasDown (e) {
          this.isDisnone = true;
          this.canvasMoveUse = true
          const canvasX = e.clientX - e.target.parentNode.offsetLeft
          const canvasY = e.clientY - e.target.parentNode.offsetTop
          this.setCanvasStyle()
          // 清除子路径
          this.context.beginPath()
          this.context.moveTo(canvasX, canvasY*this.config.scal)
          // 当前绘图表面状态
          const preData = this.context.getImageData(0, 0, canvas.width, canvas.height)
          // 当前绘图表面进栈
          this.preDrawAry.push(preData)
      },
      // 生成图片
      getImage () {
        if(this.canclick){
          if(!this.checkIsDraw ()) {this.canclick = true; return}
          this.$store.dispatch('toggleLoadingStatus', false)
          const canvas = document.querySelector('#canvas')
          const src = canvas.toDataURL('image/png')
          let imageData = src.split(",")[1]
          //window.localStorage.setItem('signImg',src);
          // console.log(localStorage.getItem('signImg'))
          this.canclick = false;
          let instance =this.axios.create({
                headers: {'token': token},
                timeout:6000
              });
          instance.post(policySignApi,{
            imageData,
            imageType: "png",
            optCode: userId,
            proposalCode: this.$route.query.proposalId,
          },{cancelToken:source.token})
          .then(res=>{
            this.canclick=true;
            if(res.data.status=="SUCCESS"){
              this.$router.push({path:"h5gopay",query:{proposalId:this.$route.query.proposalId}})
            }else{
              this.$vux.toast.show({
                text: "签字失败，请重新签字",
                type: 'text',
                width: '80%'
              });
              this.clearCanvas();
            }

          }).catch(err=>{
            this.$store.dispatch('toggleLoadingStatus', false)
            this.canclick=true;
            this.$vux.toast.show({
                text: "网络异常",
                type: 'text',
                width: '80%'
              });

          })
        }

      },
      // 设置绘画配置
      setCanvasStyle () {
        this.context.lineWidth = this.config.lineWidth
        this.context.shadowBlur = this.config.shadowBlur
        this.context.shadowColor = this.config.lineColor
        this.context.strokeStyle = this.config.lineColor
      },
      clearCanvas () {
        this.context.clearRect(0, 0, this.width, this.height)
        this.hasImg = false;
      },
      checkIsDraw () {
        this.canclick = true;
        if(!this.hasImg){
          this.$vux.alert.show({
            title: '',
            content: '请签名',
          })
          return false;
        }
        return true;
      }
    },
    beforeDestroy(){
      source.cancel('取消请求')
    }
  }
</script>
<style lang="scss" scoped>
  @import '~src/assets/scss/function';
  .policysign{
    height: 100%;
    .wrap {
      position: relative;
      width:100%;
      height: 100%;
      overflow: hidden;
      #canvas{
        width: 100%;
        height: 100%;
        margin-bottom: rem-calc(50px);
        cursor: crosshair;
      }
      .mask{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color:#f3f3f3 ;
        z-index: -1;
        >span{
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-60%);
          font-size:16px;
          color: #999999;
        }
        .disnone{
          display: none;
        }
      }
    .sign_bottom{
      position: absolute;
      background: #fff;
      left: 0;
      bottom: 0;
      height:50px;
      width: 100%;
      line-height:50px;
        .canvas-drawImage,.clear-canvas{
          width:rem-calc(130px);
          text-align: center;
          height:50px;
          font-size:16px;
          user-select:none;
        }
        .canvas-drawImage{
          height: 50px;
          float: right;
          border-left:1px solid #e8e8e8;
          background-image: -webkit-linear-gradient( 0deg, rgb(108,217,182) 0%, rgb(54,210,159) 45%, rgb(0,203,135) 100%);
          color: #fff;
        }
        .clear-canvas{
          float: left;
          color: #00BD96;
          border-right: 1px solid #e8e8e8;
        }
      }
    }
  }
</style>
