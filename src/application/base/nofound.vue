<template>
  <c_errMsg :txt = "txt"></c_errMsg>
</template>
<script>
  // import Errmsg from "src/components/base/errmsg"
  export default {
    data () {
      return {
        txt: '啊哦 ～～,抱歉当前页面不存在哦!'
      }
    },
    components: {
      // Errmsg
    }
  }
</script>
