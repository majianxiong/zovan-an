<!--
      descript: 首页
        author: zhuyi
-->
<template>
  <div class="page-home">
    <div class="swiperSliderBox">
      <swiper :options="swiperOption" ref="bannerSwiper">
        <swiper-slide v-for="(slide,index) in swiperSlides" :key="++index">
          <router-link :to="slide.link">
            <img :src="slide.url"/>
          </router-link>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <!--<div class="swiperTabBox">
      <div class="btn-unfold" :class="{'active':btnUnfoldActive}" v-tap="{methods:unfold}">
      </div>
      <div class="box-unfold" v-show="unfoldElemShow">
        <div class="box-unfold-tit">
          全部分类
        </div>
        <span v-for="(tab,index) in swiperTabs" :class="{'active':index==tabIndex}" v-tap="{methods:getProductList,params:{query:tab.query,index:index}}" :key="++index">
          {{tab.text}}
        </span>
      </div>
      <swiper ref="tabSwiper" :options="swiperOption2">
        <swiper-slide v-for="(tab,index) in swiperTabs" :class="{'active':index==tabIndex}" v-tap="{methods:getProductList,params:{query:tab.query,index:index}}" :key="++index">
          {{tab.text}}
        </swiper-slide>
        <div class="swiper-scrollbar" slot="scrollbar"></div>
      </swiper>
    </div>-->
    <div class="productList">
      <ul>
        <li v-for="(product,index) in products">
          <router-link :to="product.link">
            <div class="">
              <img :src="product.imgurl" alt="">
            </div>
            <div class="intro">
              <div class="t">{{product.title}}</div>
              <div class="desc"><span v-for="desc in product.desc">{{desc}}</span></div>
              <div class="prices">
                <span class="price">{{product.price}}
                  <span class="unit">元起</span>
                </span>
                <div v-if="product.promotion" style="display:none" ref="promotion" class="promotion">推广费 <span class="percent">{{product.promotion}}</span>%</div>
              </div>
              <div class="brand">
                <!-- <span class="sales">销量 {{product.sales}}份</span> -->
                <span class="name">{{product.brandname}}</span>
                <span class="slogan">{{product.slogan}}</span>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <!-- <tab :animate="false" :line-width="2" active-color="#14a3ff" defaultColor="#666">
      <tab-item v-for="(item,index) in tab" :key="item.id" :selected="seled == index ? true : false" active-class="active" @on-item-click="handler(index)">
        {{item.name}}
      </tab-item>
    </tab> -->
    <!-- <Scrollbox v-for="(item,index) in tab" :id='item.id' v-show="seled == index ? true : false" :key="item.id" ></Scrollbox> -->
    <div class="hotDialog" v-if="inApp">
      <x-dialog v-model="showHotDialog" class="dialog">
        <div class="img-box">
          <router-link to='/invitefriends'>
            <img src="~static/pic/tps/home/01.png" style="max-width:100%" ref='activityPop'>
          </router-link>
        </div>
        <span class="dialog-close" @click="showHotDialog=false"></span>
      </x-dialog>
    </div>
  </div>

</template>

