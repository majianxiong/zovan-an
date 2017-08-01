<template>
  <div class='signup'>
    <div class='identity'>
      <div class='item' v-for='(item,index) in avatars' v-if='item.exist' @click='checkIdentity' :key='index'>
        <div class='avatar' :class='{actived:avatarActived == index}'></div>
        {{item.name}}
      </div>
    </div>
    <div class='form'>
    <!-- <form @submit.prevent='validateForm('form')' class=' data-vv-scope='form'> -->
        <!-- <div class="btn-sms" slot="sms">
          <div v-show="item.btnarea.sms.btnSmsIsActive" class="ui-btn-count active">
            <countdown v-model.trim="item.btnarea.sms.countTime" :start="item.btnarea.sms.countStart" @on-finish="countFinish"></countdown>
          </div>
          <div ref="sms" v-show="!item.btnarea.sms.btnSmsIsActive" class="ui-btn-count" v-tap="{methods:activeSms}">获取验证码</div>
        </div> -->

      <p class='agreement'>
        <uichecker v-validate data-vv-value-path="check" data-vv-name="条款" data-vv-rules="checkbox" name="agreement" id="agreement" :actived="checkerActived">
          我已阅读并同意
          <!-- <router-link :to="{ name: 'register', params: {id:1} }">《用户注册条款》</router-link> -->
        </uichecker>
      </p>
      <div class='ui-btn mt40' @click='validateSubmit'>
        立即注册
      </div>
    <!-- </form> -->
    </div>
  </div>

</template>

<script>
import { Group, Cell, Countdown } from 'vux'
// import bus from '../../components/bus';
import customInput from '../../components/base/customInput'
import uichecker from '../../components/base/checker'
import { smsApi } from '../../api'
import cookie from '../../widget/plugin/cookie'

