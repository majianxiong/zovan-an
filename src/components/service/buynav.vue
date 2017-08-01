<template>
  <!-- <div class="" style="height:50px">
    <div class="buyNav">
        <div class="priceele">保费<i>¥</i><span>{{price}}</span></div>
        <div @click="buy(productId)">{{btntext}}</div>
    </div>
  </div> -->
</template>
<script>
export default {
        name:'buynav',
        data () {
          return {
          }
        },
        created () {
          let container = document.createElement('div')
          let html = '<div class="buyNav"><div class="priceele">保费<i>¥</i><span id="priceSpan">'+this.price+'</span></div><div id="buyBt">'+this.btntext+'</div></div>'

          container.id = 'buyNav'
          // container.style.height = '50px'
          container.innerHTML = html

          document.body.appendChild(container)
        },
        beforeDestroy () {
          let container = window.document.getElementById('buyNav')
          container && document.body.removeChild(container)
        },
        watch: {
          price(val) {
            window.document.getElementById('priceSpan').innerHTML = val
          }
        },
        mounted () {
          let self = this
          try {
            window.document.getElementById('buyBt').onclick = function() {
              self.buy()
            }
          } catch(e) {
            //alert(e.message)
          }
        },
        components:{
        },
        props:["price","btntext","productId","productCode","share","codeimg"],
        methods:{
          // showshare(){
          //   this.$emit('Click');
          // },
          buy(n){
            this.$emit('buy');
          },
          // qrcode(){
          //   this.$router.push({ path: '/productdetail', query: { productId: this.productId, productCode: this.productCode, status:false}})
          // }
        }
}
</script>
<style  lang='scss' rel="stylesheet/scss">
@import '~assets/scss/function';
#buyNav{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
.buyNav{
  display: table;
  background:#fff;
  width:100%;
  // -webkit-overflow-scrolling: auto;
  // backface-visibility: hidden;
  // perspective: 1000;
  // transform: translate3d(0, 0, 0);
  height: rem-calc(50px);
  overflow: hidden;
  // border-top:1px solid #ddd;
  // will-change: transform;
  font-size: rem-calc(15px);
  &>div{display: table-cell;
    line-height: rem-calc(50px);
    height: rem-calc(50px);
    vertical-align: middle;
    // &.shareele{
    //   border-right: 1px solid #ddd;
    //   text-align: center;
    //   font-size: rem-calc(10px);
    //   position: relative;
    //   overflow: hidden;
    //   vertical-align: bottom;
    //   width:rem-calc(45px);
    //   &>span{position: relative;bottom:rem-calc(-11px);}
    //   &:before{
    //     display: block;
    //     content:" ";
    //     position: absolute;
    //     width:rem-calc(17px);
    //     height: rem-calc(17px);
    //     background: url("~assets/images/share2.png") no-repeat;
    //     background-size:100%;
    //     top:rem-calc(5px);
    //     left:30%;
    //   }
    // }
    // &.qrcodeele{
    //   border-right: 1px solid #ddd;
    //   text-align: center;
    //   position: relative;
    //   &:before{
    //       content:" ";
    //       display: block;
    //       position: absolute;
    //       background: url("~assets/images/product/qrcode2.png") no-repeat;
    //       background-size:80%;
    //       background-position: center center;
    //       width: rem-calc(19px);
    //       height: rem-calc(19px);
    //       top:rem-calc(5px);
    //       left:30%;
    //
    //   }
    //   &>span{
    //     position: relative;bottom:rem-calc(-11px);
    //     font-size: rem-calc(11px);
    //   }
    // }
    &.priceele{
        font-size:rem-calc(15px);
        text-align:right;
        padding-right:15px;
        color:#666;
        &>i{
          color:#ff771c;
          font-style: normal;
          margin-left: 10px;
        }
        &>span{
          color:#ff771c;
          font-size:rem-calc(20px);
        }
    }
    &:last-child{width:44%;background:#53d6ab;color:#fff;text-align: center;font-size:rem-calc(18px);}
  }

}
</style>
