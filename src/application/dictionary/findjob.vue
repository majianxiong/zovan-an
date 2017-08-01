<template>
  <div class="page-findjob">
    <c_dictionary :version='version'></c_dictionary>
  </div>
</template>
<script>
  // import { at1 } from "src/api"
  export default {
    name: 'findjob',
    data () {
      return {
        version: this.$route.query.version
      }
    },
    created () {
      // setTimeout(()=>{this.name=['c']},1000)
      // console.log('hehe')
    },
    methods: {
    },
    watch: {
    },
    components: {
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss">
  @import '~assets/scss/function';
  .page-findjob{
    background-color: #fff;
    min-height: 100%;
    padding: 15px 0;
  }
</style>
