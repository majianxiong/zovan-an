<!--
components: c_progressarticle
      name: c_progressarticle

    @event:
     C_Click: 点击事件

    #props:
        id: 文章id
   imgpath: 文章图片
     title: 文章title
      word: 文章正文

     &slot: default

    author: xx

  example:
        <c_article :id = "id"
                   :imgpath = "imgpath"
                   :title = "title"
                   :word = "word"
                   @C_Click = clickevent(n) n 文章为ID
        ></c_article>
-->
<template>
  <div class="progress-articlebox">
    <div @click="articleDetail(id)" class="progressarticle" v-if="type !== '2'">
      <div class="articlebox">
          <div>
              <img :src="imgpath" />
          </div>
          <div><span>{{title}}</span>
               <span>投保人:{{applicant}}</span>
               <span>保费总计:{{paytotal}}</span>
          </div>
          <div>
              <span class="arrow_icon">{{step}}</span>
          </div>
      </div>
      <div class="articlenav" v-if="showMenu !== 'hidden'">
        {{time}}
        <div>
            <button v-if="canCopy">复制</button>
            <button v-if="canDele">作废</button>
            <button v-if="canEdit">编辑</button>
        </div>
      </div>
    </div>
    <div @click="articleDetail(id)" class="progressarticle" v-else>
      <div class="articlebox2">
          <div>{{applicant}}</div>
          <div>
            <span class="arrow_icon">{{step}}</span>
          </div>
      </div>
      <div class="articlenav" v-if="showMenu !== 'hidden'">
        {{time}}
        <div>
            <button v-if="canCopy" @click = "eventCopy">复制</button>
            <button v-if="canDele" @click = "eventDele">作废</button>
            <button v-if="canEdit" @click = "eventEdit">编辑</button>
       </div>
      </div>
    </div>
  </div>
</template>
<script>
export default{
  name: 'c_progressarticle',
  props: ["id", "imgpath", "title", "applicant", "paytotal", "step", "type", "time", "canCopy", "canDele", "canEdit", "showMenu"],
  methods: {
    articleDetail (n) {
      this.$emit('C_Click', {id: this.id})
    },
    eventCopy () {
      this.$emit('C_Copy', {id: this.id})
    },
    eventDele () {
      this.$emit('C_Dele', {id: this.id})
    },
    eventEdit () {
      this.$emit('C_Edit', {id: this.id})
    }
  }
}
</script>
<style lang='scss' rel="stylesheet/scss" scoped>
@import '~src/assets/scss/function';
.progress-articlebox{
  background:#fff;
  margin-bottom: rem-calc(10px);
  .progressarticle {
    position: relative;
    &>.articlenav{
      height: 30px;
      line-height: 30px;
      vertical-align: middle;
      overflow: hidden;
      color: #a8a8a8;
      padding-left: rem-calc(15px);
      position: relative;
      &>div{
        position: absolute;
        top:0;
        right:rem-calc(-15px);
        &>button{
          color:#666;
          border-radius: rem-calc(5px);
          -webkit-appearance: none;
          border:none;
          font-size: rem-calc(24px);
          display: inline;
          background: #fff;
          border:1px solid #c3c3c3;
          width:rem-calc(120px);
          height: rem-calc(45px);
          margin: rem-calc(-5px) 0 0 rem-calc(-50px);
          transform: scale(.5);
          &:last-child{
            border-color: #00a6ff;
            color: #00a6ff;
          }
        }
      }
    }
    &>.articlebox{
      display: table;
      width:100%;
      height: rem-calc(100px);
      @include borderbottom-1px(#efefef);
      &>div:first-child{
        width:rem-calc(130px);
      }
      &>div{
        display: table-cell;
        vertical-align:middle;

        &>img{
          display: block;
          width:rem-calc(100px);
          height:rem-calc(70px);
          margin-left: rem-calc(15px);
        }
        &>span{
          display: block;
        }
      }
      &>div:nth-child(2)>span{
        &:first-child{
          font-size:rem-calc(15px);
          color:#333;
        }
          font-size:rem-calc(13px);
          color:#999;
          line-height: rem-calc(20px);
          vertical-align: middle;
      }
      &>div:nth-child(3)>span{
          font-size:rem-calc(13px);
          color:#999;
          line-height: rem-calc(20px);
          vertical-align: middle;
          text-align: right;
          padding-right: rem-calc(30px);
          &.arrow_icon:after{
            top:rem-calc(-2px);
          }
      }
    }
    &>.articlebox2{
      display: table;
      width:100%;
      @include borderbottom-1px(#efefef);
      &>div{
        display: table-cell;
        vertical-align: middle;
        line-height: rem-calc(60px);
        height: rem-calc(60px);
        &:first-child{
          padding-left: rem-calc(15px);
          font-size: rem-calc(15px);
        }
        &:last-child{
          font-size: rem-calc(13px);
          text-align: left;
          &>span{
            color:#999;
            display: block;
            position: relative;
            line-height: rem-calc(20px);
            padding-right: rem-calc(30px);
            text-align: right;
            &.arrow_icon:after{
              top:rem-calc(-2px);
            }
          }
        }
      }
    }
  }
}
</style>