<script>
  import cookie from '../../widget/plugin/cookie'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import { Tab, TabItem, XDialog } from 'vux'
  // import { TransferDomDirective as TransferDom } from 'vux'
  //import { bannerListApi, productSortApi, productListApi } from 'src/api'
  let inApp = cookie.get('http_ostype')?true:true

  export default {
    name: 'home',
    data () {
      return {
        inApp: inApp,
        showHotDialog: false,
        seled: this.$route.query.index || 0,
        swiperOption: {
          autoplay: 3000,
          initialSlide: 0,
          // onSlideChangeEnd: swiper => {
            // console.log('onSlideChangeEnd', swiper.realIndex)
          // },
          // autoplay: false,
          setWrapperSize: false,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          mousewheelControl: false,
          observer: true, // 修改swiper自己或子元素时，自动初始化swiper
          observeParents: true, // 修改swiper的父元素时，自动初始化swiper
          loop: true,
          touchRatio: 1,
          autoplayDisableOnInteraction: false
        },
        swiperOption2: {
          scrollbar: '.swiper-scrollbar',
          direction: 'horizontal',
          slidesPerView: 'auto',
          mousewheelControl: true,
          freeMode: true,
          // scrollbarHide: false,
          // centeredSlides: true
        },
        swiperSlides: [{title:"",url:require("src/assets/image/banner_teamact.png"),link:"/teamactivity"},{title:"",url:require("src/assets/image/banner_pkact.jpg"),link:"/pkact"},{title:"",url:require("src/assets/image/banner_home02.png"),link:""},{title:"",url:require("src/assets/image/banner_home03.png"),link:""},{title:"",url:require("src/assets/image/banner_home04.png"),link:""}],
        swiperTabs: [],
        tabIndex: 1,
        products: [
          {
            "link": "/detail/ZA0002",
            "imgurl": "../../../static/pic/za0002.jpg",
            "title": "康健人生重大疾病保障计划",
            "desc": ["重疾保障","祝寿养老","终身保障"],
            "price": "830.00",
            "promotion": "10",
            "sales": "88万",
            "brandname": "长城人寿",
            "slogan": ""
          },
          {
            "link": "/detail/ZA0003",
            "imgurl": "../../../static/pic/za0003.jpg",
            "title": "美泰人生重大疾病保障计划",
            "desc": ["百种疾病","身故全残","终身保障"],
            "price": "1110.00",
            "promotion": "20",
            "sales": "88万",
            "brandname": "陆家嘴国泰人寿",
            "slogan": ""
          }
        ],
        pagepercent: 0,
        btnUnfoldActive: false,
        unfoldElemShow: false
      }
    },
    created: function () {
      // this.setTitle(this.$route.meta.header.title, 'index')
      // this.getBanner()
      // this.getTabData()
      // this.getProductList({params:{query:1,index:0}})
    },
    mounted(){
      let promotions = this.$refs.promotion
       window.showPro = (i)=> {
         if(i==0){
           promotions.forEach((item)=>{
             item.style.display = 'none'
           })
         }else{
           promotions.forEach((item)=>{
             item.style.display = 'block'
           })
         }
      }
      if(inApp){
        setTimeout(()=>{
          if(window.sessionStorage){
            // console.log(sessionStorage.getItem('home_showHotDialog'))
            if(sessionStorage.getItem('home_showHotDialog')!=1){
              this.showHotDialog = true
              sessionStorage.setItem('home_showHotDialog',1)
            }
          }else{
            this.showHotDialog = true
          }
        },3000)
      }
    },
    beforeDestroy(){
      this.jsbridge.callMask('hide')
    },
    computed:{
      swiper() {
        return (this.$children.find(children => children.options.name == 'currentswiper').swiper)
      }//,
      // tabSwiper() {
      //   return this.$refs.tabSwiper.swiper
      // }
    },
    watch:{
      showHotDialog(val){
        val? this.jsbridge.callMask('show') : this.jsbridge.callMask('hide')
      }
    },
    components: {
      Tab, TabItem, swiper, swiperSlide, XDialog
    },
    methods: {
      // handler (n) { // tab 板块的id 听过click 传入
      //   this.seled = n
      // },
      unfold (e) {
        this.btnUnfoldActive = !this.btnUnfoldActive
        this.unfoldElemShow = !this.unfoldElemShow
      }//,
      // getProductList (args) {
      //   this.unfoldElemShow = false
      //   //post错误
      //   this.tabIndex = args.params.index+1
      //   console.log(args.params.index)
      //   this.axios.get(productListApi,{start:this.pagepercent,query:args.params.query,limit:30}).then((response) => {
      //     if (response.data.data.result) {
      //       // let tabs = []
      //       // response.data.data.items.forEach(function (ele) {
      //       //   tabs.push({
      //       //     text: ele.text,
      //       //     query: ele.query
      //       //   })
      //       // })
      //       // this.swiperTabs = tabs
      //       this.products = [...response.data.data.items]
      //       // console.log(this.products)
      //       ++this.pagepercent
      //       // console.log(this.tabSwiper)
      //       this.tabSwiper.slideTo(this.tabIndex-1)
      //     }
      //     // this.show = this.items.length > 0
      //     // this.loadStatus = !this.loadStatus
      //   }, (response) => {
      //     // this.loadStatus = !this.loadStatus
      //   })
      // },
      // getTabData () { // 获取tab数据
      //   this.axios.get(productSortApi).then((response) => {
      //     if (response.data.data.result) {
      //       let tabs = []
      //       response.data.data.items.forEach(function (ele) {
      //         tabs.push({
      //           text: ele.text,
      //           query: ele.query
      //         })
      //       })
      //       this.swiperTabs = tabs
      //       //  this.activitySlides = response.data.resultContent.activityImgPath
      //     }
      //     // this.show = this.items.length > 0
      //     // this.loadStatus = !this.loadStatus
      //   }, (response) => {
      //     // this.loadStatus = !this.loadStatus
      //   })
      // },
      // getBanner () {
      //   this.axios.get(bannerListApi).then((response) => {
      //     if (response.data.data.result) {
      //       let ban = []
      //       response.data.data.items.forEach(function (ele) {
      //         ban.push({
      //           link: ele.link,
      //           url: ele.url,
      //           title: ele.title
      //         })
      //       })
      //       this.swiperSlides = ban
      //       //  this.activitySlides = response.data.resultContent.activityImgPath
      //     }
      //     // this.show = this.items.length > 0
      //     // this.loadStatus = !this.loadStatus
      //   }, (response) => {
      //     // this.loadStatus = !this.loadStatus
      //   })
      // }
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss">
  @import '~src/assets/scss/function';
  .page-home{
    @include fullpage;
    @include display-flex;
    .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets{
      bottom:rem-calc(20px);
    }
    .swiperSliderBox{
      border-bottom:rem-calc(2px);
      z-index: 1;
      height:rem-calc(200px);
      .swiper-container{
        width:100%;
        height:rem-calc(200px);
        overflow: hidden;
        .swiper-wrapper{
          position: absolute!important;
        }
        & img{
          width: 100%;
          display: block;
          height: 100%;
        }
        .swiper-pagination-bullet{
          width:rem-calc(25px);
          height: 2px;
          line-height: 2px;
          overflow: hidden;
          background: #fff;
          border-radius: 0;
          margin:0;
        }
      }
    }
    .swiperTabBox{
      background-color: #fff;
      border-radius: rem-calc(12px);
      line-height: rem-calc(50px);
      height: rem-calc(50px);
      margin-top: rem-calc(-10px);
      position: relative;
      z-index: 2;
      padding-right: rem-calc(50px);
      padding-left: rem-calc(15px);
      @include borderbottom-1px(#eee);
      .box-unfold{
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 59;
        background-color: #fff;
        padding: 0 rem-calc(25px) rem-calc(12px);
        font-size: 0;
        text-align: left;
        line-height: normal;
        border-radius: rem-calc(12px);
        box-sizing: border-box;
        .box-unfold-tit{
          height: rem-calc(51px);
          line-height: rem-calc(50px);
          margin: 0 rem-calc(-25px) rem-calc(12px) ;
          padding: 0 rem-calc(25px);
          color: #333;
          font-size: rem-calc(15px);
          @include borderbottom-1px(#eee);
        }
        span{
          width: 22%;
          display: inline-block;
          vertical-align: middle;
          margin: rem-calc(8px) 4% rem-calc(7px) 0;
          text-align: center;
          line-height: rem-calc(25px);
          color: #666;
          background-color: #f6f6f6;
          font-size: rem-calc(12px);
          border-radius: 2px;
          box-sizing: border-box;
          &.active{
            color: #00bd96;
            border: 1px solid #00bd96;
            background: none;
          }
          &:nth-of-type(4n){
            margin-right: 0;
          }
        }
      }
      .btn-unfold{
        position: absolute;
        right: 0;
        top: 0;
        z-index: 99;
        width: rem-calc(50px);
        height: rem-calc(50px);
        line-height: rem-calc(50px);
        border-radius: 0 rem-calc(12px) 0 0;
        background-color: #fff;
        text-align: center;
        box-shadow: 0 -10px 30px 0 rgba(84, 84, 84, 0.1);
        &.active{
          &:before{
            border: rem-calc(7px) dashed transparent;
            border-bottom: rem-calc(7px) solid #666;
            margin-top: rem-calc(-7px);
          }
        }
        &:before{
          width: 0;
          height: 0;
          border: rem-calc(7px) dashed transparent;
          border-top: rem-calc(7px) solid #666;
          margin-top: rem-calc(7px);
          content: '';
          display: inline-block;
          vertical-align: middle;
        }
      }
      .swiper-container{
        width:100%;
        height: rem-calc(40px);
        overflow: hidden;
        box-sizing: border-box;
        .swiper-slide{
          font-size: rem-calc(15px);
          color: #666;
          min-width: rem-calc(45px);
          padding: 0 rem-calc(15px);
          height: rem-calc(50px);
          width: auto;
          height: auto;
          text-align: center;
          &:first-of-type{
            padding-left: 0;
          }
          &.active{
            color: #00bd96;
            &:after{
              content: '';
              display: block;
              margin: 0 rem-calc(4px);
              height: rem-calc(3px);
              margin: rem-calc(-15px) auto 0;
              width: 60%;
              background-image: linear-gradient( 90deg, rgb(0,189,150) 0%, rgb(37,233,185) 100%);
              -webkit-background-size: cover;
              background-size: cover;
              border-radius: 3px;
            }
          }
        }
        .swiper-scrollbar{
          display: none
        }
      }
    }
    .productList{
      li{
        position:relative;
        box-sizing: border-box;
        padding: rem-calc(15px) 0 0 rem-calc(15px);
        height:rem-calc(150px);
        @include borderbottom-1px(#eee);
        > a{
          @include display-flex(row);
        }
        img{
          width: rem-calc(85px);
          height: rem-calc(85px);
        }
        .intro{
          box-sizing: border-box;
          flex: 1;
          padding-left:rem-calc(20px);
          .t{
            font-size: rem-calc(15px);
            color:#333;
          }
          .desc{
            font-size: rem-calc(13px);
            color: #666;
            padding: rem-calc(15px) 0 rem-calc(18px);
            color:#666;
            span:first-of-type:before{
              display: none;
            }
            span:before{
              content: '|';
              margin: 0 rem-calc(11px);
              color: #dedede;
            }
          }
          .prices{
            margin-top:rem-calc(9px);
            margin-right:rem-calc(15px);
            .price{
              color: #fb5959;
              font-size: rem-calc(19px);
              .unit{
                font-size: rem-calc(12px);
              }
            }
          }
          .promotion{
            float: right;
            color: #ff6c00;
            font-size: rem-calc(13px);
            .percent{
            }
          }
          .brand{
            color: #999;
            font-size: rem-calc(12px);
            // overflow: hidden;
            position:absolute;
            height:rem-calc(42px);
            line-height:rem-calc(42px);
            bottom:0;
            width:100%;
            vertical-align:middle;
            @include bordertop-1px(#eeeeee);
            .name{
              display:inline-block;
              padding:rem-calc(2px) rem-calc(8px);
              line-height:rem-calc(20px);
              color: #00bd96;
              @include convert-to-1px(#00bd96,2px);
            }
            .solgan{

            }
            .sales{
              float: right;
              padding-top:rem-calc(3px);
            }
          }
        }
      }
    }
    @at-root .hotDialog{
      .img-box {
        img {
          display:block!important;
        }
      }
      .weui-dialog {
        width: 86%;
        max-width: 320px;
        background-color:transparent!important;
      }
      .dialog,.weui-dialog{
        background: none;
      }
      .dialog-close{
        // position: absolute;
        margin: 3rem auto 0;
        display: block;
        width: 40px;
        height: 40px;
        background: url(~assets/image/dialog_closer.png) no-repeat;
        -webkit-background-size: 40px auto;
        background-size: 40px auto;
      }
    }
    .activityBox{
      margin-bottom: rem-calc(70px);
      margin-left:auto;
      margin-right:auto;
      margin-top: rem-calc(15px);
      width: rem-calc(332px);
      height: rem-calc(65px);
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
</style>
