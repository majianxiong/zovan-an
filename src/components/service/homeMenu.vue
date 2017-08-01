<!--********************************************************************
 * Author        : zhuyi
 * Description   : 首页菜单

********************************************************************-->

<template>
  <div class='home-menu'>
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
  export default {
    data: () => {
      return {
        startX: 0,
        leftX: 0,
        curAge: 0,
        offsetX: 0,
        totalX: 0,
        moving: false,
        slider: {},
        overlay: {}
      }
    },
    props: {
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 100
      },
      cur: {
        type: Number,
        default: 0
      },
      unit: {
        type: String,
        default: ''
      },
      follow: {
        type: Boolean,
        default: true
      }
    },
    watch: {
      curAge: function (val) {
        this.$emit('onChange', val)
      },
      cur: function (val) {
        this.curAge = val
        !this.moving && this.updateLeftByAge()
      }
    },
    computed: {
    },
    methods: {
      startSlide (e) {
        let self = this
        this.startX = e.touches[0].screenX
        this.getLeftByView()
        this.$el.addEventListener('touchmove', this.moveSlide)
        this.$el.addEventListener('touchend', this.endSlide)
      },
      moveSlide (e) {
        this.moving = true
        const curX = e.touches[0].screenX
        const slider = this.slider
        const overlay = this.overlay
        let offset = parseInt(this.leftX) + curX - this.startX
        offset = offset < 0 ? 0 : (offset > this.totalX ? this.totalX : offset)
        console.log('offset : ' + offset)
        this.offsetX = offset
        slider.style.left = this.offsetX + 'px'
        overlay.style.width = this.offsetX + 'px'

        this.curAge = Math.floor(this.min + (this.max - this.min) * offset / this.totalX)
      },
      endSlide (e) {
        this.$el.removeEventListener('touchmove', this.moveSlide)
        this.$el.removeEventListener('touchend', this.endSlide)
        this.moving = false
        this.startX = 0
      },
      init () {
        this.slider = this.$el.querySelector('.range-slider')
        this.overlay = this.$el.querySelector('.range-left')
        this.totalX = this.getCurCss(this.$el.querySelector('.range-base'), 'width').replace(/[a-zA-Z]/g, '')
        console.log(this.totalX)
        this.initCur()
        this.updateLeftByAge()
      },
      getLeftByView () {
        let left = this.getCurCss(this.slider, 'left')
        this.leftX = left.replace(/[a-zA-Z]/g, '')
      },
      updateLeftByAge () {
        let _total = this.totalX
        let _left = (this.curAge - this.min) / (this.max - this.min) * _total
        this.slider.style.left = _left + 'px'
        this.overlay.style.width = _left + 'px'
      },
      getCurCss (obj, attr) {
        if (document.currentStyle) {
          return obj.currentStyle[attr]
        } else {
          return document.defaultView.getComputedStyle(obj)[attr]
        }
      },
      initCur () {
        this.curAge = this.cur < this.min ? this.min : (this.cur > this.max) ? this.max : this.cur
      }
    },
    activated () {
      this.init()
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  @import '~assets/scss/function';
  .range-container {
    height:rem-calc(32px);
    position:relative;
    padding-left:rem-calc(50px);
    padding-right:rem-calc(50px);
    .range-base {
      height:rem-calc(8px);
      background-color:#d9f3ff;
      position:relative;
      border-radius:rem-calc(4px);
      .range-left {
        position:absolute;
        left:0;
        top:0;
        height:100%;
        width:rem-calc(40px);
        background-color:#00aeff;
        border-top-left-radius:rem-calc(4px);
        border-bottom-left-radius:rem-calc(4px);
      }
      .range-slider {
        position:absolute;
        left:0;
        top:rem-calc(-6px);
        width:rem-calc(20px);
        height:rem-calc(20px);
        margin-left:(-10px);
        border-radius:rem-calc(10px);
        background-color:#f7f7f7;
        box-shadow: inset 0 0 0 rem-calc(6px) #00aeff;
        .range-cur {
          position:absolute;
          left:0;
          right:0;
          top:rem-calc(26px);
          margin:auto;
          width:rem-calc(30px);
          font-size:rem-calc(13px);
          font-weight:bold;
          word-break:keep-all;
          color:#00aeff;
        }
      }
    }
    .range-min {
      position:absolute;
      left:rem-calc(0px);
      top:rem-calc(0px);
      color:#999;
      font-size:rem-calc(13px);
    }
    .range-max {
      position:absolute;
      right:rem-calc(0px);
      top:rem-calc(0px);
      color:#999;
      font-size:rem-calc(13px);
    }
  }
</style>
