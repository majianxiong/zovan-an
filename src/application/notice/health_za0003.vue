<template>
    <!--
        国泰健康告知
    -->
    <div id="health">
        <div class="content">
            <p>1.近期诊治：您最近六个月内是否接受过医师的诊察、治疗、用药？</p>
            <p>2.近五年是否曾接受健康检查、专科检查或曾住院治疗、手术(包括入住疗养院、康复医院等医疗机构)？</p>
            <p>3.您是否目前或曾经出现下列症状、患有下列疾病或接受诊疗？</p>
            <div class="option">
                a.心血管系统：心悸、胸闷、胸痛、心杂音、心律失常、高血压、心绞痛、心肌梗塞、冠心病、心肌病、心包炎、心内膜炎、风湿性心脏病、先天性心脏病、肺源性心脏病、心瓣膜病(狭窄、关闭不全、畸形)、主动脉血管瘤、血管畸形、静脉曲张、动脉粥样硬化等；<br>
                &#x3000;&#x3000;b.血液系统：各类贫血、血友病、凝血功能障碍、白血病、再生障碍性贫血、紫癜、脾脏疾病、骨髓疾病等；<br>
                &#x3000;&#x3000;c.呼吸系统：咯血、持续咳嗽、慢性支气管炎、肺气肿、哮喘、支气管扩张症、气胸、尘肺、肺纤维化、胸膜炎、肺脓肿、肺结核等； <br>
                &#x3000;&#x3000;d.消化系统：呕血、便血、腹痛、肝炎、肝炎病毒携带、肝硬化、肝内/肝外结石、肝脾肿大、肝功能异常、胆石症、胆囊炎、肝脾肿大、慢性胃炎、消化道穿孔或溃疡、胰腺炎、疝气、肠梗阻、结肠炎、直肠肛门疾病等；<br>
                &#x3000;&#x3000;e.泌尿生殖系统：血尿、蛋白尿、肾炎、肾病综合症、肾功能异常、肾衰竭、多囊肾、肾囊肿、泌尿系结石、膀胱疾病、前列腺疾病、性病等；<br>
                &#x3000;&#x3000;f.内分泌代谢系统：糖尿病、痛风、高尿酸血症、高脂血症、甲状腺或甲状旁腺疾病、垂体功能亢进或减退、肾上腺机能亢进或减退等；<br>
                &#x3000;&#x3000;g.神经系统及精神异常：反复头晕、持续性头痛、晕厥、眩晕、脑膜炎、脑出血、脑梗塞、脑动脉瘤、癫痫、帕金森氏症、运动神经元疾病、重症肌无力、阿尔兹海默氏病、脊髓灰质炎、痴呆、抑郁症等；<br>
                &#x3000;&#x3000;h.骨骼肌肉及结缔组织：关节肿痛、关节炎、骨髓炎、骨折、颈腰椎增生或退行性改变、强直性脊柱炎、股骨头坏死、肌肉萎缩、系统性红斑性狼疮、多发性硬化症、免疫缺陷、结节病、人工装置物等；<br>
                &#x3000;&#x3000;i.眼、耳鼻喉和口腔：视力明显下降、视物不清、白内障、青光眼、视网膜病变、视神经病变、角膜疾病、听力明显下降、中耳炎、鼻窦炎等；<br>
                &#x3000;&#x3000;j.恶性肿瘤、良性肿瘤、尚未证实为良性或恶性的肿瘤、息肉、肿块、囊肿、赘生物；<br>
                &#x3000;&#x3000;k.酒精、药物滥用或成瘾、吸食毒品；<br>
            </div>
            <p>4.您是否曾接受或试图接受艾滋病及有关的医疗咨询、检查或治疗？在六个月内有下列症状：体重下降（超过五公斤）、 食欲不振、盗汗、腹泻、淋巴结肿大及皮肤溃疡？</p>
            <p>5.您有无下述身体残障情况？</p>
            <div class="option">a.是否有智能、语言、视力、听力或中枢神经系统障碍？<br>&#x3000;&#x3000;b.是否有五官、四肢、脊柱、胸廓、手指、足趾畸形、残缺或功能障碍？</div>
            <p>6.您是否目前或曾经吸烟？</p>
            <p>7.您是否目前或曾经饮酒？</p>
            <p>8.您目前是否怀孕？</p>
            <p>9.少儿补充告知栏（2周岁及以下）：</p>
            <div class="option">
                a.出生时是否曾有产伤、窒息、抢救、置于保温箱史等异常情况？<br>
                &#x3000;&#x3000;b.出生至今是否接受住院治疗或外科手术或被告知患有先天性疾病、遗传性疾病、先天性畸形或缺陷？
            </div>
            <p>10.您是否有参加赛车、赛马、搏击类运动、蹦极、滑雪、攀岩、潜水、飞行、探险或特技活动及其它高风险活动的爱好？</p>
            <p>11.购买费用补偿型医疗保险的，请告知是否拥有公费医疗、社会医疗保险、其它费用补偿型医疗保险。</p>
            <p>12.您是否已购买或正在申请其他保险公司的保险？</p>
            <p>13.您是否曾被其他保险公司解除合同、拒保、延期、条件承保，提出或已申请过理赔？</p>
            <p>14.若被保险人年龄未满18周岁，请告知：目前是否已投保其他保险公司的以死亡为给付条件的人身保险？</p>
            <p>15.配偶、子女是否有投保附加险？</p>
            <p>16.您是否持有中国残疾人证或最低生活保障金领取证？</p>
        </div>
        <c_footergroup btlname="至少有一项是" btrname="全部为否" @leftclick="lBtnCallback" @rightclick="rBtnCallback"></c_footergroup>
    </div>
</template>
<script>
  export default {
    name: 'healthZA0003',
    data () {
      return {
      }
    },
    created () {
    },
    methods: {
      lBtnCallback () {
        let toastConf = {
         type: 'text',
         width: '80%',
         isShowMask: true,
         text: '根据健康告知，您的情况不适合投保本保险',
        //  time: 150000
        }
        this.$vux.toast.show(toastConf)
      },
      rBtnCallback () {
        this.$router.push({path:'/order/'+this.$route.path.split('/')[2], query:{
          proposalId:this.$route.query.proposalId,
          price:this.$route.query.price,
          version:this.$route.query.version
        }})
      }
    },
    watch: {
    },
    components: {
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import '~src/assets/scss/function';
  #health{
      box-sizing:border-box;
      -webkit-box-sizing: border-box;
      width:100%;
      background:#f6f6f6;
      min-height:100%;
      &>.content{
          padding:rem-calc(15px);
          margin-bottom:rem-calc(50px);
          &>p{
              line-height:rem-calc(20px);
              margin-top:rem-calc(10px);
              font-size:rem-calc(16px);
              color:#999;
          }
          &>.option{
              line-height:rem-calc(20px);
              text-indent:2em;
              font-size:rem-calc(16px);
              color:#999;
          }
      }
  }

</style>
