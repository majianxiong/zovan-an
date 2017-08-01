
<!--********************************************************************
 * Author        : Geyan
 * Email         : geyan@zhongan.io
 * Create Date   : 2017-04-13 18:17
 * Filename      : table.vue
 * Description   : 业务表格组件

********************************************************************-->

<template>
<div class='info-table-content'>
  <div class='info-table'>
    <div class='info-thead'>
      <div class='info-tr'>
        <div v-for='item in tHeadList' class='info-td'><span>{{ item.name }}</span></div>
      </div>
    </div>
    <div class='info-tbody'>
      <div v-for='line in tBodyList' class='info-tr'>
        <div v-for='(td,idx) in line' class='info-td'><span :class='{figure:tHeadList[idx].figure}'>{{ td }}</span></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data: () => {
    return {
      tHeadList: [],
      tBodyList: []
    }
  },
  props: ['head', 'data'],
  methods: {},
  activated() {
    this.tHeadList = this.head
    this.tBodyList = this.data
  },
  created () {
    this.tHeadList = this.head
    this.tBodyList = this.data
  }
}
</script>

<style lang='scss' rel='stylesheet/scss'>@import '~assets/scss/function';
.info-table-content {
    width: rem-calc(344px);
    margin-left: auto;
    margin-right: auto;
    font-weight: bold;
    .info-table {
        width: 100%;
        align-items:center;
        .info-td {
            height: rem-calc(53px);
            text-align: center;
            vertical-align: middle;
        }
        .info-thead {
            background-color: #c3c3c3;
            font-size: rem-calc(13px);
            color: #fff;
            .info-tr {
              display:flex;
              align-items:center;
              justify-content:center;
              align-content:stretch;
              .info-td {
                flex:1;
                display:flex;
                justify-content: center;
                align-content:center;
                span {
                    align-self:center;
                    word-break: keep-all;
                    line-height: rem-calc(18px);
                    padding-left: rem-calc(15px);
                    padding-right: rem-calc(15px);
                    box-sizing: border-box;
                }
              }
            }
        }
        .info-tbody {
            background-color: #f8f8f8;
            .info-tr {
              display:flex;
              border-bottom: 1px solid #e1e1e1;
              .info-td {
                flex:1;
                height: rem-calc(53px);
                text-align: center;
                display:flex;
                align-items:center;
                justify-content: center;
                span {
                  line-height:rem-calc(18px)
                }
              }
            }
            & .info-tr:last-child {
                border-bottom: none;
            }

        }
    }
}
</style>
