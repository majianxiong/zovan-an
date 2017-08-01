
<!--********************************************************************
 * Author        : Geyan
 * Email         : geyan@zhongan.io
 * Create Date   : 2017-05-05 15:52
 * Filename      : footerGroup.vue
 * Description   : 底部双button
 * Arguments     :
     btlname: 左侧button名
     btrname: 右侧button名
 * Callbacks     :
     leftclick: 左侧button点击事件
     rightclick: 右侧button点击事件

********************************************************************-->

<template>
<!-- <div ref='footer' class='footer-group'>
  <div class='plan' v-tap='{methods:click1}'>{{ btlname }}</div>
  <div class='confirm' v-tap='{methods:click2}'>{{ btrname }}</div>
  <div style='position:absolute;left:-9999px'></div>
</div> -->
</template>

<script>
  export default {
    data: () => {
      return {
      }
    },
    props: {
      btlname:{
        type: String,
        default: '取消'
      },
      btrname:{
        type: String,
        default: '确定'
      },
      btlshow:{
        type: Boolean,
        default: true
      },
      btrshow:{
        type: Boolean,
        default: true
      }
    },
    computed: {
    },
    methods: {
      click1 () {
        this.$emit('leftclick')
      },
      click2 () {
        this.$emit('rightclick')
      }
    },
    mounted () {
      // this.$nextTick(() => {
        // let html = "<div id='footerBt' class='footer-group'><div class='plan' >"+this.btlname+"</div><div class='confirm'>"+this.btrname+"</div></div>"
        let footer = document.createElement('div')
        let lbt = document.createElement('div')
        let rbt = document.createElement('div')
        footer.id = 'footerBt'
        footer.className = 'footer-group'
        lbt.className = 'plan'
        lbt.innerHTML = this.btlname
        rbt.className = 'confirm'
        rbt.innerHTML = this.btrname
        lbt.onclick = this.click1
        rbt.onclick = this.click2
        try {
          this.btlshow && footer.appendChild(lbt)
          this.btrshow && footer.appendChild(rbt)
          document.body.appendChild(footer)
        } catch(e) {
          //alert(e.message)
        }
      // })
      console.log(footerBt)
    },
    beforeDestroy () {
      console.log('beforeDestroy')
      let footer = window.document.getElementById('footerBt')
      footer && document.body.removeChild(footer)
    },
    // activated(){
    //   console.log('activated')
    // },
    // deactivated(){
    //   console.log('deactivated')
    // }

  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  @import '~assets/scss/function';
  .footer-group {
        display:flex;
        align-items: stretch;
        position:fixed;
        width:100%;
        height:rem-calc(48px);
        z-index:900;
        background-color:#fff;
        align-items: stretch;
        bottom:0;
        left:0;
        right:0;
        // -webkit-transform: translateZ(0);
        // transform: translateZ(0);
        div {
          color:#fff;
          text-align:center;
          font-size:rem-calc(18px);
          line-height:rem-calc(48px);
          border:none;
          outline: none;
          -webkit-appearance: none;
        }
        .plan {
          width: 70%;
          background-color:#324150;
        }
        .confirm{
          flex:1;
          background-image: -webkit-linear-gradient( 0deg, rgb(108,217,182) 0%, rgb(54,210,159) 45%, rgb(0,203,135) 100%);
        }
      }
</style>
