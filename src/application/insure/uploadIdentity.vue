<template>
<div class="page-uploadIdentity" ref="page">
    <div class="warn">
        <img src="../../assets/image/upload_docs/warn_orange.png" alt="">
        <span>&nbsp;&nbsp;本保险公司承保规定需上传身份证和银行卡照片</span>
    </div>
    <div class="photoe_example">
        <div class="photo-title">
            <div class="title">
                <div class="line"></div>
                <div class="fonts">身份证和银行卡拍摄示例</div>
                <div class="line"></div>
            </div>
        </div>
        <div class="photo">
            <img src="../../assets/image/upload_docs/normal.png" alt="">
            <p>标准样式</p>
        </div>
        <div class="photo">
            <img src="../../assets/image/upload_docs/miss.png" alt="">
            <p>边框缺失</p>
        </div>
        <div class="photo">
            <img src="../../assets/image/upload_docs/blur.png" alt="">
            <p>照片模糊</p>
        </div>
        <div class="photo">
            <img src="../../assets/image/upload_docs/strong.png" alt="">
            <p>闪光强烈</p>
        </div>
    </div>
    <div class="uploadid" v-for="(s,index) in self" v-if="(index != 1) || recognizeeName">
        <div class="up-header">
            <img :src="s.uri" alt="">
            <span>&nbsp;&nbsp;请上传{{s.insured}}</span>
        </div>
        <div class="identify" v-for="a in s.idcard" :id="'identity-'+a.type">
            <div class="word" @click="upload($event)">{{a.card}}</div>
            <img class="pic-after" src="" ref="pic">
            <img src="../../assets/image/upload_docs/photo.png" class="picture" alt="">
            <input type="file" accept="image/*" multiple style="display:none;">
        </div>
    </div>
    <div class="footer"></div>
    <button ref='bt' class="transform" :class="{active:show == false}" @click="uploading">确认上传</button>
</div>
</template>

