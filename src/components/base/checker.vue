mounted<!-- Custom checkbox -->
<template>
  <div class="c-checker">
    <div class="ui-checkbox" :class="{ actived:checked }">
      <i class="ui-checkbox-widget"></i>
      <input v-model='checked' type='checkbox' :name='name' :id='id'>
    </div>
    <label :for="name" v-if="hasSlot">
      <slot>
      </slot>
    </label>
  </div>
</template>
<script>
// import bus from './bus'
const origin = window.location.origin;
export default {
    data (){
      return{
        checked: this.value,
        hasSlot: false,
        check: 'unchecked'
      }
    },
    props: {
      value: Boolean,
      name: String,
      id: String
    },
    methods: {
      // toggle(params){
      //   if(params.event.target.nodeName === 'A'){
      //   // console.log(params.event.target.href);
      //     // let to = params.event.target.href.replace(origin,'').replace('/#','')
      //     let to = params.event.target.href.split('#')[1]
      //     // console.log(origin)
      //     // console.log(to);
      //     this.$router.push(to)
      //   }
      //   else{
      //     // this.checked = !this.checked;
      //   }
      //   this.$emit('toggleChecker',this.checked)
      //   // console.log()
      // }
    },
    watch: {
      checked(val) {
          console.log(val);
          this.check = val?'checked':'unchecked'
          this.$emit('input', val);
          this.$emit('on-change', val)
          this.$emit('toggleChecker',val)
      },
      value (val) {
        this.checked = val
      }
    },
    created(){
      // this.checked = this.actived;
    },
    mounted(){
      this.hasSlot = !!this.$slots.default && this.$slots.default.length;
    }
};
</script>

<style lang="scss">
@import "~assets/scss/function";

.agreement .c-checker{
  margin-left: 9px;
  .ui-checkbox{
    &-widget{
      @include convert-to-1px(#ccc,4px);
    }
  }
}
.c-checker{
  // margin-left: 12px;
  display: inline-block;
  vertical-align: middle;
  line-height: 3rem;
  label + *{
    display: inline-block;
    vertical-align: middle;
  }
}
.ui-checkbox{
  border: 0 none;
  width: 2rem;
  height: 2rem;
  // margin-left: -0.5rem;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  position: relative;
  line-height: 2;
  margin-top: -2px;
  &-widget{
    width: 1.2rem;
    height: 1.2rem;
    margin: 0 0;
    display: inline-block;
    vertical-align: middle;
    background-color: #fff;
    @include convert-to-1px(#00bd96,4px);
    border-radius: 4px;
    box-sizing: border-box;
  }
  input[type='checkbox']{
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  &.actived{
    .ui-checkbox-widget{
      background: url(~assets/image/checker.png) no-repeat center center;
      background-size: 1.2rem auto;
      border: 0 none;
      &:before{
        display: none;
      }
    }
  }
}
</style>
