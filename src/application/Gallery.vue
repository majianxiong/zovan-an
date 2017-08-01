<!--
gallery用于在开发中汇总单个页面列表

-->
<template>
  <div class="page-gallery">
    <details>
      <summary>Gallery</summary>
      <ol>
        <li v-for = "item in items">
            <router-link :to="item.link" key="item.link" tag="div">
              link:{{ item.link }}
              <p>{{item.descript}}</p>
            </router-link>
        </li>
       </ol>
    </details>
    <details>
      <summary>Router link</summary>
    <ol>
      <li v-for = "item in linkitem" key = "item.link">
          <router-link :to="item.link" tag="div">
            link:{{ item.link }}
            <dl><dt>param:</dt>
              <dd v-for="(value, key) in item.param">
                {{ key }} : {{ value }}
              </dd>
            </dl>
            <p>{{item.descript}}</p>
          </router-link>
      </li>
    </ol>
    </details>
  </div>
</template>

<script>
export default{
  name: 'Gallery',
  data () {
    return {
      items: [
        {
          link: '/gallery',
          descript: 'gallery用于在开发中汇总单个页面列表'
        },
        {
          link: '/uigallery',
          descript: 'baseUiGallery 基本 ui 组件汇总'
        },
        {
          link: '/servicegallery',
          descript: 'servicegallery 基本 业务 组件汇总'
        }
      ],
      linkitem: [
        {
          link: '/',
          descript: '首页',
          param: {id: 1, productId: '001', other: 'example'}
        },
        {
          link: '/login',
          descript: '登录 login',
          param: {id: 2, productId: '002', other: 'example'}
        },
        {
          link: '/study',
          descript: '学习 study',
          param: {}
        },
        {
          link: '/resultsucc',
          descript: '投保结果 成功',
          param: {}
        },
        {
          link: '/resultfail',
          descript: '投保结果 支付失败',
          param: {}
        },
        {
          link: '/resultmanual',
          descript: '投保结果 人工核保',
          param: {}
        },
        {
          link: '/resultfailself',
          descript: '投保结果 自核失败',
          param: {}
        },
        {
          link: '/uploadexample',
          descript: '电子签名、证件上传样例',
          param: {}
        },
        {
          link: '/progressdetail',
          descript: '投保进度－投保进度详情',
          param: {}
        },
        {
          link: '/chargeaddition',
          descript: '计算保费 - 添加附险',
          param: {}
        },
        {
          link: '/studydetail',
          descript: '学习文章的详情页面 传一个文章id',
          param: {id: 2}
        },
        {
          link: '/banks',
          descript: '选择银行',
          param: {}
        },
        {
          link: '/beneficiary',
          descript: '选择受益人',
          param: {}
        },
        {
          link: '/progress',
          descript: '保险进度',
          param: {id: 2}
        },
        {
          link: '/prosearchresult',
          descript: '投保进度查询',
          param: {}
        },
        {
          link: '/feature',
          descript: '主险特色页',
          param: {}
        },
        {
          link: '/upload',
          descript: '投保资料上传',
          param: {}
        },
        {
          link: '/joblist',
          descript: '常用职位列表',
          param: {}
        },
        {
          link: '/jobdetail',
          descript: '职业详情',
          param: {}
        },
        {
          link: '/previewsug',
          descript: '预览建议书',
          param: {}
        },
        {
          link: '/idcard',
          descript: '扫描身份证'
        },
        {
          link: '/jobsearch',
          descript: '职业查询',
          param: {}
        },
        {
          link: '/repay',
          descript: '支付信息',
          param: {}
        },
        {
          link: '/announcement',
          descript: '代理人告知',
          param: {}
        },
        {
          link: '/previewsug',
          descript: '预览建议书',
          param: {}
        },
        {
          link: '/idcard',
          descript: '扫描身份证',
          param: {}
        }
      ]
    }
  },
  components: {}
}
</script>
<style lang='scss' rel="stylesheet/scss" scoped>
    .page-gallery{
      width:100%;
      padding:0px;
      margin: 0;
      height: 100%;
      overflow-y: auto;
      &>details{
        margin: 10px 10px 10px 20px;
      }
        ol{
          width:100%;
          &>li{
          text-align: left;
          margin-bottom: 10px;
          line-height: 25px;
          p{
              border-radius: 5px;
              padding:10px;
              background: #aaa;
              color:#fff;
          }
        }
      }
    }
</style>
