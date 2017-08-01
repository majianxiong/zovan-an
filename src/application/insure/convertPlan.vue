<template>
  <div class="page-convertPlan">
    <group>
      <cell title="计划书标题">
        <customInput v-validate data-vv-rules="required" data-vv-value-path="innerValue" data-vv-name='计划书标题' placeholder='此标题仅用于识别客户' type='text' v-model='planTitle' name='planTitle'>
        </customInput>
      </cell>
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
          <customInput v-validate data-vv-rules="required|numeric" data-vv-value-path="innerValue" data-vv-name='保额应为1000元整数倍' placeholder='请填写保额' type='tel' v-model='coverage' name='coverage'>元
          </customInput>元
        </div>
      </cell>
      <x-switch v-if="pcode == 'ZA0002' && paymentDate != 0" :title="'是否附加投保人豁免重疾保险'" v-model="additionalRisk"></x-switch>
      <div class="" v-if="additionalRisk && pcode == 'ZA0002'">
        <cell title="投保人出生日期">
          <div slot="value" class="item">
            <datetime confirm-text="完成" cancel-text="取消" v-model="insurerbirthday" format="YYYY-MM-DD" title="" :start-date="birthdayStartDate" :end-date="today" :min-year="minYear" :max-year="maxYear" placeholder="请选择出生日期" @on-change=""></datetime>
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
    <!-- <p class="coverage-tip">40岁以下10万起</p> -->
    <c_buynav btntext="生成计划书" :price="price" @buy="gotoInsure"></c_buynav>

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
  import { PopupPicker, Datetime, Checker, CheckerItem, Group, Cell, Cellbox, XSwitch } from "vux"
  import { getProductInfo, ajax, trialApi, convertPlanApi } from "src/api"
  import cookie from 'src/widget/plugin/cookie'
  let userid = cookie.get('http_userID') ? cookie.get('http_userID') : ''
  import * as tool from 'src/widget/validate/extends'
  let data1 = {
    timer: '',
    today: '',
    planTitle: '',
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
    trialForm: {},
    additionalRisk: false,
    insurername: '',
    insurerbirthday: '',
    insurergender: '',
    productVOList: [],
    storeProductVOList : [],
    version: ''
  }
  export default {
    name: 'convertPlan',
    data () {
      return {
        ...data1,
        pcode: this.$route.params.productcode
      }
    },
    computed: {
      age(){
        return tool.getAge(this.birthday)
      },
      insurerage(){
        return tool.getAge(this.insurerbirthday)
      },
      maxYear(){
        return new Date().getFullYear() - this.minAge
      },
      minYear(){
        return new Date().getFullYear() - this.maxAge
      },
      birthdayStartDate(){
        let y1 = this.today.split('-')[0]
        // console.log(this.today.replace(y1,y1-100))
        return this.today.replace(y1,y1-this.maxAge)
      },
      protectionDateValue(){
        return this.protectionDate[0]
      }
    },
    created () {
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
        let sessionKey = 'plan_input_'+this.pcode
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
        let sessionKey = 'plan_input_'+this.pcode
        if(window.sessionStorage){
          !this.clearSession && sessionStorage.setItem(sessionKey,JSON.stringify(this.$data))
        }
      },
      clearStore: function(){
        this.clearSession = true
        let sessionKey = 'plan_input_'+this.pcode
        if(window.sessionStorage){
          if(sessionStorage.getItem(sessionKey)){
            sessionStorage.removeItem(sessionKey)
          }
        }
      },
      init () {
        this.setToday()

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
          // console.log(data.data)
          this.maxAge = data.data.maxAge || data.data.maxAge==0 ? data.data.maxAge : 100
          this.minAge = data.data.minAge || data.data.minAge==0 ? data.data.minAge : 0
          if(!this.productVOList.length) this.productVOList = data.data.productVOList.filter((item) => item.mustAddRisk == "Y")
          if(!this.storeProductVOList.length) this.storeProductVOList = data.data.productVOList
          if(!this.version) this.version = this.productVOList[0].occupationVersion
        } , (response) => {
        }).catch((err) => console.log(err))
        // this.birthday = this.today
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
            // this.settitle({text:'长城康健人生两全保险'})
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
          default:
        }
        this.restore()
      },
      // 获取产品初始化信息
      // getData () {
      //   this.axios.post(convertPlanInitialApi, convertPlanApi, {'productId': 'AA01201704272122550000000004'}).then((response) => {
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
        // console.log(this.$route.params.productcode)
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
            planTitle: this.planTitle,
            sex: this.gender,  //性别
            age: this.age,  //年龄
            amount: this.coverage,  //保额
            insuranceDuration: this.protectionDate?this.protectionDateValue:null,  //保障期限
            paymentPeriod: this.paymentDate,  //缴费年限
            // productId: this.$route.path.split('/')[2],
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

            this.$router.push({name:'plan', query:{
              productcode:this.$route.params.productcode,
              proposalId:data.data.proposalId,
              version:this.version,
              additionalRisk:this.additionalRisk
            }})
            // this.items = response.data.resultContent.items
            // for (var i = 0; i < t.length; i++) {
            //   this.m = t[i].title
            // }
          }, (response) => {
          }).catch((err) => console.log(err))
        });
      },
      postTrial (cb) {
        this.trialForm = {
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
          this.trialForm.insuredAge = this.insurerage
          this.trialForm.insuredSex = this.insurergender
        }
        if(this.$route.params.productcode == 'ZA0003'){
          this.trialForm.ageLimit = this.ageLimitValidate(this.birthday,28)
        }else{
          delete this.trialForm.ageLimit
        }

        this.axios.post(trialApi, this.trialForm).then((response) => {
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
          // console.log(data.data.rate)
        }, (response) => {
            // console.log(response.toString())
          // for(let x in response){
          //   console.log(x)
          //   console.log(response[x])
          // }
          // if(!!~(response.toString().indexOf('timeout'))){
          //   this.$vux.toast.show({
          //    text: '请求超时,请稍后再试',
          //    type: 'text',
          //    width: '80%'
          //   //  time: 15000
          //   });
          // }
        }).catch((err) => {console.log(err)})
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
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.mathPre()
        },1000)
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
  .page-convertPlan{
    padding-bottom: 50px;
    background-color: #f6f6f6;
    min-height: 100%;
    .weui-cells{
      &:before{
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        height: 1px;
        border-top: 0px solid #D9D9D9;
        color: #D9D9D9;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
      }
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
    }
    .weui-cells{
      .choose_gender .choose_gender_content > div{
        color:#666666;
        &:after{
          border-color: rgb(222, 222, 222);
        }
        &:before{
          margin-top:rem-calc(-3px);
        }
      }
      .choose_gender .choose_gender_content > div{
        line-height:rem-calc(27px);
      }
      .choose_gender .choose_gender_content > div.seled{
        color:#fff !important;
      }
      .choose_gender .choose_gender_content > div.male.seled:after{
        border:none;
      }
      .choose_gender .choose_gender_content > div.female.seled:after{
        border:none;
      }
    }
    .coverage-tip{
      text-align: right;
      background-color: #f6f6f6;
      font-size: 12px;
      color: #999;
      padding: 5px 15px 0 0;
    }
    .weui-cells{
      margin-top: 0;
      &:last-of-type:after{
        display: none;
      }
      &:after{
        left: 15px;
      }
    }
    .weui-cell{
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
