<template>
  <div id="app" class="page-app">
    <div class="full-page">
      <keep-alive :exclude = " defaultExclude() ">
        <router-view></router-view>
      </keep-alive>

      <!-- <keep-alive :exclude = " sidebarExclude() ">
        <router-view name = "sidebar"></router-view>
      </keep-alive> -->
    </div>
    <c_mask v-show = "maskShow" class = "loading">
      <div class="loader"></div>
    </c_mask>
  </div>
</template>

<script>
// const FastClick = require('fastclick')
// FastClick.attach(document.body)
export default {
  name: 'viewport',
  data () {
    return {
      // maskShow: this.$store.getters.maskState
    }
  },
  computed: {
    maskShow: function () {
      return this.$store.getters.maskState
    }
  },
  created: function () {
    // console.log('created')
  },
  methods: {
    maskShow () {
      return this.$store.state.ui.getters.maskState
    },
    sidebarExclude () {
      return (this.$route.meta && this.$route.meta.exclude && this.$route.meta.exclude.sidebar) ? this.$route.meta.exclude.sidebar : ''
    },
    defaultExclude () {
      console.log(this.$route.meta.exclude)
      return (this.$route.meta && this.$route.meta.exclude && this.$route.meta.exclude.default) ? this.$route.meta.exclude.default : ''
    }
  }
}
</script>
<style lang='scss' rel="stylesheet/scss" scoped>
.page-app{
  height:100%;
  width:100%;
  overflow: hidden;
  &>.full-page{
    width: 100%;
    height:100%;
    position: relative;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
    overflow-y: auto;
  }
}
</style>
