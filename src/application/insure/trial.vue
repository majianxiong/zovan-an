<template>
  <div class="page-trial">
    <group>
      <cell title="被保人出生日期">
        <div slot="value" class="item">
          <datetime confirm-text="完成" cancel-text="取消" v-model="birthday" format="YYYY-MM-DD" title="" :start-date="birthdayStartDate" :end-date="today" :min-year="minYear" :max-year="maxYear" placeholder="请选择出生日期" @on-change=""></datetime>
            <input
              class="hiddenInput"
              type="hidden"
              placeholder=""
              name="birthday"
              v-model.trim="birthday"
              v-validate
              data-vv-as="请选择被保人的出生日期"
              data-vv-rules="required">
        </div>
      </cell>
      <cell title="性别">
        <c_gender v-model="gender" @Click="chooseGender" :gender="gender"></c_gender>
        <input
          class="hiddenInput"
          type="hidden"
          placeholder=""
          name="gender"
          v-model.trim="gender"
          v-validate
          data-vv-as="选择性别"
          data-vv-rules="required">
      </cell>
      <cell title="投保地区">
        <div slot="value" class="item">
          山东
          <!-- 上海 -->
        </div>
      </cell>
      <cell title="保障期限">
        <div slot="value" class="item">
          <popup-picker :columns="1" :show-name="true" placeholder="请选择保障期限" :data="protectionDateList" v-model="protectionDate" @on-show="onShowPopup" @on-hide="onHidePopup"></popup-picker>
          <input
            class="hiddenInput"
            type="hidden"
            placeholder=""
            name="protectionDate"
            v-model.trim="protectionDateValue"
            v-validate
            data-vv-as="选择保障期限"
            data-vv-rules="required">
          </div>
      </cell>
      <cell title="缴费类型">
        <div slot="value" class="item">
          <popup-picker :columns="1" :show-name="true" placeholder="缴费类型" :data="paymentSortList" v-model="paymentSort" @on-show="onShowPopup" @on-hide="onHidePopup"></popup-picker>
          <input
            class="hiddenInput"
            type="hidden"
            placeholder=""
            name="paymentSort"
            v-model.trim="paymentSort[0]"
            v-validate
            data-vv-as="选择缴费类型"
            data-vv-rules="required">
        </div>
      </cell>
      <div class="weui-cell">
        <div class="vux-cell-bd vux-cell-primary">
          <p><label class="vux-label">缴费年限</label></p>
          <checker v-model="paymentDate" default-item-class="ui-checker" selected-item-class="ui-checker-checked">
            <checker-item :value="item.value" v-for="(item, index) in paymentDateList" :key="index">{{item.key}}</checker-item>
          </checker>
          <input
            class="hiddenInput"
            type="hidden"
            placeholder=""
            name="paymentDate"
            v-model.trim="paymentDate"
            v-validate
            data-vv-as="选择缴费年限"
            data-vv-rules="required">
        </div>
      </div>
      <div class="weui-cell" v-if="expense">
        <div class="vux-cell-bd vux-cell-primary">
          <p><label class="vux-label">领取祝寿金</label></p>
          <checker v-model="expenseDate" default-item-class="ui-checker" selected-item-class="ui-checker-checked">
            <checker-item :value="item.value" v-for="(item, index) in expenseDateList" :key="index">{{item.key}}</checker-item>
          </checker>
          <input
            class="hiddenInput"
            type="hidden"
            placeholder=""
            name="expenseDate"
            v-model.trim="expenseDate"
            v-validate
            data-vv-as="选择领取祝寿金时间"
            data-vv-rules="required">
        </div>
      </div>
      <cell title="被保人职业">
        <div slot="value" class="item" @click="searchDictionary({key:'career',title:'被保人职业',version:version})">
          <i class="icon-warn-s-green"></i>{{career}}
        </div>
      </cell>
      <cell title="保额">
        <div slot="value" class="item">
          <customInput v-validate data-vv-rules="required|numeric" data-vv-value-path="innerValue" data-vv-name='填写保额' placeholder='保额应为1000元整数倍' type='tel' v-model='coverage' name='coverage'>元
          </customInput>元
        </div>
      </cell>
      <x-switch v-if="pcode == 'ZA0002' && paymentDate != 0" :title="'是否附加投保人豁免重疾保险'" v-model="additionalRisk"></x-switch>
      <div class="" v-if="additionalRisk && pcode == 'ZA0002'">
        <cell title="投保人出生日期">
          <div slot="value" class="item">
            <datetime confirm-text="完成" cancel-text="取消" v-model="insurerbirthday" format="YYYY-MM-DD" title="" :start-date="addRiskBirthdayStartDate" :end-date="today" :min-year="addRiskMinYear" :max-year="addRiskMaxYear" placeholder="请选择出生日期" @on-change=""></datetime>
              <input
                class="hiddenInput"
                type="hidden"
                placeholder=""
                name="insurerbirthday"
                v-model.trim="insurerbirthday"
                v-validate
                data-vv-as="请选择投保人的出生日期"
                data-vv-rules="required">
          </div>
        </cell>
        <cell title="性别">
          <c_gender v-model="insurergender" @Click="chooseInsurerGender" :gender="insurergender"></c_gender>
          <input
            class="hiddenInput"
            type="hidden"
            placeholder=""
            name="insurergender"
            v-model.trim="insurergender"
            v-validate
            data-vv-as="选择性别"
            data-vv-rules="required">
        </cell>
        <cell title="投保人职业">
          <div slot="value" class="item" @click="searchDictionary({key:'career2',title:'投保人职业',version:version})">
            <i class="icon-warn-s-green"></i>{{career2}}
          </div>
        </cell>
      </div>
    </group>
    <p class="coverage-tip">40岁以下10万起</p>
    <c_buynav btntext="确认投保" :price="price" @buy="gotoInsure"></c_buynav>

    <!-- <popup-picker value-text-align="left" :columns="1" :show-name="true" placeholder="请选择被保人性别" :data="sexList" v-model="sex" @on-show="onShow" @on-hide="onHide"></popup-picker> -->
    <!-- <cell title="获取值对应的文字" :value="$refs.picker3&&$refs.picker3.getNameValues()"></cell>
      <popup-picker :title="title3" :data="list3" :columns="3" v-model="value3" ref="picker3"></popup-picker> -->
    <!-- <cell title="">
      <div slot="value" class="item">
        <popup-picker value-text-align="left" :columns="1" :show-name="true" placeholder="请选择与被保人关系" :data="relationlist" v-model.trim="relation" @on-change="onchangerelation" @on-hide="onselectrelation"></popup-picker>
      </div>
    </cell> -->
    <!-- <c_button class='next' val='下一步' @Click="nextStep"></c_button> -->
  </div>