<script>
import {
    tansformIdcardApi,
    insuranceApi,
    wechatSignApi
} from 'src/api'
import cookie from 'src/widget/plugin/cookie'
let source
export default {
    name: 'uploadIdentity',
    data() {
        return {
            self: [{
                    uri: require("../../assets/image/upload_docs/identify.png"),
                    idcard: [{
                        card: "上传身份证正面",
                        type: "01"
                    }, {
                        card: "上传身份证反面",
                        type: "02"
                    }],
                    insured: this.$route.query.insurerName+"的有效身份证"
                },
                {
                    uri: require("../../assets/image/upload_docs/identify.png"),
                    idcard: [{
                        card: "上传身份证正面",
                        type: "03"
                    }, {
                        card: "上传身份证反面",
                        type: "04"
                    }],
                    insured: this.$route.query.recognizeeName+"的有效身份证"
                },
                {
                    uri: require("../../assets/image/upload_docs/icon_bank.png"),
                    idcard: [{
                        card: "上传银行卡正面",
                        type: "12"
                    }, {
                        card: "上传银行卡反面",
                        type: "13"
                    }],
                    insured: "银行卡号"+this.$route.query.bankcard+"的银行卡照"
                }
            ],
            show: true,
            list: [],
            which: {},
            canclick:true,
            // insureName: '',
            recognizeeName: this.$route.query.recognizeeName,
            // bankcard: ''
        }
    },
    // activated () {
      // this.recognizeeName = this.$route.query.recognizeeName
    // },
    mounted() {
      // this.recognizeeName =  this.$route.query.recognizeeName
      this.$nextTick(() => {
        let bottomBt = this.$refs.bt
        let page = this.$refs.page
        if(page.offsetHeight < window.document.body.offsetHeight) {
          bottomBt.style.position = 'absolute'
          bottomBt.style.bottom = 0
          page.style.height = '100%'
        }
      })
    },
    created() {
        let CancelToken = this.axios.CancelToken
        source = CancelToken.source()
        // this.setTitle('上传证件和银行卡')
        // this.insureName = window.sessionStorage.getItem('insurename') ? window.sessionStorage.getItem('insurename') : ''
        // this.recognizeeName = window.sessionStorage.getItem('applicantname') ? window.sessionStorage.getItem('applicantname') : ''
        // this.bankcard = window.sessionStorage.getItem('bankcard')? window.sessionStorage.getItem('bankcard'): ''
        if(this.uaDetector && this.uaDetector.inWechat) {
          this.axios.post(wechatSignApi,{
            url:window.location.href.split('#')[0].replace('/?','?'),
            cancelToken:source.token
          }).then((res)=> {
            let value = res.data.data
            // let wx = this.$wechat
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: value.appId, // 必填，公众号的唯一标识
              timestamp: value.timestamp, // 必填，生成签名的时间戳
              nonceStr: value.nonceStr, // 必填，生成签名的随机串
              signature: value.signature,// 必填，签名，见附录1
              jsApiList: ["showMenuItems","hideMenuItems",'chooseImage','onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            })
            wx.ready(()=> {
              // alert('ready')
            })
          })
          .catch((errorResponse) => {
            let toastConf = {
             type: 'text',
             width: '80%',
             isShowMask: true,
             text: '授权失败，稍后再试',
            //  time: 150000
            }
            Vue.$vux.toast.show(toastConf)
          })
        }

        window.imageCb = (base) => {
            // document.write('<img src="data:image/jpg;base64,'+base+'">')
            this.which.style.backgroundImage = 'url(data:image/jpg;base64,' + base + ')'
            this.which.style.backgroundSize = '100% 100%'
            this.which.style.backgroundColor='#fcfcfc';
            // 判断该图片是否已上传
            let has = false
            for(let item of this.list) {
              if(item.certType == this.which.id.split('-')[1]) {
                item.imageData = base
                has = true
              }
            }
            !has && this.list.push({
                certType: this.which.id.split('-')[1],
                imageData: base,
                imageType: "jpg"
            })
            if(this.checkImages()) {
              document.getElementsByClassName('transform')[0].disabled = false
              this.show = false
            }
            else {
              document.getElementsByClassName('transform')[0].disabled = true
              this.show = true
            }
        }
    },
    methods: {
      //  清除计划书 投保表单缓存
      clearStore: function(){
        // this.clearSession = true
        let code = this.$route.query.productcode
        let sessionKeyArr = ['trial_input_'+code ,'plan_input_'+code , 'order_input_'+code]
        if(window.sessionStorage){
          sessionKeyArr.forEach((sessionKey)=>{
            if(sessionStorage.getItem(sessionKey)){
              sessionStorage.removeItem(sessionKey)
            }
          })
        }
      },
      upload(e) {
          if(cookie.get('http_ostype')) {
            this.jsbridge.callImage('imageCb', 'png')
            this.which = e.target.parentElement
            setTimeout(() => {
                e.target.nextSibling.nextSibling.style.display = 'block';
            }, 300)
          } else if (this.uaDetector && this.uaDetector.inWechat) {
            //let wx = this.$wechat
            let which = e.target.nextSibling.nextSibling
            let self = this
            wx.ready(() => {
              wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                  // which.style.display = 'url(data:image/jpg;base64,' + res.localIds[0] + ')'
                  which.style.visibility = 'visible'
                  which.src = res.localIds[0]
                  self.getBase64(res.localIds[0], (data) => {
                    // 判断该图片是否已上传
                    let has = false
                    for(let item of self.list) {
                      if(item.certType == which.id.split('-')[1]) {
                        item.imageData = data
                        has = true
                      }
                    }
                    !has && self.list.push({
                        certType: which.parentElement.id.split('-')[1],
                        imageData: data,
                        imageType: "jpg"
                    })
                    if(self.checkImages()) {
                      document.getElementsByClassName('transform')[0].disabled = false
                      self.show = false
                    }
                    else {
                      document.getElementsByClassName('transform')[0].disabled = true
                      self.show = true
                    }
                  }, .8)
                }
              });
            })
          }
        },
        uploading() {
            if(this.canclick){
                if (!this.checkImages()) {
                this.$vux.toast.show({
                text: '图片未全部上传',
                type: 'text',
                width: '80%'
                //  time: 15000
                });
                return
                }
                document.getElementsByClassName('transform')[0].disabled = false
                // this.show = false
                this.canclick = false;
                let self = this
                // this.axios.post(tansformIdcardApi,{"image":this.list[0],"suffix":".jpg"})
                this.axios.defaults.timeout = 60000
                this.axios.post(insuranceApi, {
                    // companyCode: "1050",
                    imageInfoList: self.list,
                    // productCode: "1",
                    // proposalNo: "15200281234568",
                    proposalCode: this.$route.query.proposalCode

                    // serviceCode: 2
                },{cancelToken:source.token})
                .then(res => {
                    this.canclick=true
                    // console.log(data)
                    this.axios.defaults.timeout = 6000
                    let data = res.data
                    if(data.status == 'SUCCESS') {
                    // this.clearStore()
                    this.$router.push('/policyinfo?policyId='+this.$route.query.policyId)
                    } else {
                    this.$vux.toast.show({
                    text: data.message,
                    type: 'text',
                    width: '80%'
                    //  time: 15000
                    });
                    }
                }).catch(err => {
                    this.canclick=true
                    console.log(err)
                })
            }
        },
        checkImages() {
            if (this.recognizeeName) {
                return this.list.length == 6
            } else {
                return this.list.length == 4
            }
        },
        getBase64: function(src,cb,quality){
          let localData = ''
          wx.getLocalImgData({
            localId: src, // 图片的localID
            success: function (res) {
              localData = res.localData // localData是图片的base64数据，可以用img标签显示
              cb && cb(localData)
            }
          });
        }
    },
    beforeDestroy(){
      source.cancel('取消请求')
    }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>@import '~src/assets/scss/function';
