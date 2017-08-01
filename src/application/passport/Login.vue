<template>
  <div class='page-login'>
    <!-- <form @submit.prevent="validateForm('form')" class="" data-vv-scope="form"> -->
      <!-- value:{{items[1].value}} -->
      <!-- <input type="text" v-validate name='txt' data-vv-rules="required"> -->

      <!-- :class="{'is-error':errors.has(item.vvLabel)}" -->
    <div class="logo"></div>
    <group class="bar">
      <cell title="11" :border-intent="false" :is-link="false" :class="{'is-error':errors.has('手机号')}">
        <img slot="icon" src="~assets/image/passport/mobile.png">
        <div slot="value" class="item">
          <customInput ref='fields' v-validate data-vv-rules="required|mobile" data-vv-value-path="innerValue" data-vv-name='手机号' placeholder='请输入手机号' :maxLength='11' type='tel' :btnarea='{type:"clear"}' v-model.trim='items[0].value' name='mobile'>
          </customInput>
        </div>
      </cell>
      <cell title="11" :border-intent="false" :is-link="false">
        <img slot="icon" src="~assets/image/passport/pwd.png">
        <div slot="value" class="item">
          <customInput ref='fields' v-validate data-vv-rules="required|password" data-vv-value-path="innerValue" data-vv-name='密码' placeholder='请输入密码(6-20个字符)' :maxLength='11' type='password' :btnarea='{type:"pwdEye"}' v-model.trim='items[1].value' name='password'>
          </customInput>
        </div>
      </cell>
    </group>
    <uiBtn text="登录" :event="validateSubmit">
    </uiBtn>
    <!-- </form> -->
    <div class="p15">
      <router-link class="fl" tag="a" to="/signup" exact>
        新用户注册
      </router-link>
      <router-link class="fr" tag="a" to="/forgetPwd" exact>
        忘记密码?
      </router-link>
    </div>
    <div class="third-party">
      <fieldset>
        <legend>
          第三方快捷登录
        </legend>
      </fieldset>
      <img src="~assets/image/logo_wx.png" alt="">
      <img src="~assets/image/logo_alipay.png" alt="">
    </div>
  </div>
</template>

<script>
// import bus from '../../components/bus';
import { Group, Cell } from 'vux'
import customInput from '../../components/base/customInput';
import uiBtn from '../../components/base/submitbtn';
export default {
  name: 'login',
  data () {
    return {
      items:[
        {
          value:'',
        },
        {
          value:'',
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
          vvLabel: '验证码'
        }
      ]
    }
  },
  methods:{
    // input(){
    //   if(target.name){
    //     target.classname = 'flexbox is-right';
    //   }
    // },
    refreshVfCode(){
      // console.log(this.$refs.vfCode.src.replace(/\?v=\w+$/g,''));
      if(this.$refs.fields[2] && this.$refs.fields[2].$refs && this.$refs.fields[2].$refs.vfCode){
        this.$refs.fields[2].$refs.vfCode.src = this.$refs.fields[2].$refs.vfCode.src.replace(/\?v=\w+/,'') + '?v=' + new Date().getTime();
      }
    },
     validateSubmit(e) {
      //  this.items[2].exist = true;
        // Validate All returns a promise and provides the validation result.
        //  this.validateChild();

        this.$validator.validateAll().then(success => {
            if (! success) {
                // handle error
                // console.log(this.fields);
                const msg = this.errors.all()[0];
                this.$vux.toast.show({
                 text: msg,
                 type: 'text',
                 width: '80%'
                });
                return;
            }
            // this.$store.dispatch('toggleLoadingStatus')
            let postConf = {
              loginName:this.items[0].value,
              password:this.items[1].value
            }
            if(!!this.$store.state.user.loginVfcode) postConf.imgCode = this.items[2].value;
            let cb = () => {this.items[2].exist = this.$store.state.user.loginVfcode}
            this.$store.dispatch('login',{params:postConf,cb:cb,refreshVfCode:this.refreshVfCode});

            // return this.$http.post(SUBMITFEEDBACK,).then((response) => {
            //   let toastConf = {
            //    text: '提交成功',
            //    type: 'success',
            //    width: '30%',
            //    isShowMask: true,
            //   //  time: 15000
            //   }
            //   if(!response.data.success){
            //     toastConf.text = response.data.errorMsg
            //     toastConf.type = 'text'
            //   }
            //   else{
            //   }
            //   //   {
            //   //   "errorMsg":null//错误时候必传,现有系统异常，验证码错误，非法参数,
            //   //   "result"://无,
            //   //   "errorCode":null,
            //   //   "status":true//标示是否成功
            //   // }
            //   this.$vux.toast.show(toastConf);
            //   // this.post = response.data;
            //   // console.log('app init')
            // })
            // .catch((errorResponse) => {
            //   // Handle error...
            //   console.log('API responded with:', errorResponse.status);
            // })
            // .finally(() => {
            //   // LoadingState.$emit('toggle', false);
            // });
        }).catch(()=>{});
     },
    //  validateChild() {
    //    bus.$emit('validate');
    //  },
    //  clearChild() {
    //    bus.$emit('clear');
    //  },
   },
   activated:function(){
     this.setTitle('登录')
     this.items[2].exist = this.$store.state.user.loginVfcode
   },
   deactivated(){
     this.items.forEach((x,i) => x.value = ''); // 1
     this.items[2].exist = this.$store.state.user.loginVfcode
   },
   created() {
      // this.setTitle('登录')
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
  components: {
    Group, Cell, customInput, uiBtn
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
@import "~assets/scss/function";
.page-login{
  a{
    color: #06c49c;
  }
  .logo{
    width: rem-calc(48px);
    height: rem-calc(48px);
    padding: rem-calc(20px);
    background: url(~assets/image/logo_baoa.png) no-repeat center center;
    -webkit-background-size: rem-calc(48px);
    background-size: rem-calc(48px);
    margin: rem-calc(12px) auto;
    box-shadow: 0px 0 30px 0px rgba(0, 236, 170, 0.3);
    border-radius: rem-calc(16px);
  }
  .weui-cells{
    &:before{
      display: none;
    }
    .weui-cell{
      padding: 0;
    }
    .weui-cell__ft{
      flex: 1;
    }
  }
  .vux-cell-primary{
    display: none
  }
  .bar{
    padding: rem-calc(15px) rem-calc(15px) rem-calc(30px);
    img{
      width: 12px;
      margin:0 15px 0 10px;
      line-height: normal;
      vertical-align: middle;
    }
  }
  .p15{
    padding: rem-calc(15px);
  }
  .third-party{
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 0 rem-calc(27px) rem-calc(22px);
    width: 100%;
    box-sizing: border-box;
    text-align: center;
    img{
      width: rem-calc(40px);
      height: rem-calc(40px);
      margin: 0 rem-calc(18px);
    }
    fieldset{
      width: 100%;
      border: 0 none;
      outline: none;
      border-top: 1px solid #dedede;
      text-align: center;
      margin-bottom: rem-calc(22px);
      legend{
        margin: 0 auto;
        padding: 0 rem-calc(20px);
        color: #999;
        background-color: #fff;
      }
    }
  }
}
</style>
