<template>
  <div class="hello">
  this is hello
   <!-- <hdr :level="1" :myProp="as">666666</hdr>
   <hdr :level="2" >abc<h1 slot="xxx">77777</h1></hdr>

   <smart :items="item" :level="5">
     <p slot="foo">
      first
     </p>
     <p>second</p>
  </smart>

   <component :is="as"></component>

   <mixin></mixin>
   <st1></st1> -->
  </div>
</template>

<script>
// import smart from 'src/components/base/factoryComponent'
// import mixin from 'src/components/base/mixin'

export default {
  name: 'Hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      item: 1,
      as: 'Empty3'
    }
  },
  created: function () {
    console.log('=================')
    console.log(this.$route)
    console.log('=================')
  },
  components: {
    // mixin
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