.page-uploadIdentity {
    background: #f6f6f6;
    width: 100%;
    .warn {
        padding-left: rem-calc(15px);
        height:rem-calc(40px);
        img{
            vertical-align: middle;
        }
        span {
            color: #666666;
            line-height: rem-calc(40px);
            font-size: rem-calc(13px);
        }
    }
    .photoe_example {
        box-shadow: 1px 2px 3px 5px #efefef;
        overflow: hidden;
        width: 92%;
        background: #ffffff;
        margin: 0 auto rem-calc(20px);
        border-radius: rem-calc(5px);
        .photo-title {
            text-align: center;
            overflow: hidden;
            .title {
                display: inline-block;
                .line {
                    float: left;
                    height: 1px;
                    background: #f0f0f0;
                    width: rem-calc(40px);
                    margin-top: rem-calc(22px);
                }
                .fonts {
                    line-height: rem-calc(43px);
                    font-size: rem-calc(13px);
                    color: #999;
                    padding: rem-calc(0 10px);
                    float: left;
                }
            }
        }
        .photo {
            overflow: hidden;
            width: 25%;
            text-align: center;
            float: left;
            font-size: rem-calc(12px);
            & > p {
                margin: rem-calc(10px 10px 15px);
            }
        }
    }
    .uploadid {
        overflow: hidden;
        margin-top: rem-calc(10px);
        background: #ffffff;
        .up-header {
            & > input {
                display: none;
            }
            & > img {
                margin: rem-calc(15px 0 0 15px);
                vertical-align: bottom;
            }
            &>span{
                color:#333;
                font-size:rem-calc(15px);
            }
        }
        .identify {
            position: relative;
            margin-top: rem-calc(15px);
            float: left;
            width: 44%;
            height: rem-calc(100px);
            background: #fcfcfc url("../../assets/image/upload_docs/icon_trans.png") no-repeat center 33%;
            border: 1px dotted #dedede;
            border-radius: rem-calc(5px);
            margin-left: 3.5%;
            margin-bottom: rem-calc(20px);
            .pic-after {
              position:absolute;
              width:100%;
              height:100%;
              visibility: hidden;
            }
            & > .word {
                position:absolute;
                width:100%;
                height:100%;
                z-index:1;
                font-size: rem-calc(13px);
                text-align: center;
                line-height: rem-calc(120px);
                padding-top: rem-calc(10px);
                color:#666;
            }
            & > .picture {
                position: absolute;
                top: rem-calc(28px);
                left: 40%;
                display: none;
            }
        }
    }
    .footer {
        height: rem-calc(30px);
        background: #f6f6f6;
    }
    .transform {
        display: block;
        border: none;
        outline:none;
        width: 100%;
        height: rem-calc(50px);
        background: #e3e3e3;
        text-align: center;
        line-height: rem-calc(50px);
        color: #ffffff;
        font-size: rem-calc(17px);
    }
    .active {
        background: #00d391;
    }
}
</style>
