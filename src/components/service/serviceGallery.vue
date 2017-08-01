<template>
  <div class='page-serviceGallery'>
    <h2>this serviceGallery</h2>
    <CFactory :items = 'componentConfig'></CFactory>
  </div>
</template>

<script>
import CFactory from '../Factory'

export default {
  name: 'serviceGallery',
  data () {
    return {
      componentConfig: [
        {
          name: 'c_staticlist',
          title: 'list',
          txt: '',
          props: {
            title: 'list title',
            list: [
              {
                key: "姓名",
                value: "大大"
              },
              {
                key: "性别",
                value: "2016-12-12"
              },
              {
                key: "出生日期",
                value: "女"
              },
              {
                key: "职业类别",
                value: "一类"
              }
            ]
          }
        }
      ]
    }
  },
  components: {CFactory}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' rel="stylesheet/scss" scoped>
.page-serviceGallery {
  padding: 10px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow-y: auto;
}
h1, h2 {
  font-weight: normal;
  margin: 20px 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  padding: 0 10px;
  width:100%;
  box-sizing:border-box;
}

a {
  color: #42b983;
}
</style>