export default {
  name: 'signup',
  data () {
    return {
      avatarActived: 0,
      avatars: [
        {
          name:'专业用户',
          exist:true
        },
        {
          name:'普通用户',
          exist:true
        }
      ],
      items:[
        {
          exist: true,
          type: 'text',
          name: 'salecode',
          maxLength: 10,
          labelType: 'image',
          label: 'salecode',
          placeholder: '请输入销售代码',
          // disabled: true,
          btnarea: {
            exist: true,
            clear: {
              exist: true,
              // show: true
            },
          },
          value:'',
          // value:'13501679629',
          vvRules: 'required',
          vvLabel: '销售代码',
          vvScope: 'salecode'
        },
        {
          exist: true,
          type: 'text',
          name: 'name',
          maxLength: 10,
          labelType: 'image',
          label: 'name',
          placeholder: '请输入真实姓名',
          // disabled: true,
          btnarea: {
            exist: true,
            clear: {
              exist: true,
              // show: true
            },
          },
          value:'',
          // value:'13501679629',
          vvRules: 'required|cnname',
          vvLabel: '姓名'
        },
        {
          exist: true,
          type: 'tel',
          name: 'mobile',
          maxLength: 11,
          labelType: 'image',
          label: 'mobile',
          placeholder: '请输入手机号',
          // disabled: true,
          btnarea: {
            exist: true,
            sms: {
              exist: true,
              countTime: 60,
              btnSmsIsActive: false,
              countStart:false,
            },
            clear: {
              exist: true,
              // show: true
            },
          },
          value:'',
          // value:'13501679629',
          vvRules: 'required|mobile',
          vvLabel: '手机号',
          vvScope: 'mobile'
        },
        // {
        //   labelType: 'text',
        //   label: '手机号',
        //   placeholder: '请输入手机号'
        // },
        {
          exist: true,
          maxLength: 6,
          labelType: 'image',
          label: 'vfcode',
          placeholder: '请输入验证码',
          hasVfCode: false,
          value: '',
          vvRules: 'required',
          vvLabel: '短信验证码'
        },
        {
          exist: true,
          type: 'password',
          name: 'password',
          maxLength: 20,
          labelType: 'image',
          label: 'password',
          placeholder: '请输入密码 (6-20个字母数字组合)',
          btnarea: {
            exist: true,
            pwdEye: true,
            clear: {
              exist: true,
              show: false
            },
          },
          value: '',
          vvRules: 'required|password',
          vvLabel: '密码'
        },
        {
          exist: false,
          maxLength: 4,
          labelType: 'image',
          label: 'vfcode',
          placeholder: '请输入图形验证码',
          hasVfCode: true,
          value: '',
          vvRules: 'required',
          vvLabel: '图形验证码'
        }
      ],
      checkerActived: false,
    }
  },
  computed:{
    userType(){
      return this.avatarActived+1
    }
  },
  methods:{
    // input(){
    //   if(target.name){
    //     target.classname = 'flexbox is-right';
    //   }
    // },
    init(){
      this.setTitle('注册');

      if(!!this.$route.query.extensionCode){
        this.avatars[0].exist = false;
        this.avatarActived = 1;
        return
      }
      // ZATECH1000102 0是不显示普通用户注册页，1是显示普通用户注册页
      const flag = cookie.get('ZATECH1000102')
      if(flag !== undefined && flag == '0'){
        // alert('不显示普通用户')
        this.avatars[1].exist = false;
        this.avatarActived = 0
      }
      // console.log(this.$refs);
    },
    restore(){
      // this.avatarActived = 0
      // this.checkerActived = false
      // this.items[5].exist = this.$store.state.user.signupVfcode
      // this.items.forEach((item,i)=>{item.value=''})
      let sms = this.items[2].btnarea.sms
      sms.countStart = false;
      sms.btnSmsIsActive = false;
      sms.countTime = 60;
      this.$refs.sms[0].innerHTML = '获取短信码';
    },
    showError(errorResponse){
      let toastConf = {
       type: 'text',
       width: '80%',
       isShowMask: true,
       text: '网络异常，稍后再试',
      //  time: 150000
      }
      this.$vux.toast.show(toastConf)
    },
    toastFirstError(){
      const msg = this.errors.all()[0];
      this.$vux.toast.show({
       text: msg,
       type: 'text',
       width: '80%'
      });
    },
    checkIdentity(params){
      // this.avatarActived = !this.avatarActived;
      this.avatarActived = params.index;
      // console.log(this.avatarActived)
    },
    activeSms(params){
      // console.log(this.items[2].vvScope);
      this.errors.clear();
      this.$validator.validateAll(this.items[2].vvScope);
      // console.log(this.errors);
      if(!this.errors.errors.length){
        let sms = this.items[2].btnarea.sms;
        // sms.countTime = 60;
        sms.btnSmsIsActive = true;
        sms.countStart = true
        let toastConf = {
         type: 'text',
         width: '80%',
         isShowMask: true,
        //  time: 150000
        }
        this.$http.post(smsApi,{mobile:this.items[2].value,msgType:1}).then((response) => {
          if(!response.data.success){
            sms.btnSmsIsActive = false;
            sms.countStart = false
            sms.countTime = 60;
            toastConf.text = response.data.errorMsg
            // console.log(Vue.$vux)
            this.$vux.toast.show(toastConf)
            return
          }
          toastConf.text = '已发送短信码'
          this.$vux.toast.show(toastConf)
          // this.securityCode = response.data.value
        })
        .catch((errorResponse) => {
          // Handle error...
          sms.btnSmsIsActive = false;
          sms.countStart = false
          sms.countTime = 60;
          this.showError(errorResponse)
        })
        .finally(() => {
          // LoadingState.$emit('toggle', false);
        })
      }else{
        this.toastFirstError();
      }
      // setTimeout(() => !this.btnSmsIsActive?this.$refs.input.focus():this.$refs.hidenInput.focus(),1);
    },
    countFinish(){
      let sms = this.items[2].btnarea.sms;
      sms.countStart = false;
      sms.btnSmsIsActive = false;
      sms.countTime = 60;
      this.$refs.sms[0].innerHTML = '重新获取';
    },
    refreshVfCode(){
      if(this.$refs.fields[5] && this.$refs.fields[5].$refs && this.$refs.fields[5].$refs.vfCode){
        this.$refs.fields[5].$refs.vfCode.src = this.$refs.fields[5].$refs.vfCode.src.replace(/\?v=\w+/,'') + '?v=' + new Date().getTime();
      }
    },
    validateSubmit(e) {
      if(this.avatarActived != 1){
        this.errors.clear();
        this.$validator.validateAll(this.items[0].vvScope);
        if(this.errors.errors.length){
              this.toastFirstError();
          // let toastConf = {
          //  type: 'text',
          //  width: '80%',
          //  isShowMask: true,
          //  text: '销售代码是必须的'
          // //  time: 150000
          // }
          // this.$vux.toast.show(toastConf)
          return
        }
      }
      // console.log(this.errors);

      this.$validator.validateAll().then(success => {
          if (! success) {
              // handle error
              // console.log(this.fields);
              this.toastFirstError();
              // console.log(this.errors.all()[0]);
              return;
          }
          let postConf = {
            // String extensionCode;//邀请注册，邀请码
            // String inviteChannel;//邀请注册渠道，如微信
            userType:this.userType,
            userName:this.items[1].value,
            loginName:this.items[2].value,
            securityCode:this.items[3].value,
            password:this.items[4].value
          }

          // console.log(this.avatarActived)
          let ecode = this.$route.query.extensionCode
          let channel = this.$route.query.inviteChannel
          if (ecode) postConf.extensionCode = ecode
          if (channel) postConf.inviteChannel = channel

          if(this.avatarActived == 0){
            postConf.agentCode = this.items[0].value
          }

          if(!!this.$store.state.user.signupVfcode) postConf.imgCode = this.items[5].value;
          let cb = () => {
            // this.avatarActived = 0
            this.checkerActived = false
            this.items[5].exist = this.$store.state.user.signupVfcode
            this.items.forEach((item,i)=>{item.value=''})
            // this.items[5].exist = this.$store.state.user.signupVfcode
          }
          this.$store.dispatch('signup',{params:postConf,cb:cb,refreshVfCode:this.refreshVfCode});
      });
    },
    //  validateChild() {
    //    bus.$emit('validate');
    //  },
    //  clearChild() {
    //    bus.$emit('clear');
    //  },
   },
   activated:function(){
    //  this.init()
   },
   created() {
    //  this.items.forEach((item,i)=>{item.value=''})
    //  this.init()
  //    bus.$on('errors-changed', (errors) => {
  //        this.errors.clear();
  //        errors.forEach(e => {
  //          if(!this.errors.has(e.field)){
  //           //  console.log(this.errors.has(e.field));
  //            this.errors.add(e.field, e.msg, e.rule, e.scope);
  //          }
  //        });
  //    });
  },
  deactivated(e){
    console.log(e)
    // this.items.forEach((x,i) => x.value = ''); // 1
    // this.restore()
  },
  watch:{
    avatarActived(){
      // console.log(this.errors);
      if(this.avatarActived == 1){
        this.items[0].exist = false;
        // this.items[1].exist = false;
      }else{
        // this.items.forEach((x,i) => x.exist = true); // 1
        this.items[0].exist = true;
        // this.items[1].exist = true;
      }
    }
  },
  components: {
    customInput, uichecker, Countdown, Group, Cell
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.agreement {
    color: #666;
    font-size: 0.92857rem;
    margin-top:10px;
}
</style>
