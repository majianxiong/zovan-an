<template>
  <div id="identification">
    <div class="change-head">
      <span>{{info}}</span>
    </div>
    <div class="change-detail">
      <div class="first">
        <span>{{firstinfo}}</span>
        <input v-validate data-vv-rules="required|cnname" data-vv-name='真实姓名' type='text'  v-model.trim='firstval' name='真实姓名' :placeholder="firstdef"  >
      </div>
      <div class="second">
        <span>{{secondinfo}}</span>
        <input v-validate data-vv-rules="required|idcard" data-vv-name='身份证号码' type='text'  v-model.trim='secondval' name='身份证号码' :placeholder="seconddef" :maxLength='18'>
      </div>
    </div>
    <!-- <router-link :to='{name:"authidcard", params:{certiNo:secondval, certiName:firstval}}'> -->
    <div :class="canclick?'canclick':'notclick'" @click="goNext" class="btn">
       下一步
    </div>
    <!-- </router-link> -->

  </div>
</template>
<script>
  import {identificationApi} from 'src/api/index.js'
  import cookie from 'src/widget/plugin/cookie'
  let userId = cookie.get('http_userID')
  let token = cookie.get('http_usertoken')
  export default {
    name: "Identification",
    data () {
      return {
        info: "请填写您的真实信息",
        firstinfo: "真实姓名",
        secondinfo: "身份证号",
        firstdef: "请输入真实姓名",
        seconddef: "请输入证件号",
        firstval: "",
        secondval: "",
        canclick: false
      }
    },
    methods: {
      goNext () {
        this.$validator.validateAll().then(success => {
          if (! success) {
            const msg = this.errors.all()[0];
            this.$vux.toast.show({
              text: msg,
              type: 'text',
              width: '80%'
            });
            return
          }else{
            this.$store.dispatch('toggleLoadingStatus', true)
            let instance =this.axios.create({
              headers: {'token': token},
              timeout:6000
            });
            instance.post(identificationApi,{
              "certiName": this.firstval,
              "certiNo": this.secondval
            }).then(res=>{
              console.log(res)
              this.$store.dispatch('toggleLoadingStatus', false)
              
              if(res.data.status=="SUCCESS"){
                this.$router.push({path:'auth', query:{certiName:this.firstval, certiNo:this.secondval}})
              }else{
                this.$vux.toast.show({
                  text: res.data.message,
                  type: 'text',
                  width: '80%'
                });
              }
            }).catch(err=>{
              this.$store.dispatch('toggleLoadingStatus', false)
              this.$vux.toast.show({
                text: "网络异常",
                type: 'text',
                width: '80%'
              });
            })
          }
        }).catch((err)=>{
         console.log(err)
        });
      },
      clicknext(){
        if(this.firstval!=""&&this.secondval.length==18){
          this.canclick= true
        }else{
          this.canclick= false
        }
      },
      filterIdCard (num){
        return num.substring(0,4)+"**********"+num.substring(13,18)
      }
    },
    beforeMount () {
      this.clicknext()
    },
    beforeUpdate () {
      this.clicknext()
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss'>
  @import '~src/assets/scss/function';
  #identification{
    width:100%;
    height:100%;
    background:#f6f6f6;
    &>.change-head{
      line-height:rem-calc(40px);
      padding-left:rem-calc(38px);
      color:#999;
      font-size:13px;
      background:url(~assets/image/advertisement/warn.png) no-repeat rem-calc(15px) center;
    }
    &>.change-detail{
      height:ren-calc(90px);
      padding-left:rem-calc(15px);
      background:#fff;
      &>.first,&>.second{
        line-height:rem-calc(45px);
        position:relative;
        font-size:14px;
        &>input{
          width:45%;
          height:rem-calc(30px);
          border:none;
          outline:none;
          margin-left:rem-calc(15px);
          font-size:14px;
        }
      }
      &>.first::after{
        @include borderbottom
        color:#eee;
      }
    }
    & .btn{
      line-height:rem-calc(45px);
      width:rem-calc(345px);
      border-radius: rem-calc(3px);
      margin:rem-calc(35px) auto;
      text-align:center;
      color:#fff;
      font-size:18px;
    }
    & .canclick{
      background-image: -webkit-linear-gradient( 0deg, rgb(108,217,182) 0%, rgb(54,210,159) 45%, rgb(0,203,135) 100%);
    }
    & .notclick{
      background:#e3e3e3;
    }
  }
</style>
