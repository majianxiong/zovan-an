<template>
  <div class='forgetPwd'>
    <div class='form'>
    <!-- <form @submit.prevent='validateForm('form')' class=' data-vv-scope='form'> -->
      <!-- value:{{items[1].value}} -->
      <!-- <input type='text' v-validate name='txt' data-vv-rules='required'> -->
      <!-- <field v-if='item.exist' v-for='(item,index) in items' v-validate :data-vv-scope="item.vvScope" :data-vv-rules='item.vvRules' data-vv-value-path='innerValue' :data-vv-name='item.vvLabel' :class='{"is-error":errors.has(item.vvLabel)}' :placeholder='item.placeholder' :btnarea='item.btnarea' :hasVfCode='item.hasVfCode' :maxLength='item.maxLength' :type='item.type' v-model.trim='item.value' :name='item.name' :disabled='item.disabled' :key='index'>
        <label v-if='item.labelType=="image"' slot='label'><span :class='"ico-"+item.label'></span></label>
        <label v-else slot='label'>{{item.label}}</label>
        <div v-if="item.btnarea&&item.btnarea.sms" class="btn-sms" slot="sms">
          <div v-show="item.btnarea.sms.btnSmsIsActive" class="ui-btn-count active">
            <countdown v-model.trim="item.btnarea.sms.countTime" :start="item.btnarea.sms.countStart" @on-finish="countFinish"></countdown>
          </div>
          <div ref="sms" v-show="!item.btnarea.sms.btnSmsIsActive" class="ui-btn-count" v-tap="{methods:activeSms}">获取验证码</div>
        </div>
      </field> -->
      <div class='ui-btn mt40' @click='validateSubmit'>
        重置密码
      </div>
    <!-- </form> -->
    </div>
  </div>

</template>

<script>
import { Group, Cell, Countdown } from 'vux'
// import bus from '../../components/bus';
import customInput from '../../components/base/customInput'
import { smsApi, forgetPwdApi } from '../../api'
// import uichecker from '../../components/form/checker';
export default {
  name: 'forgetPwd',
  data () {
    return {
      items:[
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
        {
          exist: true,
          maxLength: 6,
          labelType: 'image',
          label: 'vfcode',
          placeholder: '请输入验证码',
          hasVfCode: false,
          value: '',
          vvRules: 'required',
          vvLabel: '验证码'
        },
        {
          exist: true,
          type: 'password',
          name: '新密码',
          maxLength: 20,
          labelType: 'image',
          label: 'password',
          placeholder: '请输入新密码 (6-20个字符)',
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
          vvLabel: '新密码'
        },
        {
          exist: true,
          type: 'password',
          name: 'newPassword',
          maxLength: 20,
          labelType: 'image',
          label: 'password',
          placeholder: '请再次输入新密码',
          btnarea: {
            exist: true,
            pwdEye: true,
            clear: {
              exist: true,
              show: false
            },
          },
          value: '',
          vvRules: 'required|password|confirmed:新密码',
          vvLabel: '确认密码',
          vvScope: 'newPassword'
        },
        // {
        //   labelType: 'text',
        //   label: '手机号',
        //   placeholder: '请输入手机号'
        // },

      ],
      securityCode:null
    }
  },
  methods:{
    // input(){
    //   if(target.name){
    //     target.classname = 'flexbox is-right';
    //   }
    // },
    cleanupInputValue(){
      this.items.forEach((item,i)=>{item.value=''})
      let sms = this.items[0].btnarea.sms
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
    gotoLogin(){
      this.$router.replace('/login');
    },
    activeSms(params){
      this.errors.clear();
      this.$validator.validateAll(this.items[0].vvScope);
      let sms = this.items[0].btnarea.sms;
      // console.log(this.errors);
      if(!this.errors.errors.length){
        //let sms = this.items[0].btnarea.sms;
        // sms.countTime = 60;
        sms.btnSmsIsActive = true;
        sms.countStart = true
        let toastConf = {
         type: 'text',
         width: '80%',
         isShowMask: true,
        //  time: 150000
        }
        this.$http.post(smsApi,{mobile:this.items[0].value,msgType:2}).then((response) => {
          if(!response.data.success){
            sms.btnSmsIsActive = false;
            sms.countStart = false
            sms.countTime = 60;
            // this.$refs.sms.innerHTML = '重新获取';
            toastConf.text = response.data.errorMsg
            this.$vux.toast.show(toastConf)
            return
          }
          toastConf.text = '已发送短信码'
          this.$vux.toast.show(toastConf)
          //sms.btnSmsIsActive = !sms.btnSmsIsActive;
          //sms.countTime = 60;
          // this.securityCode = response.data.value
        })
        .catch((errorResponse) => {
          // Handle error...
          sms.btnSmsIsActive = false;
          sms.countStart = false
          sms.countTime = 60;
          // this.$refs.sms.innerHTML = '重新获取';
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
      let sms = this.items[0].btnarea.sms;
      sms.countStart = false;
      sms.btnSmsIsActive = false;
      sms.countTime = 60
      this.$refs.sms[0].innerHTML = '重新获取';
    },
    validateSubmit(e) {
      //  this.items[2].exist = true;
        // Validate All returns a promise and provides the validation result.
        //  this.validateChild();
        // console.log(this.errors);
      let self = this
      this.$validator.validateAll().then(success => {
        if (! success) {
            // handle error
            // console.log(this.fields);
            this.toastFirstError()
            // console.log(this.errors.all()[0]);
            return
        }
        let params = {
          loginName:this.items[0].value,//当前账号
          securityCode:this.items[1].value,//手机短信验证码
          // oldPass:'',//旧密码
          newPass:this.items[2].value,//新密码
          confirmPass:this.items[3].value,//确认新密码
        }

        this.$http.post(forgetPwdApi,params).then((response) => {
          if(!response.data.success){
            this.$vux.toast.show({
             type: 'text',
             text: response.data.errorMsg,
             width: '80%',
             isShowMask: true
            //  time: 150000
            })
            return
          }
          // commit(types.LOGIN)
          this.cleanupInputValue()
          // self.items[0].value=""
          // self.items[1].value=""
          // self.items[2].value=""
          // self.items[3].value=""
          this.$vux.toast.show({
           text: '重置密码成功',
           type: 'right',
           width: '30%',
           time: 2000,
           onHide(){
             self.$router.push('/login')
            //  self.$store.dispatch('logout')
           }
          });
          // const redirect = router.history.current.query.redirect
          // if (redirect) {
          //   router.replace(redirect)
          // } else {
          //   router.replace('/login')
          // }
          // commit(types.LOGINOUT)
          // console.log(response.data)
          // cookie.delete('login')
        })
        .catch((errorResponse) => {
          // Handle error...
          this.showError(errorResponse)
        })
        .finally(() => {
          // LoadingState.$emit('toggle', false);
        })
          // this.$emit('toggleView')
          // this.$router.push('resetPwd')
          // console.log('From Submitted!');
      });
    },
    //  validateChild() {
    //    bus.$emit('validate');
    //  },
    //  clearChild() {
    //    bus.$emit('clear');
    //  },
   },
   created() {
      // this.setTitle('找回密码')
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
  activated:function(){
    this.setTitle('找回密码')
  },
  deactivated(){
    // this.cleanupInputValue()
    // console.log('deactivated')
  },
  watch:{
  },
  components: {
    customInput, Countdown, Group, Cell
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
</style>
