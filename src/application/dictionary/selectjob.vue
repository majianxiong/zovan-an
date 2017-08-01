<template>
  <div class="page-selectjob">
    <c_dictionary :query="query" :source="source" :keyword="keyword" :version="version"></c_dictionary>
  </div>
</template>
<script>
  // import { at1 } from "src/api"
  import * as types from 'src/store/mutation-types'
  export default {
    name: 'selectjob',
    data () {
      return {
        source: '',
        query: {},
        keyword: '',
        version: this.$route.query.version
      }
    },
    created () {
      // setTimeout(()=>{this.name=['c']},1000)
      // console.log('hehe')
    },
    activated(){
      //访问来源url变化
      this.keyword=  this.$route.query.id
      // console.log(this.keyword)
      if(this.source != this.$route.query.source){
        this.source = this.$route.query.source
        // console.log(this.$route.query)
        this.query = {...this.$route.query}
      }else{
        this.$store.commit(types.CLEARJOBS)
        for(let x in this.query){
          if(x != this.$route.query.id){
            this.query = {...this.$route.query,...this.query}
          }
        }
        this.query.scroll = this.$route.query.scroll
      }
      // console.log(this.query)
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
  .page-selectjob{
    background-color: #fff;
    min-height: 100%;
  }
</style>