</template>
<script>
  import cookie from 'src/widget/plugin/cookie'
  let userid = cookie.get('http_userID') ? cookie.get('http_userID') : ''
  import * as tool from 'src/widget/validate/extends'
  import { PopupPicker, Datetime, Checker, CheckerItem, Group, Cell, Cellbox, XSwitch} from "vux"
  import { getProductInfo, convertPlanApi, trialInitialApi, trialApi } from "src/api"
  let data1 = {
    timer: '',
    today: '',
    birthday: '',
    minAge: 0,
    maxAge: 100,
    gender: null,
    protectionDate: [],
    protectionDateList: [
      // {name:'1年',value:'1',parent:0},
      // {name:'2年',value:'2',parent:0}
    ],
    paymentSort: [],
    paymentSortList: [
      // {name:'类型1',value:'1',parent:0},
      // {name:'类型2',value:'2',parent:0}
    ],
    paymentDate: null,
    paymentDateList: [
      // {value:1,key:'5年'},
      // {value:2,key:'10年'},
      // {value:3,key:'15年'},
      // {value:4,key:'20年'},
    ],
    expense: false,
    expenseDate: null,
    expenseDateList: [
      // {value:1,key:'70岁领'},
      // {value:2,key:'75岁领'},
      // {value:3,key:'79岁领'},
      // {value:4,key:'20年'},
    ],
    career: '1-4类',
    career2: '1-5类',
    coverage: '',
    price: '0.00',
    form: {},
    clearSession: false,
    additionalRisk: false,
    insurername: '',
    insurerbirthday: '',
    insurergender: '',
    productVOList: [],
    storeProductVOList : [],
    version: ''
  }
  export default {
    name: 'trial',
    data () {
      return {
        // ...Object.assign({},data1),
        ...data1,
        pcode: this.$route.params.productcode || ''
      }
    },
    computed: {
      age(){
        return tool.getAge(this.birthday)
      },
      insurerage(){
        return tool.getAge(this.insurerbirthday)
      },
      //长城附加险投保人年龄蔚18-60周岁
      addRiskMaxYear(){
        // pcode == 'ZA0002'?18:xxx
        return new Date().getFullYear() - 18
      },
      addRiskMinYear(){
        return new Date().getFullYear() - 60
      },
      addRiskBirthdayStartDate(){
        // console.log(this.minAge)
        let y1 = this.today.split('-')[0]
        return this.today.replace(y1,y1-60)
      },
      maxYear(){
        return new Date().getFullYear() - this.minAge
      },
      minYear(){
        return new Date().getFullYear() - this.maxAge
      },
      birthdayStartDate(){
        // console.log(this.minAge)
        let y1 = this.today.split('-')[0]
        return this.today.replace(y1,y1-this.maxAge)
      },
      protectionDateValue(){
        return this.protectionDate[0]
      }
    },
    activated () {
      // this.setTitle(this.$route.meta.header.title)
    },
    created () {
      this.setToday()
      this.init()
      // window.addEventListener('hashchange', () => {
      //   this.pcode = this.$route.params.productcode
      // })
      // this.getData()
    },
    beforeDestroy(){
      this.store()
    },
    methods: {
      ageLimitValidate: function(birthday,limit){
        let days = (+new Date() - new Date(birthday))/86400000
        return days < limit ? 1:0
      },
      restore: function(){
        // data
        let sessionKey = 'trial_input_'+this.pcode
        if(window.sessionStorage){
          if(sessionStorage.getItem(sessionKey)){
            let data = JSON.parse(sessionStorage.getItem(sessionKey))
            for(let prop in data){
              this[prop] = data[prop]
            }
          }
          // sessionStorage.setItem(sessionKey,JSON.stringify(this.data1))
        }
        this.pcode = this.$route.params.productcode || ''
        // this.price = this.$route.query.price || '0.00'
        // console.log(this.gender)
      },
      store: function(){
        let sessionKey = 'trial_input_'+this.pcode
        if(window.sessionStorage){
          !this.clearSession && sessionStorage.setItem(sessionKey,JSON.stringify(this.$data))
        }
      },
      clearStore: function(){
        this.clearSession = true
        let sessionKey = 'trial_input_'+this.pcode
        if(window.sessionStorage){
          if(sessionStorage.getItem(sessionKey)){
            sessionStorage.removeItem(sessionKey)
          }
        }
      },
      init () {
        switch (this.pcode) {
          case 'ZA0003':
            // this.setTitle({text:'美泰人生重大疾病保险'})
            this.protectionDateList = [{name:'终身',value:'0',parent:0}]
            this.protectionDate = ['0']
            this.paymentSortList = [{name:'年交',value:'1',parent:0}]
            this.paymentSort = ['1']
            this.paymentDateList = [{value:'10',key:'10年交'},{value:'15',key:'15年交'},{value:'20',key:'20年交'}]
            this.paymentDate = null
            this.expenseDateList = []
            this.expenseDate = null
            this.expense = false
            break;
          case 'ZA0002':
            // this.setTitle({text:'长城康健人生两全保险'})
            this.protectionDateList = [{name:'终身',value:'0',parent:0}]
            this.protectionDate = ['0']
            this.paymentSortList = [{name:'年交',value:'1',parent:0}]
            this.paymentSort = ['1']
            this.paymentDateList = [{value:'0',key:'趸交'},{value:'5',key:'5年交'},{value:'10',key:'10年交'},{value:'15',key:'15年交'},{value:'20',key:'20年交'}]
            this.paymentDate = null
            this.expenseDateList = [{value:'70',key:'70岁领'},{value:'75',key:'75岁领'},{value:'79',key:'79岁领'}]
            this.expenseDate = null
            this.expense = true
            break;
          // default:
        }

        this.axios.get(getProductInfo+this.pcode).then((response) => {
          let data = response.data
          var st = data.status
          if(st != 'SUCCESS'){
            this.$vux.toast.show({
             text: data.message,
             type: 'text',
             width: '80%'
            //  time: 15000
            });
            return
          }
          if(!data.data){return}
          this.maxAge = data.data.maxAge || data.data.maxAge==0 ? data.data.maxAge : 100
          this.minAge = data.data.minAge || data.data.minAge==0 ? data.data.minAge : 0
          console.log(data.data.productVOList.filter((item) => item.mustAddRisk == "Y"))
          if(!this.productVOList.length) this.productVOList = data.data.productVOList.filter((item) => item.mustAddRisk == "Y")
          if(!this.storeProductVOList.length) this.storeProductVOList = data.data.productVOList
          console.log(this.storeProductVOList)
          if(!this.version) this.version = this.productVOList[0].occupationVersion
          // console.log(this.version)
        } , (response) => {
        }).catch((err) => console.log(err))


        this.restore()
      },
      // 获取产品初始化信息
      // getData () {
      //   this.axios.post(trialInitialApi, trialApi, {'productId': 'AA01201704272122550000000004'}).then((response) => {
      //     // this.applicant = response.data.value.content.applicant
      //   }, (response) => {
      //   }).catch((err) => console.log(err))
      // },
      setToday (value) {
        let now = new Date()
        let cmonth = now.getMonth() + 1
        let day = now.getDate()
        if (cmonth < 10) cmonth = '0' + cmonth
        if (day < 10) day = '0' + day
        this.today = now.getFullYear() + '-' + cmonth + '-' + day
        // console.log('set today ok')
      },
      // 选择性别
      chooseGender (v) {
        this.gender = v
      },
      chooseInsurerGender (v) {
        this.insurergender = v
      },
      onShowPopup () {
      },
      onHidePopup () {
      },
      gotoInsure () {
        this.validate()
      },
      mathPre () {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          if(this.birthday && this.gender && this.protectionDate.length && this.paymentDate && this.coverage ){
            if(this.additionalRisk){
              if(this.insurergender && this.insurerbirthday && this.productVOList.length){
                if(this.expense){
                  if(this.expenseDate){
                    this.postTrial()
                  }
                }else{
                  this.postTrial()
                }
              }
            }else{
              if(this.expense){
                  if(this.expenseDate){
                  this.postTrial()
                }
              }else{
                this.postTrial()
              }
            }
          }
        },600)
      },
      searchDictionary (args) {
        // console.log(args)
        let params = args.params
        this.$router.push({path:'/findjob',query:{key:args.key,title:args.title,version:args.version}})
      },
      validate () {
        const self = this
        // Validate All returns a promise and provides the validation result.
        // console.log(this.relationValue)
        this.$validator.validateAll().then(success => {
          if (! success) {
              // handle error
              const msg = this.errors.all()[0];
              // this.$vux.confirm.show({
              //   // 组件除show外的属性
              //   title:msg,
              //   onCancel () {},
              //   onConfirm () {}
              // })
              this.$vux.toast.show({
               text: msg,
               type: 'text',
               width: '80%'
              //  time: 15000
              });
              return;
          }

          let form = {
            sex: this.gender,  //性别
            age: this.age,  //年龄
            amount: this.coverage,  //保额
            insuranceDuration: this.protectionDate?this.protectionDateValue:null,  //保障期限
            paymentPeriod: this.paymentDate,  //缴费年限
            wishBirthday: this.expenseDate,  //领取祝寿金
            productId: this.$route.params.productcode,
            userId: userid, // 用户ID
            payment: '1',
            productVOList: this.productVOList
          }

          if(this.$route.params.productcode == 'ZA0002' && this.additionalRisk){
            form.insuredAge = this.insurerage
            form.insuredSex = this.insurergender
          }

          if(this.$route.params.productcode == 'ZA0003'){
            form.ageLimit = this.ageLimitValidate(this.birthday,28)
          }else{
            delete form.ageLimit
          }

          this.axios.post(convertPlanApi, form).then((response) => {
            let data = response.data
            var st = data.status
            if(st != 'SUCCESS'){
              this.$vux.toast.show({
               text: data.message,
               type: 'text',
               width: '80%'
              //  time: 15000
              });
              return
            }
            let timeid = setInterval(()=>{
              if(this.price != 0){
                clearInterval(timeid)
                this.$router.push({path:'/health/'+this.$route.params.productcode,query:{
                  proposalId:data.data.proposalId,
                  price:this.price,
                  version:this.version,
                  additionalRisk:this.additionalRisk
                }})
              }
            },200)
            // this.$router.push('/plan/'+this.$route.params.productcode)
            // this.$router.push('/plan?planId='+data.data.proposalId)
            // this.$router.push({name:'plan', params:{productcode:this.$route.params.productcode, planId:data.data.proposalId}})
            // this.items = response.data.resultContent.items
            // for (var i = 0; i < t.length; i++) {
            //   this.m = t[i].title
            // }
          }, (response) => {
          }).catch((err) => console.log(err))
        });
          // this.postTrial((success)=>{this.$router.push({path:'/order/'+this.$route.params.productcode,query:{price:this.price}})})
      },
      postTrial (cb) {
        this.form = {
          age: this.age,  //年龄
          sex: this.gender,  //性别
          insuranceDuration: this.protectionDate?this.protectionDateValue:null,  //保障期限
          paymentPeriod: this.paymentDate,  //缴费年限
          wishBirthday: this.expenseDate,  //领取祝寿金
          insuredAmount: this.coverage,  //保额
          productId: this.$route.params.productcode,  //产品代码
          productVOList: this.productVOList
        }
        if(this.$route.params.productcode == 'ZA0002' && this.additionalRisk){
          this.form.insuredAge = this.insurerage
          this.form.insuredSex = this.insurergender
        }
        if(this.$route.params.productcode == 'ZA0003'){
          this.form.ageLimit = this.ageLimitValidate(this.birthday,28)
        }else{
          delete this.form.ageLimit
        }
        // console.log(this.form)

        // console.log(JSON.stringify(this.form.productId))
        this.axios.post(trialApi, this.form).then((response) => {
          let data = response.data
          var st = data.status
          if(st != 'SUCCESS'){
            this.$vux.toast.show({
             text: data.message,
             type: 'text',
             width: '80%'
            //  time: 15000
            });
            this.price = 0
            return
          }
          this.price = data.data.rate
          cb && cb()
          // this.items = response.data.resultContent.items
          // for (var i = 0; i < t.length; i++) {
          //   this.m = t[i].title
          // }
        }, (response) => {
        }).catch((err) => console.log(err))
      },
      // nextStep () {
        // this.postTrial()
      // },
    },
    watch: {
      pcode(){
        this.init()
      },
      birthday(){
        this.mathPre()
      },
      gender(){
        this.mathPre()
      },
      protectionDateValue(){
        this.mathPre()
      },
      paymentDate(val){
        if(val == 0){
          this.additionalRisk = false
        }
        if(this.additionalRisk){
          this.productVOList = this.storeProductVOList
        } else{
          this.productVOList = this.storeProductVOList.filter((item) => item.mustAddRisk == "Y")
        }
        this.mathPre()
      },
      expenseDate(){
        this.mathPre()
      },
      coverage(){
        this.mathPre()
      },
      additionalRisk(val){
        if(val){
          this.productVOList = this.storeProductVOList
        } else{
          this.productVOList = this.storeProductVOList.filter((item) => item.mustAddRisk == "Y")
        }
        this.mathPre()
        // console.log(this.productVOList)
      },
      insurerbirthday(){
        this.mathPre()
      },
      insurergender(){
        this.mathPre()
      }
    },
    components: {
      PopupPicker, Datetime, Checker, CheckerItem, Group, Cell, Cellbox, XSwitch
    }

  }
