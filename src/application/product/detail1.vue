
<!--********************************************************************
 * Author        : Geyan
 * Email         : geyan@zhongan.io
 * Create Date   : 2017-05-03 19:48
 * Filename      : detail.vue
 * Description   : 爱无限健康寿险

********************************************************************-->

<template>
<div class='detail-content'>
  <div class='detail-header'>
    <img src='~src/assets/image/detail_header.jpg'>
  </div>
  <group class="detail-group" label-width="4.5em" label-margin-right="2em" label-align="right">
    <cell v-for='item in groupData' :title='item.title' :value='item.value' :key='item.id'></cell>
  </group>
  <div class='identity'>
    <div class='identity-item' :class='{selected:avatarActived == 1}' data-val='1' data-comp='charactor' @click='toggleTab'>
      <span>产品特色</span>
      <div class='under'></div>
    </div>
    <div class='identity-item' :class='{selected:avatarActived == 2}' data-val='2' data-comp='plan' @click='toggleTab'>
      <span>投保计划</span>
      <div class='under'></div>
    </div>
    <div class='identity-item' :class='{selected:avatarActived == 3}' data-val='3' data-comp='rule' @click='toggleTab'>
      <span>投保规则</span>
      <div class='under'></div>
    </div>
  </div>

  <div class="detail-view">
    <keep-alive>
      <component v-bind:is="currentView" :datas="compdata">
      </component>
    </keep-alive>
  </div>
  <footerGroup @leftclick='footerLClick' @rightclick='footerRClick' btlname='简易计划书' btrname='确认投保'></footerGroup>
</div>
</template>

