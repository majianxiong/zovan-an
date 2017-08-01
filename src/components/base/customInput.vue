<template lang="html">
  <div class="ui-input" :style="{width:width}" :class="{'is-active':isActive}">
    <div class="ui-input-item">
      <input v-show="!btnPswEyeIsActive" ref="input" :value="value" :maxLength="maxLength" :placeholder="placeholder" :disabled="disabled" :type="type" :name="name" @blur="removeHighlight($event.target)" @focus="addHighlight($event.target)" @input="updateValue($event.target)" />
      <input v-show="btnPswEyeIsActive" v-if="btnarea.type == 'pwdEye'" ref="hidenInput" :value="value" :maxLength="maxLength" :disabled="disabled" :placeholder="placeholder" :type="type=='password'?'text':'password'" :name="name" @blur="removeHighlight($event.target)" @focus="addHighlight()" @input="updateValue($event.target)" />
    </div>
    <div v-if="hasVfCode || btnarea.type != ''" class="btn-area">
      <slot name="sms"></slot>
      <!-- {{btnarea.pwdEye}} -->
      <div v-if="btnarea.type=='pwdEye'" class="btn-psw-eye" :class="{ active: btnPswEyeIsActive }" v-tap="{methods:activePwdEye}"></div>
      <div v-if="btnarea.type=='clear'" v-show="btnClear"  class="btn-clear" v-tap='{methods:clearValue}'></div>
      <div v-if="hasVfCode" class="btn-vf-code" v-tap='{methods:refreshVfCode}'>
        <img ref="vfCode" :src='imgVfCode' />
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vux'
// import bus from './bus'
export default {
  data () {
    return {
      imgVfCode: '//' + document.domain + ':' + window.location.port + '/img',
      isActive: false,
      innerValue: null,
      btnClear: false,
      btnPswEyeIsActive: false
      // vfCodeImgSrc: ''
    }
  },
  computed: {
  },
  props: {
    'width': {
      type: String,
      // required: true,
      // default: 'text'
    },
    'type': {
      type: String,
      // required: true,
      default: 'text'
    },
    'name': {
      type: String,
      default: ''
    },
    'value': {
      type: String,
      default: ''
    },
    'placeholder': {
      type: String
      // required: true
    },
    'disabled': {
      type: Boolean,
      default: false
    },
    'maxLength': {
      type: Number
      // default: ''
    },
    // 'hasError': Function,
    'btnarea': {
      type: Object,
      default: function () {
        return {
          // exist: true,
          type: ''//pwdEye
          // pwdEye: false
        }
      }
    },
    'hasVfCode': {
      type: Boolean,
      default: false
    },
    'smsIsActive': {
      type: Boolean
    }
  },
  methods: {
    customTrim (x) {
      return x
      // return x.replace(/^\s+|\s+$/gm, '')
    },
    addHighlight (target) {
      this.isActive = true
    },
    removeHighlight (target) {
      this.$emit('on-blur')
      this.isActive = false
    },
    updateValue (target) {
      // console.log(target.value)
      // this.$refs.input.value = value;
      this.btnClear = !(target.value == '')
      // trim 删除首位空格
      this.$emit('input', this.customTrim(target.value))
    },
    clearValue (value) {
      // this.$refs.input.value = value;
      this.btnClear = false
      // this.errors.clear('vvscope');
      // this.errors.clear(this.errors.has(this.name))
      this.$emit('input', '')
    },
    activePwdEye (params) {
      this.btnPswEyeIsActive = !this.btnPswEyeIsActive
      setTimeout(() => !this.btnPswEyeIsActive ? this.$refs.input.focus() : this.$refs.hidenInput.focus(), 1)
    },
    refreshVfCode () {
      // console.log(this.$refs.vfCode.src.replace(/\?v=\w+$/g,''))
      if (this.$refs.vfCode) {
        this.$refs.vfCode.src = this.$refs.vfCode.src.replace(/\?v=\w+/, '') + '?v=' + new Date().getTime()
      }
    }
    // onValidate() {
    //   this.$validator.validateAll()
    //   // console.log(this.errors)
    // },
    // onClear() {
    //   this.errors.clear()
    // }
  },
  watch: {
    value () {
      this.innerValue = this.value
      console.log(this.innerValue)
    },
    // innerValue(value) {
    //   console.log(this.innerValue)
    //   this.$emit('input', value)
    // }
  },
  // created() {
  //   bus.$on('validate', this.onValidate)
  //   bus.$on('clear', this.onClear);
  //   this.$watch(() => this.errors.errors, (value) => {
  //       bus.$emit('errors-changed', value);
  //   });
  // },
  created () {
  // mounted(){
    this.innerValue = this.value
    // this.btnClear = this.btnarea.clear.show
    // this.countTime = this.btnarea.sms && this.btnarea.sms.countTime;
    // this.vfCodeImgSrc= this.$refs.vfCode.src;
  },
  // beforeDestroy() {
  //   bus.$off('validate', this.onValidate);
  //   bus.$off('clear', this.onClear);
  // },
  components: {
    Toast
  }
}
</script>

<style lang="scss">
@import "~assets/scss/function";
.ui-input{
    position: relative;
    display: inline-block;
    min-width: rem-calc(200px);
    // height: 22px;
    // vertical-align: middle;
    &-item{
      height: 100%;
    }
    .btn-area{
      position: absolute;
      right: 0;
      z-index: 9;
      top: 0;
      height: 100%;
      > div{
        float: right;
        &.btn-sms{
          margin: 14px 1px 0 12px;
        }
        &.btn-sms2{
          height: 100%;
        }
      }
    }
    // label{
    //   color: #666;
    //   width: auto;
    //   height: 48px;
    //   line-height: 48px;
    //   font-size: rem-calc(16px);
    //   display:inline-block;
    //   vertical-align: middle;
    // }
    input{
      border: 0 none;
      padding: 0;
      width: 100%;
      height: 100%;
      line-height: 100%;
      font-size: rem-calc(15px);
      background: none;
      display:block;
      color: #333;
    }
    textarea{
      border: 0 none;
      margin: 13px 0;
      width: 100%;
      height: 24px;
      resize: none;
      overflow: hidden;
      display:block;
      background: none;
    }
  }

  .btn-area{
    .btn-clear{
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      &:after{
        content: '';
        width: 20px;
        height: 20px;
        display: inline-block;
        vertical-align: middle;
        border-radius: 7px;
        background: url(~assets/image/input_clear.png) center center no-repeat;
        background-size: 16px auto;
      }
    }

    .btn-psw-eye{
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      &:after{
        content: '';
        width: 20px;
        height: 20px;
        display: inline-block;
        vertical-align: middle;
        border-radius: 7px;
        background: url(~assets/image/pwd_eye.png) center center no-repeat;
        background-size: 19px auto;
      }
      &.active{
        &:after{
        // background-color: #2f98ff;
        }
      }
    }

    .btn-vf-code{
      width: 90px;
      height: 50px;
      line-height: 40px;
      margin-left: 10px;
      img{
        width: 100%;
        height: 34px;
        vertical-align: middle;
      }
    }
  }

  .tip{
    position: absolute;
    bottom: -5px;
    right: 0;
    line-height: normal;
    z-index: 2;
    color:#999;
    word-wrap: word-break;
    color: #bfbfc5;
    margin-top: 10px;
    padding-left: 12px;
    line-height: 16px;
  }
</style>