</script>

<style lang='scss' rel="stylesheet/scss">
  @import '~assets/scss/function';
  .page-trial{
    background-color: #f6f6f6;
    min-height: 100%;
    padding-bottom: 50px;
    .coverage-tip{
      text-align: right;
      background-color: #f6f6f6;
      font-size: 12px;
      color: #999;
      padding: 5px 15px 0 0;
    }
    .weui-cells{
      .weui-cell_access .weui-cell__ft:after {
        content: " ";
        display: inline-block;
        height: rem-calc(8px);
        width: rem-calc(8px);
        border-width: 1px 1px 0 0;
        border-color: #C8C8CD;
        border-style: solid;
        -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        position: relative;
        top: rem-calc(-2px);
        position: absolute;
        top: 50%;
        margin-top: rem-calc(-5px);
        right: rem-calc(2px);
      }
      margin-top: 0;
      &:last-of-type:after{
        display: none;
      }
      &:after{
        left: 15px;
      }
    }
    .weui-cell{
      .choose_gender .choose_gender_content > div.seled:after{
        content: "";
        width: 198%;
        height: 198%;
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        border: 0px solid #c3c3c3;
        border-radius: 30px;
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        pointer-events: none;
      }
      .vux-cell-box:before{
        display: none;
      }
      .weui-cell{
        padding: 0;
      }
    }
    .ui-input input{
      text-align: right;
    }
  }
</style>