<script>
  import {Tab, TabItem, Group, Cell} from 'vux'
  import {getDetailData} from 'src/api'
  import footerGroup from 'src/components/service/footergroup'
  import cookie from 'src/widget/plugin/cookie'
  const wxnickname = decodeURIComponent(cookie.get('ZATECH1000104')) || ''

  const charactor = {
      data: () => {
        return {
        }
      },
      'template' : `
        <div class='detail-charactor'>
          <img src='/static/pic/detail/detail_01.jpg'>
          <img src='/static/pic/detail/detail_02.jpg'>
          <img src='/static/pic/detail/detail_03.jpg'>
        </div>
      `
  }
  const rule = {
    data: () => {
      return {
        notice: '',
        tableData: [
        ],
        response: [
        ]
      }
    },
    props: ['datas'],
    activated () {
      this.notice = this.datas.notice ? this.datas.notice : ''
      this.tableData = this.datas.tabledata ? this.datas.tabledata : []
      this.response = this.datas.response ? this.datas.response : []
    },
    'template' : `
      <div class='detail-plan'>
      <p class='plan-notice'>
        {{ notice }}
      </p>
      <div class='plan-info'>
        <p class='title'>购买须知</p>
        <div class='table'>
          <div v-for='item in tableData' class='table-row' :key='item.id'>
            <div class='table-tt'>
              {{ item.title }}
            </div>
            <div class='table-tb'>
              {{ item.data }}
            </div>
          </div>
        </div>
      </div>
      <div class='plan-response'>
        <div class='title'>责任免除</div>
        <div class='response-info'>
          <dl v-for='item in response' :key='item.id'>
            <dt>{{item.number}}.</dt>
            <dd>{{item.data}}</dd>
          </dl>
        </div>
      </div>
    </div>
    `
  }
  const plan = {
    data: () => {
      return {
        tableData: [
        ]
      }
    },
    props: ['datas'],
    activated () {
      this.tableData = this.datas.tabledata ? this.datas.tabledata : []
    },
    'template' : `
      <div class='detail-rule'>
        <div class='table'>
          <div v-for='item in tableData' class='table-row' :key='item.id'>
            <div class='table-tt'>
              {{item.title}}
            </div>
            <div class='table-tb'>
              {{item.data1}}
            </div>
            <div class='table-tb'>
              {{item.data2}}
            </div>
          </div>
        </div>
      </div>
    `
  }

  export default {
    data: () => {
      return {
        avatarActived: 1,
        currentView: 'charactor',
        groupData: [],
        charactorData: {},
        ruleData: {},
        planData: {}
      }
    },
    computed: {
      compdata () {
        if(this.currentView == 'charactor') {
          return this.charactorData
        } else if(this.currentView == 'rule') {
          return this.ruleData
        } else if(this.currentView == 'plan') {
          return this.planData
        }
      }
    },
    components: {
      Tab, TabItem, Group, Cell, charactor, plan, rule, footerGroup
    },
    props: [],
    methods: {
      toggleTab (e) {
        let cur = e.target;
        if(!cur.className.match(/identity-item/)) {
          cur = cur.parentElement;
        }
        this.avatarActived = parseInt(cur.dataset.val)
        this.currentView = cur.dataset.comp
      },
      getData () {
        this.axios.get(getDetailData).then((response) => {
          this.groupData = response.data.groupdata
          this.charactorData = response.data.tabs.charactor
          this.ruleData = response.data.tabs.rule
          this.planData = response.data.tabs.plan
        }, (response) => {
          // this.loadStatus = !this.loadStatus
        })
      },
      initWeixin () {
        let self = this;
        // let wx = this.$wechat
        const shareimgurl = window.location.protocol+'//static.zhongan.com/website/mobile/assets/images/fangzhen/share.jpg'
        let date = new Date().getTime()

        //未登录不配置分享
        if(!this.$store.getters.logged){
          return
        }

        self.$store.dispatch('convertProductShareUrl',{
          path:self.$route.path.replace('/',''),
          productId:self.$route.query.productId,
          productCode:self.productCode,
          cb:function(url){
            if(self.uaDetector && self.uaDetector.inWechat){
              // alert(url)
              let link1 = url + 'wxtimeline&t='+date
              let link2 = url + 'wxmessage&t='+date
              let pn = document.domain=='csuat.pkufi.com'?'无忧E生医疗保险-测试':'无忧E生医疗保险'
              wx.ready(function(){
                // alert(url)
                wx.onMenuShareTimeline({
                    title: '您的好友'+wxnickname+'分享“'+ pn +'”', // 分享标题
                    link: link1, // 分享链接
                    imgUrl: shareimgurl, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                })

                wx.onMenuShareAppMessage({
                    title: '您的好友'+wxnickname+'分享“'+ pn +'”', // 分享标题
                    desc: '200万医疗报销，不限社保药，赔付比例100%，可续保至79岁！', // 分享描述
                    link: link2, // 分享链接
                    imgUrl: shareimgurl, // 分享图标
                    // type: '', // 分享类型,music、video或link，不填默认为link
                    // dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                })

                // wx.onMenuShareQQ({
                //     title: '', // 分享标题
                //     desc: '', // 分享描述
                //     link: '', // 分享链接
                //     imgUrl: '', // 分享图标
                //     success: function () {
                //        // 用户确认分享后执行的回调函数
                //     },
                //     cancel: function () {
                //        // 用户取消分享后执行的回调函数
                //     }
                // });
                wx.showOptionMenu();
              })
            }
          }
        })
      },
      footerLClick () {

      },
      footerRClick () {

      }
    },
    activated () {
      this.getData()
      this.initWeixin()
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  @import '~assets/scss/function';
  .detail-content {
    position:absolute;
    background-color:#f6f6f6;
    left:0;right:0;bottom:0;top:0;
    overflow-x:hidden;
    overflow-y:scroll;
    .detail-header {
      width:100%;
      img {
        width:100%;
      }
    }
    .detail-group {
      .vux-no-group-title {
        margin:0!important;
      }
      .weui-cells:before {
        border-top:none!important;
      }
      .weui-cells:after {
        border-bottom:none!important;
      }
      .weui-cell__ft {
        color:#333;
      }
    }
    .identity {
      height:rem-calc(50px);
      display:flex;
      box-sizing:border-box;
      text-align:center;
      background-color:#fff;
      margin-top:rem-calc(10px);
      padding-top:rem-calc(15px);
      border-bottom:1px solid #eee!important;
      .identity-item {
        flex:1;
        color:#666;
        position:relative;
        span {
          display:inline-block;
          width:100%;
          font-size:rem-calc(15px);
          line-height:rem-calc(16px);
          border-right:1px solid #d1d1d1;
        }
        .under {
          position:absolute;
          left:0;right:0;bottom:0;margin:auto;
          visibility:hidden;
          width:rem-calc(110px);
          height:rem-calc(2.5px);
          background-color:#00bd96;
        }
      }
      & .identity-item:last-child {
        span {
          border-right:none!important;
        }
      }
      .identity-item.selected {
        span {
          color:#00bd96;
        }
        .under {
          visibility:visible;
        }
      }
    }
    .detail-view {
      background-color:#fff;
      margin-bottom:rem-calc(48px);
      min-height:rem-calc(250px);
    }
    .table {
      display:table;
      border-collapse: collapse;
      width:100%;
      color:#333;
      .table-row {
        display:table-row;
        .table-tt {
          display:table-cell;
          background-color:#f5f7f9;
          width:rem-calc(79px);
          height:rem-calc(45px);
          vertical-align:middle;
          text-align:center;
          border:1px solid #eee;
          padding:rem-calc(12px);
          box-sizing:border-box;
        }
        .table-tb {
          display:table-cell;
          border:1px solid #eee;
          vertical-align:middle;
          padding:rem-calc(12px);
          box-sizing:border-box;
        }
      }
    }
    .detail-charactor {
      img {
        width:100%;
        display:block;
      }
    }
    .detail-plan {
      padding-bottom:rem-calc(40px);
      padding-left:rem-calc(16px);
      padding-right:rem-calc(16px);
      padding-top:rem-calc(18px);
      .plan-notice {
        font-size:rem-calc(14px);
        line-height:rem-calc(18px);
        padding-top:0;
        color:#666;
      }
      .title {
        font-size:rem-calc(14.9px);
        line-height:rem-calc(21.3px);
        color:#333;
        padding-left:rem-calc(11.5px);
        position:relative;
        margin-top:rem-calc(17px);
        margin-bottom:rem-calc(17px);
        &:before {
          content:'';
          width:rem-calc(4px);
          height:rem-calc(14.5px);
          position:absolute;
          left:0;
          top:0;
          bottom:0;
          margin:auto;
          background-color:#00bd96;
        }
      }
      .plan-info {
        margin-top:rem-calc(19px);

      }
      .plan-response {
        .response-info {
          dl:after {
            content: '';
            display:block;
            clear:both;
            height:0;
            visibility:hidden;
          }
          dl {
            line-height:rem-calc(18px);
            font-size:rem-calc(13px);
            margin-top:rem-calc(12px);
            margin-bottom:rem-calc(12px);
          }
          dt {
            float:left;
            width:rem-calc(18px);
          }
          dd {
            float:left;
            width:rem-calc(320px)
          }
        }
      }
    }
    .detail-rule {
      padding-bottom:rem-calc(40px);
      padding-left:rem-calc(16px);
      padding-right:rem-calc(16px);
      padding-top:rem-calc(18px);
    }
    .detail-footer {
      display:flex;
      align-items: stretch;
      position:fixed;
      bottom:0;
      width:100%;
      height:rem-calc(48px);
      z-index:3;
      background-color:#fff;
      button {
        flex:1;
        color:#fff;
        font-size:rem-calc(18px);
        border:none;
        outline: none;
      }
      .plan {
        background-color:#324150;
      }
      .confirm{
        background-color:#00bd96;
      }
    }
  }
</style>
