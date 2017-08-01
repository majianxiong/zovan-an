<script>
export default {
  name: 'c_gender',
  data () {
    return {
      selGender: this.gender
    }
  },
  template: `
            <div class="choose_gender">
              <div class="choose_gender_content">
                <div class="male" :class="{seled: selGender=='M'}" @click="checkgander('M')">男</div>
                <div class="female" :class="{seled: selGender=='F'}" @click="checkgander('F')">女</div>
             </div>
            </div>`,
  props: [ 'gender' ],
  computed: {
    // seled: {
    //   get: function () {
    //     return this.gender
    //   },
    //   set: function (val) {
    //     this.seled = val
    //   }
    // }
  },
  created(){
  },
  methods: {
    checkgander (n) {
      if (n == 'M') {
        this.selGender = 'M'
        // this.seled = true
        this.$emit('Click', n)
      } else {
        this.selGender = 'F'
        // this.seled = false
        this.$emit('Click', n)
      }
    }
  }
}
</script>
<style lang='scss' rel="stylesheet/scss">
@import '~src/assets/scss/function';
.choose_gender {
    // display: inline-block;
    // width: rem-calc(115px);
    // height: rem-calc(32px);
    // overflow: hidden;
    text-align: right;
    margin: -3px 0;
    .choose_gender_content {
        // width: rem-calc(160px);
        // overflow: hidden;
        // height: rem-calc(44px);
        // line-height: rem-calc(44px);
        position: relative;
        text-align: right;
        & > div {
            display: inline-block;
            position: relative;
            width: rem-calc(70px);
            height: rem-calc(26px);
            line-height: rem-calc(26px);
            vertical-align: middle;
            text-align: center;
            font-size: rem-calc(13px);
            margin-left: rem-calc(10px);
            box-sizing: border-box;
            border-radius: rem-calc(15px);
            @include convert-to-1px-after(#c3c3c3,30px);
            &:before {
              content: '';
              display: inline-block;
              vertical-align: middle;
              width: rem-calc(13px);
              height: rem-calc(13px);
              background-size: contain;
              background-repeat: no-repeat;
              background-position: center center;
            }
            &.male {
                &:before {
                  background-image: url("~src/assets/image/male.png");
                  margin-right: rem-calc(3px);
                }
                &.seled {
                  border: none;
                  background-color: #7fcef9;
                  color: #fff;
                }
            }
            &.male.seled:before {
              background-image: url("~src/assets/image/male_white.png");
            }
            &.female {
                &.seled {
                  background: #f89797;
                  color: #fff;
                  border: none;
                }
                &:before {
                  // margin-right: rem-calc(2px);
                  background-image: url("~src/assets/image/female.png");
                }
            }
            &.female.seled:before {
              background-image: url("~src/assets/image/female_white.png");
            }
        }
    }
}
</style>
